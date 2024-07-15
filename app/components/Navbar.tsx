import Link from "next/link";
import { FaBehanceSquare, FaGithub } from "react-icons/fa";


interface NavbarProps {
    setPath: (path: string) => void;
}


const Navbar: React.FC<NavbarProps> = ({ setPath }) => {


    const links = [
        {
            id: 1,
            link: "Alexandre",
            path: "/",
        },
        {
            id: 2,
            link: "Projects",
            path: "/Projects",
        },
        {
            id: 3,
            link: "Technical monitoring",
            path: "/Technical-monitoring",
        },
        {
            id: 4,
            link: "Contact",
            path: "/Contact",
        },
    ];

    


    return (
        <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors border-b duration-500 border-slate-50/[0.06] bg-slate-600/15 ">
        <div className="max-w-8xl mx-auto">
                <div className="py-4 px-4">
                    <div className="flex w-full items-center justify-between">
                        {links.map(({ id, link, path }) => (
                            id === 1 && (
                                <Link key={id} onClick={() => setPath(path)}  href={path}>
                                    <h1 className="text-slate-200 ">{link}</h1>
                                </Link>
                            )
                        ))}

                        <div className=" flex flex-row">
                            {links.map(({ id, link, path }) => (
                                id !== 1 && (
                                    <div
                                        key={id}
                                        className="px-4 cursor-pointer font-medium text-slate-200 hover:text-violet-400"
                                    >
                                        <Link onClick={() => setPath(path)} href={path}>
                                            {link}
                                        </Link>
                                    </div>
                                )
                            ))}
                            <div className="px-4 ml-3 border-l border-slate-300/10">

                                <a href="https://www.behance.net/alexandremoreau8/" target="_blank" rel="noreferrer" className="text-slate-200 hover:text-violet-400"><FaBehanceSquare className=" text-2xl text-slate-400 hover:text-slate-200 cursor-pointer ml-2" /></a>



                            </div>
                            <div className="px-4">
                                <a href="https://github.com/iamam4" target="_blank" rel="noreferrer" className="text-slate-200 hover:text-violet-400"><FaGithub className=" text-2xl text-slate-400 hover:text-slate-200 cursor-pointer" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;