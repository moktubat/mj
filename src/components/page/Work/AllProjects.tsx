"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, WheelEvent } from "react";
import { debounce } from "lodash";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { easeInExpo } from "@/utils/anim";
import { projectDetails } from "./projectDetails";
import styled from "styled-components";
import Image from "next/image";

/* ---------------- SIZE SYSTEM (PIXEL BASED) ---------------- */
const CARD_WIDTH = 300;
const CARD_HEIGHT = 375;
const GAP = 24;
const ITEM_WIDTH = CARD_WIDTH + GAP;

/* ---------------- STYLES ---------------- */

const OverviewSection = styled.section<{ $isVisible: boolean }>`
  z-index: 1;
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  visibility: ${(p) => (p.$isVisible ? "visible" : "hidden")};
  pointer-events: ${(p) => (p.$isVisible ? "auto" : "none")};
`;

const OverviewProjects = styled.div`
  position: relative;
  height: ${CARD_HEIGHT}px;
  width: 100%;
`;

const OverviewProject = styled.div`
  height: ${CARD_HEIGHT}px;
  width: ${CARD_WIDTH}px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
`;

const ProjectImg = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  z-index: 9;
  left: 3.5rem;
  bottom: 3.5rem;
  color: #0d0e13;
  background: none;
  border: none;
  cursor: pointer;
`;

const CloseIcon = styled(motion.svg)`
  width: 1rem;
  height: 1rem;
`;

const CloseText = styled.span`
  white-space: nowrap;
  opacity: 0.8;
`;

const ScrollText = styled.div`
  position: absolute;
  z-index: 9;
  right: 3.5rem;
  bottom: 3.5rem;
  color: #0d0e13;
  opacity: 0.8;
  font-weight: 300;
