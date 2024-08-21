import ProjectsCards from '../../../components/ProjectsCards';
import '../../../globals.css';




export default function Detailed() {
    return (

        <div className='p-16 min-h-screen'>
            <ProjectsCards />
            <div className="flex justify-center w-full items-center pb-10">
                <button className=" relative flex items-center px-5 py-3 bg-slate-950 border-[1.5px] border-violet-950/50 rounded-full text-base  cursor-pointer hover:bg-slate-900/60 transition-all duration-300 text-white">
                    <span data-glow="true" className="ui_glowing_borders"></span>
                    <span>Other Projects</span>
                </button>
            </div>
        </div>
    );
}




