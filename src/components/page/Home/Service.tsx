"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import ServiceImage from "@/assets/ServiceImage.webp";
import { FONT } from "@/styles/font";
import { breakpoints } from "@/styles/breakpoints";


/* ================= SECTION ================= */

const Section = styled.section`
  padding: 100px 10px;
  background: #f5f5f5;
  overflow: hidden;

  @media ${breakpoints.md} {
    padding: 80px 10px;
  }

  @media ${breakpoints.sm} {
    padding: 60px 10px;
  }
`;

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

const IntroSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;

  @media ${breakpoints.md} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 40px;
  }
`;

const SubTitle = styled.h2`
  color: #1e1e1e;
  font-family: ${FONT.alphaLyrae};
  font-size: 72px;
  font-weight: 500;
  line-height: 84px;
  text-transform: uppercase;

  @media ${breakpoints.lg} {
    font-size: 60px;
    line-height: 70px;
  }

  @media ${breakpoints.md} {
    font-size: 48px;
    line-height: 56px;
  }

  @media ${breakpoints.sm} {
    font-size: 36px;
    line-height: 42px;
  }
`;

const Title = styled.p`
  color: #ff5948;
  font-family: ${FONT.oktaNeue};
  font-size: 20px;

  @media ${breakpoints.sm} {
    font-size: 18px;
  }
`;

/* ================= SERVICES LIST ================= */

const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

/* ================= SERVICE CARD ================= */

const ServiceCard = styled.div<{ $isActive: boolean }>`
  background: ${({ $isActive }) => ($isActive ? "#000" : "#fff")};
  border: 1px solid ${({ $isActive }) => ($isActive ? "#000" : "#e0e0e0")};
  border-radius: 12px;
  padding: ${({ $isActive }) => ($isActive ? "40px" : "32px 40px")};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media ${breakpoints.md} {
    padding: ${({ $isActive }) => ($isActive ? "32px" : "24px 32px")};
  }

  @media ${breakpoints.sm} {
    padding: ${({ $isActive }) => ($isActive ? "24px" : "20px 24px")};
  }
`;

/* ================= CARD HEADER ================= */

const CardHeader = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;

  @media ${breakpoints.md} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;

  @media ${breakpoints.sm} {
    gap: 16px;
  }
`;

const Number = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? "#ff5948" : "#1e1e1e")};
  font-family: ${FONT.alphaLyrae};
  font-size: 48px;
  font-weight: 500;
  line-height: 1;
  transition: color 0.3s ease;

  @media ${breakpoints.md} {
    font-size: 40px;
  }

  @media ${breakpoints.sm} {
    font-size: 32px;
  }
`;

const ServiceTitle = styled.h3<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#1e1e1e")};
  font-family: ${FONT.alphaLyrae};
  font-size: 36px;
  font-weight: 500;
  text-transform: uppercase;
  transition: color 0.3s ease;

  @media ${breakpoints.lg} {
    font-size: 32px;
  }

  @media ${breakpoints.md} {
    font-size: 28px;
  }

  @media ${breakpoints.sm} {
    font-size: 24px;
  }
`;

const ArrowIcon = styled.div<{ $isActive: boolean }>`
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.4s ease;
  transform: ${({ $isActive }) =>
        $isActive ? "rotate(90deg)" : "rotate(0deg)"};

  svg {
    width: 100%;
    height: 100%;
  }

  /* Background shape */
  svg path:nth-child(1) {
    fill: ${({ $isActive }) => ($isActive ? "#FF5948" : "#FFEEED")};
    transition: fill 0.3s ease;
  }

  /* Dashed stroke (hide on active) */
  svg path:nth-child(2) {
    opacity: ${({ $isActive }) => ($isActive ? 0 : 1)};
    transition: opacity 0.3s ease;
  }

  /*  Arrow */
  svg path:nth-child(3) {
    stroke: ${({ $isActive }) => ($isActive ? "#FFFFFF" : "#FF5948")};
    transition: stroke 0.3s ease;
  }

  @media ${breakpoints.sm} {
    width: 48px;
    height: 48px;
  }
`;

/* ================= EXPANDED CONTENT ================= */

const ExpandedContent = styled.div<{ $isActive: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isActive }) => ($isActive ? "1fr" : "0fr")};
  transition: grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: ${({ $isActive }) => ($isActive ? "32px" : "0")};

  @media ${breakpoints.md} {
    margin-top: ${({ $isActive }) => ($isActive ? "24px" : "0")};
  }
