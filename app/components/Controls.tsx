import { useRef, useEffect } from 'react';
import { OrbitControls, AdaptiveDpr } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

interface ControlsProps {
    rotate: boolean;
}

const Controls: React.FC<ControlsProps> = ({ rotate }) => {
    const { camera, gl } = useThree();
    const controls = useRef<any>(null);

    useEffect(() => {
        if (controls.current) {
            controls.current.maxDistance = 3.5;
            controls.current.minDistance = 3.5; 
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
            if (window.location.pathname !== '/Projects')
                window.location.href = '/Projects';
        }
        else if (angle > 3 * Math.PI / 4 || angle < -3 * Math.PI / 4) {
            if (window.location.pathname !== '/About')
                window.location.href = '/About';
        }
        else if (angle > -3 * Math.PI / 4 && angle < -Math.PI / 4) {
            if (window.location.pathname !== '/Contact')
                window.location.href = '/Contact';
        }
        else {
            if (window.location.pathname !== '/')
                window.location.href = '/';
        }
    });

    useEffect(() => {
        // Ajustez les paramètres de caméra et de contrôles en fonction de l'URL actuelle
        switch (window.location.pathname) {
            case '/Projects':
                controls.current.setAzimuthalAngle(Math.PI / 2);
                break;
            case '/About':
                controls.current.setAzimuthalAngle(Math.PI);
                break;
            case '/Contact':
                controls.current.setAzimuthalAngle(3 * Math.PI / 2);
                break;
            default:
                controls.current.setAzimuthalAngle(0);
                break;
        }
        controls.current.autoRotate = window.location.pathname === '/';
    }, []);

    useEffect(() => {
        // Activez ou désactivez l'autorotation en fonction de la propriété 'rotate'
        controls.current.autoRotate = rotate;
    }, [rotate]);

    return (
        <>
            <OrbitControls ref={controls} args={[camera, gl.domElement]} />
            <AdaptiveDpr />
        </>
    );
};

export default Controls;
