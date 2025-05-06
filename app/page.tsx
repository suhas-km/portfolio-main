// Import components using our new structure
import {
  About,
  Contact,
  Experience,
  Intro,
  Projects,
  Research,
  SectionDivider,
  Skills
} from "@/components";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Research />
      <Skills />
      <Contact />
    </main>
  );
}