`;

const ExpandedInner = styled.div`
  overflow: hidden;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;

  @media ${breakpoints.lg} {
    gap: 32px;
  }

  @media ${breakpoints.md} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media ${breakpoints.sm} {
    gap: 8px;
  }
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: ${FONT.oktaNeue};
  font-size: 14px;

  @media ${breakpoints.sm} {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

const Description = styled.p`
  color: #afafaf;
  font-family: ${FONT.oktaNeue};
  font-size: 16px;
  line-height: 24px;

  @media ${breakpoints.sm} {
    font-size: 14px;
    line-height: 22px;
  }
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media ${breakpoints.md} {
    margin-top: 20px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 16 / 10;
  position: relative;
  border-radius: 8px;
  overflow: hidden;

  img {
    object-fit: cover;
  }

  @media ${breakpoints.sm} {
    max-width: 100%;
  }
`;

/* ================= SERVICES DATA ================= */

type Service = {
    id: number;
    title: string;
    tags: string[];
    description: string;
    image?: string;
};

const services: Service[] = [
    {
        id: 1,
        title: "Front-End Development",
        tags: [
            "React",
            "Next.js",
            "GSAP",
            "Responsive UI",
            "Performance Optimization",
        ],
        description:
            "I’m a passionate Front-End Developer with experience building fast, responsive, and scalable user interfaces using React, Next.js, and modern web technologies.",
        image: ServiceImage,
    },
    {
        id: 2,
        title: "UI/UX Integration",
        tags: [
            "Figma to Code",
            "Framer",
            "Tailwind CSS",
            "Pixel-Perfect UI",
            "Design Systems",
        ],
        description:
            "I specialize in turning UI/UX designs into clean, functional, and pixel-perfect interfaces, ensuring smooth interaction and consistent user experience across all devices.",
        image: ServiceImage,
    },
    {
        id: 3,
        title: "Full-Stack Solutions",
        tags: [
            "Node.js",
            "Express",
            "MongoDB",
            "REST APIs",
            "Authentication",
        ],
        description:
            "I’m a passionate Front-End Developer with experience building dynamic, responsive, and modern web applications using React and Node.js.",
        image: ServiceImage,
    },
    {
        id: 4,
        title: "WordPress Customization",
        tags: [
            "Elementor",
            "WooCommerce",
            "Custom Themes",
            "Performance Optimization",
            "SEO Ready",
        ],
        description:
            "I build and customize WordPress websites with a focus on performance, flexibility, and clean design, using modern tools and custom solutions tailored to your needs.",
        image: ServiceImage,
    },
];


/* ================= MAIN COMPONENT ================= */

export default function Service() {
    const [activeId, setActiveId] = useState<number | null>(2);

    const handleCardClick = (id: number) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <Section>
            <Container>
                <IntroSection>
                    <SubTitle>What I Can Offer</SubTitle>
                    <Title>[Services]</Title>
                </IntroSection>

                <ServicesList>
                    {services.map((service) => {
                        const isActive = activeId === service.id;

                        return (
                            <ServiceCard
                                key={service.id}
                                $isActive={isActive}
                                onClick={() => handleCardClick(service.id)}
                            >
                                <CardHeader $isActive={isActive}>
                                    <LeftSection>
                                        <Number $isActive={isActive}>
                                            {service.id.toString().padStart(2, "0")}.
                                        </Number>
                                        <ServiceTitle $isActive={isActive}>{service.title}</ServiceTitle>
                                    </LeftSection>

                                    <ArrowIcon $isActive={isActive}>
                                        <svg
                                            viewBox="0 0 58 58"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M1 3.15385C1 1.96431 1.96431 1 3.15385 1L29 1C44.464 1 57 13.536 57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29L1 3.15385Z" />
                                            <path
                                                d="M1 3.15385C1 1.96431 1.96431 1 3.15385 1L29 1C44.464 1 57 13.536 57 29C57 44.464 44.464 57 29 57C13.536 57 1 44.464 1 29L1 3.15385Z"
                                                stroke="#FF5948"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeDasharray="4 6"
                                            />
                                            <path
                                                d="M34 34L24 24M24 24V34M24 24H34"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </ArrowIcon>
                                </CardHeader>

                                <ExpandedContent $isActive={isActive}>
                                    <ExpandedInner>
                                        <ContentGrid>
                                            <LeftContent>
                                                <TagsContainer>
                                                    {service.tags.map((tag, index) => (
                                                        <Tag key={index}>{tag}</Tag>
                                                    ))}
                                                </TagsContainer>
                                                <Description>{service.description}</Description>
                                            </LeftContent>

                                            <RightContent>
                                                <ImageWrapper>
                                                    <Image
                                                        src={service.image}
                                                        alt={service.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                                                    />
                                                </ImageWrapper>
                                            </RightContent>
                                        </ContentGrid>
                                    </ExpandedInner>
                                </ExpandedContent>
                            </ServiceCard>
                        );
                    })}
                </ServicesList>
            </Container>
        </Section>
    );
}