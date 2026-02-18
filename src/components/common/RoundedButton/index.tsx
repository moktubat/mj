'use client';

import { useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import Magnetic from '../Magnetic';

interface RoundedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  [key: string]: unknown;
}

const ButtonWrapper = styled.div`
  border-radius: 3em;
  border: 1px solid rgb(255, 255, 255);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 60px;
  overflow: hidden;
  margin: 20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #1c1d20;
  padding: 0;

  p {
    position: relative;
    z-index: 1;
    transition: color 0.4s linear;
  }

  &:hover p {
    color: white;
  }
`;

const Circle = styled.div`
  width: 100%;
  height: 150%;
  position: absolute;
  border-radius: 50%;
  top: 100%;
  background-color: #c1ff5dcd;
`;

export default function RoundedButton({ children, onClick, ...rest }: RoundedButtonProps) {
  const circleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timelineRef.current = gsap.timeline({ paused: true });
    timelineRef.current
      .to(circleRef.current, { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' }, 'enter')
      .to(circleRef.current, { top: '-150%', width: '125%', duration: 0.25 }, 'exit');
  }, []);

  const handleMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timelineRef.current?.tweenFromTo('enter', 'exit');
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timelineRef.current?.play();
    }, 300);
  };

  return (
    <Magnetic>
      <ButtonWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...rest}
      >
        {children}
        <Circle ref={circleRef} />
      </ButtonWrapper>
    </Magnetic>
  );
}