"use client";

import styled from "styled-components";
import { FONT } from "@/styles/font";
import DesignIcon from "@/assets/DesignIcon.svg";
import DevelopIcon from "@/assets/DevelopIcon.svg";
import DiscoverIcon from "@/assets/DiscoverIcon.svg";
import IdeateIcon from "@/assets/IdeateIcon.svg";
import LaunchIcon from "@/assets/LaunchIcon.svg";
import ResearchIcon from "@/assets/ResearchIcon.svg";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* STYLES */

const Section = styled.section`
  padding: 80px 10px;
  background: black;
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

// ----------------- Transient props -----------------

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

  will-change: transform;
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
  const bubblesRef = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !bubblesRef.current.includes(el)) {
      bubblesRef.current.push(el);
    }
  };

  useEffect(() => {
    const bubbles = bubblesRef.current;

    /* ---------------- Entrance ---------------- */
    gsap.fromTo(
      bubbles,
      { opacity: 0, scale: 0.85, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
      }
    );

    /* ---------------- Floating ---------------- */
    bubbles.forEach((bubble, i) => {
      gsap.to(bubble, {
        y: `+=${10 + i * 2}`,
        duration: 4 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* -------- Magnetic Cursor Interaction -------- */
      const strength = 0.25;

      const onMouseMove = (e: MouseEvent) => {
        const rect = bubble.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(bubble, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(bubble, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      const onMouseEnter = () => {
        gsap.to(bubble, {
          scale: 1.08,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      bubble.addEventListener("mousemove", onMouseMove);
      bubble.addEventListener("mouseenter", onMouseEnter);
      bubble.addEventListener("mouseleave", onMouseLeave);
    });
  }, []);

  return (
    <Section>
      <Container>
        <IntroSection>
          <SubTitle>My Development Process</SubTitle>
          <Title>[Working Process]</Title>
        </IntroSection>

        <GraphWrap>
          <Bubble ref={addToRefs} $w={620} $h={620} $bg="#0D0D0D" $z={10} $x={-190} $y={-320}>
            <DesignIcon width={24} height={24} />
            <StepTitle>Design</StepTitle>
            <p style={{ color: "white", fontSize: 14, lineHeight: "20px", maxWidth: 230 }}>
              Create wireframes, prototypes, and visual interfaces.
            </p>
          </Bubble>

          <Bubble ref={addToRefs} $w={358} $h={358} $bg="#FF5948" $z={20} $x={-500} $y={-120}>
            <ResearchIcon width={24} height={24} />
            <StepTitle>Research</StepTitle>
            <StepDesc $top $left={50}>
              Analyze market trends, competitors, and industry insights.
            </StepDesc>
          </Bubble>

          <Bubble
            ref={addToRefs}
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
            ref={addToRefs}
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

          <Bubble ref={addToRefs} $w={288} $h={288} $bg="#FF5948" $z={20} $x={222} $y={34}>
            <DevelopIcon width={24} height={24} />
            <StepTitle>Develop</StepTitle>
            <StepDescWide $left={90} style={{ textAlign: "right" }}>
              Build responsive, scalable, and <br /> high-performance digital products.
            </StepDescWide>
          </Bubble>

          <Bubble
            ref={addToRefs}
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
