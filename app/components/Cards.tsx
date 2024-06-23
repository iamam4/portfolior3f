import Link from "next/link";
import Image from "next/image";


interface ImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;

}

interface CardProps {
    id: number;
    title: string;
    description: string;
    link: string;
    images: ImageProps[]
}


interface Props {
    id: number;
}


const cards: CardProps[] = [
    {
        id: 1,
        title: 'Welcome to my Portfolio',
        description: 'Welcome to my portfolio, I am a student in computer science. I am passionate about web development and 3D design.',
        link: '',
        images: [{ src: '/next.svg', alt: 'Next.js', width: 16, height: 16 }, { src: '/react.webp', alt: 'React Three Fiber',width: 16, height: 16 }]
    },
    {
        id: 2,
        title: 'Projects',
        description: 'Discover my projects and my collaborations.',
        link: '/Projects/Group',
        images: []
    },
    {
        id: 3,
        title: 'Contact',
        description: 'You can contact me for any project or collaboration with the links available just below.',
        link: '',
        images: []
    },
    {
        id: 4,
        title: 'Technical monitoring',
        description: 'I stay informed through social networks and documentation related to the various technologies I work with.',
        link: '',
        images: [{src: '/blender.png', alt: 'Blender', width: 16, height: 16 },{ src: '/next.svg', alt: 'Next.js', width: 16, height: 16 }, { src: '/react.webp', alt: 'React Three Fiber', width: 16, height: 16 }, { src: '/three.png', alt: 'Three.js', width: 16, height: 16 }]
    },


];

const Cards = (props: Props) => {

    const card = cards.find((card) => card.id === props.id);

    if (!card) {
        return <div>Card not found</div>;
    }

    return (
        <div className="relative flex flex-col p-4 w-[35rem] h-[16rem] border-2 border-slate-500 rounded">
            {/* Background Div */}
            <div className="absolute inset-0 z-1 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                <p className="p-4 text-gray-300 flex-grow">{card.description}</p>
                {card.link && (
                    <Link href={'https://www.behance.net/alexandremoreau8/'} target="_blank" className="mt-6 text-indigo-600 hover:text-indigo-400">
                         <p className="">Click here </p>
                    </Link>
                )}


                {card.images.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {card.images.map((image, index) => (
                            <div key={index} className="flex items-center justify-center px-2 py-1 rounded-lg bg-indigo-950 border border-indigo-600 select-none">
                                <div className="flex gap-2">
                                    <p className="text-xs font-medium text-white">{image.alt}</p>
                                    <Image src={image.src} width={image.width} height={image.width} alt={image.alt} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {card.id == 3 &&(


                    <div className="flex  gap-2">
                        
                        <div className="flex items-center justify-center px-2 py-1 rounded-lg bg-teal-900 border border-teal-600 select-none">
                        <Link href={"mailto:amoreau77181@gmail.com"} >
                            <p className="text-xs font-medium text-white">Contact me</p>
                        </Link>
                        </div>
                        <div className="flex items-center justify-center px-2 py-1 rounded-lg bg-teal-900 border border-teal-600 select-none">
                        <Link href={"/cv.pdf"} >
                            <p className="text-xs font-medium text-white">My resume</p>
                        </Link>
                        </div>
                    </div>

                )
                }
            </div>
        </div>
    );
}


export default Cards;

