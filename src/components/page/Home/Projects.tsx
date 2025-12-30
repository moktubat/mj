"use client";

import { useRef, useState } from "react";
import styled from "styled-components";

/* ------------------------------------
   DATA
------------------------------------ */

const projects = [
  {
    id: 1,
    title: "PTI DEVELOPMENT",
    description:
      "A curated collection of digital products built for SaaS, FinTech, and fast-growing startups, focused on performance, clarity, and scalable design systems.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["WordPress", "React", "JavaScript"],
  },
  {
    id: 2,
    title: "EUROCHAMP",
    description:
      "An enterprise-grade web platform designed for European clients, delivering reliability, clean architecture, and a seamless experience across devices.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Next.js", "TypeScript"],
  },
  {
    id: 3,
    title: "JAMROLL LIMITED",
    description:
      "A brand-driven digital experience crafted to highlight identity, motion, and storytelling through refined UI, smooth animations, and modern frontend tools.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    tags: ["React", "GSAP"],
  },
];

/* ------------------------------------
   STYLES
------------------------------------ */

const ProjectsSection = styled.section<{ bg: string }>`
  height: 950px;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: background-image 0.6s ease-in-out;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(2, 4, 17, 0.3);
  backdrop-filter: blur(12.5px);
  -webkit-backdrop-filter: blur(12.5px);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 165px 0;
`;

const ScrollTrack = styled.div`
  height: ${projects.length * 100}vh;
  position: relative;
`;

const ProjectsContainer = styled.div`
  height: 100vh;
  max-width: 1320px;
  margin: 0 auto;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Side = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SideTitle = styled.span`
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  transition: opacity 0.4s ease-in-out;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  max-width: 220px;
  width: 100%;
  background: repeating-linear-gradient(
    to right,
    rgba(255, 255, 255, 0.3) 0,
    rgba(255, 255, 255, 0.3) 12px,
    transparent 12px,
    transparent 20px
  );
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const SectionLabel = styled.p`
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 20px;
  font-weight: 400;
`;

const Title = styled.h2`
  margin-top: 36px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 64px;
  font-weight: 500;
  line-height: 72px;
  text-transform: uppercase;
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
`;

const Description = styled.p`
  margin-top: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 20px;
  transition: opacity 0.4s ease-in-out;
`;

const ImageWrap = styled.div`
  margin: 40px auto 0;
  width: 644px;
  height: 480px;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  overflow: hidden;
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Tags = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: center;
  gap: 10px;
  transition: opacity 0.4s ease-in-out;
`;

const Tag = styled.span`
  background: #fff;
  color: #727e83;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 99px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  svg {
    display: block;
  }
`;

/* ------------------------------------
   SVG ICONS
------------------------------------ */

const PrevArrow = () => (
  <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
    <path
      d="M1 3.15385C1 1.96431 1.96431 1 3.15385 1H29C44.464 1 57 13.536 57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29V3.15385Z"
      fill="#FFEEED"
      stroke="#FF5948"
      strokeWidth="2"
      strokeDasharray="4 6"
    />
    <path
      d="M34 34L24 24M24 24V34M24 24H34"
      stroke="#FF5948"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const NextArrow = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <path
      d="M0 28C0 12.536 12.536 0 28 0H53.8462C55.0357 0 56 0.96431 56 2.15385V28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z"
      fill="#FF5948"
    />
    <path
      d="M23 33L33 23M33 23H23M33 23V33"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ------------------------------------
   COMPONENT
------------------------------------ */

export default function Projects() {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive(prev => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive(prev => (prev === projects.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const prev = active === 0 ? projects[projects.length - 1] : projects[active - 1];
  const next = active === projects.length - 1 ? projects[0] : projects[active + 1];
  const project = projects[active];

  return (
    <ProjectsSection bg={project.image}>
      <ScrollTrack>
        <Overlay />
        <Content>
          <ProjectsContainer>
            {/* LEFT */}
            <Side>
              <SideTitle key={`prev-${prev.id}`} style={{ opacity: isTransitioning ? 0 : 1 }}>
                {prev.title}
              </SideTitle>
              <Divider />
              <ArrowButton onClick={handlePrev} aria-label="Previous project">
                <PrevArrow />
              </ArrowButton>
            </Side>

            {/* CENTER */}
            <Center>
              <SectionLabel>[Projects]</SectionLabel>
              <Title
                key={`title-${project.id}`}
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
                }}
              >
                {project.title}
              </Title>
              <Description
                key={`desc-${project.id}`}
                style={{ opacity: isTransitioning ? 0 : 1 }}
              >
                {project.description}
              </Description>

              <ImageWrap
                key={`img-${project.id}`}
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                <ProjectImage src={project.image} alt={project.title} />
              </ImageWrap>

              <Tags
                key={`tags-${project.id}`}
                style={{ opacity: isTransitioning ? 0 : 1 }}
              >
                {project.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            </Center>

            {/* RIGHT */}
            <Side style={{ alignItems: "flex-end" }}>
              <SideTitle key={`next-${next.id}`} style={{ opacity: isTransitioning ? 0 : 1 }}>
                {next.title}
              </SideTitle>
              <Divider />
              <ArrowButton onClick={handleNext} aria-label="Next project">
                <NextArrow />
              </ArrowButton>
            </Side>
          </ProjectsContainer>
        </Content>
      </ScrollTrack>
    </ProjectsSection>
  );
}