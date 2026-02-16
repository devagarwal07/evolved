"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function BrainSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
        if (materialRef.current) {
            materialRef.current.distort = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
            <mesh ref={meshRef} scale={2.2}>
                <icosahedronGeometry args={[1, 12]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#7C3AED"
                    emissive="#4C1D95"
                    emissiveIntensity={0.6}
                    roughness={0.2}
                    metalness={0.8}
                    distort={0.3}
                    speed={2}
                    transparent
                    opacity={0.85}
                />
            </mesh>
            {/* Inner glow core */}
            <mesh scale={1.4}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#00D4FF"
                    transparent
                    opacity={0.15}
                />
            </mesh>
        </Float>
    );
}

function OrbitalRings() {
    const ringRef1 = useRef<THREE.Mesh>(null);
    const ringRef2 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (ringRef1.current) {
            ringRef1.current.rotation.z = t * 0.3;
            ringRef1.current.rotation.x = Math.PI * 0.3;
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.z = -t * 0.2;
            ringRef2.current.rotation.x = Math.PI * 0.6;
        }
    });

    return (
        <>
            <mesh ref={ringRef1}>
                <torusGeometry args={[3.2, 0.02, 16, 100]} />
                <meshBasicMaterial color="#7C3AED" transparent opacity={0.4} />
            </mesh>
            <mesh ref={ringRef2}>
                <torusGeometry args={[3.6, 0.015, 16, 100]} />
                <meshBasicMaterial color="#00D4FF" transparent opacity={0.25} />
            </mesh>
        </>
    );
}

function FloatingParticles() {
    const count = 200;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 3 + Math.random() * 2;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#00D4FF"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

export function FloatingBrain() {
    return (
        <div className="w-full h-[450px] relative">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 45 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1} color="#7C3AED" />
                <directionalLight position={[-5, -3, 3]} intensity={0.5} color="#00D4FF" />
                <pointLight position={[0, 0, 4]} intensity={2} color="#7C3AED" distance={10} />
                <BrainSphere />
                <OrbitalRings />
                <FloatingParticles />
            </Canvas>
            {/* Glow overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/15 rounded-full blur-[80px]" />
            </div>
        </div>
    );
}
