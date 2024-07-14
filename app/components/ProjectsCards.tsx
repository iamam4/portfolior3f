import Image from 'next/image';
import { div } from 'three/examples/jsm/nodes/Nodes.js';

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
        title: 'BUBBLE',
        category: 'design • video • 3D',
        link: '',
        images: [{ src: '/1.png', alt: 'Bubble' }]
    },
    {
        id: 2,
        title: 'TEST',
        category: 'Design 3D',
        link: '',
        images: [{ src: '/1.png', alt: 'Bubli' }]
    },
    {
        id: 3,
        title: 'TEST',
        category: 'Web Development',
        link: '',
        images: [{ src: '/1.png', alt: 'Bubli' }]
    },
    {
        id: 4,
        title: 'TEST',
        category: 'Web Development',
        link: '',
        images: [{ src: '/1.png', alt: 'Bubli' }]

    }
]


const ProjectsCards = () => {


    return (

        <div className='p-16 min-h-screen'>

            <div className='flex justify-center'>
                <h1 className='text-white text-4xl '> Discover my projects</h1>
            </div>
            
              <div className='flex justify-center w-full'>
              <div className="w-full md:w-1/2 mt-12 h-0.5 bg-gradient-to-r from-slate-950 from-49% via-violet-400 via-50% to-slate-950 to-100%"></div>
              </div>
                

            <div className=' p-20'>
                <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card) => (
                        <div key={card.id} className=" relative flex flex-col overflow-hidden ">
                            <Image
                                src={card.images[0].src}
                                alt={card.images[0].alt}
                                width={3000}
                                height={3000}
                                className='w-full h-auto rounded-lg'

                            />
                            <div>
                                <p className='text-white text-sm'>{card.category}</p>
                                <p className='text-white text-xl'>{card.title}</p>

                            </div>
                        </div>
                    ))}
                    <div>

                    </div>
                </div>
            </div>

        </div>
    );

}


export default ProjectsCards;