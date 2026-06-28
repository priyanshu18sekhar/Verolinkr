'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ReactBits-style Aurora background (https://reactbits.dev/backgrounds/aurora),
 * ported to three.js so it reuses our existing WebGL dependency.
 *
 * A flowing aurora curtain — a horizontal colour ramp modulated by simplex
 * noise — rendered with premultiplied alpha so it glows over the platform's
 * white page while the rest of the viewport stays transparent (clean white,
 * black text below it). Sits as a fixed, full-screen, non-interactive layer.
 * Respects prefers-reduced-motion by freezing on a single frame.
 */

// hex string -> normalised vec3
function hexToRGB(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const VERT = /* glsl */ `
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3  uColorStops[3];
uniform vec2  uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  // Linear colour ramp across x between the three stops.
  int index = 0;
  for (int i = 0; i < 2; i++) {
    bool isInBetween = colors[i].position <= uv.x;
    index = int(mix(float(index), float(i), float(isInBetween)));
  }
  ColorStop currentColor = colors[index];
  ColorStop nextColor = colors[index + 1];
  float range = nextColor.position - currentColor.position;
  float lerpFactor = (uv.x - currentColor.position) / range;
  vec3 rampColor = mix(currentColor.color, nextColor.color, lerpFactor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;
  // Premultiplied alpha — composites cleanly over the white page.
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

type AuroraProps = {
  colorStops?: [string, string, string];
  amplitude?: number;
  blend?: number;
  speed?: number;
};

export default function Aurora({
  // Cohesive cool "verification scan" light — indigo → electric cyan → mint.
  colorStops = ['#4f2bff', '#2bb8ff', '#00e0c0'],
  amplitude = 1.15,
  blend = 0.55,
  speed = 0.85,
}: AuroraProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    // WebGL may be unavailable (no GPU, disabled, headless). Fail soft — the
    // aurora is a progressive enhancement; the page stays white underneath.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        premultipliedAlpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }
    renderer.setClearColor(0x000000, 0);
    const dpr = () => Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(dpr());
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const stops = colorStops.map((c) => new THREE.Vector3(...hexToRGB(c)));
    const uniforms = {
      uTime: { value: 0 },
      uAmplitude: { value: amplitude },
      uBlend: { value: blend },
      uColorStops: { value: stops },
      uResolution: {
        value: new THREE.Vector2(mount.clientWidth * dpr(), mount.clientHeight * dpr()),
      },
    };

    const mat = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      blendSrcAlpha: THREE.OneFactor,
      blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(mesh);

    const setSize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setPixelRatio(dpr());
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w * dpr(), h * dpr());
    };
    setSize();

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      uniforms.uTime.value = clock.getElapsedTime() * 0.5 * speed;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    if (reduce) {
      uniforms.uTime.value = 6.0;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(setSize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mesh.geometry.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
