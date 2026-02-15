"use client";

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CursorWrapper = styled.div<{ $cursorType: string; $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.2s ease;

  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: center;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .default-cursor {
    opacity: ${({ $cursorType }) => ($cursorType === 'default' ? 1 : 0)};
    transform: ${({ $cursorType }) =>
        $cursorType === 'default' ? 'scale(1)' : 'scale(0.8)'};
  }

  .pointer-cursor {
    opacity: ${({ $cursorType }) => ($cursorType === 'pointer' ? 1 : 0)};
    transform: ${({ $cursorType }) =>
        $cursorType === 'pointer' ? 'scale(1.2)' : 'scale(0.8)'};
  }

  .text-cursor {
    opacity: ${({ $cursorType }) => ($cursorType === 'text' ? 1 : 0)};
    transform: ${({ $cursorType }) =>
        $cursorType === 'text' ? 'scale(1.1)' : 'scale(0.8)'};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;


const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [cursorType, setCursorType] = useState('default');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide default system cursor
        document.body.style.cursor = 'none';
        const style = document.createElement('style');
        style.innerHTML = `* { cursor: none !important; }`;
        document.head.appendChild(style);

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        const speed = 0.4;

        // Update mouse position & cursor type
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const target = e.target as HTMLElement;
            const selection = window.getSelection();
            const isSelectingText = selection && selection.toString().length > 0;

            if (isSelectingText) {
                setCursorType('text');
            } else if (target.closest('a, button, [role="button"]')) {
                setCursorType('pointer');
            } else if (
                target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
            ) {
                setCursorType('text');
            } else {
                setCursorType('default');
            }
        };

        // Show cursor when mouse enters the window
        const handleMouseEnter = () => {
            setIsVisible(true);
            document.body.style.cursor = 'none';
        };

        // Hide cursor when mouse leaves the window
        const handleMouseLeave = () => {
            setIsVisible(false);
            document.body.style.cursor = 'auto';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Smooth cursor animation
        let animationFrameId: number;
        const animate = () => {
            currentX += (mouseX - currentX) * speed;
            currentY += (mouseY - currentY) * speed;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            document.body.style.cursor = 'auto';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            document.head.removeChild(style);
        };
    }, []);


    return (
        <CursorWrapper ref={cursorRef} $cursorType={cursorType} $isVisible={isVisible}>
            {/* Default cursor */}
            <svg
                className="default-cursor"
                viewBox="0 0 600 950"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g transform="translate(-555.1899,-182.7993)">
                    <path
                        fill="#1e1e1e"
                        d="m 555.19,182.7993 0,850.0038 99.99801,0 0,-49.99816 -0.0572,0 0.0572,-0.0357 49.999,0 0,-49.99812 49.999,0 0,-49.99812 49.99901,0 0,99.99624 49.999,0 0.73359,0 -0.73359,100.03196 49.999,0 0,49.9981 99.99798,0 0,-49.9981 49.999,0 0,-99.99626 -49.999,0 -0.7336,-0.0357 0.7336,-99.99624 -49.99897,0 0,-49.99812 200.00787,0 0,-49.99812 0,-49.99812 -49.999,0 0,0.069 -0.012,-0.069 0,-49.99812 -49.999,0 0,-49.99811 -49.999,0 0,-49.99812 -49.99897,0 0,-49.99812 -49.99901,0 0,-49.99812 -49.999,0 0,-49.99812 -49.999,0 0,-49.99812 -49.99901,0 0,-49.99812 -49.999,0 0,-49.99812 -49.999,0 0,-49.99812 -49.99901,0 0,-49.99812 -49.999,0 z"
                    />
                    <path
                        fill="#D9D9D9"
                        transform="translate(555.1899,182.7993)"
                        d="m 50,99.996094 0,699.974606 49.998047,0 0,-49.99804 50.000003,0 0,-49.99805 49.99804,0 0,-50 50,0 0,50 49.99805,0 0,99.99609 49.99805,0 0,100.03125 99.99804,0 0,-99.99609 -49.99804,0 0,-100.03125 -50,0 0,-99.99805 199.99609,0 0,-49.99804 -49.99805,0 0,-49.99805 -50,0 0,-49.99805 -49.99804,0 0,-49.99804 -50,0 0,-49.99805 -49.99805,0 0,-49.99805 -49.99805,0 0,-49.99805 -50,0 0,-49.99804 -49.99804,0 0,-49.99805 -50.000003,0 0,-49.998046 z"
                    />
                </g>
            </svg>

            {/* Pointer cursor */}
            <svg className="pointer-cursor" viewBox="0 0 310.67 401.31">
                <defs>
                    <filter id="filter5076" height="1.1687" width="1.2239" y="-.084372" x="-.11196">
                        <feGaussianBlur stdDeviation="12.537448" />
                    </filter>
                </defs>
                <g transform="translate(-240.62 -203)">
                    <g transform="translate(-1051.1 17.429)">
                        <path
                            filter="url(#filter5076)"
                            fill="#1e1e1e"
                            d="m1404.6 215.25v15.28h-14.4v142.59h-14.5v-15.28h-42.3-15.7v51.96h10.6v19.52l15.4 0.03v35.54h15.5v31.84h15.5v29.33h15.5v45.76h16.5 133.3v0.06h16.5v-40.82h15.5v-45.86h14.4v-123.29h-14.4v-16.75h-15.5v-12.8h-16.5-14.5v-15.28h-32-15.5v-15.29h-25.8v-71.86h-14.5v-14.68h-33.1z"
                        />
                        <g transform="translate(-6,-14)">
                            <path
                                fill="#1e1e1e"
                                d="m1403.2 215.57v15.64h-14.9v145.84h-14.9v-15.63h-43.5-16.1v53.15h10.8v19.97l15.9 0.03v36.35h15.9v32.56h16v30h15.9v46.8h17 136.9v0.07h17.1v-41.76h15.9v-46.9h14.8v-126.1h-14.8v-17.14h-15.9v-13.09h-17-14.9v-15.63h-32.9-16v-15.63h-26.5v-73.51h-14.9v-15.02h-33.9z"
                            />
                            <path
                                fill="#D9D9D9"
                                d="m1403.6 219.77v15.29h-14.4v142.59h-14.5v-15.29h-42.3-15.8v51.97h10.6v19.52l15.4 0.03v35.54h15.6v31.84h15.5v29.32h15.5v45.76h16.5 133.2v0.07h16.6v-40.83h15.5v-45.85h14.4v-123.29h-14.4v-16.75h-15.5v-12.8h-16.5-14.5v-15.29h-32-15.6v-15.28h-25.7v-71.87h-14.5v-14.68h-33.1z"
                            />
                            <path
                                fill="#1e1e1e"
                                d="m1405.5 224.42v15h-14v139.94h-14.1v-15h-40.9-15.3v51h10.3v19.16l14.9 0.03v34.87h15v31.25h15.1v28.79h15v44.9h16 129v0.06h16v-40.06h15v-45h13.9v-121h-13.9v-16.44h-15v-12.56h-16-14v-15h-31-15.1v-15h-24.9v-70.53h-14v-14.41h-32zm0.7 15.35h30.3v144.65h15v-60h24.9v60.82h15.1v-44.88h30v59.16h15v-45.16h15v15h14.7v115h-14.7v45h-15v30.06h-129v-35h-15v-30.03h-15.1v-30.03h-15v-34.9h-15v-15l-10.9-0.04v-34.06h40v16.91h15v42.15h14.7v-199.65z"
                            />
                        </g>
                    </g>
                </g>
            </svg>

            {/* Text selection cursor */}
            <svg
                className="text-cursor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="72"
                height="72"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="1"
            >
                <path fill="none" d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1M7 22h1a4 4 0 0 0 4-4v-1M7 2h1a4 4 0 0 1 4 4v1" />
            </svg>
        </CursorWrapper>
    );
};

export default CustomCursor;