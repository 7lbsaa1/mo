import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';

function SpinningBox() {
  const meshRef = useRef();

  // حركة دوران مستمرة باستخدام Three.js frame
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 2);
    meshRef.current.rotation.y = Math.sin(t / 4);
    meshRef.current.rotation.z = Math.cos(t / 2);
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* مجسم يعبر عن علامة تجارية أو صندوق ملابس مجسم */}
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial color="#ff3e6c" roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

export default function ShirtModel() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Center>
          <SpinningBox />
        </Center>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
