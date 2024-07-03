'use client'


import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { titilium } from "./ui/fonts";
import Model from "./components/Model";
import { useState } from "react";
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

  
  return (
    <html lang="en" >
      <body className={`${titilium.className} antialiased`}>
        <Navbar setPath={setPath}  />
        <div className="flex w-screen h-screen bg-gray-950 select-none">
        <Model path={path} navigate={router} location={pathname}  id="three-root" className={"flex w-full h-full justify-center items-center "}/>
        {children}
        </div>
      </body>
    </html>
  );
}
