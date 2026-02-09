"use client";

import { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { FONT } from "@/styles/font";
import { breakpoints } from "@/styles/breakpoints";
import { Project } from "@/types/project";

gsap.registerPlugin(SplitText);

/* ================= STYLED COMPONENTS ================= */
const CardContainer = styled.div`
  position: relative;
  flex: 1;
  aspect-ratio: 1;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: ${breakpoints.sm}) {
    border-radius: 0.75rem;
  }
`;

const CardImage = styled.div`
  width: 644px;
  height: 644px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SVGStroke = styled.div<{ $color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
  width: 100%;
  height: 100%;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;

    path {
      stroke: ${(props) => props.$color};
      will-change: stroke-dashoffset, stroke-width;
    }
  }

  @media (max-width: ${breakpoints.md}) {
    transform: translate(-50%, -50%) scale(1.3);
  }

  @media (max-width: ${breakpoints.sm}) {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

const CardTitle = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: #000;
  overflow: hidden;

  h3 {
    font-family: ${FONT.alphaLyrae};
    font-size: clamp(2rem, 2.5vw, 3rem);
    font-weight: 450;
    line-height: 1.25;
    letter-spacing: -0.025rem;
    margin: 0;
  }

  .word {
    display: inline-block;
    will-change: transform;
    overflow: hidden;
  }

  @media (max-width: ${breakpoints.md}) {
    bottom: 1.5rem;
    left: 1.5rem;
  }

  @media (max-width: ${breakpoints.sm}) {
    bottom: 1.25rem;
    left: 1.25rem;
  }
`;

/* ================= SVG PATH COMPONENTS ================= */
const SVGPath1 = () => (
    <svg
        width="2453"
        height="2273"
        viewBox="0 0 2453 2273"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
            strokeWidth="200"
            strokeLinecap="round"
        />
    </svg>
);

const SVGPath2 = () => (
    <svg
        width="2250"
        height="2535"
        viewBox="0 0 2250 2535"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
            strokeWidth="200"
            strokeLinecap="round"
        />
    </svg>
);

/* ================= COMPONENT ================= */
interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const splitRef = useRef<SplitText | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        if (!cardRef.current || !titleRef.current) return;

        const cardPaths = cardRef.current.querySelectorAll(".svg-stroke path");

        // Initialize SplitText
        splitRef.current = new SplitText(titleRef.current, {
            type: "words",
            wordsClass: "word",
        });

        gsap.set(splitRef.current.words, { yPercent: 100 });

        // Setup stroke dasharray and dashoffset
        cardPaths.forEach((path) => {
            const svgPath = path as SVGPathElement;
            const length = svgPath.getTotalLength();
            svgPath.style.strokeDasharray = `${length}`;
            svgPath.style.strokeDashoffset = `${length}`;
        });

        // Mouse enter handler
        const handleMouseEnter = () => {
            if (timelineRef.current) timelineRef.current.kill();
            timelineRef.current = gsap.timeline();

            cardPaths.forEach((path) => {
                timelineRef.current!.to(
                    path,
                    {
                        strokeDashoffset: 0,
                        attr: { "stroke-width": 700 },
                        duration: 1.5,
                        ease: "power2.out",
                    },
                    0
                );
            });

            if (splitRef.current) {
                timelineRef.current.to(
                    splitRef.current.words,
                    {
                        yPercent: 0,
                        duration: 0.75,
                        ease: "power3.out",
                        stagger: 0.075,
                    },
                    0.35
                );
            }
        };

        // Mouse leave handler
        const handleMouseLeave = () => {
            if (timelineRef.current) timelineRef.current.kill();
            timelineRef.current = gsap.timeline();

            cardPaths.forEach((path) => {
                const svgPath = path as SVGPathElement;
                const length = svgPath.getTotalLength();
                timelineRef.current!.to(
                    path,
                    {
                        strokeDashoffset: length,
                        attr: { "stroke-width": 200 },
                        duration: 1,
                        ease: "power2.out",
                    },
                    0
                );
            });

            if (splitRef.current) {
                timelineRef.current.to(
                    splitRef.current.words,
                    {
                        yPercent: 100,
                        duration: 0.5,
                        ease: "power3.out",
                        stagger: { each: 0.05, from: "end" },
                    },
                    0
                );
            }
        };

        const card = cardRef.current;
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
            if (splitRef.current) splitRef.current.revert();
            if (timelineRef.current) timelineRef.current.kill();
        };
    }, []);

    return (
        <CardContainer ref={cardRef} id={project.id}>
            <CardImage>
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1000px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                />
            </CardImage>

            <SVGStroke className="svg-stroke svg-stroke-1" $color={project.stroke1Color}>
                <SVGPath1 />
            </SVGStroke>

            <SVGStroke className="svg-stroke svg-stroke-2" $color={project.stroke2Color}>
                <SVGPath2 />
            </SVGStroke>

            <CardTitle>
                <h3 ref={titleRef}>{project.title}</h3>
            </CardTitle>
        </CardContainer>
    );
};

export default ProjectCard;