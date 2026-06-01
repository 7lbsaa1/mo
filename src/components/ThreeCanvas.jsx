import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1. إنشاء المشهد (Scene) والكاميرا (Camera)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;

    // 2. إنشاء المحرك (Renderer) الذي يظهر الرسمة على الشاشة
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(300, 300); // حجم مربع الـ 3D
    mountRef.current.appendChild(renderer.domElement);

    // 3. إنشاء الشكل (الهيكل الهندسي والمادة والألوان النيون)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xff3e6c, 
      wireframe: true // يجعل المكعب عبارة عن خطوط نيون برمجية فخمة
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 4. دالة التحريك (Animation Loop) لتدوير المكعب باستمرار
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // تنظيف الذاكرة عند إغلاق المكون
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
      <div ref={mountRef} style={{ width: '300px', height: '300px', border: '1px solid #222', borderRadius: '50%' }} />
    </div>
  );
}
