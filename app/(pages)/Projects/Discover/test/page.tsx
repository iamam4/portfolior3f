import IconCloud from "../../../../ui/IconCloud";

const slugs = [
    "html5",
    "css3",
    "typescript",
    "javascript",
    "php",
    "mysql",
    "react",
    "threedotjs",
    "nodedotjs",
    "nextdotjs",
    'angular',
    "vue-dot-js",
    "tailwindcss",
    "postgresql",
    "vercel",
    "git",
    "github",
    "gitlab",
    "blender",
];

export default function IconCloudDemo() {
    return (
        <div className="flex flex-col w-full justify-center ">
            <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:75px_75px]"></div>
            <div className="relative flex h-full w-full  items-center justify-center overflow-hidden bg-background px-20 pb-20">
                <IconCloud iconSlugs={slugs} />
            </div>
        </div>
    );
}

