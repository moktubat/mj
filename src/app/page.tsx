'use client';

import About from "@/components/page/Home/About";
import Experiences from "@/components/page/Home/Experiences";
import Hero from "@/components/page/Home/Hero";
import Process from "@/components/page/Home/Process";
import Projects from "@/components/page/Home/Projects";
import Services from "@/components/page/Home/Services";
import Skills from "@/components/page/Home/Skills";
import Testimonial from "@/components/page/Home/Testimonial";

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Experiences />
      <Process />
      <Testimonial />
    </div>
  );
};

export default page;