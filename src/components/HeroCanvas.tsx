'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Minimalist WebGL backdrop: a slowly rotating black wireframe polyhedron
 * over a faint particle field, on a transparent canvas (white page shows
 * through). Mouse adds a gentle parallax. Respects prefers-reduced-motion.
 */
export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const ink = 0x0b0b12;
    const group = new THREE.Group();
    scene.add(group);

    // Wireframe polyhedron — the focal object.
    const geo = new THREE.IcosahedronGeometry(1.7, 1);
    const wire = new THREE.WireframeGeometry(geo);
    const lines = new THREE.LineSegments(
      wire,
      new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: 0.14 })
    );
    group.add(lines);

    // Vertices as small dots for a touch of structure.
    const dots = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: ink, size: 0.05, transparent: true, opacity: 0.4 })
    );
    group.add(dots);

    // Faint ambient particle field.
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 12;
    const fieldGeo = new THREE.BufferGeometry();
    fieldGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const field = new THREE.Points(
      fieldGeo,
      new THREE.PointsMaterial({ color: ink, size: 0.02, transparent: true, opacity: 0.18 })
    );
    scene.add(field);

    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    if (!reduce) window.addEventListener('pointermove', onPointer);

    let raf = 0;
    const render = () => renderer.render(scene, camera);
    const animate = () => {
      group.rotation.y += 0.0016;
      group.rotation.x += 0.0006;
      group.rotation.x += (targetY - group.rotation.x) * 0.02;
      group.rotation.z += (targetX - group.rotation.z) * 0.02;
      field.rotation.y -= 0.0004;
      render();
      raf = requestAnimationFrame(animate);
    };
    if (reduce) render();
    else raf = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      geo.dispose();
      wire.dispose();
      fieldGeo.dispose();
      (lines.material as THREE.Material).dispose();
      (dots.material as THREE.Material).dispose();
      (field.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
