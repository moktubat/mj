"use client";
import { FONT } from "@/styles/font";
import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import gsap from "gsap";

/* ----------------- ANIMATIONS ----------------- */
const drawBody = (length: number) => keyframes`
  0%   { stroke-dashoffset: ${length}; }
  40%  { stroke-dashoffset: 0; }
  60%  { stroke-dashoffset: 0; }
  80%  { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: ${length}; }
`;

const drawHead = (length: number) => keyframes`
  0%   { stroke-dashoffset: ${length}; }
  40%  { stroke-dashoffset: ${length}; }
  60%  { stroke-dashoffset: 0; }
  80%  { stroke-dashoffset: ${length}; }
  100% { stroke-dashoffset: ${length}; }
`;

/* ----------------- STYLED COMPONENTS ----------------- */
const HeroSection = styled.section`
  width: 100%;
  padding: 40px 10px 40px;
  background-color: #1e1e1e;
  position: relative;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  z-index: 0;
`;

const HeroContainer = styled.div`
  max-width: 1320px;
  height: 100dvh;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 163 13" fill="none"><path d="M0.0511627 5.19694C48.8545 2.69694 149.579 -1.30306 162.051 2.69694 M24.4528 11.6968C59.3608 10.0301 131.956 7.19678 143.072 9.19678" stroke="%23FFEEED" strokeWidth="2"/></svg>') no-repeat;
    background-size: 100% 100%, 100% 100%;
  }
`;

const MainHeading = styled.h2`
  margin: 60px 0;
  display: flex;
  gap: 48px;
  flex-direction: column;
  align-items: flex-start;
`;

const DeveloperLine = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AnimatedSVG = styled.svg`
  will-change: transform, opacity;
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
  height: 56px;
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

/* ----------------- SVG ARROW ----------------- */
const SvgWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["bodyLength", "headLength"].includes(prop),
}) <{ bodyLength: number; headLength: number }>`
  position: absolute;
  bottom: 105px;
  right: 105px;

  .arrow-body {
    stroke: #FDF5FD;
    stroke-width: 2;
    fill: none;
    stroke-dasharray: ${(props) => props.bodyLength};
    stroke-dashoffset: ${(props) => props.bodyLength};
    animation: ${(props) => drawBody(props.bodyLength)} 5s ease-in-out infinite;
  }

  .arrow-head {
    stroke: #FDF5FD;
    stroke-width: 2;
    fill: none;
    stroke-dasharray: ${(props) => props.headLength};
    stroke-dashoffset: ${(props) => props.headLength};
    animation: ${(props) => drawHead(props.headLength)} 5s ease-in-out infinite;
  }
