"use client";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import {
  JavaScriptBubble,
  NextJsBubble,
  MongoDBBubble,
  WordPressBubble,
  GitHubBubble,
  TypeScriptBubble,
  PrismaBubble,
  NodeJsBubble,
  ElementorBubble,
  PostgreSQLBubble,
  DockerBubble,
  ReactJsBubble,
} from "@/components/common/skillsBubbles";
import { FONT } from "@/styles/font";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- STYLED COMPONENTS ---------------- */
const Section = styled.section`
  background: #e7e7e7;
  padding: 100px 10px 70px 10px;
`;

const Container = styled.main`
  max-width: 1320px;
  margin: 0 auto;
  position: relative;
  height: 740px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleX(0.95);
  font-family: ${FONT.alphaLyrae};
  font-size: 52px;
  font-weight: 500;
  line-height: 48px;
  text-transform: uppercase;
  text-align: center;

  span:first-child {
    color: #ff5948;
  }
  span:last-child {
    color: #1e1e1e;
  }

  @media (max-width: 768px) {
    font-size: 40px;
    line-height: 38px;
  }
`;

const Bubble = styled.figure`
  position: absolute;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05) !important;
    z-index: 10;
  }

  svg {
    display: block;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
    transition: fill 0.4s ease;
  }

  /* JavaScript - Yellow */
  &.js:hover svg > path:first-child {
    fill: #EFD81D;
  }
  &.js:hover svg > path:nth-child(2) {
    fill: #000000;
  }

  /* Next.js - Black */
  &.next:hover svg > path:first-child {
    fill: #000000;
  }
  &.next:hover svg defs linearGradient stop {
    stop-color: #FFFFFF;
  }

  /* React - Cyan */
  &.react:hover svg > path:first-child {
    fill: #212121;
  }
  &.react:hover svg > path:last-child {
    fill: #61DAFB;
  }

  /* Node.js - Green */
  &.node:hover svg > path:first-child {
    fill: #333333;
  }
  &.node:hover svg > path:nth-child(2) {
    fill: #68A558;
  }

  /* MongoDB - Green */
  &.mongo:hover svg > path:first-child {
    fill: #001D2A;
  }
  &.mongo:hover svg > path:nth-child(3) {
    fill: #00ED64;
  }
  &.mongo:hover svg > path:nth-child(4) {
    fill: #00ED64;
  }

  /* TypeScript - Blue */
  &.ts:hover svg > path:first-child {
    fill: #2D79C7;
  }
  &.ts:hover svg > path:last-child {
    fill: #FFFFFF;
  }

  /* Prisma - Dark */
  &.prisma:hover svg > path:first-child {
    fill: #090A15;
  }
  &.prisma:hover svg g > path {
    fill: #FFFFFF;
  }

  /* WordPress - Blue */
  &.wordpress:hover svg > path:first-child {
    fill: #207196;
  }
  &.wordpress:hover svg > path:nth-child(2) {
    fill: #FFFFFF;
  }

  /* GitHub - Black */
  &.github:hover svg > path:nth-child(2) {
    fill: #000000;
  }
  &.github:hover svg g > path {
    fill: #FFFFFF;
  }

  /* Docker - Blue */
  &.docker:hover svg > path:first-child {
    fill: #1C60E6;
  }
  &.docker:hover svg g > path {
    fill: #FFFFFF;
  }

  /* PostgreSQL - Blue */
  &.postgres:hover svg > path:first-child {
    fill: #000;
  }
  &.postgres:hover svg > path:nth-child(3) {
    fill: #336791;
  }
  &.postgres:hover svg > path:nth-child(4) {
    fill: #336791;
  }
  &.postgres:hover svg > path:nth-child(5) {
    fill: #336791;
  }
  &.postgres:hover svg > path:nth-child(6) {
    fill: #336791;
  }
  &.postgres:hover svg > path:nth-child(7) {
    fill: #336791;
  }
  &.postgres:hover svg > path:nth-child(8) {
    fill: #336791;
  }

  /* Elementor - Pink */
  &.elementor:hover svg > path:first-child {
    fill: #FF7CE6;
  }
  &.elementor:hover svg > path:nth-child(2) {
    fill: #FFFFFF;
  }
`;

