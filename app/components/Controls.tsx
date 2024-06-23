import { useRef, useEffect } from 'react';
import { OrbitControls, AdaptiveDpr } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { usePathname, useRouter } from 'next/navigation';

interface ControlsProps {
    rotate: boolean;
    path: string;

}


const Controls: React.FC<ControlsProps> = ({ rotate, path }) => {
    const controls = useRef<any>(null);
    const router = useRouter();
    const pathname = usePathname();

    const controlsSettings= () => {
       
            controls.current.maxDistance = 5;
            controls.current.minDistance = 5; 
            controls.current.maxPolarAngle = Math.PI / 2.1;
            controls.current.minPolarAngle = Math.PI / 2.1;
            controls.current.autoRotateSpeed *= -1;
            controls.current.dampingFactor = 0.1; 
            controls.current.enablePan = false

        
        if (window.innerWidth < 1.75 * window.innerHeight) {
            controls.current.maxDistance = 7;
            controls.current.minDistance = 7;
         
        }
        

    };

    useEffect(() => {
        controlsSettings()
        const handleResize = () => {
            controlsSettings()
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
        if (path === '/Projects')
            controls.current.setAzimuthalAngle(Math.PI / 2)
        else if (path === '/About')
            controls.current.setAzimuthalAngle(Math.PI)
        else if (path === '/Contact')
            controls.current.setAzimuthalAngle(3 * Math.PI / 2)
        else
            controls.current.setAzimuthalAngle(0)

        controls.current.autoRotate = false
    }, [path])

    
    useEffect(() => {   
        controls.current.autoRotate = rotate;
    }, [rotate]);



    return (
        <>
            <OrbitControls ref={controls} />
            <AdaptiveDpr />
        </>
    );
};

export default Controls;