`;

/* ---------------- COMPONENT ---------------- */

type Props = {
    setShowMoreProject: React.Dispatch<React.SetStateAction<boolean>>;
    currentNumber: number;
    showMoreProject: boolean;
};

const AllProjects = ({
    setShowMoreProject,
    currentNumber,
    showMoreProject,
}: Props) => {
    const [itemWidth, setItemWidth] = useState(ITEM_WIDTH);
    const [containerCenter, setContainerCenter] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const boxesRef = useRef<HTMLDivElement[]>([]);
    const velocityRef = useRef(0);

    /* ---------------- WRAP ---------------- */
    const wrapPosition = useCallback(
        (position: number) => {
            const totalWidth = itemWidth * projectDetails.length;
            const halfWidth = totalWidth / 2;

            if (position < -halfWidth) return position + totalWidth;
            if (position > halfWidth) return position - totalWidth;
            return position;
        },
        [itemWidth]
    );

    /* ---------------- WHEEL SCROLL (IMPROVED SMOOTHNESS) ---------------- */
    const handleWheel = useCallback(
        (event: WheelEvent<HTMLDivElement>) => {
            event.preventDefault();

            const SCROLL_MULTIPLIER = 1;
            velocityRef.current += event.deltaY * SCROLL_MULTIPLIER;

            boxesRef.current.forEach((box) => {
                gsap.to(box, {
                    x: `+=${velocityRef.current}`,
                    duration: 0.5,
                    ease: "power2.out",
                    onUpdate: () => {
                        velocityRef.current *= 0.8; // Friction for smooth deceleration
                        const newX = gsap.getProperty(box, "x") as number;
                        const wrappedX = wrapPosition(newX);

                        // Only update position when actually wrapping - prevents jank
                        if (wrappedX !== newX) {
                            gsap.set(box, { x: wrappedX });
                        }
                    },
                });
            });
        },
        [wrapPosition]
    );

    const debouncedWheelHandler = useCallback(
        debounce(handleWheel, 10),
        [handleWheel]
    );

    /* ---------------- POSITIONING ---------------- */
    const getItemPosition = (index: number) =>
        containerCenter + itemWidth * (index - currentNumber);

    const getAdjacentIndexes = (index: number) => {
        const mod = (n: number, m: number) => ((n % m) + m) % m;
        return {
            prev: [
                mod(index - 2, projectDetails.length),
                mod(index - 1, projectDetails.length),
            ],
            next: [
                mod(index + 1, projectDetails.length),
                mod(index + 2, projectDetails.length),
            ],
        };
    };

    /* ---------------- ENTRY ANIMATION (IMPROVED TIMING) ---------------- */
    useGSAP(
        () => {
            const adj = getAdjacentIndexes(currentNumber - 1);

            boxesRef.current.forEach((box, index) => {
                if (showMoreProject) {
                    gsap.set(box, { x: getItemPosition(index), yPercent: 0 });

                    // Stagger animation for smooth entry
                    if (index === adj.next[0]) {
                        gsap.from(box, { yPercent: 90, duration: 0.6, ease: "power4.out" });
                    } else if (index === adj.next[1]) {
                        gsap.from(box, { yPercent: 90, duration: 0.7, ease: "power4.out" });
                    } else if (index === adj.prev[1]) {
                        gsap.from(box, { yPercent: 90, duration: 0.8, ease: "power4.out" });
                    } else if (index === adj.prev[0]) {
                        gsap.from(box, { yPercent: 90, duration: 0.9, ease: "power4.out" });
                    }
                }
            });
        },
        [currentNumber, showMoreProject]
    );

    /* ---------------- MEASURE CENTER ---------------- */
    useEffect(() => {
        const update = () => {
            if (containerRef.current) {
                const w = containerRef.current.offsetWidth;
                setItemWidth(ITEM_WIDTH);
                setContainerCenter(w / 2 - CARD_WIDTH / 2);
            }
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    /* ---------------- CLOSE (IMPROVED ANIMATION) ---------------- */
    const handleClose = useCallback(() => {
        const adj = getAdjacentIndexes(currentNumber - 1);

        boxesRef.current.forEach((box, index) => {
            const tl = gsap.timeline();

            // Move to position
            tl.to(box, {
                x: getItemPosition(index),
                duration: 0.3,
                ease: "power2.inOut",
            });

            // Slide down with stagger
            if (index === adj.next[0]) {
                tl.to(box, { yPercent: -90, duration: 0.4, ease: "power2.in" });
            } else if (index === adj.next[1]) {
                tl.to(box, { yPercent: -90, duration: 0.5, ease: "power2.in" });
            } else if (index === adj.prev[1]) {
                tl.to(box, { yPercent: -90, duration: 0.6, ease: "power2.in" });
            } else if (index === adj.prev[0]) {
                tl.to(box, { yPercent: -90, duration: 0.7, ease: "power2.in" });
            }
        });

        setShowMoreProject(false);
    }, [currentNumber, getItemPosition, setShowMoreProject]);

    return (
        <OverviewSection onWheel={debouncedWheelHandler} $isVisible={showMoreProject}>
            <OverviewProjects ref={containerRef}>
                {projectDetails.map(({ id, img, title, subtitle }, index) => (
                    <OverviewProject
                        key={id}
                        ref={(el) => (boxesRef.current[index] = el as HTMLDivElement)}
                    >
                        <ProjectImg
                            src={img}
                            alt={`Project ${id} - ${title}`}
                            width={300}
                            height={375}
                        />
                    </OverviewProject>
                ))}
            </OverviewProjects>

            <CloseButton whileHover="hover" onClick={handleClose}>
                <CloseIcon
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    variants={{ hover: { rotate: 90 } }}
                    transition={{ ease: easeInExpo, duration: 0.8 }}
                >
                    <line
                        x1="13.788"
                        y1="1.28816"
                        x2="1.06011"
                        y2="14.0161"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />
                    <line
                        x1="1.06049"
                        y1="1.43963"
                        x2="13.7884"
                        y2="14.1675"
                        stroke="currentColor"
                        strokeWidth="1.2"
                    />
                </CloseIcon>
                <CloseText>Close</CloseText>
            </CloseButton>

            <ScrollText>Scroll to explore</ScrollText>
        </OverviewSection>
    );
};

export default AllProjects;