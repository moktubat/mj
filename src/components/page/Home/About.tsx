"use client";
import { FONT } from "@/styles/font";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const AboutSection = styled.section`
  background: #D9D9D9;
  padding: 80px 10px;
`;

const AboutContainer = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

const IntroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-bottom: 60px;
`;

const Tag = styled.p`
color: #ff5948;
font-family: ${FONT.oktaNeue};
font-size: 20px;
line-height: 28px;
font-weight: 400;
`;

const IntroHeading = styled.h2`
  color: #afafaf;
  font-family: ${FONT.alphaLyrae};
  font-size: 64px;
  font-weight: 500;
  line-height: 72px;
  text-transform: uppercase;
  margin: 0;
`;

const ContentSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 60px;
  margin-bottom: 60px;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const LeftContent = styled.p`
  color: #6a6a6a;
  font-family: ${FONT.oktaNeue};
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin: 0;
  flex: 1;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 300px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1e1e1e;
  font-family: ${FONT.oktaNeue};
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  margin-left: -10px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    #c9c9c9 0,
    #c9c9c9 12px,
    transparent 12px,
    transparent 20px
  );
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SocialIconWrapper = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 100px;
  background: #F3EBF3;
  transition: background 0.3s ease;

  svg {
    width: 24px;
    height: 24px;
    transition: stroke 0.3s ease;
  }

  &:hover {
    background: #FF5948;

    svg path {
      stroke: #ffffff;
    }
  }
`;

const CountSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 80px;
  flex-wrap: wrap;
`;

const CountBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const CountNumber = styled.div`
  color: #1e1e1e;
  font-family: ${FONT.alphaLyrae};
  font-size: 92px;
  font-weight: 500;
  line-height: 90px;
  letter-spacing: -3.68px;
  text-transform: uppercase;
  text-align: center;
`;

const CountLabel = styled.div`
  color: #6a6a6a;
  font-family: ${FONT.oktaNeue};
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
  text-align: center;
`;

// SVG Icons
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1937 17.2745C18.1008 17.4871 17.9644 17.678 17.7934 17.8349C17.6224 17.9918 17.4205 18.1113 17.2006 18.1856C16.9808 18.26 16.7478 18.2876 16.5167 18.2667C13.9523 17.9881 11.4892 17.1118 9.32498 15.7084C7.31151 14.4289 5.60443 12.7219 4.32499 10.7084C2.91663 8.53438 2.04019 6.0592 1.76665 3.48337C1.74583 3.25293 1.77321 3.02067 1.84707 2.80139C1.92092 2.58211 2.03963 2.38061 2.19562 2.20972C2.35162 2.03883 2.54149 1.9023 2.75314 1.80881C2.9648 1.71532 3.1936 1.66692 3.42499 1.66671H5.92499C6.32941 1.66273 6.72148 1.80594 7.02812 2.06965C7.33476 2.33336 7.53505 2.69958 7.59165 3.10004C7.69717 3.9001 7.89286 4.68565 8.17499 5.44171C8.2871 5.73998 8.31137 6.06414 8.24491 6.37577C8.17844 6.68741 8.02404 6.97347 7.79998 7.20004L6.74165 8.25837C7.92795 10.3447 9.65536 12.0721 11.7417 13.2584L12.8 12.2C13.0266 11.976 13.3126 11.8216 13.6243 11.7551C13.9359 11.6887 14.26 11.7129 14.5583 11.825C15.3144 12.1072 16.0999 12.3029 16.9 12.4084C17.3048 12.4655 17.6745 12.6694 17.9388 12.9813C18.203 13.2932 18.3435 13.6914 18.3333 14.1Z" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.3333 5.00004C18.3333 4.08337 17.5833 3.33337 16.6666 3.33337H3.33329C2.41663 3.33337 1.66663 4.08337 1.66663 5.00004M18.3333 5.00004V15C18.3333 15.9167 17.5833 16.6667 16.6666 16.6667H3.33329C2.41663 16.6667 1.66663 15.9167 1.66663 15V5.00004M18.3333 5.00004L9.99996 10.8334L1.66663 5.00004" stroke="#6A6A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 9H2V21H6V9Z" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 19.0001C4 20.5001 4 16.5001 2 16.0001M16 22.0001V18.1301C16.0375 17.6532 15.9731 17.1739 15.811 16.7239C15.6489 16.2738 15.3929 15.8635 15.06 15.5201C18.2 15.1701 21.5 13.9801 21.5 8.52006C21.4997 7.12389 20.9627 5.78126 20 4.77006C20.4559 3.54857 20.4236 2.19841 19.91 1.00006C19.91 1.00006 18.73 0.65006 16 2.48006C13.708 1.85888 11.292 1.85888 9 2.48006C6.27 0.65006 5.09 1.00006 5.09 1.00006C4.57638 2.19841 4.54414 3.54857 5 4.77006C4.03013 5.78876 3.49252 7.14352 3.5 8.55006C3.5 13.9701 6.8 15.1601 9.94 15.5501C9.611 15.89 9.35726 16.2955 9.19531 16.74C9.03335 17.1845 8.96681 17.6581 9 18.1301V22.0001" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const About = () => {
  const [yearsCount, setYearsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const animateCount = (target, setter, duration = 2000) => {
      const steps = 60;
      const increment = target / steps;
      const stepDuration = duration / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, stepDuration);

      return timer;
    };

    const timer1 = animateCount(3, setYearsCount);
    const timer2 = animateCount(50, setProjectsCount);
    const timer3 = animateCount(30, setClientsCount);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, []);

  return (
    <AboutSection>
      <AboutContainer>
        <IntroSection>
          <Tag>[About]</Tag>
          <IntroHeading>
            A Passionate Front-End Developer Crafting Modern, Responsive, and Interactive Websites.
          </IntroHeading>
        </IntroSection>

        <ContentSection>
          <LeftContent>
            I'm a passionate Front-End Developer with experience <br /> building dynamic, responsive, and modern web <br /> applications using React and Node.js.
          </LeftContent>

          <RightContent>
            <ContactItem>
              <IconWrapper>
                <PhoneIcon />
              </IconWrapper>
              +880 17849 35773
            </ContactItem>
            <Divider />

            <ContactItem>
              <IconWrapper>
                <MailIcon />
              </IconWrapper>
              MoktubatJaman@gmail.com
            </ContactItem>
            <Divider />

            <SocialIcons>
              <SocialIconWrapper
                href="https://facebook.com"
                target="_blank"
              >
                <FacebookIcon />
              </SocialIconWrapper>
              <SocialIconWrapper
                href="https://linkedin.com"
                target="_blank"
              >
                <LinkedInIcon />
              </SocialIconWrapper>
              <SocialIconWrapper
                href="https://github.com"
                target="_blank"
              >
                <GithubIcon />
              </SocialIconWrapper>
            </SocialIcons>
          </RightContent>
        </ContentSection>

        <CountSection>
          <CountBox>
            <CountNumber>{yearsCount.toString().padStart(2, '0')}+</CountNumber>
            <CountLabel>Years of experience</CountLabel>
          </CountBox>

          <CountBox>
            <CountNumber>{projectsCount.toString().padStart(2, '0')}+</CountNumber>
            <CountLabel>Projects completed</CountLabel>
          </CountBox>

          <CountBox>
            <CountNumber>{clientsCount.toString().padStart(2, '0')}+</CountNumber>
            <CountLabel>Happy clients</CountLabel>
          </CountBox>
        </CountSection>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;