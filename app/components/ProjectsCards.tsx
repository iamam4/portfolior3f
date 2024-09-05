'use client'
import '../globals.css';
import { blacktitilium, lighttitilium } from "../ui/fonts";
import Image from 'next/image';
import Link from 'next/link';


interface ProjectsImageProps {
    src: string;
    alt: string;
}


interface CardProjectsProps {
    id: number;
    title: string;
    category: string;
    link: string;
    images: ProjectsImageProps[]
}



const cards: CardProjectsProps[] = [
    {
        id: 1,
        title: 'School Open Day | Website and Virtual Tour',
        category: 'web - design - development - 3D',
        link: '/Projects/Discover/jpo-web',
        images: [{ src: '/jpo-homepage.png', alt: 'JPO' }]
    },
    {
        id: 2,
        title: 'School Open Day | Dashboard',
        category: 'web - development - back-end',
        link: '/Projects/Discover/jpo-dashboard',
        images: [{ src: '/jpo-dashboard.png', alt: 'Dashboard' }]
    },
    {
        id: 3,
        title: 'E-Commerce Symfony',
        category: 'web - development - back-end',
        link: '/Projects/Discover/symfony',
        images: [{ src: '/symfony.png', alt: 'Symfony' }]
    },
    {
        id: 4,
        title: 'Stavkirke',
        category: 'web - design - development - 3D',
        link: '/Projects/Discover/stavkirke',
        images: [{ src: '/stavkirke.png', alt: 'Stavkirke' }]

    },
    {
        id: 5,
        title: 'Clock',
        category: 'web - development - 3D',
        link: '/Projects/Discover/clock',
        images: [{ src: '/clock.png', alt: 'Clock' }]
    }

];


const ProjectsCards = () => {

    return (


        <div>
            <div className='flex w-full justify-center'>
                <div className="atom">
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                    <div className="line line3"></div>
                </div>
            </div>
            <div className='flex justify-center p-8'>
                <h1 className={'text-white text-2xl uppercase font-bold'}> Discover my projects</h1>
            </div>
            <div className='flex justify-center w-full'>
                <div className="w-full md:w-1/2 mt-2 h-0.5 bg-gradient-to-r from-slate-950 from-49% via-violet-400 via-50% to-slate-950 to-100%"></div>
            </div>

            <div className='p-5 sm:p-20'>
                
                <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
                    

                    {
                        cards.map((card) => (
                            
                            <Link key={card.id} href={card.link}>
                                <div className="group relative flex flex-col cursor-pointer rounded-lg">
                                    <Image
                                        src={card.images[0].src}
                                        alt={card.images[0].alt}
                                        width={3024}
                                        height={1644}
                                        objectFit='cover'
                                        className='w-full h-auto rounded-lg group-hover:shadow-ps group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 '
                                    />
                                    <div className='pt-2'>
                                        <p className={`${lighttitilium.className} antialiased text-violet-400 uppercase text-sm items-center`}>{card.category}</p>
                                        <p className={`${blacktitilium.className} antialiased text-white text-xl`}>{card.title}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
                <div className="flex justify-center w-full items-center pt-10">
                    <Link href={"https://www.behance.net/alexandremoreau8/"} target='_blank'>
                    <button className=" relative flex items-center px-5 py-3 bg-slate-950 border-[1.5px] border-violet-950/50 rounded-full text-base  cursor-pointer hover:bg-slate-900/60 transition-all duration-300 text-white">
                        <span data-glow="true" className="ui_glowing_borders"></span>
                        <span>3D Creations</span>
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );

}


export default ProjectsCards;