'use client';

import About from "@/components/page/Home/About";
import Hero from "@/components/page/Home/Hero";
import Jobs from "@/components/page/Home/Jobs";
import Process from "@/components/page/Home/Process";
import Projects from "@/components/page/Home/Projects";
import Service from "@/components/page/Home/Service";
import Services from "@/components/page/Home/Services";
import Skills from "@/components/page/Home/Skills";
import Testimonial from "@/components/page/Home/Testimonial";

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services /> 
      <Service /> 
      <Projects />
      <Skills />
      <Jobs />
      <Process />
      <Testimonial />
    </div>
  );
};

export default page;