`;

const SvgArrow = () => {
  const bodyRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGPathElement>(null);
  const [bodyLength, setBodyLength] = useState(0);
  const [headLength, setHeadLength] = useState(0);

  useEffect(() => {
    if (!bodyRef.current || !headRef.current) return;

    const bodyLen = bodyRef.current.getTotalLength();
    const headLen = headRef.current.getTotalLength();

    setBodyLength(bodyLen);
    setHeadLength(headLen);
  }, []);

  return (
    <SvgWrapper bodyLength={bodyLength} headLength={headLength}>
      <svg xmlns="http://www.w3.org/2000/svg" width="134" height="130" viewBox="0 0 134 130" fill="none">
        <path
          ref={bodyRef}
          className="arrow-body"
          d="M102.555 1C102.555 1 145.93 41.6549 129.134 58.6398C119.019 68.8688 105.332 75.6186 93.8279 66.9876C86.8955 61.7863 82.7233 55.1583 87.4807 47.9068C92.0763 40.902 100.275 40.1955 108.109 43.1366C127.621 50.462 126.806 82.473 112.87 97.9938C98.0372 114.512 60.5046 113.199 53.7612 92.0311C51.4998 84.9325 50.2913 75.8004 56.5381 71.7578C62.9401 67.6146 70.9908 73.4838 73.9929 80.5031C77.5632 88.8509 71.7613 108.294 59.7117 118.665C42.2858 133.662 1 115.087 1 115.087"
        />
        <path
          ref={headRef}
          className="arrow-head"
          d="M1 115.087L11.3142 129M1 115.087L15.2812 109.522"
        />
      </svg>
    </SvgWrapper>
  );
};

/* ----------------- DOWNLOAD ICON ----------------- */
const DownloadIconSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
    <path d="M8.75 10.75L8.75 0.75M8.75 10.75C8.04977 10.75 6.74153 8.7557 6.25 8.25M8.75 10.75C9.45023 10.75 10.7585 8.7557 11.25 8.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.75 12.75C16.75 15.232 16.232 15.75 13.75 15.75H3.75C1.268 15.75 0.75 15.232 0.75 12.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ----------------- HERO COMPONENT ----------------- */
const Hero = () => {
  const [count, setCount] = useState(0);

  // Refs for the 4 SVGs
  const frontEndRef = useRef<SVGSVGElement>(null);
  const developerRef = useRef<SVGSVGElement>(null);
  const operRef = useRef<SVGSVGElement>(null);
  const perRef = useRef<SVGSVGElement>(null);

  // Counter animation
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

  // Premium choreographed text animation
  useEffect(() => {
    if (!frontEndRef.current || !developerRef.current || !operRef.current || !perRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power3.out" }
    });

    // Set initial states
    gsap.set([frontEndRef.current, developerRef.current, operRef.current, perRef.current], {
      opacity: 0,
      y: 30,
    });

    // === ENTRANCE PHASE (0-4s) ===

    // 1. FRONT-END - Fade up with slight scale
    tl.to(frontEndRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
    }, 0);

    // 2. DEVELOPER - Fade up with delay
    tl.to(developerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }, 0.3);

    // 3. OPER (circle) - Elastic scale
    tl.fromTo(operRef.current,
      {
        opacity: 0,
        scale: 0,
        rotation: -180,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
      },
      0.6
    );

    // 4. PER - Fade up with bounce
    tl.to(perRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.4)",
    }, 0.9);

    // === HOLD VISIBLE (4-10s) ===
    tl.to({}, { duration: 6 });

    // === EXIT PHASE (10-11s) ===
    tl.to([frontEndRef.current, developerRef.current, operRef.current, perRef.current], {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: "power2.in",
      stagger: 0.1,
    });

    // === REST PERIOD (11-13s) ===
    tl.to({}, { duration: 2 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <HeroSection>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/bgVideo.mp4" type="video/mp4" />
      </VideoBackground>

      <HeroContainer>
        <TitleWrapper>
          <Title>
            Hi, I am <MuktobatSpan>Muktobat</MuktobatSpan>
          </Title>
        </TitleWrapper>

        <MainHeading>
          {/* FRONT-END SVG */}
          <AnimatedSVG
            ref={frontEndRef}
            xmlns="http://www.w3.org/2000/svg"
            width="871"
            height="120"
            viewBox="0 0 871 120"
            fill="none"
          >
            <path d="M76.2364 2.60163V15.6098H15.4423V52.3577H68.4339V65.3659H15.4423V117.398H0V2.60163H76.2364Z" fill="white" />
            <path d="M169.89 104.553H179.643V117.398H160.299L130.39 71.5447H102.756V117.398H87.314V2.60163H138.355C145.507 2.60163 151.955 4.11925 157.699 7.15448C163.442 10.1897 167.939 14.3631 171.19 19.6748C174.441 24.8781 176.067 30.7317 176.067 37.2358C176.067 45.5827 173.52 52.7371 168.427 58.6992C163.334 64.5528 156.29 68.4553 147.295 70.4065L169.89 104.553ZM102.756 58.5366H137.38C144.532 58.5366 150.167 56.6396 154.285 52.8455C158.511 49.0515 160.624 43.9024 160.624 37.3984C160.624 31.1111 158.511 25.9079 154.285 21.7886C150.059 17.6694 144.586 15.6098 137.867 15.6098H102.756V58.5366Z" fill="white" />
            <path d="M238.621 120C228.109 120 218.681 117.344 210.337 112.033C201.993 106.612 195.491 99.3496 190.831 90.2439C186.171 81.0298 183.841 70.8943 183.841 59.8374C183.841 48.4553 186.171 38.2114 190.831 29.1057C195.491 20 201.939 12.8997 210.175 7.80488C218.519 2.60163 228.001 0 238.621 0C249.241 0 258.723 2.60163 267.067 7.80488C275.412 12.8997 281.86 20 286.411 29.1057C291.071 38.103 293.401 48.3469 293.401 59.8374C293.401 70.8943 291.071 81.0298 286.411 90.2439C281.751 99.3496 275.249 106.612 266.905 112.033C258.669 117.344 249.241 120 238.621 120ZM238.621 106.992C246.315 106.992 253.142 104.878 259.102 100.65C265.063 96.4228 269.668 90.7317 272.919 83.5772C276.279 76.4228 277.958 68.5095 277.958 59.8374C277.958 50.8401 276.333 42.8184 273.082 35.7724C269.831 28.6179 265.225 23.0352 259.265 19.0244C253.305 15.0136 246.423 13.0081 238.621 13.0081C230.927 13.0081 224.1 15.0136 218.14 19.0244C212.179 23.0352 207.52 28.6179 204.16 35.7724C200.909 42.8184 199.284 50.8401 199.284 59.8374C199.284 68.4011 200.909 76.3144 204.16 83.5772C207.52 90.7317 212.179 96.4228 218.14 100.65C224.1 104.878 230.927 106.992 238.621 106.992Z" fill="white" />
            <path d="M305.755 2.60163H333.388V16.4228H319.571V117.398H305.755V2.60163ZM388.655 2.60163H402.472V117.398H374.839V103.577H388.655V2.60163ZM333.388 16.4228H347.205V41.3008H333.388V16.4228ZM347.205 41.3008H361.022V75.935H347.205V41.3008ZM361.022 75.935H374.839V103.577H361.022V75.935Z" fill="white" />
            <path d="M409.133 2.60163H500.649V15.6098H462.612V117.398H447.17V15.6098H409.133V2.60163Z" fill="white" />
            <path d="M543.603 78.6992H496.626V65.6911H543.603V78.6992Z" fill="white" />
            <path d="M573.297 64.8781V104.39H637.504V117.398H557.854V2.60163H636.042V15.6098H573.297V51.8699H629.214V64.8781H573.297Z" fill="white" />
            <path d="M788.099 16.4228V62.1138H774.282V2.43903H829.549V16.4228H788.099ZM663.748 2.60163V13.6585H677.564V27.4797H663.748V62.1138H649.931V2.60163H663.748ZM746.649 2.60163V62.1138H732.832V2.60163H746.649ZM843.366 16.4228V30.2439H829.549V16.4228H843.366ZM677.564 41.3008V27.4797H691.381V41.3008H677.564ZM857.183 62.1138H843.366V30.2439H857.183V62.1138ZM691.381 62.1138V41.3008H705.198V62.1138H691.381ZM677.564 62.1138V75.935H663.748V62.1138H677.564ZM705.198 62.1138H719.015V89.7561H705.198V62.1138ZM760.465 75.935H746.649V62.1138H760.465V75.935ZM788.099 62.1138H801.916V75.935H788.099V62.1138ZM857.183 75.935V62.1138H871V75.935H857.183ZM649.931 75.935H663.748V117.398H649.931V75.935ZM719.015 89.7561H732.832V75.935H746.649V117.398H732.832V103.577H719.015V89.7561ZM788.099 103.577H829.549V117.398H774.282V75.935H788.099V103.577ZM857.183 89.7561H843.366V75.935H857.183V89.7561ZM843.366 103.577H829.549V89.7561H843.366V103.577Z" fill="white" />
          </AnimatedSVG>

          <DeveloperLine>
            {/* DEVELOPER SVG */}
            <AnimatedSVG
              ref={developerRef}
              xmlns="http://www.w3.org/2000/svg"
              width="470"
              height="120"
              viewBox="0 0 470 120"
              fill="none"
            >
              <path d="M41.0334 0.16973C53.3547 0.16973 63.8108 2.7157 72.4018 7.80764C81.1059 12.8996 87.6622 19.9717 92.0707 29.024C96.5923 38.0764 98.8531 48.4866 98.8531 60.2546C98.8531 72.0226 96.6488 82.4328 92.2403 91.4851C87.9448 100.424 81.445 107.44 72.741 112.532C64.0369 117.511 53.4677 120 41.0334 120H0V0.16973H41.0334ZM42.3898 106.422C55.8416 106.422 65.9021 102.178 72.5714 93.6917C79.3538 85.2051 82.745 74.0594 82.745 60.2546C82.745 46.3366 79.3538 35.1344 72.5714 26.6478C65.789 18.0481 55.7285 13.7482 42.3898 13.7482H16.1081V106.422H42.3898Z" fill="white" />
              <path d="M127.885 65.1768V106.422H194.861V120H111.777V0.16973H193.335V13.7482H127.885V51.5983H186.213V65.1768H127.885Z" fill="white" />
              <path d="M246.313 104.045L280.394 0.16973H297.52L255.299 120H236.817L194.428 0.16973H211.892L246.313 104.045Z" fill="white" />
              <path d="M318.281 14.5969V47.8642H303.869V0H375.932V14.5969H318.281ZM318.281 62.2914V47.8642H361.519V62.2914H318.281ZM303.869 62.2914H318.281V105.573H375.932V120H303.869V62.2914Z" fill="white" />
              <path d="M470 120H390.477V0.16973H406.585V106.422H470V120Z" fill="white" />
            </AnimatedSVG>

            {/* OPER SVG (Circle) */}
            <AnimatedSVG
              ref={operRef}
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="80"
              viewBox="0 0 300 80"
              fill="none"
            >
              <path d="M40 7H260C278.225 7 293 21.7746 293 40C293 58.2254 278.225 73 260 73H40C21.7746 73 7 58.2254 7 40C7 21.7746 21.7746 7 40 7Z" stroke="white" strokeWidth="14" />
            </AnimatedSVG>

            {/* PER SVG */}
            <AnimatedSVG
              ref={perRef}
              xmlns="http://www.w3.org/2000/svg"
              width="297"
              height="120"
              viewBox="0 0 297 120"
              fill="none"
            >
              <path d="M50.2469 0.169729C59.3004 0.169729 66.7129 1.92362 72.4845 5.4314C78.3693 8.93917 82.6131 13.4653 85.216 19.0099C87.932 24.4413 89.29 30.3253 89.29 36.6619C89.29 46.8458 86.1214 55.4455 79.7839 62.4611C73.4465 69.4767 63.4311 72.9844 49.7377 72.9844H16.1266V120H0V0.169729H50.2469ZM45.3241 59.4059C55.8488 59.4059 63.0916 57.3126 67.0525 53.1259C71.1265 48.826 73.1635 43.2815 73.1635 36.4922C73.1635 29.703 71.0134 24.215 66.713 20.0283C62.5257 15.8416 55.5658 13.7482 45.8333 13.7482H16.1266V59.4059H45.3241Z" fill="white" />
              <path d="M174.269 0V14.5969H116.553V33.437H102.124V0H174.269ZM210.426 14.5969V33.437H195.997V0H268.142V14.5969H210.426ZM282.571 14.5969V33.437H268.142V14.5969H282.571ZM102.124 47.8642H116.553V33.437H130.982V47.8642H159.84V62.2914H116.553V105.573H174.269V120H102.124V47.8642ZM210.426 33.437H224.855V47.8642H210.426V33.437ZM282.571 47.8642V33.437H297V47.8642H282.571ZM268.142 62.2914V76.7185H282.571V120H268.142V91.1457H253.713V76.7185H210.426V120H195.997V47.8642H210.426V62.2914H268.142ZM282.571 62.2914H268.142V47.8642H282.571V62.2914Z" fill="white" />
            </AnimatedSVG>
          </DeveloperLine>
        </MainHeading>

        <SvgArrow />

        <BottomSection>
          <Description>
            A Freelance Front-End Developer based in Dhaka, specializing in building modern,
            sustainable, and high-performing websites.
          </Description>

          <DownloadButton href="/resume.pdf" download>
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