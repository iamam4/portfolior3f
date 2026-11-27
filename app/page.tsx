import Hero from './components/portfolio/Hero';
import Lab from './components/portfolio/Lab';
import Expertise from './components/portfolio/Expertise';
import About from './components/portfolio/About';
import Projects from './components/portfolio/Projects';
import Contact from './components/portfolio/Contact';

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Lab />
      <Expertise />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}


