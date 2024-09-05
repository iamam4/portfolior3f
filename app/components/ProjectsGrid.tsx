'use client'

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

interface ImageProps {
    src: string;
    alt: string;
}


interface TechnoProps {
    src: string;
    alt: string;
    width: number;
    height: number;

}

interface GridProps {
    id: number;
    title: string;
    description: string;
    techno: TechnoProps[];
    images: ImageProps[],
    link : string,
}

interface Props {
    id: number;
}

const projects: GridProps[] = [

    {
        id: 1,
        title: 'School Open Day | Website and Virtual Tour',
        description: 'This website was developed for my school\'s open day and complements the dashboard featured on my projects page. It offers an immmersive 3D classroom tour where users can navigate freely, a comprehensive FAQ section, a video presentation, and registration form, among other features. Like the dashboard, this website was created as part of a school trimester project. Through this endeavor, I honed my design skills and gained valuable experience in crafting a user-friendly interface.',
        techno: [{ src: '/logo/angular.png', alt: 'Angular', width: 16, height: 16 }, { src: '/logo/typescript.svg', alt: 'TypeScript', width: 16, height: 16 }, { src: '/logo/three.png', alt: 'ThreeJs', width: 16, height: 16 }, { src: '/logo/php.svg', alt: 'PHP', width: 20, height: 20 }, { src: '/logo/sql.svg', alt: 'SQL', width: 16, height: 16 }],
        images: [{ src: '/jpo-homepage.png', alt: 'JPO' }, { src: '/jpo-website/butmmi.png', alt: 'butmmi' }, { src: '/jpo-website/prog.png', alt: 'Programme' }, { src: '/jpo-website/faq.png', alt: 'FAQ' }, { src: '/jpo-website/registration.png', alt: 'Inscription' }, { src: '/jpo-website/home-vt.png', alt: 'Virtual Tour' }, { src: '/jpo-website/vt.png', alt: 'Virtual Tour' }, { src: '/jpo-website/prog-vt.png', alt: 'Programme' }, { src: '/jpo-website/interaction.png ', alt: 'Interaction' }],
        link : '',
    },
    {
        id: 2,
        title: 'Scool Open Day | Dashboard',
        description: 'For a trimester project, I developed a dashboard to manage my school\'s open day. The dashboard is user-friendly and responsive. It provides clear visitor statistics through detailed graphs and charts. Features include an expandable and collapsible sidebar, searchable and filterable data lists, and a secure system for administrators. Administrators can customize the dashboard\'s appearance with themes and adjust chart settings as needed. It also includes a dark mode. This project allowed me to enhance my skills in data management and project handling.',
        techno: [{ src: '/logo/angular.png', alt: 'Angular', width: 16, height: 16 }, { src: '/logo/typescript.svg', alt: 'TypeScript', width: 16, height: 16 }, { src: '/logo/php.svg', alt: 'PHP', width: 20, height: 20 }, { src: '/logo/sql.svg', alt: 'SQL', width: 16, height: 16 }],
        images: [{ src: '/jpo-dashboard.png', alt: 'Dashboard' }, { src: '/dashboard/jpo-dashboard-dark.png', alt: 'Dashboard' }, { src: '/dashboard/charts-light.png', alt: 'Charts' }, { src: '/dashboard/list-light.png', alt: 'List' }, { src: '/dashboard/charts-dark.png', alt: 'Charts' }, { src: '/dashboard/list-dark.png', alt: 'List' }, { src: '/dashboard/settings.jpg', alt: 'Settings' }, { src: '/dashboard/mobile-light.jpg', alt: 'Mobile' }, { src: '/dashboard/mobile-dark.jpg', alt: 'Mobile' }],
        link : '',
    },
    {
        id: 3,
        title: 'E-commerce Symfony',
        description: 'In this project, I developed a simplified e-commerce application for selling products. I implemented an interface that allows users to list products with their photos, descriptions, and prices. Users can add items to a cart, which I manage within a session. I also created a product management page where users can modify, delete, or add products. This project allowed me to work on essential features such as product display, cart management, and navigation between the application\'s pages.',
        techno: [{ src: '/logo/symfony.svg', alt: 'Symfony', width: 16, height: 16 }, { src: '/logo/php.svg', alt: 'PHP', width: 20, height: 20 }, { src: '/logo/sql.svg', alt: 'SQL', width: 16, height: 16 }],
        images: [{ src: '/symfony.png', alt: 'Symfony' }, { src: '/symfony/admin.png', alt: 'Admin' }, { src: '/symfony/signup.png', alt: 'SignUp' }, { src: '/symfony/login.png', alt: 'LogIn' }, { src: '/symfony/modif.png', alt: 'Modif' }],
        link : '',
    },
    {
        id: 4,
        title: 'Stavkirke',
        description: 'In this project, I created a detailed 3D model of a traditional Stavkirke church using Blender and integrated it into a web application with Three.js. The application features two distinct pages. The first page showcases a rotating globe that spins endlessly, with a blinking indicator highlighting the clickable area. When users click on this area, they are redirected to the Stavkirke church page. On this second page, users can interact with the scene by toggling the light on and off using a button, switching the wood texture from light to dark, and revealing a description of the object by clicking on "croix001" within the 3D model. All animations, from the globe\'s rotation to the interactions with the church, were implemented exclusively using Three.js, creating an immersive and interactive experience.',
        techno: [{ src: '/logo/blender.png', alt: 'Blender', width: 18, height: 16 }, { src: '/logo/three.png', alt: 'ThreeJs', width: 16, height: 16 }],
        images: [{src: '/stavkirke.png', alt: 'Stavkirke'}, {src: '/stavkirke/darkstav.png', alt: 'DarkStav'}, {src : '/stavkirke/easter.png', alt: 'Easter'}],
        link : 'https://stavkirke.000webhostapp.com/',

    },
    {
        id: 5,
        title: 'Clock',
        description: 'In this project, I developed a web application using Angular and Three.js to create an interactive 3D clock. The clock is synchronized with the current time, with real-time animations representing the hours, minutes, and seconds. Users can interact with the application to customize the appearance of the clock, including changing the color of the frame and the background. This project allowed me to explore the capabilities of Three.js for 3D graphics creation while integrating these features within an Angular environment, ensuring a responsive and intuitive user interface.',
        techno: [{ src: '/logo/angular.png', alt: 'Angular', width: 16, height: 16 }, { src: '/logo/typescript.svg', alt: 'TypeScript', width: 16, height: 16 }, { src: '/logo/three.png', alt: 'ThreeJs', width: 16, height: 16 }],
        images: [{ src: '/clock.png', alt: 'Clock' }, { src: '/clock/cadre.png', alt: 'Cadre' }, { src: '/clock/background.png', alt: 'Background' }],
        link : 'https://sae501clock.netlify.app',
    },


];

