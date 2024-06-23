import Link from "next/link";
import { useEffect } from "react";
import { FaBehanceSquare, FaGithub } from "react-icons/fa";

const Navbar = () => {

    // const links = [
    //     {
    //         id: 1,
    //         link: "Projects",
    //         path: "/Projects",
    //     },
    //     {
    //         id: 2,
    //         link: "About",
    //         path: "/About",
    //     },
    //     {
    //         id: 3,
    //         link: "Contact",
    //         path: "/Contact",
    //     },
    // ];


    return (
        <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 border-slate-50/[0.06] supports-backdrop-blur:bg-white/60 dark:bg-transparent">
            <div className="max-w-8xl mx-auto">
                <div className="py-4 border-b border-slate-300/10 px-4">
                    <div className="flex w-full items-center justify-between">  
                          <h1 className="text-slate-200 ">Alexandre</h1>
                        <div className=" flex flex-row">
                            {/* {links.map(({ id, link, path }) => (
                                <div
                                    key={id}
                                    className="px-4 cursor-pointer font-medium text-slate-200  hover:text-indigo-500 "
                                >
                                    <Link href={path}>{link}</Link>
                                </div>
                            ))} */}
                             <div className="px-4 ml-3 border-l border-slate-300/10">

                             <a href="https://www.behance.net/alexandremoreau8/" target="_blank" rel="noreferrer" className="text-slate-200 hover:text-indigo-500"><FaBehanceSquare className=" text-2xl text-slate-400 hover:text-slate-200 cursor-pointer ml-2"/></a>
                                

                                
                            </div>
                            <div className="px-4">
                            <a href="https://github.com/iamam4" target="_blank" rel="noreferrer" className="text-slate-200 hover:text-indigo-500"><FaGithub className=" text-2xl text-slate-400 hover:text-slate-200 cursor-pointer" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;