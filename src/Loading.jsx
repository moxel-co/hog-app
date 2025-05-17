import { useRef } from 'react' 
import { useFrame } from '@react-three/fiber'
import { Html, ContactShadows, OrbitControls, DeviceOrientationControls, useGLTF } from '@react-three/drei'
import { isMobile } from 'react-device-detect'
import React, { useState, useEffect, useTransition } from 'react';

export default function Loading() {
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(0);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        let rafId;
        const updateProgress = () => {
            progressRef.current += 1;
            
            if (progressRef.current <= 100) {
                setProgress(progressRef.current);
                rafId = requestAnimationFrame(updateProgress);
            }
        };

        startTransition(() => {
            rafId = requestAnimationFrame(updateProgress);
        });

        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, []);

    const safeProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <Html center>
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#242424]">
                <div className="relative w-64 h-64">
                    <img
                        src="/hammer-on-guitar.png"
                        alt="Loading"
                        className="w-full h-full"
                        style={{
                            filter: 'grayscale(100%)',
                            opacity: 0.5,
                        }}
                    />
                    <img
                        src="/hammer-on-guitar.png"
                        alt="Loading"
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            clipPath: `polygon(0 ${100 - safeProgress}%, 100% ${100 - safeProgress}%, 100% 100%, 0 100%)`,
                        }}
                    />
                </div>
                <div className="mt-4 text-white font-medium text-center">
                    <div>Loading</div>
                    <div>{safeProgress}%</div>
                </div>
            </div>
        </Html>
    );
}