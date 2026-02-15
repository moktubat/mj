'use client';

import styled from "styled-components";
import About from "@/components/page/Home/About";
import Hero from "@/components/page/Home/Hero";
import Experiences from "@/components/page/Home/Experiences";
import Process from "@/components/page/Home/Process";
import Projects from "@/components/page/Home/Projects";
import Services from "@/components/page/Home/Services";
import Skills from "@/components/page/Home/Skills";
import UnderLine from "@/components/UnderLine";
import Testimonials from "@/components/page/Home/Testimonial";

const PageWrapper = styled.div`
  background-color: #d9d9d9;
  position: relative;
  z-index: 10;
  
  /* Premium shadow effect as content overlaps footer */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  /* Smooth transition when scrolling */
  transition: transform 0.3s ease-out;
`;

const page = () => {
  return (
    <PageWrapper>
      <Hero />
      <About />
      <UnderLine />
      <Services />
      <Projects />
      <Skills />
      <UnderLine />
      <Experiences />
      <Process />
      <Testimonials />
    </PageWrapper>
  );
};

export default page;