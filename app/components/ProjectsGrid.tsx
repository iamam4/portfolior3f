'use client'

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";



interface ImageProps {
    src: string;
    alt: string;
}

interface VideoProps {
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
    video: VideoProps[]
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
        video: []
    },
    {
        id: 2,
        title: 'Dashboard | School Management',
        description: 'For a trimester project, I developed a dashboard to manage my school\'s open day. The dashboard is user-friendly and responsive. It provides clear visitor statistics through detailed graphs and charts. Features include an expandable and collapsible sidebar, searchable and filterable data lists, and a secure system for administrators. Administrators can customize the dashboard\'s appearance with themes and adjust chart settings as needed. It also includes a dark mode. This project allowed me to enhance my skills in data management and project handling.',
        techno : [{ src: '/logo/angular.png', alt: 'Angular', width: 16, height: 16 }, { src: '/logo/typescript.svg', alt: 'TypeScript', width: 16, height: 16 }, { src: '/logo/php.svg', alt: 'PHP', width: 20, height: 20 }, { src: '/logo/sql.svg', alt: 'SQL', width: 16, height: 16 }],
        images : [{src: '/jpo-dashboard.png', alt: 'Dashboard'}, {src: '/dashboard/jpo-dashboard-dark.png', alt: 'Dashboard'}, {src: '/dashboard/charts-light.png', alt: 'Charts'}, {src : '/dashboard/list-light.png', alt: 'List'},{src: '/dashboard/charts-dark.png', alt:'Charts'}, {src: '/dashboard/list-dark.png', alt : 'List'}, {src: '/dashboard/settings.jpg', alt: 'Settings'}, {src: '/dashboard/mobile-light.jpg', alt: 'Mobile'}, {src: '/dashboard/mobile-dark.jpg', alt: 'Mobile'}],
        video : []
    },
    {
        id: 6,
        title: '0147 | Sunglasses',
        description: 'This project is a short 3D video realisation of a sun glasses model. The goal was to create a realistic and dynamic video to showcase the product. The video was created using Blender and rendered with Cycles. The model was created from scratch and the textures were hand painted. The video was edited with Adobe Premiere Pro.',
        techno: [{ src: '/logo/blender.png', alt: 'Blender', width: 18, height: 16 }, { src: '/logo/premiere.svg', alt: 'Premiere Pro', width: 16, height: 16 }],
        images: [],
        video: [{ src: '/0147/0147.mp4', alt: '0147' }]
    },
    {
        id: 3,
        title: 'Work in progress ...',
        description: '',
        techno: [],
        images: [],
        video: []
    },
    {
        id: 4,
        title: 'Technical monitoring',
        description: 'I stay informed through social networks and documentation related to the various technologies I work with.',
        techno: [{ src: '/logo/next.svg', alt: 'Next.js', width: 16, height: 16 }, { src: '/logo/angular.png', alt: 'Angular', width: 16, height: 16 }, { src: '/logo/react.webp', alt: 'React Three Fiber', width: 16, height: 16 }, { src: '/logo/three.png', alt: 'Three.js', width: 16, height: 16 }],
        images: [],
        video: []
    },
    {
        id: 9,
        title: 'SkullzCity',
        description: 'During my first-year internship for the Bachelor\'s degree in Multimedia and Internet Professions, I completed a 3D modeling and animation project using Blender, where I created a virtual city based on 2D plans. Over 140 hours, I faithfully recreated an entire city, including buildings, infrastructure, and roads, applying textures throughout. This project allowed me to develop advanced 3D modeling and animation skills while enhancing my ability to manage a complex project from start to finish.',
        techno: [{ src: '/logo/blender.png', alt: 'Blender', width: 18, height: 16 }],
        images: [{ src: '/skullzcity/skullz.jpg', alt: 'SkullzCity' }, { src: '/skullzcity/skullznight.jpg', alt: 'SkullzCity Night' }, { src: '/skullzcity/skullzsunset.jpg', alt: 'SkullzCity Sunset' }, { src: '/skullzcity/croquis_city.jpg', alt: 'Croquis' }, { src: '/skullzcity/parliamentz-nuit.jpg', alt: 'Parliamentz Nuit' }, { src: '/skullzcity/port.jpg', alt: 'Port' }, { src: '/skullzcity/pub_nuit.png', alt: 'Pub Nuit' }],
        video: []

    }
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
                <div className="flex justify-center w-full items-center pb-10">
                    <Link href={"/Projects/Discover"}>
                    <button className=" relative flex items-center px-5 py-3 bg-slate-950 border-[1.5px] border-violet-950/50 rounded-full text-base  cursor-pointer hover:bg-slate-900/60 transition-all duration-300 text-white">
                        <span data-glow="true" className="ui_glowing_borders"></span>
                        <span>Other Projects</span>
                    </button>
                    </Link>
                </div>

                {project.video.map((video, index) => (
                    <div key={index} className="w-1/2">
                        <video
                            src={video.src}
                            title={video.alt}
                            controls
                            loop
                            className="object-cover w-full h-full rounded-lg cursor-pointer"
                        />
                    </div>
                ))}



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
