'use client';

import { Line, Svg, Text, useCursor, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { FOOTER_LINKS } from "../../constants";
import { FooterLink } from "../../types";

const GlobeLogo = ({
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) => {
  const s = isMobile ? 0.3 : 0.38;

  const outerCircle = useMemo(() =>
    Array.from({ length: 65 }, (_, i) => {
      const a = (i / 64) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * s, Math.sin(a) * s, 0);
    }), [s]);

  const meridian1 = useMemo(() =>
    Array.from({ length: 65 }, (_, i) => {
      const a = (i / 64) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * s * 0.32, Math.sin(a) * s, 0);
    }), [s]);


  const equator = useMemo(() =>
    Array.from({ length: 65 }, (_, i) => {
      const a = (i / 64) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * s, Math.sin(a) * s * 0.27 - s * 0.07, 0);
    }), [s]);

  return (
    <group
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      position={[0, 0, 0]}>
      {/* Invisible hit area covering the full globe */}
      <mesh>
        <circleGeometry args={[s * 1.1, 48]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Line points={outerCircle} color="white" lineWidth={1.8} />
      <Line points={meridian1} color="white" lineWidth={1.5} />
      <Line
        points={equator}
        color="white"
        lineWidth={1.3}
        dashed
        dashSize={s * 0.18}
        gapSize={s * 0.12}
      />
    </group>
  );
};

const FooterLinkItem = ({ link }: { link: FooterLink }) => {
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const onPointerOver = () => setHovered(true);
  const onPointerOut = () => setHovered(false);
  const onClick = () =>
    link.url === '/'
      ? window.scrollTo({ top: 0, behavior: 'smooth' })
      : window.open(link.url, '_blank');
  const onPointerMove = (e: MouseEvent) => {
    if (isMobile) return;
    const hoverDiv = document.getElementById(`footer-link-${link.name}`);
    gsap.to(hoverDiv, {
      top: `${e.clientY + 14}px`,
      left: `${e.clientX}px`,
      duration: 0.6,
    });
  };

  const fontProps = {
    font: "./Vercetti-Regular.woff",
    fontSize: 0.2,
    color: 'white',
    onPointerOver,
    onPointerMove,
    onPointerOut,
    onClick,
  };

  useEffect(() => {
    if (!document.getElementById(`footer-link-${link.name}`)) {
      const hoverDiv = document.createElement('div');
      hoverDiv.id = `footer-link-${link.name}`;
      hoverDiv.textContent = link.hoverText ?? link.name.toUpperCase();
      hoverDiv.style.position = 'fixed';
      hoverDiv.style.zIndex = '2';
      hoverDiv.style.bottom = '0';
      hoverDiv.style.opacity = '0';
      hoverDiv.style.left = window.innerWidth / 2 + 'px';
      hoverDiv.style.fontSize = '0.8rem';
      hoverDiv.style.pointerEvents = 'none';
      document.body.appendChild(hoverDiv);
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const hoverDiv = document.getElementById(`footer-link-${link.name}`);

    if (hovered) {
      gsap.fromTo(hoverDiv, { opacity: 0 }, { opacity: 0.5, delay: 0.2 });
    } else {
      gsap.to(hoverDiv, { opacity: 0 });
    }

    if (!link.isLogo) {
      gsap.to(textRef.current, {
        letterSpacing: hovered ? 0.3 : 0,
        duration: 0.3,
      });
    }

    return () => {
      gsap.killTweensOf(hoverDiv);
      gsap.killTweensOf(textRef.current);
    };
  }, [hovered]);

  useCursor(hovered);

  if (link.isLogo) {
    return (
      <GlobeLogo
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      />
    );
  }

  if (isMobile) {
    return (
      <Svg
        onClick={onClick}
        scale={0.0015}
        position={[0.1, 0.25, 0]}
        src={link.icon}
      />
    );
  }

  return (
    <Text ref={textRef} {...fontProps}>
      {link.name.toUpperCase()}
    </Text>
  );
};

const Footer = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame(() => {
    const d = data.range(0.8, 0.2);
    if (groupRef.current) {
      groupRef.current.visible = d > 0;
    }
  });

  const count = FOOTER_LINKS.length;
  const spacing = isMobile ? 1.1 : 2;
  const offset = -((count - 1) * spacing) / 2;

  const getLinks = () => {
    return FOOTER_LINKS.map((link, i) => (
      <group key={i} position={[i * spacing, 0, 0]}>
        <FooterLinkItem link={link} />
      </group>
    ));
  };

  return (
    <group position={[0, -44, 18]} rotation={[-Math.PI / 2, 0, 0]} ref={groupRef}>
      <group position={[offset, 0, 0]}>
        {getLinks()}
      </group>
    </group>
  );
};

export default Footer;
