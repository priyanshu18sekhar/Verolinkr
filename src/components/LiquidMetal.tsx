'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Full-screen liquid-metal / metallic-aurora background.
 * A fragment shader domain-warps fbm noise into flowing mercury, lit with
 * sharp chrome highlights and a subtle iridescent sheen over a near-black void.
 * Reduced-motion freezes the animation on a single frame.
 */
const FRAG = /* glsl */ `
precision highp float;
uniform float u_time;
uniform vec2  u_res;
uniform vec2  u_mouse;
varying vec2  vUv;

float hash(vec2 p){ p = fract(p*vec2(123.34, 345.45)); p += dot(p, p+34.345); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v = 0.0, amp = 0.5;
  for(int i=0;i<6;i++){ v += amp*noise(p); p *= 2.02; amp *= 0.5; }
  return v;
}
vec3 iridescence(float t){
  return 0.5 + 0.5*cos(6.28318*(t + vec3(0.0, 0.33, 0.66)));
}
void main(){
  vec2 p = (gl_FragCoord.xy*2.0 - u_res)/u_res.y;
  p += u_mouse*0.25;
  float t = u_time*0.06;

  // domain warping -> flowing liquid
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(p + 3.5*q + vec2(1.7,9.2) + t*0.6),
                fbm(p + 3.5*q + vec2(8.3,2.8) - t*0.6));
  float f = fbm(p + 3.5*r);

  // metallic base ramp
  float metal = smoothstep(0.15, 0.95, f);
  vec3 col = mix(vec3(0.02,0.02,0.035), vec3(0.74,0.77,0.85), metal);

  // sharp chrome highlight bands
  float bands = abs(sin((r.x+r.y)*3.14159 + f*6.0));
  col += pow(bands, 7.0) * vec3(1.0);

  // subtle iridescent aurora sheen in the brighter metal
  vec3 irid = iridescence(f + r.x*0.4);
  col = mix(col, col*0.55 + irid*0.55, 0.16*smoothstep(0.45,1.0,metal));

  // vignette to sink the edges into black
  float vig = smoothstep(1.7, 0.25, length(p));
  col *= mix(0.45, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export default function LiquidMetal() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(mesh);

    const dpr = () => Math.min(window.devicePixelRatio, 1.75);
    const setSize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_res.value.set(w * dpr(), h * dpr());
    };
    setSize();

    const targetMouse = new THREE.Vector2(0, 0);
    const onMove = (e: PointerEvent) => {
      targetMouse.set(e.clientX / window.innerWidth - 0.5, -(e.clientY / window.innerHeight - 0.5));
    };
    if (!reduce) window.addEventListener('pointermove', onMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      uniforms.u_mouse.value.lerp(targetMouse, 0.04);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    if (reduce) {
      uniforms.u_time.value = 12.0;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(setSize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      mesh.geometry.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