/* ---------------- COMPONENT ---------------- */
const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bubblesRef = useRef<HTMLElement[]>([]);

  // Helper to store refs
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !bubblesRef.current.includes(el)) bubblesRef.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const bubbles = bubblesRef.current;
      const title = document.querySelector(".skills-section h2") as HTMLElement;

      /* =============================
         1. ENTER ANIMATION
      ============================== */
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 70%",
        },
      });

      bubbles.forEach((bubble) => {
        const b = bubble.getBoundingClientRect();
        const t = title.getBoundingClientRect();
        const dx = (b.left + b.width / 2) - (t.left + t.width / 2);
        const dy = (b.top + b.height / 2) - (t.top + t.height / 2);

        enterTl.fromTo(
          bubble,
          { opacity: 0, scale: 0.92, x: dx * 0.08, y: dy * 0.08 },
          { opacity: 1, scale: 1, x: 0, y: 0, duration: 1.4, ease: "power3.out" },
          0
        );
      });

      /* =============================
         2. FLOATING ANIMATION
      ============================== */
      bubbles.forEach((bubble) => {
        const floatX = gsap.utils.random(-3, 3);
        const floatY = gsap.utils.random(-3, 3);
        const duration = gsap.utils.random(6, 10);

        const floatTween = gsap.to(bubble, {
          xPercent: floatX,
          yPercent: floatY,
          duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        });

        ScrollTrigger.create({
          trigger: ".skills-section",
          start: "top 75%",
          onEnter: () => floatTween.play(),
        });

        ScrollTrigger.create({
          trigger: ".skills-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          animation: gsap.to(bubble, { xPercent: floatX * 0.5, yPercent: floatY * 0.5 }),
        });
      });

      /* =============================
         3. MAGNETIC CURSOR
      ============================== */
      const strength = 0.45; // stronger magnetic pull
      const maxDistance = 200; // max distance for effect

      const onMouseMove = (e: MouseEvent) => {
        bubbles.forEach((bubble) => {
          const rect = bubble.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const magneticStrength = strength * (1 - distance / maxDistance);
            gsap.to(bubble, {
              x: dx * magneticStrength,
              y: dy * magneticStrength,
              duration: 0.3,
              ease: "power3.out",
            });
          } else {
            gsap.to(bubble, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
          }
        });
      };

      window.addEventListener("mousemove", onMouseMove);

      return () => window.removeEventListener("mousemove", onMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section className="skills-section">
      <Container ref={containerRef}>
        <Title>
          <span>SKILLS &</span> <span>Expertise</span>
        </Title>

        {/* ---------------- BUBBLES ---------------- */}
        <Bubble ref={addToRefs} className="bubble next" style={{ top: "49%", left: "0%", width: "215px" }}>
          <NextJsBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble js" style={{ top: "1%", left: "3%", width: "270px" }}>
          <JavaScriptBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble mongo" style={{ bottom: "43%", left: "15%", width: "200px" }}>
          <MongoDBBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble wordpress" style={{ bottom: "4%", left: "16%", width: "260px" }}>
          <WordPressBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble github" style={{ top: "13%", left: "25%", width: "189px" }}>
          <GitHubBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble ts" style={{ bottom: "16%", left: "36%", width: "200px" }}>
          <TypeScriptBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble prisma" style={{ top: "7%", right: "40%", width: "245px" }}>
          <PrismaBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble node" style={{ bottom: "1%", right: "29%", width: "260px" }}>
          <NodeJsBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble elementor" style={{ top: "0", right: "18%", width: "260px" }}>
          <ElementorBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble postgres" style={{ bottom: "24%", right: "16%", width: "200px" }}>
          <PostgreSQLBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble docker" style={{ bottom: "2%", right: "10%", width: "158px" }}>
          <DockerBubble />
        </Bubble>

        <Bubble ref={addToRefs} className="bubble react" style={{ top: "18%", right: "4%", width: "241px" }}>
          <ReactJsBubble />
        </Bubble>
      </Container>
    </Section>
  );
};

export default Skills;
