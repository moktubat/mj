"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    overlayTransition,
    anim,
    outerDivTransition,
    innerDivTransition,
    countTransition,
} from "@/utils/anim";
import { projectDetails } from "./projectDetails";
import { debounce } from "lodash";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Overflow from "@/utils/Overflow";
import styled from "styled-components";
import Image from "next/image";

const WorkShowCaseWrapper = styled(motion.div)`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background-color: #0d0e13;
  transform-origin: top left;
  user-select: none;
  overscroll-behavior: none;
`;

const Overlay = styled(motion.div)`
  background-color: #0d0e13;
  z-index: 1;
  position: absolute;
  inset: 0;
  visibility: hidden;
  opacity: 0;
`;

const InnerWrapper = styled(motion.div)`
  position: fixed;
  inset: 0;
  overflow: hidden;
`;

const Experience = styled.section`
  z-index: 2;
  position: absolute;
  inset: 0;
  overflow: hidden;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Projects = styled.div`
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

type WorkShowCaseProps = {
    setLogoColor: React.Dispatch<React.SetStateAction<string>>;
};

const WorkShowCase = ({ setLogoColor }: WorkShowCaseProps) => {
    const [currentNumber, setCurrentNumber] = useState(1);
    const [direction, setDirection] = useState(1);
    const tl = useRef<gsap.core.Timeline>();
    const [isInitialRender, setIsInitialRender] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const latestDeltaSignRef = useRef<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsInitialRender(false);
    }, []);

    const processDeltaSign = useCallback(
        debounce(
            () => {
                const deltaSign = latestDeltaSignRef.current;
                if (deltaSign === null) return;

                setDirection(deltaSign);
                setCurrentNumber((prevNumber) => {
                    if (deltaSign > 0) {
                        return prevNumber === 12 ? 1 : prevNumber + 1;
                    } else {
                        return prevNumber === 1 ? 12 : prevNumber - 1;
                    }
                });
                setIsAnimating(true);
                latestDeltaSignRef.current = null;
            },
            100,
            {
                leading: true,
                trailing: false,
            }
        ),
        []
    );

    const handleWheel = useCallback(
        (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const deltaSign = e.deltaY > 0 ? 1 : -1;
            latestDeltaSignRef.current = deltaSign;

            if (!isAnimating) {
                processDeltaSign();
            }
        },
        [isAnimating, processDeltaSign]
    );

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, [handleWheel]);

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
                onComplete: () => {
                    if (latestDeltaSignRef.current !== null) {
                        processDeltaSign.cancel();
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
        if (isInitialRender) return false;

        if (direction === 1) {
            if (currentNumber === 1 && id === 12) {
                return true;
            } else if (id === currentNumber - 1) {
                return true;
            }
        } else if (direction === -1) {
            if (currentNumber === 12 && id === 1) {
                return true;
            } else if (id === currentNumber + 1) {
                return true;
            }
        }
        return false;
    };

    return (
        <WorkShowCaseWrapper key={"home"} {...anim(outerDivTransition)}>
            <Overlay {...anim(overlayTransition)} initial={false} />
            <InnerWrapper {...anim(innerDivTransition)}>
                <Experience id="experience" ref={containerRef}>
                    <Projects className="projects">
                        {projectDetails.map(({ img, id, title }) => {
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
                    </Projects>

                    <Thumbnails>
                        {projectDetails.map(({ img, id, title }) => {
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
                        {projectDetails.map(({ title, id, subtitle }) => {
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
                        <IndicatorTotal>/ {projectDetails.length}</IndicatorTotal>
                    </Indicator>
                </Experience>
            </InnerWrapper>
        </WorkShowCaseWrapper>
    );
};

export default WorkShowCase;