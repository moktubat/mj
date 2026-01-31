"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FONT } from "@/styles/font";
import { breakpoints } from "@/styles/breakpoints";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ================= SECTION ================= */

const JobSection = styled.section`
  padding: 100px 10px;
  overflow: hidden;
`;

const JobContainer = styled.div`
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

/* ================= GRID LAYOUT ================= */

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 0px 1fr;
  align-items: center;
  transition: grid-template-columns 0.45s cubic-bezier(0.4, 0, 0.2, 1);

  @media ${breakpoints.md} {
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
`;

/* ================= JOB INFO ================= */

const JobInfo = styled.div`
  max-width: 630px;
  display: flex;
  align-items: center;
  gap: 24px;
  min-width: 0;
`;

const NumberBox = styled.div`
  background: #ff5948;
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  color: #fff;
  font-family: ${FONT.oktaNeue};
  font-size: 24px;
  font-weight: 500;
  transition: all 0.35s ease;
  will-change: transform, background-color;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const JobTitle = styled.h3`
  color: #1e1e1e;
  font-size: 36px;
  font-family: ${FONT.alphaLyrae};
  text-transform: uppercase;
  transition: color 0.35s ease;

  @media ${breakpoints.md} {
    font-size: 28px;
  }
`;

const Company = styled.p`
  color: #6a6a6a;
  font-family: ${FONT.oktaNeue};
  transition: color 0.35s ease;
`;

/* ================= LOGO COLUMN ================= */

const LogoBox = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background: #f3ebf3;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transform: scale(0.8);
  transition: all 0.35s ease;
  will-change: transform, opacity;
`;

/* ================= META INFO ================= */

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: #ff5948;
  transition: background 0.35s ease;
  will-change: background;
`;

const Duration = styled.p`
  color: #6a6a6a;
  font-family: ${FONT.oktaNeue};
  font-size: 24px;
  transition: color 0.35s ease;

  @media ${breakpoints.md} {
    font-size: 18px;
  }
`;

/* ================= CARD ================= */

const Card = styled.div`
  border: 1px solid #ff5948;
  padding: 32px;
  transition: background 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  will-change: transform;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: #ff5948;
    transform: translateY(-4px);
    z-index: 10;
  }

  &:hover h3,
  &:hover p {
    color: #fff;
  }

  &:hover ${Divider} {
    background: #fff;
  }

  &:hover ${NumberBox} {
    background: #e7e7e7;
    color: #000;
    transform: rotate(360deg);
  }

  &:hover ${LogoBox} {
    opacity: 1;
    transform: scale(1);
  }

  &:hover ${Row} {
    grid-template-columns: 1fr 120px 1fr;
  }

  @media ${breakpoints.md} {
    padding: 24px;
  }
`;

/* ================= DATA ================= */

type Job = {
  id: number;
  title: string;
  company: string;
  duration: string;
  logo?: string;
};

const jobs: Job[] = [
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

export default function Jobs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animations with split reveal
      const titleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      titleTimeline
        .from(titleRef.current, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          labelRef.current,
          {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7"
        );

      // Animated number counter for each card
      numberRefs.current.forEach((numberBox, index) => {
        if (!numberBox) return;

        const targetNumber = jobs[index].id;
        const numberObj = { val: 0 };

        gsap.to(numberObj, {
          scrollTrigger: {
            trigger: cardsRef.current[index],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          val: targetNumber,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            if (numberBox) {
              numberBox.textContent = Math.floor(numberObj.val)
                .toString()
                .padStart(2, "0");
            }
          },
        });
      });

      // Staggered card entrance animations
      const cards = cardsRef.current.filter(Boolean);

      gsap.set(cards, {
        opacity: 0,
        y: 60,
      });

      ScrollTrigger.batch(cards, {
        start: "top 90%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "all", // Clear inline styles after animation
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 60,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.in",
          });
        },
      });

      // Animate card content elements separately
      cards.forEach((card) => {
        if (!card) return;

        const jobTitle = card.querySelector("h3");
        const company = card.querySelector('[class*="Company"]');
        const duration = card.querySelector('[class*="Duration"]');
        const divider = card.querySelector('[class*="Divider"]');

        const contentTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        contentTimeline
          .from(jobTitle, {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          })
          .from(
            company,
            {
              x: -30,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          )
          .from(
            divider,
            {
              scaleY: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .from(
            duration,
            {
              x: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          );
      });

      // Advanced hover effects with GSAP
      cards.forEach((card, index) => {
        if (!card) return;

        const numberBox = numberRefs.current[index];

        card.addEventListener("mouseenter", () => {
          // Set z-index for proper stacking
          gsap.set(card, { zIndex: 10 });

          gsap.to(card, {
            scale: 1.01,
            boxShadow: "0 10px 40px rgba(255, 89, 72, 0.3)",
            duration: 0.4,
            ease: "power2.out",
          });

          if (numberBox) {
            gsap.to(numberBox, {
              rotation: 360,
              duration: 0.6,
              ease: "back.out(1.5)",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "0 0 0 rgba(255, 89, 72, 0)",
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(card, { zIndex: "auto" });
            },
          });
        });

        // Subtle 3D tilt effect on mouse move
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -2;
          const rotateY = ((x - centerX) / centerX) * 2;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <JobSection ref={sectionRef}>
      <JobContainer>
        <IntroSection>
          <SubTitle ref={titleRef}>Career Growth Journey</SubTitle>
          <Title ref={labelRef}>[Working Experiences]</Title>
        </IntroSection>

        <Wrapper>
          {jobs.map((job, index) => (
            <Card key={job.id} ref={(el) => (cardsRef.current[index] = el)}>
              <Row>
                <JobInfo>
                  <NumberBox ref={(el) => (numberRefs.current[index] = el)}>
                    {job.id.toString().padStart(2, "0")}
                  </NumberBox>
                  <TextGroup>
                    <JobTitle>{job.title}</JobTitle>
                    <Company>{job.company}</Company>
                  </TextGroup>
                </JobInfo>

                {job.logo && (
                  <LogoBox>
                    <Image
                      src={job.logo}
                      alt={`${job.company} logo`}
                      width={54}
                      height={54}
                    />
                  </LogoBox>
                )}

                <MetaInfo>
                  <Divider />
                  <Duration>{job.duration}</Duration>
                </MetaInfo>
              </Row>
            </Card>
          ))}
        </Wrapper>
      </JobContainer>
    </JobSection>
  );
}