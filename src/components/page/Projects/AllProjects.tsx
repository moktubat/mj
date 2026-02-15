"use client";

import { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FONT } from "@/styles/font";
import { breakpoints } from "@/styles/breakpoints";
import ProjectCard from "@/components/common/ProjectCard";
import projectsData from "@/components/common/projects.data";

gsap.registerPlugin(ScrollTrigger);

/* ================= STYLED COMPONENTS ================= */
const Section = styled.section`
  padding: 100px 10px;
  background: #d9d9d9;

  @media (max-width: ${breakpoints.md}) {
    padding: 80px 10px;
  }

  @media (max-width: ${breakpoints.sm}) {
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
  margin-bottom: 60px;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Title = styled.h1`
  color: #1e1e1e;
  font-size: 96px;
  font-family: ${FONT.alphaLyrae};
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1.1;
  transform: scaleX(0.96);
  transform-origin: left;
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.md}) {
    font-size: 72px;
  }

  @media (max-width: ${breakpoints.sm}) {
    font-size: 48px;
  }
`;

const Subtitle = styled.p`
  color: #ff5948;
  font-size: 20px;
  font-family: ${FONT.oktaNeue};

  @media (max-width: ${breakpoints.sm}) {
    font-size: 18px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: ${breakpoints.sm}) {
    gap: 16px;
  }
`;

/* ================= COMPONENT ================= */
const AllProjects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

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

            gsap.from(subtitleRef.current, {
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

    return (
        <Section ref={sectionRef}>
            <Container>
                <IntroSection>
                    <Title ref={titleRef}>
                        All Projects ({projectsData.length.toString().padStart(2, "0")})
                    </Title>
                    <Subtitle ref={subtitleRef}>[Portfolio Showcase]</Subtitle>
                </IntroSection>

                <Grid>
                    {projectsData.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </Grid>
            </Container>
        </Section>
    );
};

export default AllProjects;
