"use client";
import { useState, useRef } from "react";
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
import gsap from "gsap";

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
  background-color: #d9d9d9;
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
  background: #ff5948;
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
  background: #ff5948;
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
  text-transform: uppercase;
  text-decoration: none;
  display: inline-flex;
  position: relative;
  overflow: hidden;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.9);
  width: fit-content;

  /* CRITICAL: Apply scaleX to make letters pixelated */
  transform: scaleX(0.96);
  transform-origin: left;

  .layer {
    display: block;
    /* Inherit the parent's transform */
  }

  .layer.top {
    color: rgba(255, 255, 255, 0.9);
  }

  .layer.bottom {
    position: absolute;
    left: 0;
    top: 0;
    color: #ff5948;
    clip-path: inset(100% 0 0 0);
    will-change: clip-path;
  }

  &:visited {
    color: rgba(255, 255, 255, 0.9);
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

interface AnimatedNavLinkProps {
  href: string;
  children: string;
}

const AnimatedNavLink = ({ href, children }: AnimatedNavLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const enter = () => {
    const bottom = linkRef.current?.querySelector(".bottom");
    if (!bottom) return;

    gsap.to(bottom, {
      clipPath: "inset(0% 0 0 0)",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const leave = () => {
    const bottom = linkRef.current?.querySelector(".bottom");
    if (!bottom) return;

    gsap.to(bottom, {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <NavLink href={href} ref={linkRef} onMouseEnter={enter} onMouseLeave={leave}>
      <span className="layer top">{children}</span>
      <span className="layer bottom">{children}</span>
    </NavLink>
  );
};


const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <FooterSection>
      <FooterContainer>
        {/* Top Section */}
        <TopSection>
          <ContactText>Contact Me</ContactText>
          <ContactIcons>
            <IconWrapper>
              <PhoneIcon />
            </IconWrapper>
            <IconWrapper>
              <MailIcon />
            </IconWrapper>
            <IconWrapper>
              <LocationIcon />
            </IconWrapper>
          </ContactIcons>
        </TopSection>

        {/* Middle Section */}
        <MiddleSection>
          <LeftMiddle>
            <GetInTouch>GET IN TOUCH</GetInTouch>
            <Divider />
            <LeftText>
              A Freelance Front-End Developer based in Dhaka, specializing in <br />
              building modern, sustainable, and high-performing websites.
            </LeftText>
            <SocialIcons>
              <SocialIconWrapper>
                <FacebookIcon />
              </SocialIconWrapper>
              <SocialIconWrapper>
                <LinkedInIcon />
              </SocialIconWrapper>
              <SocialIconWrapper>
                <GithubIcon />
              </SocialIconWrapper>
            </SocialIcons>
          </LeftMiddle>

          <RightMiddle>
            <RightTitle>BASED IN: DHAKA BANGLADESH</RightTitle>
            <RightTitle>Mobile No: +880 17849 35773</RightTitle>
            <RightTitle>Email: MoktubatJaman@gmail.com</RightTitle>

            <NavLinks>
              <AnimatedNavLink href="#home">Home</AnimatedNavLink>
              <AnimatedNavLink href="#about">About Me</AnimatedNavLink>
              <AnimatedNavLink href="#projects">Projects</AnimatedNavLink>
              <AnimatedNavLink href="#process">Working Process</AnimatedNavLink>
              <AnimatedNavLink href="#reviews">Reviews</AnimatedNavLink>
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