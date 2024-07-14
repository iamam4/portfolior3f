'use client'


import "./globals.css";
import Navbar from "./components/Navbar";
import { titilium } from "./ui/fonts";
import Model from "./components/Model";
import Footer from "./components/Footer";
import { Suspense, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [path, setPath] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

 const onlyModel = pathname === '/' || pathname === '/Projects' || pathname === '/Contact' || pathname === '/Technical-monitoring'; 


  return (
    <html lang="en" >
      <body className={`${titilium.className} antialiased`}>
        <Navbar setPath={setPath} />
        {!onlyModel && (
          <div className="bg-slate-950">
            {children}
          </div>
          )}
        {onlyModel && (
          <div className="flex flex-col w-screen h-screen bg-slate-950 lg:flex-row ">
            <Model path={path} navigate={router} location={pathname} id="three-root" className={"flex w-full h-full justify-center items-center "} />
            <AnimatePresence mode="wait" initial={false} >
              {children}
            </AnimatePresence>
          </div>
        )}
        {!onlyModel && (
          <Footer />
        )}

      </body>
    </html>
  );
}
