'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface UnderLineProps {
    marginTop?: string;      // optional, default 0
    marginBottom?: string;   // optional, default 0
    color?: string;          // optional, default #AFAFAF
}

const Line = styled.div<{ $marginTop: string; $marginBottom: string }>`
  width: 1320px;       /* fixed width */
  margin: ${(props) => props.$marginTop} auto ${(props) => props.$marginBottom};
  height: 0.25vw;
  position: relative;
  background-color: #D9D9D9;

  @media (max-width: 640px) {
    width: 100%;        /* responsive for small screens */
    height: 0.01vw;
  }
`;

const Box = styled.div`
  height: 40px;
  position: relative;
  top: -20px;
  z-index: 4;
  cursor: pointer;

  &:hover {
    height: 120px;
    top: -75px;
  }
`;

const Path = styled.path<{ color: string }>`
  stroke-width: 1px;
  stroke: ${(props) => props.color};
  fill: none;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100px;
  position: absolute;
  top: -50px;
`;

const UnderLine: React.FC<UnderLineProps> = ({
    marginTop = '0',
    marginBottom = '0',
    color = '#AFAFAF',
}) => {
    const pathRef = useRef<SVGPathElement>(null);
    const fixedWidth = 1320;   // fixed width for the path
    let progress = 0;
    let reqId: number | null = null;
    let x = 0.5;
    let time = Math.PI / 2;

    useEffect(() => {
        setPath(progress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setPath = (progress: number) => {
        if (!pathRef.current) return;
        pathRef.current.setAttribute(
            'd',
            `M0 50 Q${fixedWidth * x} ${50 + progress}, ${fixedWidth} 50`
        );
    };

    const manageMouseEnter = () => {
        if (reqId) {
            window.cancelAnimationFrame(reqId);
        }
    };

    const manageMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!pathRef.current) return;
        const rect = pathRef.current.getBoundingClientRect();
        const { movementY, clientX } = e;
        x = (clientX - rect.left) / rect.width;
        progress += movementY;
        setPath(progress);
    };

    const manageMouseLeave = () => {
        animateOut();
    };

    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    const animateOut = () => {
        const newProgress = progress * Math.sin(time);
        time += 0.2;
        setPath(newProgress);
        progress = lerp(progress, 0, 0.025);

        if (Math.abs(progress) > 0.75) {
            reqId = window.requestAnimationFrame(animateOut);
        } else {
            resetAnimation();
        }
    };

    const resetAnimation = () => {
        time = Math.PI / 2;
        progress = 0;
    };

    return (
        <Line $marginTop={marginTop} $marginBottom={marginBottom}>
            <Box
                onMouseEnter={manageMouseEnter}
                onMouseMove={manageMouseMove}
                onMouseLeave={manageMouseLeave}
            />
            <Svg>
                <Path ref={pathRef} color={color} />
            </Svg>
        </Line>
    );
};

export default UnderLine;
