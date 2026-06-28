'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Full-screen WebGL hero background: a rotating "connection globe" — nodes
 * distributed on a sphere, wired to their nearest neighbours into a
 * constellation network (on-brand for "Linkr"). Monochrome, with depth fog,
 * mouse parallax and a subtle breathing pulse. Respects reduced motion.
 */
export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = mount.clientWidth;
    let height = mount.clientHeight;
    const ink = 0x0b0b12;

    const scene = new THREE.Scene();
    // White fog fades the far side of the globe into the page — gives depth.
    scene.fog = new THREE.Fog(0xffffff, 6, 13);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // --- Build nodes on a Fibonacci sphere ---
    const N = 260;
    const R = 3;
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push(new THREE.Vector3(Math.cos(theta) * r * R, y * R, Math.sin(theta) * r * R));
    }

    // Nodes
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const nodes = new THREE.Points(
      nodeGeo,
      new THREE.PointsMaterial({ color: ink, size: 0.05, transparent: true, opacity: 0.55 })
    );
    group.add(nodes);

    // --- Wire each node to its nearest neighbours (precomputed, static) ---
    const K = 3;
    const seen = new Set<string>();
    const edgePos: number[] = [];
    for (let i = 0; i < N; i++) {
      const d: { j: number; dist: number }[] = [];
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        d.push({ j, dist: pts[i].distanceToSquared(pts[j]) });
      }
      d.sort((a, b) => a.dist - b.dist);
      for (let k = 0; k < K; k++) {
        const j = d[k].j;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edgePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
      }
    }
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgePos), 3));
    const edges = new THREE.LineSegments(
      edgeGeo,
      new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: 0.16 })
    );
    group.add(edges);

    // --- Faint ambient dust for extra depth ---
    const dustN = 140;
    const dust = new Float32Array(dustN * 3);
    for (let i = 0; i < dustN * 3; i++) dust[i] = (Math.random() - 0.5) * 16;
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dust, 3));
    const dustField = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: ink, size: 0.02, transparent: true, opacity: 0.12 })
    );
    scene.add(dustField);

    group.rotation.x = 0.35;

    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    if (!reduce) window.addEventListener('pointermove', onPointer);

    let raf = 0;
    const clock = new THREE.Clock();
    const render = () => renderer.render(scene, camera);
    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y += 0.0014;
      group.rotation.x += (0.35 + targetY - group.rotation.x) * 0.03;
      group.rotation.z += (targetX - group.rotation.z) * 0.03;
      const pulse = 1 + Math.sin(t * 0.6) * 0.02;
      group.scale.setScalar(pulse);
      dustField.rotation.y -= 0.0003;
      render();
      raf = requestAnimationFrame(animate);
    };
    if (reduce) render();
    else raf = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      nodeGeo.dispose();
      edgeGeo.dispose();
      dustGeo.dispose();
      (nodes.material as THREE.Material).dispose();
      (edges.material as THREE.Material).dispose();
      (dustField.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
