"use client";

import styled from "styled-components";
import { FONT } from "@/styles/font";

import clientImg1 from "@/assets/clientImg1.png";
import clientLogo1 from "@/assets/clientLogo1.png";
import clientImg2 from "@/assets/clientImg2.png";
import clientLogo2 from "@/assets/clientLogo2.png";
import clientImg3 from "@/assets/clientImg3.png";
import clientLogo3 from "@/assets/clientLogo3.png";

import Image from "next/image";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

/* ------------------------------------------------
   STYLES
------------------------------------------------ */
const Section = styled.section`
background: #D9D9D9;
  padding: 80px 10px;
`;

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Title = styled.p`
  color: #ff5948;
  font-family: ${FONT.oktaNeue};
  font-size: 20px;
`;

const SliderArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  margin-top: 24px;
`;

const PrevButton = styled.div`
  background: #ffeeed;
  border: 2px dashed #ff5948;
  padding: 16px;
  border-radius: 4px 100px 100px 100px;
  cursor: pointer;
`;

const NextButton = styled.div`
  background: #ff5948;
  border: 2px dashed #ff5948;
  padding: 16px;
  border-radius: 100px 4px 100px 100px;
  cursor: pointer;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: grab;
  user-select: none;
`;

const Quote = styled.p`
  max-width: 40ch;
  font-family: ${FONT.oktaNeue};
  font-size: 30px;
  line-height: 1.35;
  color: #1e1e1e;
  margin-top: 20px;
  text-align: center;

  white-space: normal;
  word-break: break-word;
`;

const Author = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const AuthorRole = styled.p`
  color: #6a6a6a;
  font-family: ${FONT.oktaNeue};
  font-size: 18px;
  margin-top: 20px;
`;

const AuthorName = styled.p`
  color: #1e1e1e;
  font-family: ${FONT.alphaLyrae};
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 5px;

  /* 🔥 Prevent font flicker */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
  backface-visibility: hidden;
  transform: translateZ(0);
`;

const AuthorAvatar = styled(Image)`
  border-radius: 1000px;
  object-fit: cover;
  margin-right: -8px;
  z-index: 20;
  position: relative;
`;

const AuthorLogo = styled(Image)`
  border-radius: 12px;
  object-fit: cover;
  margin-left: -8px;
  z-index: 10;
  position: relative;
