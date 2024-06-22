import { useRef, useEffect } from 'react';
import { OrbitControls, AdaptiveDpr } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { usePathname, useRouter } from 'next/navigation';

interface ControlsProps {
    rotate: boolean;
}

const Controls: React.FC<ControlsProps> = ({ rotate }) => {
    const { camera, gl } = useThree();
    const controls = useRef<any>(null);
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        if (controls.current) {
            controls.current.maxDistance = 5;
            controls.current.minDistance = 5; 
            controls.current.maxPolarAngle = Math.PI / 2;
            controls.current.minPolarAngle = Math.PI / 2;
            controls.current.enableDamping = true; 
            controls.current.autoRotateSpeed = 2;
            controls.current.dampingFactor = 0.1; 
        }
    }, []);

    useFrame(() => {
        const angle = controls.current.getAzimuthalAngle();

        if (angle > Math.PI / 4 && angle < 3 * Math.PI / 4) {
            if (pathname !== '/Projects')
                router.push ('/Projects');
        }
        else if (angle > 3 * Math.PI / 4 || angle < -3 * Math.PI / 4) {
            if (pathname !== '/About')
                router.push('/About');
        }
        else if (angle > -3 * Math.PI / 4 && angle < -Math.PI / 4) {
            if (pathname !== '/Contact')
                router.push('/Contact');
        }
        else {
            if (pathname !== '/')
                router.push ('/');
        }
    });


    useEffect(() => {   
        // Activez ou désactivez l'autorotation en fonction de la propriété 'rotate'
        controls.current.autoRotate = null;
    }, [rotate]);

    return (
        <>
            <OrbitControls ref={controls} args={[camera, gl.domElement]} />
            <AdaptiveDpr />
        </>
    );
};

export default Controls;
