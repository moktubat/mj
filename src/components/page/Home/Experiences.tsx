"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { FONT } from "@/styles/font";
import { breakpoints } from "@/styles/breakpoints";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ================= SECTION ================= */

const CareerSection = styled.section`
  padding: 100px 10px;
  overflow: hidden;
`;

const CareerContainer = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  overflow: hidden;
`;

const IntroSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;

  @media ${breakpoints.md} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const SubTitle = styled.h2`
  color: #1e1e1e;
  font-family: ${FONT.alphaLyrae};
  font-size: 72px;
  font-weight: 500;
  line-height: 84px;
  text-transform: uppercase;

  @media ${breakpoints.md} {
    font-size: 48px;
    line-height: 56px;
  }
`;

const Title = styled.p`
  color: #ff5948;
  font-family: ${FONT.oktaNeue};
  font-size: 20px;
`;

/* ================= LIST ================= */

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

/* ================= GRID LAYOUT ================= */

const ExperienceRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  align-items: center;
  gap: 32px;

  @media ${breakpoints.md} {
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
`;

/* ================= ROLE INFO ================= */

const RoleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 0;
  will-change: transform;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const NumberBox = styled.div`
  background: #ff5948;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  color: #fff;
  font-family: ${FONT.oktaNeue};
  font-size: 24px;
  font-weight: 500;
  will-change: background-color, color;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
  min-width: 0;
`;

const RoleTitle = styled.h3`
  color: #1e1e1e;
  font-size: 36px;
  font-family: ${FONT.alphaLyrae};
  text-transform: uppercase;
  line-height: 1.2;
  will-change: color;
  transition: color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media ${breakpoints.md} {
    font-size: 28px;
  }
`;

const CompanyName = styled.p`
  color: #6a6a6a;
  font-family: ${FONT.oktaNeue};
  font-size: 16px;
  line-height: 1.4;
  will-change: color;
  transition: color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

/* ================= LOGO ================= */

const LogoBox = styled.div`
  width: 80px;
  height: 80px;
  background: #f3ebf3;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0;
  transform: scale(0.8);
  will-change: transform, opacity;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media ${breakpoints.md} {
    margin: 0 auto;
  }
`;

/* ================= TIMELINE META ================= */

const TimelineMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  will-change: transform;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media ${breakpoints.md} {
    justify-content: flex-start;
  }
`;

const TimelineDivider = styled.div`
  width: 1px;
  height: 40px;
  background: #ff5948;
  flex-shrink: 0;
  will-change: background-color;
  transition: background-color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const TimelinePeriod = styled.p`
  color: #6a6a6a;
  font-family: ${FONT.oktaNeue};
  font-size: 24px;
  white-space: nowrap;
  will-change: color;
  transition: color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media ${breakpoints.md} {
    font-size: 18px;
  }
`;

/* ================= CARD ================= */

const ExperienceCard = styled.div`
  border: 1px solid #ff5948;
  padding: 32px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: transparent;
  will-change: background-color;
  transition: background-color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  /* Remove transform to prevent rendering issues */
  transform: translateZ(0);
  backface-visibility: hidden;

  @media ${breakpoints.md} {
    padding: 24px;
  }

  &:hover {
    background: #ff5948;

    ${RoleTitle}, ${CompanyName}, ${TimelinePeriod} {
      color: #fff;
    }

    ${TimelineDivider} {
      background: #fff;
    }

    ${NumberBox} {
      background: #fff;
      color: #ff5948;
    }

    ${LogoBox} {
      opacity: 1;
      transform: scale(1);
    }

    /* Card 1 and 3: subtle scale on left, stronger on right */
    &:nth-child(odd) {
      ${RoleInfo} {
        transform: scale(0.95);
      }

      ${TimelineMeta} {
        transform: scale(1.05);
      }
    }

    /* Card 2: opposite effect */
    &:nth-child(even) {
      ${RoleInfo} {
        transform: scale(1.05);
      }

      ${TimelineMeta} {
        transform: scale(0.95);
      }
    }
  }
`;

/* ================= DATA ================= */

type Experience = {
  id: number;
  title: string;
  company: string;
  duration: string;
  logo?: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "Jr. Frontend Developer",
    company: "Jamroll Limited - Mirpur DOHS, Dhaka",
    duration: "Feb 2024 to Present",
    logo: "/vercel.svg",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Prayers Connect Inc. - NY, United States",
    duration: "Jan 2024 to Jun 2024",
    logo: "/vercel.svg",
  },
  {
    id: 3,
    title: "Executive Officer",
    company: "Technobizz Solutions Limited - Banasree, Dhaka",
    duration: "Sep 2022 to Jan 2024",
    logo: "/vercel.svg",
  },
];

/* ================= COMPONENT ================= */

export default function Experiences() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - on page load
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        });
      }

      // Subtitle animation - on page load
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power4.out",
        });
      }

      // Cards animation - load all at once immediately
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            opacity: 0,
            y: 60,
            duration: 1,
            delay: 0.4 + index * 0.15,
            ease: "power3.out",
          });
        }
      });

      // Number boxes animation - on page load
      const numberBoxes = cardsRef.current
        .map((card) => card?.querySelector("[data-number]"))
        .filter(Boolean);

      numberBoxes.forEach((box, index) => {
        if (box) {
          gsap.fromTo(
            box,
            {
              scale: 0,
              rotation: -90,
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: 0.6 + index * 0.15,
              ease: "back.out(1.7)",
            }
          );
        }
      });

      // Role titles animation - on page load
      const roleTitles = cardsRef.current
        .map((card) => card?.querySelector("[data-role]"))
        .filter(Boolean);

      roleTitles.forEach((title, index) => {
        if (title) {
          gsap.fromTo(
            title,
            {
              x: -30,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.7 + index * 0.15,
              ease: "power3.out",
            }
          );
        }
      });

      // Timeline dividers animation - on page load
      const dividers = cardsRef.current
        .map((card) => card?.querySelector("[data-divider]"))
        .filter(Boolean);

      dividers.forEach((divider, index) => {
        if (divider) {
          gsap.fromTo(
            divider,
            {
              scaleY: 0,
            },
            {
              scaleY: 1,
              duration: 0.6,
              delay: 0.8 + index * 0.15,
              ease: "power2.out",
              transformOrigin: "top",
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <CareerSection ref={sectionRef}>
      <CareerContainer>
        <IntroSection>
          <SubTitle ref={titleRef}>Career Growth Journey</SubTitle>
          <Title ref={subtitleRef}>[Working Experiences]</Title>
        </IntroSection>

        <ExperienceList>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
            >
              <ExperienceRow>
                <RoleInfo>
                  <NumberBox data-number>
                    {experience.id.toString().padStart(2, "0")}
                  </NumberBox>
                  <TextGroup>
                    <RoleTitle data-role>{experience.title}</RoleTitle>
                    <CompanyName>{experience.company}</CompanyName>
                  </TextGroup>
                </RoleInfo>

                {experience.logo && (
                  <LogoBox>
                    <Image
                      src={experience.logo}
                      alt={`${experience.company} logo`}
                      width={54}
                      height={54}
                      priority={index === 0}
                    />
                  </LogoBox>
                )}

                <TimelineMeta>
                  <TimelineDivider data-divider />
                  <TimelinePeriod>{experience.duration}</TimelinePeriod>
                </TimelineMeta>
              </ExperienceRow>
            </ExperienceCard>
          ))}
        </ExperienceList>
      </CareerContainer>
    </CareerSection>
  );
}