const ProjectsGrid = (props: Props) => {
    const [modal, setModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const project = projects.find((project) => project.id === props.id);

    const openModal = useCallback((image: ImageProps) => {
        if (!project) return;
        const index = project.images.findIndex((img) => img.src === image.src);
        setSelectedImage(image);
        setCurrentIndex(index);
        setModal(true);
        document.body.style.overflow = 'hidden';
    }, [project]);

    const closeModal = useCallback(() => {
        setSelectedImage(null);
        setCurrentIndex(null);
        setModal(false);
    }, []);

    const handleModalClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const nextImage = useCallback(() => {
        if (currentIndex === null || !project) return;
        const nextIndex = (currentIndex + 1) % project.images.length;
        setSelectedImage(project.images[nextIndex]);
        setCurrentIndex(nextIndex);
    }, [currentIndex, project]);

    const prevImage = useCallback(() => {
        if (currentIndex === null || !project) return;
        const prevIndex = (currentIndex - 1 + project.images.length) % project.images.length;
        setSelectedImage(project.images[prevIndex]);
        setCurrentIndex(prevIndex);
    }, [currentIndex, project]);

    useEffect(() => {
        if (modal) {
            document.body.style.overflow = 'hidden';
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'ArrowRight') {
                    nextImage();
                } else if (event.key === 'ArrowLeft') {
                    prevImage();
                } else if (event.key === 'Escape') {
                    closeModal();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            document.body.style.overflow = '';
        }
    }, [modal, nextImage, prevImage, closeModal]);

    if (!project) {
        return null;
    }

    return (
        <div className="flex w-full p-6 sm:p-16">
            <div className="flex flex-col justify-center items-center w-full">
                <h1 className="text-4xl font-black text-white text-center">{project.title}</h1>
                <div className='flex justify-center w-full p-8'>
                    <div className="w-full md:w-1/2 mt-2 h-0.5 bg-gradient-to-r from-slate-950 from-49% via-violet-400 via-50% to-slate-950 to-100%"></div>
                </div>
                {project.techno.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center ">
                        {project.techno.map((image, index) => (
                            <div key={index} className="flex items-center justify-center px-2 py-1 rounded-lg bg-indigo-950 border border-indigo-600 select-none">
                                <div className="flex gap-2">
                                    <p className="text-xs font-medium text-white">{image.alt}</p>
                                    <Image src={image.src} width={image.width} height={image.width} alt={image.alt} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="w-3/4 text-justify pt-10">
                    <p className="text-sm sm:text-lg text-white">{project.description}</p>
                </div>
                {project.link.length > 0 && (
                    <Link href={project.link} target="_blank" className="flex flex-row w-full justify-center pt-10 text-sm sm:text-lg text-violet-400">
                        <div className=" hover:text-violet-300 flex flex-row items-center ">
                            <div className="underline">Website here</div>
                            <div>
                                <FiExternalLink className="ml-2" />
                            </div>
                        </div>
                    </Link>
                )}

                <div className="grid grid-cols-4 gap-4 p-10 sm:p-20">
                    {project.images.map((image, index) => (
                        <div
                            key={index}
                            className={`
                                ${index === 0 ? 'col-span-4 row-span-2' : ''} 
                                ${index === 1 ? 'col-span-2 row-span-1' : ''} 
                                ${index === 2 ? 'col-span-2 row-span-1' : ''} 
                                ${index === 3 ? 'col-span-2 row-span-1' : ''} 
                                ${index === 4 ? 'col-span-2 row-span-1' : ''} 
                                ${index === 5 ? 'col-span-2 row-span-2' : ''} 
                                ${index === 6 ? 'col-span-2 row-span-2' : ''} 
                                ${index === 7 ? 'col-span-2 row-span-1' : ''} 
                                ${index === 8 ? 'col-span-2 row-span-1' : ''}
                            `}
                        >
                            <Image
                                src={image.src}
                                width={3024}
                                height={1890}
                                alt={image.alt}
                                className="object-cover w-full h-full rounded-lg cursor-pointer"
                                onClick={() => openModal(image)}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center w-full items-center py-10">
                    <Link href={"/Projects/Discover"}>
                        <button className=" relative flex items-center px-5 py-3 bg-slate-950 border-[1.5px] border-violet-950/50 rounded-full text-base  cursor-pointer hover:bg-slate-900/60 transition-all duration-300 text-white">
                            <span data-glow="true" className="ui_glowing_borders"></span>
                            <span>Other Projects</span>
                        </button>
                    </Link>
                </div>

                {modal && selectedImage && (
                    <div className="fixed flex items-center justify-center left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-screen h-screen bg-black/70 z-[900] backdrop-blur-[2px]" onClick={closeModal}>
                        <button className="sm:p-4">
                            <IoIosArrowRoundBack className="text-white text-5xl" onClick={(e) => { e.stopPropagation(); prevImage(); }} />
                        </button>
                        <div className="relative  lg:w-5/6 lg:h-5/6 z-[1000] " onClick={handleModalClick} >
                            <Image
                                src={selectedImage.src}
                                width={3024}
                                height={1980}
                                alt={selectedImage.alt}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <button className="sm:p-4">
                            <IoIosArrowRoundForward className="text-white text-5xl" onClick={(e) => { e.stopPropagation(); nextImage(); }} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsGrid;
