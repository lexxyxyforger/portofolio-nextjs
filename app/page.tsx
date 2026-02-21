import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Certificates } from "@/components/sections/Certificates";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Certificates />
      <Testimonials />
      <GithubActivity />
      <Blog />
      <Contact />
    </>
  );
}