`;

/* ------------------------------------------------
   TESTIMONIAL DATA
------------------------------------------------ */
const reviews = [
  {
    text: "Purus amet nibh arcu malesuada est volutpat. Vel in at lobortis volutpat aliquam feugiat urna.",
    role: "Product Designer",
    name: "Mahady Hasan",
    img: clientImg1,
    logo: clientLogo1,
  },
  {
    text: "Amazing service! Great communication and beautiful clean UI. Highly recommended!",
    role: "UI/UX Strategist",
    name: "Ariyan Rahman",
    img: clientImg2,
    logo: clientLogo2,
  },
  {
    text: "Outstanding development quality. I loved the animations and premium feel!",
    role: "Startup Founder",
    name: "Sami H.",
    img: clientImg3,
    logo: clientLogo3,
  },
];

/* ------------------------------------------------
   MAIN COMPONENT
------------------------------------------------ */
export default function Testimonial() {
  const [index, setIndex] = useState(0);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const imgGroupRef = useRef(null);
  const roleRef = useRef(null);
  const nameRef = useRef(null);

  const autoplayRef = useRef(null);
  const dragStart = useRef(0);
  const dragging = useRef(false);

  /* ------------------------------------------------
     SPLIT TEXT (WORDS)
  ------------------------------------------------ */
  const splitText = () => {
    const el = textRef.current;
    const words = el.innerText.split(" ");

    el.innerHTML = words
      .map(
        (w) =>
          `<span class="word" style="display:inline-block; opacity:0">${w}&nbsp;</span>`
      )
      .join("");
  };

  /* ------------------------------------------------
     SPLIT AUTHOR NAME (LETTERS)
  ------------------------------------------------ */
  const splitAuthorNameOnce = () => {
    const el = nameRef.current;
    const letters = el.innerText.split("");

    el.innerHTML = letters
      .map(
        (c) =>
          `<span class="char" style="display:inline-block">${c}</span>`
      )
      .join("");
  };

  const updateAuthorName = (newName: string) => {
    const chars = nameRef.current.querySelectorAll(".char");

    newName.split("").forEach((letter, i) => {
      if (chars[i]) {
        chars[i].textContent = letter;
      }
    });
  };

  /* ------------------------------------------------
     TEXT ANIMATION
  ------------------------------------------------ */
  const animateText = (direction = 1) => {
    const words = textRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { y: 25 * direction, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.035,
        duration: 0.6,
        ease: "power4.out",
      }
    );
  };

  /* ------------------------------------------------
     AUTHOR NAME ANIMATION
  ------------------------------------------------ */
  const animateAuthorName = () => {
    const chars = nameRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      { y: 18, scale: 0.92, filter: "blur(6px)" },
      {
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.03,
        duration: 0.75,
        ease: "expo.out",
      }
    );
  };


  /* ------------------------------------------------
     SLIDE TRANSITION (SMOOTH & PREMIUM)
  ------------------------------------------------ */
  const animateSlide = (direction = 1) => {
    const timeline = gsap.timeline({
      defaults: { duration: 0.55, ease: "power4.out" },
    });

    gsap.set(
      [imgGroupRef.current, roleRef.current, nameRef.current, textRef.current],
      { willChange: "transform, opacity" }
    );

    timeline
      .to(
        [imgGroupRef.current, roleRef.current, nameRef.current, textRef.current],
        {
          x: -30 * direction,
          opacity: 0,
          scale: 0.95,
          duration: 0.35,
          ease: "power2.out",
        }
      )
      .set(
        [imgGroupRef.current, roleRef.current, nameRef.current, textRef.current],
        { x: 40 * direction, opacity: 0, scale: 0.95 }
      )
      .to(
        [imgGroupRef.current, roleRef.current, nameRef.current, textRef.current],
        {
          x: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.04,
          duration: 0.65,
          ease: "expo.out",
        }
      );

    animateText(direction);
    animateAuthorName();
  };

  /* ------------------------------------------------
     NEXT + PREV HANDLERS
  ------------------------------------------------ */
  const next = () => {
    const newIndex = (index + 1) % reviews.length;
    setIndex(newIndex);

    setTimeout(() => {
      splitText();
      updateAuthorName(reviews[newIndex].name);
      animateSlide(1);
    }, 20);

    resetAutoplay();
  };

  const prev = () => {
    const newIndex = index === 0 ? reviews.length - 1 : index - 1;
    setIndex(newIndex);

    setTimeout(() => {
      splitText();
      updateAuthorName(reviews[newIndex].name);
      animateSlide(-1);
    }, 20);

    resetAutoplay();
  };


  /* ------------------------------------------------
     AUTOPLAY
  ------------------------------------------------ */
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => next(), 8000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const resetAutoplay = () => startAutoplay();

  /* ------------------------------------------------
     DRAG / SWIPE
  ------------------------------------------------ */
  const onDragStart = (e) => {
    wrapperRef.current.style.cursor = "grabbing";
    dragging.current = true;
    stopAutoplay();

    dragStart.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const onDragEnd = (e) => {
    wrapperRef.current.style.cursor = "grab";
    if (!dragging.current) return;

    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - dragStart.current;

    if (diff > 60) prev();
    else if (diff < -60) next();

    dragging.current = false;
    startAutoplay();
  };

  /* ------------------------------------------------
     ON MOUNT
  ------------------------------------------------ */
  useEffect(() => {
    splitText();
    splitAuthorNameOnce();   // ← only time we split
    animateText();
    animateAuthorName();
    startAutoplay();

    return () => stopAutoplay();
  }, []);

  const current = reviews[index];

  /* ------------------------------------------------
     RENDER
  ------------------------------------------------ */
  return (
    <Section>
      <Container>
        <Header>
          <Title>[Testimonials]</Title>
        </Header>

        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path d="M47.0765 66.4614H63.6922C66.0002 66.4614 67.9616 65.6536 69.5773 64.0385C71.1922 62.4231 72 60.4617 72 58.1536V41.5385C72 39.2305 71.1927 37.2694 69.5773 35.6543C67.9617 34.0394 65.9997 33.2313 63.6922 33.2313H53.9999C52.8465 33.2313 51.8655 32.8272 51.0577 32.0198C50.2499 31.2128 49.8462 30.2314 49.8462 29.0771V27.6932C49.8462 24.6353 50.9281 22.0256 53.0914 19.8617C55.2548 17.6989 57.8651 16.6171 60.9233 16.6171H63.6922C64.4427 16.6171 65.0915 16.3424 65.6398 15.7946C66.1876 15.2469 66.4618 14.5977 66.4618 13.8476V8.30853C66.4618 7.55971 66.1876 6.90924 65.6398 6.36138C65.091 5.81382 64.4428 5.5389 63.6922 5.5389H60.9232C57.9229 5.5389 55.0599 6.1239 52.3338 7.29176C49.6078 8.45979 47.2498 10.0396 45.2593 12.0301C43.2692 14.0207 41.6897 16.3783 40.5216 19.1044C39.3536 21.8304 38.7693 24.6932 38.7693 27.6931V58.1542C38.7693 60.4623 39.5771 62.4236 41.1922 64.0387C42.8073 65.6538 44.7691 66.4614 47.0765 66.4614Z" fill="#AFAFAF" />
          <path d="M2.42379 64.0385C4.03874 65.6536 6.00029 66.4614 8.30828 66.4614H24.9233C27.2313 66.4614 29.1927 65.6536 30.8078 64.0385C32.4228 62.423 33.2302 60.4617 33.2302 58.1536V41.5385C33.2302 39.2305 32.4228 37.2694 30.8078 35.6543C29.1927 34.0394 27.2312 33.2313 24.9233 33.2313H15.2311C14.0776 33.2313 13.0958 32.8272 12.2882 32.0198C11.4813 31.2123 11.0767 30.2314 11.0767 29.0771V27.6932C11.0767 24.6353 12.1586 22.0256 14.3223 19.8617C16.4856 17.6989 19.0954 16.6171 22.1538 16.6171H24.9233C25.6732 16.6171 26.3226 16.3424 26.8703 15.7946C27.4185 15.2469 27.6929 14.5977 27.6929 13.8476V8.30853C27.6929 7.55971 27.4185 6.90924 26.8703 6.36138C26.3228 5.81382 25.6733 5.5389 24.9233 5.5389H22.1538C19.154 5.5389 16.2912 6.1239 13.5647 7.29176C10.8392 8.45979 8.48151 10.0396 6.49086 12.0301C4.50037 14.0207 2.91997 16.3789 1.75256 19.1044C0.584698 21.8298 0.000160217 24.6932 0.000160217 27.6931V58.1542C0.000614166 60.4623 0.807632 62.4236 2.42379 64.0385Z" fill="#AFAFAF" />
        </svg>

        <SliderArea>
          <PrevButton onClick={prev}>
            <svg width="24" height="24">
              <path
                d="M17 17L7 7M7 7V17M7 7H17"
                stroke="#FF5948"
                strokeWidth="2"
              />
            </svg>
          </PrevButton>

          <Slide
            ref={wrapperRef}
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onTouchStart={onDragStart}
            onTouchEnd={onDragEnd}
          >
            <Quote ref={textRef}>{current.text}</Quote>

            <Author ref={imgGroupRef}>
              <AuthorAvatar src={current.img} alt="Author" width={68} height={68} />
              <AuthorLogo src={current.logo} alt="Client Logo" width={64} height={64} />
            </Author>

            <AuthorRole ref={roleRef}>{current.role}</AuthorRole>
            <AuthorName ref={nameRef}>{current.name}</AuthorName>
          </Slide>

          <NextButton onClick={next}>
            <svg width="24" height="24">
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </NextButton>
        </SliderArea>
      </Container>
    </Section>
  );
}
