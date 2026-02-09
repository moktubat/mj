"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";

import PhoneIcon from "@/assets/phone.svg";
import MailIcon from "@/assets/mail.svg";
import LocationIcon from "@/assets/location.svg";
import FacebookIcon from "@/assets/facebook.svg";
import LinkedInIcon from "@/assets/linkedin.svg";
import GithubIcon from "@/assets/github.svg";
import MahadyIcon from "@/assets/mahady.svg";
import { FONT } from "@/styles/font";

const FooterSection = styled.footer`
  background-color: #1e1e1e;
  padding: 80px 10px 32px;
  color: #fff;
`;

const FooterContainer = styled.div`
max-width: 1320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;


const TopSection = styled.div`
  background-color: #D9D9D9;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  align-items: center;

  @media (max-width: ${breakpoints.lg}) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ContactText = styled.h2`
  color: #1e1e1e;
  font-family: ${FONT.oktaNeue};
  font-size: 30px;
  font-weight: 600;
  text-transform: uppercase;
`;

const ContactIcons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  background: #FF5948;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const MiddleSection = styled.div`
  display: flex;
  gap: 180px;
  flex-wrap: wrap;
  
`;

const LeftMiddle = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 616px;
`;

const GetInTouch = styled.h3`
  color: #fff;
  font-family: ${FONT.alphaLyrae};
  font-size: 90px;
  font-weight: 500;
  line-height: 124px;
  text-transform: uppercase;
  transform: scaleX(0.96);
  transform-origin: left;
`;

const Divider = styled.hr`
max-width: 585px;
  border: 0;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    rgba(255, 255, 255, 0.3) 0,
    rgba(255, 255, 255, 0.3) 12px,
    transparent 12px,
    transparent 20px
  );
  margin: 0 0 20px 0;
`;

const LeftText = styled.p`
  font-family: ${FONT.oktaNeue};
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto; 
`;

const SocialIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: #FF5948; /* or any other color */
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const RightMiddle = styled.div`
  margin-top: 24px;
`;

const RightTitle = styled.h4`
  font-family: ${FONT.alphaLyrae};
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  transform: scaleX(0.96);
  transform-origin: left;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 16px;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 100px;
  flex-wrap: wrap;
`;

const NavLink = styled.a`
  font-family: ${FONT.alphaLyrae};
  font-size: 28px;
  font-weight: 500;
  transform: scaleX(0.96);
  transform-origin: left;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  line-height: 1.2;
  display: inline-flex;
  overflow: hidden;
  width: fit-content;
  padding: 0.1em 0;

  &:visited {
    color: rgba(255, 255, 255, 0.9);
  }

  &::selection {
    background: transparent;
  }

  span {
    display: inline-block;
    text-shadow: 0 1.2em #FF5948;
    transition: translate 800ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--trans-delay);
  }

  ${[...Array(20)].map((_, i) => `
    span:nth-child(${i + 1}) {
      --trans-delay: ${i * 30}ms;
    }
  `).join('')}

  &:hover span {
    translate: 0 -1.2em;
  }
`;

const FooterDivider = styled.hr`
  border: 0;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    rgba(255, 255, 255, 0.3) 0,
    rgba(255, 255, 255, 0.3) 12px,
    transparent 12px,
    transparent 20px
  );
  margin: 0 0 20px 0;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: -20px;
`;

const BottomLeft = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-family: "Okta Neue", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const BottomRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BottomRightText = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-family: "Okta Neue", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  span {
    color: #fff;
  }
`;


const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <FooterSection>
      <FooterContainer>
        {/* Top Section */}
        <TopSection>
          <ContactText>Contact Me</ContactText>
          <ContactIcons>
            <IconWrapper><PhoneIcon /></IconWrapper>
            <IconWrapper><MailIcon /></IconWrapper>
            <IconWrapper><LocationIcon /></IconWrapper>
          </ContactIcons>
        </TopSection>

        {/* Middle Section */}
        <MiddleSection>
          <LeftMiddle>
            <GetInTouch>GET IN TOUCH</GetInTouch>
            <Divider />
            <LeftText>
              A Freelance Front-End Developer based in Dhaka, specializing in <br /> building modern, sustainable, and high-performing websites.
            </LeftText>
            <SocialIcons>
              <SocialIconWrapper><FacebookIcon /></SocialIconWrapper>
              <SocialIconWrapper><LinkedInIcon /></SocialIconWrapper>
              <SocialIconWrapper><GithubIcon /></SocialIconWrapper>
            </SocialIcons>
          </LeftMiddle>

          <RightMiddle>
            <RightTitle>BASED IN: DHAKA BANGLADESH</RightTitle>
            <RightTitle>Mobile No: +880 17849 35773</RightTitle>
            <RightTitle>Email: MoktubatJaman@gmail.com</RightTitle>
            <NavLinks>
              <NavLink href="#home">
                {'Home'.split('').map((letter, i) => (
                  <span key={i}>{letter}</span>
                ))}
              </NavLink>
              <NavLink href="#about">
                {'About Me'.split('').map((letter, i) => (
                  <span key={i}>{letter === ' ' ? '\u00A0' : letter}</span>
                ))}
              </NavLink>
              <NavLink href="#projects">
                {'Projects'.split('').map((letter, i) => (
                  <span key={i}>{letter}</span>
                ))}
              </NavLink>
              <NavLink href="#process">
                {'Working Process'.split('').map((letter, i) => (
                  <span key={i}>{letter === ' ' ? '\u00A0' : letter}</span>
                ))}
              </NavLink>
              <NavLink href="#reviews">
                {'Reviews'.split('').map((letter, i) => (
                  <span key={i}>{letter}</span>
                ))}
              </NavLink>
            </NavLinks>
          </RightMiddle>
        </MiddleSection>

        <FooterDivider />
        <BottomSection>
          <BottomLeft>© {currentYear} Moktubat Jaman, All Rights Reserved</BottomLeft>

          <BottomRight>
            <BottomRightText>
              Designed By: <MahadyIcon /> <span>Mahady Hasan</span>
            </BottomRightText>
          </BottomRight>
        </BottomSection>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;
