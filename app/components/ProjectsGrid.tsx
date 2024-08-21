'use client'

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";



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
        title: '0147 | Sunglasses',
        description: 'This project is a short 3D video realisation of a sun glasses model. The goal was to create a realistic and dynamic video to showcase the product. The video was created using Blender and rendered with Cycles. The model was created from scratch and the textures were hand painted. The video was edited with Adobe Premiere Pro.',
        techno: [{ src: '/logo/blender.png', alt: 'Blender', width: 18, height: 16 }, { src: '/logo/premiere.svg', alt: 'Premiere Pro', width: 16, height: 16 }],
        images: [],
        video: [{ src: '/0147/0147.mp4', alt: '0147' }]
    },
    {
        id: 3,
        title: 'Contact',
        description: 'You can contact me for any project or collaboration with the links available just below.',
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

    const nextProject = useCallback(() => {
        if (currentIndex === null || !project) return;
        const nextIndex = (currentIndex + 1) % project.images.length;
        setSelectedImage(project.images[nextIndex]);
        setCurrentIndex(nextIndex);
    }, [currentIndex, project]);

    const prevProject = useCallback(() => {
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
                    nextProject();
                } else if (event.key === 'ArrowLeft') {
                    prevProject();
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
    }, [modal, nextProject, prevProject, closeModal]);

    if (!project) {
        return null;
    }

    return (
        <div className="flex w-full p-16">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-black text-white text-center">{project.title}</h1>
                <div className='flex justify-center w-full p-8'>
                    <div className="w-full md:w-1/2 mt-2 h-0.5 bg-gradient-to-r from-slate-950 from-49% via-violet-400 via-50% to-slate-950 to-100%"></div>
                </div>
                {project.techno.length > 0 && (
                    <div className="flex flex-wrap gap-2 ">
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
                    <p className="text-lg text-white">{project.description}</p>
                </div>

                <div className="grid grid-cols-4 gap-4 p-20">
                    {project.images.map((image,  index) => (
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
                        <button className="p-4">
                            <IoIosArrowRoundBack className="text-white text-5xl" onClick={(e) => { e.stopPropagation(); prevProject(); }} />
                        </button>
                        <div className="relative mx-10" onClick={handleModalClick}>
                            <Image
                                src={selectedImage.src}
                                width={1400}
                                height={933}
                                alt={selectedImage.alt}
                            />
                        </div>
                        <button className="p-4">
                            <IoIosArrowRoundForward className="text-white text-5xl" onClick={(e) => { e.stopPropagation(); nextProject(); }} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsGrid;
