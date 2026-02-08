"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { countTransition } from "@/utils/anim";
import { projectDetails } from "@/components/page/Work/projectDetails";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Overflow from "@/utils/Overflow";
import styled from "styled-components";
import Image from "next/image";
import { FONT } from "@/styles/font";

// Only first 4 projects
const PROJECTS_TO_SHOW = projectDetails.slice(0, 4);
const TOTAL_PROJECTS = PROJECTS_TO_SHOW.length;

const ProjectsWrapper = styled.section`
  position: relative;
`;

const StickyContainer = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  overflow: hidden;
`;

const ProjectsInner = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background-color: #0d0e13;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectsContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const ProjectContainer = styled.div<{ $isVisible?: boolean }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: ${(props) => (props.$isVisible ? "block" : "none")};
`;

const ProjectWrap = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background-color: #0d0e13;
`;

const ProjectImage = styled(Image)`
  height: 125vw;
  opacity: 0.8;
  transform: scale(1.1);
  width: 100%;
  object-fit: cover;
`;

const Thumbnails = styled.div`
  position: relative;
  overflow: hidden;
  pointer-events: none;
  z-index: 5;
  height: 27vw;
  width: 22vw;
`;

const Thumbnail = styled.div<{ $isVisible?: boolean }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: ${(props) => (props.$isVisible ? "block" : "none")};
`;

const ThumbnailImage = styled(Image)`
  height: 100%;
  width: 100%;
  position: absolute;
  inset: 0;
  overflow: hidden;
  object-fit: cover;
`;

const Headings = styled.div`
  position: absolute;
  left: 16vw;
  z-index: 5;
  color: white;
`;

const Title = styled.h2`
  overflow: hidden;
  font-size: 3.75rem;
  letter-spacing: -0.05em;
  line-height: 1.1;

  span {
    display: block;
  }
`;

const Subtitle = styled.p`
  overflow: hidden;
  font-family: ${FONT.oktaNeue};
  font-size: 1.25rem;
  font-weight: 300;
  opacity: 0.8;
  letter-spacing: -0.05em;

  span {
    display: block;
  }
`;

const Indicator = styled.div`
  position: absolute;
  right: 4vw;
  bottom: 4vw;
  z-index: 9;
  display: flex;
  font-size: 1.5rem;
  font-weight: 300;
  color: white;
  gap: 0.5rem;
  overflow: hidden;
`;

const IndicatorTotal = styled.span`
  opacity: 0.7;
`;

