import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";



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
        description: 'I am a student in computer science. I am passionate about web development and 3D design.',
        link: '',
        images: [{ src: '/logo/next.svg', alt: 'Next.js', width: 16, height: 16 }, { src: '/logo/react.webp', alt: 'React Three Fiber', width: 16, height: 16 }, { src: '/logo/tailwind.svg', alt: 'Tailwind CSS', width: 16, height: 16 }]
    },
    {
        id: 2,
        title: 'Projects',
        description: 'Discover my projects and my collaborations.',
        link: '/Projects/Detailed',
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
        images: [{ src: '/logo/next.svg', alt: 'Next.js', width: 16, height: 16 }, { src: '/logo/angular.png', alt: 'Angular', width: 16, height: 16 }, { src: '/logo/react.webp', alt: 'React Three Fiber', width: 16, height: 16 }, { src: '/logo/three.png', alt: 'Three.js', width: 16, height: 16 }]},


];

const Cards = (props: Props) => {

    const card = cards.find((card) => card.id === props.id);

    if (!card) {
        return <div>Card not found</div>;
    }

    return (
        
        <div className="relative flex flex-col p-4 w-[30rem] h-[13rem] border border-slate-500 rounded-lg">
            {/* Background Div */}
            <div className="z-0 absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
            {/* Content */}
            <motion.div
            initial={{ opacity: 0 , translateY: 10}}
            animate={{ opacity: 1, translateY: 0}}
            exit={{ opacity: 0 , translateY: 10}}
            transition={{
                 duration: 0.4,
                 delay: 0.2
                 }}
          
            className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                <p className="p-4 text-gray-300 flex-grow">{card.description}</p>
                {card.link && (
                    <Link href={card.link}  className="mt-6 text-violet-400 hover:text-violet-300">
                        <p className="">Click here </p>
                    </Link>
                )}


                {card.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 ">
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
                {card.id == 3 && (


                    <div className="flex gap-2">

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
            </motion.div>
        </div>

    );
}


export default Cards;

