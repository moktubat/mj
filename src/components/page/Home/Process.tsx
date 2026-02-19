"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FONT } from "@/styles/font";
import DesignIcon from "@/assets/DesignIcon.svg";
import DevelopIcon from "@/assets/DevelopIcon.svg";
import DiscoverIcon from "@/assets/DiscoverIcon.svg";
import IdeateIcon from "@/assets/IdeateIcon.svg";
import LaunchIcon from "@/assets/LaunchIcon.svg";
import ResearchIcon from "@/assets/ResearchIcon.svg";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* STYLES */

const Section = styled.section`
  padding: 80px 10px;
  background: #1e1e1e;
  overflow: hidden;
  font-family: ${FONT.oktaNeue};
`;

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  position: relative;
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

const GraphWrap = styled.div`
  position: relative;
  width: 100%;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: scale(0.4);
  transform-origin: top;
  transition: transform 0.3s ease;

  @media (min-width: 768px) {
    height: 500px;
    transform: scale(0.75);
  }

  @media (min-width: 1024px) {
    height: 800px;
    margin-top: -60px;
    transform: scale(1);
    transform-origin: center;
  }
`;

const Bubble = styled.div<{
  $w: number;
  $h: number;
  $bg: string;
  $z: number;
  $x: number;
  $y: number;
}>`
  position: absolute;
  width: ${({ $w }) => $w}px;
  height: ${({ $h }) => $h}px;

  background: ${({ $bg }) => $bg};
  border-radius: 50%;

  left: 50%;
  top: 50%;

  margin-left: ${({ $x }) => $x}px;
  margin-top: ${({ $y }) => $y}px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;

  z-index: ${({ $z }) => $z};

  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: filter 0.3s ease;
  will-change: transform;

  &:hover {
    filter: brightness(1.1);
  }
`;

const StepTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  font-family: ${FONT.oktaNeue};
  line-height: 28px;
`;

const StepDesc = styled.p<{ $top?: boolean; $left?: number }>`
  position: absolute;

  ${({ $top }) =>
    $top ? "bottom: 100%; margin-bottom: 20px;" : "top: 100%; margin-top: 20px;"}

  ${({ $left }) => ($left !== undefined ? `left: ${$left}%` : "")};
  transform: ${({ $left }) => ($left !== undefined ? "translateX(-50%)" : "")};

  width: 230px;
  text-align: left;

  color: #fff;
  font-size: 14px;
  font-family: ${FONT.oktaNeue};
  line-height: 20px;
`;

const StepDescWide = styled(StepDesc)`
  width: 250px;
`;

/* COMPONENT */

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title and label on scroll
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

      // Animate bubbles with stagger effect
      const bubbles = bubblesRef.current.filter(Boolean);

      gsap.set(bubbles, {
        scale: 0,
        opacity: 0,
        rotation: -180,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: graphRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Staggered bubble animation with elastic effect
      timeline.to(bubbles, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "random",
        },
        ease: "elastic.out(1, 0.6)",
      });

      // Animate descriptions with fade-in
      const descriptions = bubbles.map((bubble) =>
        bubble?.querySelector('[class*="StepDesc"]')
      ).filter(Boolean);

      gsap.set(descriptions, { opacity: 0, y: 20 });

      timeline.to(
        descriptions,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Add smooth floating animation to bubbles
      bubbles.forEach((bubble, index) => {
        gsap.to(bubble, {
          y: "+=12",
          duration: 3 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
          force3D: true,
          transformPerspective: 1000,
        });
      });

      // Interactive hover effects
      bubbles.forEach((bubble) => {
        if (!bubble) return;

        bubble.addEventListener("mouseenter", () => {
          gsap.to(bubble, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
            force3D: true,
          });
        });

        bubble.addEventListener("mouseleave", () => {
          gsap.to(bubble, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            force3D: true,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <Container>
        <IntroSection>
          <SubTitle ref={titleRef}>My Development Process</SubTitle>
          <Title ref={labelRef}>[Working Process]</Title>
        </IntroSection>

        <GraphWrap ref={graphRef}>
          <Bubble
            ref={(el) => { bubblesRef.current[0] = el; }}
            $w={620}
            $h={620}
            $bg="#0D0D0D"
            $z={10}
            $x={-190}
            $y={-320}
          >
            <DesignIcon width={24} height={24} />
            <StepTitle>Design</StepTitle>
            <p style={{ color: "white", fontSize: 14, lineHeight: "20px", maxWidth: 230 }}>
              Create wireframes, prototypes, and visual interfaces.
            </p>
          </Bubble>

          <Bubble
            ref={(el) => { bubblesRef.current[1] = el; }}
            $w={358}
            $h={358}
            $bg="#FF5948"
            $z={20}
            $x={-500}
            $y={-120}
          >
            <ResearchIcon width={24} height={24} />
            <StepTitle>Research</StepTitle>
            <StepDesc $top $left={50}>
              Analyze market trends, competitors, and industry insights.
            </StepDesc>
          </Bubble>

          <Bubble
            ref={(el) => { bubblesRef.current[2] = el; }}
            $w={252}
            $h={252}
            $bg="rgba(255, 255, 255, 0.1)"
            style={{ backdropFilter: "blur(7.5px)" }}
            $z={30}
            $x={-655}
            $y={10}
          >
            <DiscoverIcon width={24} height={24} />
            <StepTitle>Discover</StepTitle>
            <StepDesc>
              Understand client goals, and project requirements.
            </StepDesc>
          </Bubble>

          <Bubble
            ref={(el) => { bubblesRef.current[3] = el; }}
            $w={260}
            $h={260}
            $bg="rgba(23, 23, 23, 0.5)"
            style={{ backdropFilter: "blur(7.5px)" }}
            $z={40}
            $x={-210}
            $y={30}
          >
            <IdeateIcon width={24} height={24} />
            <StepTitle>Ideate</StepTitle>
            <StepDesc>
              Brainstorm creative solutions and design concepts collaboratively.
            </StepDesc>
          </Bubble>

          <Bubble
            ref={(el) => { bubblesRef.current[4] = el; }}
            $w={288}
            $h={288}
            $bg="#FF5948"
            $z={20}
            $x={222}
            $y={34}
          >
            <DevelopIcon width={24} height={24} />
            <StepTitle>Develop</StepTitle>
            <StepDescWide $left={90} style={{ textAlign: "right" }}>
              Build responsive, scalable, and <br /> high-performance digital products.
            </StepDescWide>
          </Bubble>

          <Bubble
            ref={(el) => { bubblesRef.current[5] = el; }}
            $w={240}
            $h={240}
            $bg="rgba(255,255,255,0.1)"
            style={{ backdropFilter: "blur(7.5px)" }}
            $z={30}
            $x={415}
            $y={-80}
          >
            <LaunchIcon width={24} height={24} />
            <StepTitle>Launch</StepTitle>
            <StepDescWide $top $left={50} style={{ textAlign: "right" }}>
              Deploy solutions and continuously improve based on feedback.
            </StepDescWide>
          </Bubble>
        </GraphWrap>
      </Container>
    </Section>
  );
};

export default Process;