const Projects = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [direction, setDirection] = useState(1);
  const tl = useRef<gsap.core.Timeline>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let ticking = false;
    let currentProject = 1;

    const handleScroll = () => {
      if (!ticking && !isAnimating) {
        window.requestAnimationFrame(() => {
          if (!wrapperRef.current) return;

          const rect = wrapperRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Check if we're in the Projects section
          if (rect.top <= 0 && rect.bottom > viewportHeight) {
            // Calculate which project should be showing
            const scrolledIntoSection = Math.abs(rect.top);
            const progress = scrolledIntoSection / (viewportHeight * (TOTAL_PROJECTS - 1));

            const newProject = Math.min(
              TOTAL_PROJECTS,
              Math.floor(progress * TOTAL_PROJECTS) + 1
            );

            if (newProject !== currentProject) {
              const newDirection = newProject > currentProject ? 1 : -1;
              setDirection(newDirection);
              setCurrentNumber(newProject);
              currentProject = newProject;
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAnimating]);

  Overflow(".headings h2 span", 0, 1.3, [currentNumber, direction]);
  Overflow(".headings p span", 0.5, 1.3, [currentNumber, direction]);

  useGSAP(
    () => {
      const currentprojectContainers = document.querySelector(
        `[data-currentelement="true"]`
      );
      const currentprojectImgContainer =
        currentprojectContainers?.querySelector(".projectWrap");

      const outprojectContainers = document.querySelector(
        `[data-outgoingelement="true"]`
      );
      const outprojectImgContainer =
        outprojectContainers?.querySelector(".projectWrap");

      const currentThumbnail = document.querySelector(
        `[data-currentthumbnail="true"]`
      );

      const currentThumbnailImgContainer =
        currentThumbnail?.querySelector(".thumbnailImage");

      const outgoingThumbnail = document.querySelector(
        `[data-outgoingthumbnail="true"]`
      );

      const outgoingThumbnailImgContainer =
        outgoingThumbnail?.querySelector(".thumbnailImage");

      tl.current = gsap.timeline({
        defaults: {
          duration: 1.3,
          ease: "power4.out",
        },
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            setIsAnimating(false);
          }
        },
      });

      currentThumbnail &&
        tl.current.set([currentprojectContainers, currentThumbnail], {
          display: "block",
          zIndex: 1,
        });

      outgoingThumbnail &&
        tl.current.set([outprojectContainers, outgoingThumbnail], {
          display: "block",
          zIndex: 2,
        });

      tl.current.fromTo(
        outprojectContainers,
        {
          clipPath:
            direction === 1
              ? "polygon(0 0, 100% 0, 100% 91%, 0 98%)"
              : "polygon(0 7%, 100% 15%, 100% 100%, 0% 100%)",
        },
        {
          clipPath:
            direction === 1
              ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
              : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",

          onComplete: () => {
            gsap.set(outprojectContainers, {
              display: "none",
              clipPath: "none",
            });
          },
        }
      );

      tl.current.fromTo(
        outgoingThumbnail,
        {
          clipPath:
            direction === 1
              ? "polygon(0 2%, 100% 8%, 100% 100%, 0% 100%)"
              : "polygon(0 0, 100% 0, 100% 91%, 0 98%)",
        },
        {
          clipPath:
            direction === 1
              ? "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
              : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",

          onComplete: () => {
            gsap.set(outprojectContainers, {
              display: "none",
              clipPath: "none",
            });
          },
        },
        0
      );

      tl.current.from(
        currentprojectImgContainer as Element,
        {
          yPercent: direction === 1 ? 25 : -25,
        },
        0
      );

      tl.current.from(
        currentThumbnailImgContainer as Element,
        {
          yPercent: direction === 1 ? -25 : 25,
        },
        0
      );

      tl.current.to(
        outprojectImgContainer as Element,
        {
          yPercent: direction === 1 ? -50 : 50,
          scale: 1.5,
          rotate: direction === 1 ? -7 : 7,
        },
        0
      );

      tl.current.to(
        outgoingThumbnailImgContainer as Element,
        {
          yPercent: direction === 1 ? 50 : -50,
        },
        0
      );
    },
    { dependencies: [currentNumber, direction], revertOnUpdate: true }
  );

  const getOutgoingElement = (id: number) => {
    if (direction === 1) {
      if (currentNumber === 1 && id === TOTAL_PROJECTS) {
        return true;
      } else if (id === currentNumber - 1) {
        return true;
      }
    } else if (direction === -1) {
      if (currentNumber === TOTAL_PROJECTS && id === 1) {
        return true;
      } else if (id === currentNumber + 1) {
        return true;
      }
    }
    return false;
  };

  return (
    <ProjectsWrapper ref={wrapperRef} style={{ height: `${(TOTAL_PROJECTS) * 100}vh` }}>
      <StickyContainer>
        <ProjectsInner>
          <ProjectsContainer className="projects">
            {PROJECTS_TO_SHOW.map(({ img, id, title }) => {
              return (
                <ProjectContainer
                  key={id}
                  $isVisible={
                    id === currentNumber || getOutgoingElement(id) === true
                  }
                  data-currentelement={id === currentNumber ? "true" : "false"}
                  data-outgoingelement={
                    getOutgoingElement(id) ? "true" : "false"
                  }
                >
                  <ProjectWrap className="projectWrap">
                    <ProjectImage
                      src={img}
                      alt={`Project ${id} showcase image`}
                      className="project_img"
                      width={1920}
                      height={1080}
                      priority={id === currentNumber}
                    />
                  </ProjectWrap>
                </ProjectContainer>
              );
            })}
          </ProjectsContainer>

          <Thumbnails>
            {PROJECTS_TO_SHOW.map(({ img, id, title }) => {
              return (
                <Thumbnail
                  key={id}
                  data-currentthumbnail={
                    id === currentNumber ? "true" : "false"
                  }
                  data-outgoingthumbnail={
                    getOutgoingElement(id) ? "true" : "false"
                  }
                  $isVisible={
                    id === currentNumber || getOutgoingElement(id) === true
                  }
                >
                  <ThumbnailImage
                    src={img}
                    alt={`Project ${id} thumbnail`}
                    className="thumbnailImage"
                    width={500}
                    height={500}
                    priority={id === currentNumber}
                  />
                </Thumbnail>
              );
            })}
          </Thumbnails>

          <Headings className="headings">
            {PROJECTS_TO_SHOW.map(({ title, id, subtitle }) => {
              return (
                id === currentNumber && (
                  <div key={id}>
                    {title.split(" ").map((str, index) => (
                      <Title key={`${str}-${index}`}>
                        <span>{str}</span>
                      </Title>
                    ))}
                    <Subtitle>
                      <span>{subtitle}</span>
                    </Subtitle>
                  </div>
                )
              );
            })}
          </Headings>

          <Indicator>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.span
                key={currentNumber}
                variants={countTransition}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
              >
                {currentNumber < 10 ? `0${currentNumber}` : currentNumber}
              </motion.span>
            </AnimatePresence>
            <IndicatorTotal>/ {TOTAL_PROJECTS}</IndicatorTotal>
          </Indicator>
        </ProjectsInner>
      </StickyContainer>
    </ProjectsWrapper>
  );
};

export default Projects;