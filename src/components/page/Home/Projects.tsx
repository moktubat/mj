"use client";

import { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { breakpoints } from "@/styles/breakpoints";
import ProjectCard from "@/components/common/ProjectCard";
import { projectsData } from "@/components/common/projects.data";
import { Project } from "@/types/project";
import { FONT } from "@/styles/font";

gsap.registerPlugin(ScrollTrigger, SplitText);


/* ================= STYLED COMPONENTS ================= */
const Section = styled.section`
  padding: 100px 10px;
  background: #1e1e1e;
  overflow: hidden;

  @media ${breakpoints.md} {
    padding: 80px 10px;
  }

  @media ${breakpoints.sm} {
    padding: 60px 10px;
  }
`;

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

const IntroSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const SubTitle = styled.h2`
  color: white;
  font-size: 48px;
  font-family: ${FONT.alphaLyrae};
  font-weight: 500;
  text-transform: uppercase;
  line-height: 56px;
  transform: scaleX(0.96);
  transform-origin: left;

  @media (min-width: 768px) {
    font-size: 72px;
    line-height: 84px;
  }
`;

const Title = styled.p`
  color: #ff5948;
  font-size: 20px;
  font-family: ${FONT.oktaNeue};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${breakpoints.sm}) {
    gap: 0.75rem;
    padding: 0 0.75rem;
  }
`;


/* ================= COMPONENT ================= */
const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(labelRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  const projectsToShow: Project[] = projectsData.slice(0, 4);

  return (
    <Section ref={sectionRef}>
      <Container>
        <IntroSection>
          <SubTitle ref={titleRef}>Selected Projects</SubTitle>
          <Title ref={labelRef}>[Case Studies]</Title>
        </IntroSection>

        <Grid>
          {projectsToShow.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Projects;