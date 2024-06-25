import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { titilium } from "./ui/fonts";
import Model from "./components/Model";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" >
      <body className={`${titilium.className} antialiased`}>
        <Navbar />
        <div className="flex w-screen h-screen bg-gray-950 select-none">
        <Model   id="three-root" className={"flex w-full h-full justify-center items-center "}/>
        {children}
        </div>
      </body>
    </html>
  );
}
