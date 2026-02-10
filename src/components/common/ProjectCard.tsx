"use client";

import { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
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
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: ${breakpoints.sm}) {
    border-radius: 0.75rem;
  }
`;

const CardLink = styled(Link)`
  position: absolute;
  inset: 0;
  z-index: 10;
  text-decoration: none;
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
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

const ContentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  pointer-events: none;

  @media (max-width: ${breakpoints.md}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 1.25rem;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(10px);

  @media (max-width: ${breakpoints.sm}) {
    gap: 6px;
    margin-bottom: 8px;
  }
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.50);
  backdrop-filter: blur(10px);
  border: 1px solid #AFAFAF;
  border-style: dashed;
  color: #6A6A6A;
  font-family: ${FONT.oktaNeue};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 100px;
  white-space: nowrap;

  @media (max-width: ${breakpoints.sm}) {
    font-size: 11px;
    padding: 5px 10px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 8px;

  @media (max-width: ${breakpoints.sm}) {
    gap: 8px;
    margin-bottom: 4px;
  }
`;

const CardTitle = styled.div`
  overflow: hidden;
  flex: 1;

  h3 {
    font-family: ${FONT.alphaLyrae};
    font-size: 36px;
    font-weight: 500;
    line-height: 40px;
    text-transform: uppercase;
    transform: scaleX(0.96);
    transform-origin: left;
    margin: 0;
    color: #1E1E1E;
    opacity: 0;
    transform: translateY(10px);
  }

  .word {
    display: inline-block;
    will-change: transform;
    overflow: hidden;
  }

  @media (max-width: ${breakpoints.md}) {
    h3 {
      font-size: 28px;
      line-height: 32px;
    }
  }

  @media (max-width: ${breakpoints.sm}) {
    h3 {
      font-size: 24px;
      line-height: 28px;
    }
  }
`;

const Category = styled.span`
  font-family: ${FONT.oktaNeue};
  font-size: 20px;
  line-height: 28px;
  color: #FF5948;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);

  @media (max-width: ${breakpoints.sm}) {
    font-size: 12px;
    line-height: 18px;
  }
`;

const Description = styled.p`
  font-family: ${FONT.oktaNeue};
  font-size: 17px;
  line-height: 25px;
  color: #6A6A6A;
  opacity: 0;
  transform: translateY(10px);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: ${breakpoints.sm}) {
    font-size: 13px;
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
    const categoryRef = useRef<HTMLSpanElement>(null);
    const tagsRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
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

            // Animate SVG strokes
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

            // Animate tags
            timelineRef.current.to(
                tagsRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                },
                0.2
            );

            // Animate title words
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

            // Animate title container
            timelineRef.current.to(
                titleRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                },
                0.3
            );

            // Animate category
            timelineRef.current.to(
                categoryRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                },
                0.3
            );

            // Animate description
            timelineRef.current.to(
                descRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                },
                0.45
            );
        };

        // Mouse leave handler
        const handleMouseLeave = () => {
            if (timelineRef.current) timelineRef.current.kill();
            timelineRef.current = gsap.timeline();

            // Reverse SVG strokes
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

            // Reverse content animations
            timelineRef.current.to(
                [tagsRef.current, titleRef.current, categoryRef.current, descRef.current],
                {
                    opacity: 0,
                    y: 10,
                    duration: 0.4,
                    ease: "power3.out",
                },
                0
            );

            // Reverse title words
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
            {project.link && (
                <CardLink href={project.link} aria-label={`View ${project.title}`} />
            )}

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

            <ContentWrapper>
                <Tags ref={tagsRef}>
                    {project.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </Tags>

                <TitleWrapper>
                    <CardTitle>
                        <h3 ref={titleRef}>{project.title}</h3>
                    </CardTitle>
                    <Category ref={categoryRef}>[{project.category}]</Category>
                </TitleWrapper>

                <Description ref={descRef}>{project.description}</Description>
            </ContentWrapper>
        </CardContainer>
    );
};

export default ProjectCard;