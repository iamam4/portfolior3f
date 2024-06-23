import Link from "next/link";


interface CardProps  {
    id: number;
    title: string;
    description: string;
    link: string;
}


interface Props {
    id: number;
}


const cards: CardProps[] = [
    {
        id: 1,
        title: 'Welcome to my Portfolio',
        description: 'Welcome to my portfolio, I am a student in computer science. I am passionate about web development and 3D design.',
        link : '',
    },
    {
        id: 2,
        title: 'Projects',
        description: 'Discover my projects and my collaborations.',
        link: '/Projects/Group',
    },
    {
        id: 3,
        title: 'About me',
        description: 'Learn more about me and my skills.',
        link : '',
    },
    {
        id: 4,
        title: 'Contact',
        description: 'You can contact me for any project or collaboration with the links available just below.',
        link : '',
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
            <Link href={card.link} className="mt-6 text-indigo-600 hover:underline">
              Click here
            </Link>
          )}
        </div>
      </div>
      
    );
};


export default Cards;

