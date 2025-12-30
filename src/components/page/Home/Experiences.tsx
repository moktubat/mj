'use client';

import { FONT } from "@/styles/font";
import styled from "styled-components";

const ExperiencesSection = styled.section`
  padding: 80px 10px;
`;

const ExperiencesContainer = styled.div`
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

/* -------------------- NEW EXPERIENCE SECTION -------------------- */




const Left = styled.div`
  color: #6A6A6A;
  font-family: ${FONT.oktaNeue};
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  transition: all 0.3s ease;
`;

const Middle = styled.div`
  text-align: center;
`;

const Role = styled.p`
  color: #1E1E1E;
  font-family: ${FONT.alphaLyrae};
  font-size: 36px;
  font-weight: 500;
  line-height: 44px;
  text-transform: uppercase;
  transform: scaleX(0.95);
  transform-origin: left;
  transition: all 0.3s ease;
`;

const Mode = styled.p`
  color: #6A6A6A;
  font-family: ${FONT.oktaNeue};
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  transition: all 0.3s ease;
`;

const Right = styled.div`
  text-align: right;
  color: #6A6A6A;
  font-family: ${FONT.oktaNeue};
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  transition: all 0.3s ease;
`;

const WorkExperienceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 120px;
  transition: min-height 0.3s ease;

  &:hover .logo-box {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  &:hover ${Left} {
    color: #1E1E1E;
  }

  &:hover ${Right} {
    color: #1E1E1E;
  }

  &:hover ${Role} {
    color: #FF5948;
    font-size: 56px;
    line-height: 74px;
  }

  &:hover ${Mode} {
    font-size: 24px;
    line-height: 32px;
  }
`;

/* Logo Hover Box */
const LogoBox = styled.div`
  position: absolute;
  left: 75%;
  top: 50%;
  transform: translate(-50%, 20px);
  opacity: 0;
  transition: all 0.3s ease;

  width: 80px;
  height: 80px;
  background: #F3EBF3;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  .logo-img {
    width: 54px;
    height: 54px;
    object-fit: contain;
  }
`;

const Separator = styled.div`
  height: 1px;
  margin: 52px 0 32px 0;
  background: repeating-linear-gradient(
    to right,
    #c9c9c9 0,
    #c9c9c9 12px,
    transparent 12px,
    transparent 20px
  );
`;


/* ---------------- JSON DATA ---------------- */

const EXPERIENCE_DATA = [
  {
    date: "Feb 2024 - Present",
    role: "Front-end Developer",
    mode: "Onsite",
    company: "Jamroll Limited",
    logo: "/vercel.svg"
  },
  {
    date: "Dec 2023 - Jun 2024",
    role: "Executive Officer",
    mode: "Onsite",
    company: "Prayers Connect Inc.",
    logo: "/vercel.svg"
  },
  {
    date: "Sep 2020 - Jan 2024",
    role: "Executive Officer",
    mode: "Onsite",
    company: "Technobizz Solutions Limited",
    logo: "/vercel.svg"
  }
];

const Experiences = () => {
  return (
    <ExperiencesSection>
      <ExperiencesContainer>
        <IntroSection>
          <SubTitle>Career Growth Journey</SubTitle>
          <Title>[Working Experiences]</Title>
        </IntroSection>

        {/* Render from JSON loop */}
        {EXPERIENCE_DATA.map((item, index) => (
          <div key={index}>
            <WorkExperienceSection>
              <Left>{item.date}</Left>

              <Middle>
                <Role>{item.role}</Role>
                <Mode>{item.mode}</Mode>
              </Middle>

              <LogoBox className="logo-box">
                <img className="logo-img" src={item.logo} alt={item.company + " Logo"} />
              </LogoBox>

              <Right>{item.company}</Right>
            </WorkExperienceSection>

            <Separator />
          </div>
        ))}

      </ExperiencesContainer>
    </ExperiencesSection>
  );
};

export default Experiences;
