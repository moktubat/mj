"use client";
import { FONT } from "@/styles/font";
import { useState, useEffect } from "react";
import styled from "styled-components";

const HeroSection = styled.section`
  width: 100%;
  padding: 40px 10px 100px;
  background-color: #1e1e1e;
`;

const HeroContainer = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #fff;
  font-family: ${FONT.oktaNeue};
  font-size: 32px;
  font-weight: 400;
  line-height: 38px;
`;

const TitleWrapper = styled.div`
  display: inline-block;
`;

const MuktobatSpan = styled.span`
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 100%;
    height: 13px;
    background: 
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 163 13" fill="none"><path d="M0.0511627 5.19694C48.8545 2.69694 149.579 -1.30306 162.051 2.69694 M24.4528 11.6968C59.3608 10.0301 131.956 7.19678 143.072 9.19678" stroke="%23FFEEED" stroke-width="2"/></svg>') no-repeat;
    background-size: 100% 100%, 100% 100%;
  }
`;

const MainHeading = styled.h2`
  color: #fff;
  font-family: ${FONT.alphaLyrae};
  font-size: 172px;
  font-weight: 500;
  line-height: 0.95;
  margin: 40px 0;
  text-transform: uppercase;
  margin-left: -12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DeveloperLine = styled.span`
  display: flex;
  align-items: center;
  gap: 0;
`;

const OvalSVG = styled.svg`
  width: 300px;
  height: 80px;
  margin: 0 0.05em;
  display: inline-block;
  vertical-align: baseline;
  position: relative;
  top: 0.05em;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-family: ${FONT.oktaNeue};
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  max-width: 530px;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  cursor: pointer;
`;

const ButtonText = styled.span`
  color: #fff;
  text-align: center;
  font-family: ${FONT.oktaNeue};
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  padding: 16px 20px;
  border-radius: 100px;
  background: #ff5948;
`;

const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 100px 4px 100px 100px;
  background: #ff5948;
  width: 56px;
  height: 56px;

  svg {
    width: 24px;
    height: 24px;
    color: #fff;
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 56px; /* adjust to match button/experience height */
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3) 0,
    rgba(255, 255, 255, 0.3) 12px,
    transparent 12px,
    transparent 20px
  );
`;

const ExperienceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CounterNumber = styled.div`
  color: #fff;
  font-family: ${FONT.alphaLyrae};
  font-size: 64px;
  font-weight: 500;
  line-height: 64px;
  text-transform: uppercase;
`;

const CounterLabel = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-family: ${FONT.oktaNeue};
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
`;

const DownloadIconSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
        <path d="M8.75 10.75L8.75 0.75M8.75 10.75C8.04977 10.75 6.74153 8.7557 6.25 8.25M8.75 10.75C9.45023 10.75 10.7585 8.7557 11.25 8.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.75 12.75C16.75 15.232 16.232 15.75 13.75 15.75H3.75C1.268 15.75 0.75 15.232 0.75 12.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Hero = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const target = 3;
        const steps = 60;
        const increment = target / steps;
        const stepDuration = duration / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, []);

    return (
        <HeroSection>
            <HeroContainer>
                <TitleWrapper>
                    <Title>
                        Hi, I am <MuktobatSpan>Muktobat</MuktobatSpan>
                    </Title>
                </TitleWrapper>

                <MainHeading>
                    Front-End
                    <DeveloperLine>
                        Devel
                        <OvalSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" fill="none">
                            <path d="M40 7H260C278.225 7 293 21.7746 293 40C293 58.2254 278.225 73 260 73H40C21.7746 73 7 58.2254 7 40C7 21.7746 21.7746 7 40 7Z" stroke="white" strokeWidth="14" />
                        </OvalSVG>
                        per
                    </DeveloperLine>
                </MainHeading>

                <BottomSection>
                    <Description>
                        A Freelance Front-End Developer based in Dhaka, specializing in building modern,
                        sustainable, and high-performing websites.
                    </Description>

                    <DownloadButton
                        href="/resume.pdf"
                        download
                    >
                        <ButtonText>Download Resume</ButtonText>
                        <ButtonIcon>
                            <DownloadIconSVG />
                        </ButtonIcon>
                    </DownloadButton>

                    <VerticalDivider />

                    <ExperienceBox>
                        <CounterNumber>
                            {count.toString().padStart(2, '0')}+
                        </CounterNumber>
                        <CounterLabel>Years of experience</CounterLabel>
                    </ExperienceBox>
                </BottomSection>
            </HeroContainer>
        </HeroSection>
    );
};

export default Hero;
