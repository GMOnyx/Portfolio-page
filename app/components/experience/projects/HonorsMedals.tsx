'use client';

import { Edges, Line, Text } from '@react-three/drei';
import gsap from 'gsap';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { usePortalStore } from '@stores';

const HONORS = [
  'Belt Wrestling\nKORESH\nBronze',
  'Freestyle\nWrestling\nNational Bronze',
  'ICT Overall\nHighest\nAttainer',
  'PE Overall\nProgress\nAward',
  'MUN\nDistinguished\nDelegate',
];

const ARC_RADIUS = 13;
const ARC_Y = 5;

interface MedalProps {
  honor: string;
  position: [number, number, number];
  rotY: number;
  delay: number;
}

const Medal = ({ honor, position, rotY, delay }: MedalProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const isActive = usePortalStore((state) => state.activePortalId === 'projects');

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.to(groupRef.current.position, {
      y: isActive ? position[1] : position[1] - 12,
      duration: 1.2,
      delay: isActive ? delay : 0,
      ease: 'power3.out',
    });
  }, [isActive]);

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1] - 12, position[2]]}
      rotation={[0, rotY, 0]}>
      <group scale={[1.8, 1.8, 1.8]}>
        {/* Ribbon bar */}
        <mesh position={[0, 1.55, 0]}>
          <boxGeometry args={[1.55, 0.38, 0.06]} />
          <meshBasicMaterial color="#1a1a1a" />
          <Edges color="white" lineWidth={1.2} />
        </mesh>
        <Text
          font="./soria-font.ttf"
          fontSize={0.13}
          color="white"
          anchorX="center"
          anchorY="middle"
          position={[0, 1.55, 0.06]}
          letterSpacing={0.12}>
          HONOR
        </Text>

        {/* Lanyard string */}
        <Line
          points={[new THREE.Vector3(0, 1.36, 0), new THREE.Vector3(0, 0.92, 0)]}
          color="white"
          lineWidth={1.5}
        />

        {/* Outer torus ring */}
        <mesh>
          <torusGeometry args={[0.82, 0.055, 10, 48]} />
          <meshBasicMaterial color="white" />
          <Edges color="white" lineWidth={1} />
        </mesh>

        {/* Inner decorative ring */}
        <mesh position={[0, 0, 0.01]}>
          <torusGeometry args={[0.68, 0.025, 8, 48]} />
          <meshBasicMaterial color="white" transparent opacity={0.45} />
        </mesh>

        {/* Medal face */}
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[0.77, 48]} />
          <meshBasicMaterial color="#f0f0f0" transparent opacity={0.12} />
        </mesh>

        {/* Honor text */}
        <Text
          font="./soria-font.ttf"
          fontSize={0.175}
          color="black"
          maxWidth={1.15}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0.08]}
          lineHeight={1.3}>
          {honor}
        </Text>
      </group>
    </group>
  );
};

const HonorsMedals = () => {
  const medals = useMemo(() => {
    const count = HONORS.length;
    const fov = Math.PI;
    return HONORS.map((honor, i) => {
      const angle = (fov / (count - 1)) * i;
      const x = -ARC_RADIUS * Math.cos(angle);
      const z = -ARC_RADIUS * Math.sin(angle);
      const rotY = Math.PI / 2 - angle;
      return { honor, x, z, rotY };
    });
  }, []);

  return (
    <group rotation={[0, -Math.PI / 12, 0]}>
      {medals.map(({ honor, x, z, rotY }, i) => (
        <Medal
          key={i}
          honor={honor}
          position={[x, ARC_Y, z]}
          rotY={rotY}
          delay={0.3 + i * 0.1}
        />
      ))}
    </group>
  );
};

export default HonorsMedals;
