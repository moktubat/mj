"use client";

import { FONT } from "@/styles/font";
import { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ServiceImage from "@/assets/ServiceImage.webp";
import Image from "next/image";

/* -----------------------------------
    STYLES
----------------------------------- */

const ServicesSection = styled.section`
  padding: 80px 10px;
`;

const ServicesContainer = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

const IntroSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
`;

const SubTitle = styled.h2`
  color: #1e1e1e;
  font-family: ${FONT.alphaLyrae};
  font-size: 72px;
  font-weight: 500;
  line-height: 84px;
  text-transform: uppercase;
  transform: scaleX(0.96);
  transform-origin: left;
`;

const Title = styled.p`
  color: #ff5948;
font-family: ${FONT.oktaNeue};
font-size: 20px;
line-height: 28px;
font-weight: 400;
`;

const ServicesGrid = styled.div`
  display: flex;
  gap: 20px;
`;

const ServiceCard = styled.div<{ $active: boolean }>`
  background: #e7e7e7;
  padding: 24px;
  border-radius: 16px;
  cursor: pointer;
  transition: flex 0.5s ease, opacity 0.4s ease;
  overflow: hidden;

  flex: ${({ $active }) => ($active ? 2 : 0.8)};
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};

  height: 455px;
  align-self: flex-start;
`;

/* ----- Header with mode switching ----- */
const CardHeader = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: ${({ $active }) =>
    $active ? "space-between" : "flex-start"};
  align-items: flex-start;
  flex-direction: ${({ $active }) => ($active ? "row" : "column")};
  gap: ${({ $active }) => ($active ? "10px" : "12px")};
`;

const CardNumber = styled.div<{ $active: boolean }>`
  font-family: "Okta Neue";
  font-size: 18px;
  white-space: nowrap;
  color: ${({ $active }) => ($active ? "#FF5948" : "#6A6A6A")};
`;

const CardTitle = styled.h3<{ $active: boolean }>`
  font-family: ${FONT.alphaLyrae};
  font-weight: 500;
  font-size: ${({ $active }) => ($active ? "40px" : "20px")};
  line-height: ${({ $active }) => ($active ? "40px" : "28px")};
  text-transform: uppercase;
`;

/* ----- Active Expanded Area ----- */

const ActiveDetails = styled.div`
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: opacity 0.6s ease, height 0.7s ease;

  &.show {
    opacity: 1;
    height: auto;
  }
`;

const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin: 40px 0;
`;

const TechList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-family: ${FONT.alphaLyrae};
    font-size: 18px;
    text-transform: uppercase;
    color: #6a6a6a;
  }
`;

const PreviewImage = styled(Image)`
  width: 288px;
  height: 178px;
  object-fit: cover;
  border-radius: 12px;
`;

const Description = styled.p`
  font-family: ${FONT.oktaNeue};
  font-size: 16px;
  line-height: 24px;
`;

/* -----------------------------------
    DATA
----------------------------------- */

const serviceData = [
  {
    id: "00-1",
    title: "Front-End <br/> Development",
    tech: ["/React", "/Next", "/GSAP"],
    image: ServiceImage,
    description:
      "Expert Front-End Development with React and Next.js, creating fast, responsive, and interactive web applications for modern businesses.",
  },
  {
    id: "00-2",
    title: "UI/UX <br/> Integration",
    tech: ["/Figma", "/Framer", "/Tailwind"],
    image: ServiceImage,
    description:
      "Professional UI/UX Integration using Figma and Framer, crafting visually appealing and user-friendly designs to enhance web experiences.",
  },
  {
    id: "00-3",
    title: "Full-Stack <br/> Solutions",
    tech: ["/Node", "/Express", "/MongoDB"],
    image: ServiceImage,
    description:
      "Reliable Full-Stack Solutions with Node, Express, and MongoDB to build scalable, secure, and high-performance web applications efficiently.",
  },
  {
    id: "00-4",
    title: "WordPress <br/> Customization",
    tech: ["/Elementor", "/WooCommerce", "/Custom"],
    image: ServiceImage,
    description:
      "Customized WordPress Development with Elementor and WooCommerce, delivering responsive, SEO-optimized, and tailored websites for clients.",
  },
];

/* -----------------------------------
    COMPONENT
----------------------------------- */

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(2); // auto-open 3rd
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    if (!cardsRef.current[activeIndex]) return;
    const card = cardsRef.current[activeIndex];

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      card.querySelector(".details"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    tl.fromTo(
      card.querySelectorAll(".tech-item"),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.12, duration: 0.6 },
      "-=0.5"
    );

    tl.fromTo(
      card.querySelector(".image"),
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.7 },
      "-=0.4"
    );
  }, [activeIndex]);

  return (
    <ServicesSection>
      <ServicesContainer>
        <IntroSection>
          <SubTitle>What I Can Offer</SubTitle>
          <Title>[Services]</Title>
        </IntroSection>

        <ServicesGrid>
          {serviceData.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <ServiceCard
                key={i}
                $active={isActive}
                ref={(el) => (cardsRef.current[i] = el)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {/* Header */}
                <CardHeader $active={isActive}>
                  <CardNumber $active={isActive}>{item.id}</CardNumber>

                  <CardTitle
                    $active={isActive}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                </CardHeader>

                {/* Always mounted – smooth transition */}
                <ActiveDetails
                  className={`details ${isActive ? "show" : "hide"}`}
                >
                  <DetailsRow>
                    <TechList>
                      {item.tech.map((t, idx) => (
                        <span key={idx} className="tech-item">
                          {t}
                        </span>
                      ))}
                    </TechList>

                    <PreviewImage
                      src={item.image}
                      alt="Service Preview"
                      className="image"
                    />
                  </DetailsRow>

                  <Description>{item.description}</Description>
                </ActiveDetails>
              </ServiceCard>
            );
          })}
        </ServicesGrid>
      </ServicesContainer>
    </ServicesSection>
  );
};

export default Services;
