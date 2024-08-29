'use client'
import '../globals.css';
import { blacktitilium, lighttitilium } from "../ui/fonts";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SkeletonCard from './../ui/SkeletonCard';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';




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
        title: 'Bubble',
        category: 'design - concept - animation - 3D',
        link: '/Projects/Discover/bubble',
        images: [{ src: '/bubble-v1.png', alt: 'Bubble' }]
    },
    {
        id: 5,
        title: 'Silmo',
        category: 'design - concept - animation - 3D',
        link: '/Projects/Discover/silmo',
        images: [{ src: '/silmo.png', alt: 'Silmo' }]

    },
    {
        id: 6,
        title: '0147',
        category: 'design - concept - animation -3D',
        link: '/Projects/Discover/0147',
        images: [{ src: '/0147.png', alt: '0147' }]
    },
    {
        id: 7,
        title: 'Former Portfolio',
        category: 'web - design - development',
        link: '/Projects/Discover/former-portfolio',
        images: [{ src: '/portfolio.png', alt: 'Portfolio' }]

    },
    {
        id: 8,
        title: 'Stavkirke',
        category: 'web - design - development - 3D',
        link: '/Projects/Discover/stavkirke',
        images: [{ src: '/stavkirke.png', alt: 'Stavkirke' }]

    },
    {
        id: 9,
        title: 'SkullzCity',
        category: 'design - concept - 3D',
        link: '/Projects/Discover/skullzcity',
        images: [{ src: '/skullz.jpg', alt: 'SkullzCity' }]
    }
];


const ProjectsCards = () => {

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

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

                    {isLoading ? Array.from({ length: 9 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    )) :
                        cards.map((card) => (
                            
                            <Link key={card.id} href={card.link}>
                                <div className="group relative flex flex-col cursor-pointer rounded-lg">

                                    <Image
                                        src={card.images[0].src}
                                        alt={card.images[0].alt}
                                        width={3024}
                                        height={1644}
                                        objectFit='cover'
                                        className='w-full h-auto rounded-lg'
                                    />
                                    <div className='pt-2'>
                                        <p className={`${lighttitilium.className} antialiased text-violet-400 uppercase text-sm items-center`}>{card.category}</p>
                                        <p className={`${blacktitilium.className} antialiased text-white text-xl`}>{card.title}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );

}


export default ProjectsCards;