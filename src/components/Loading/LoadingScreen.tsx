"use client";

import styled, { keyframes } from "styled-components";

const fade = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-top-color: transparent;
  animation: ${fade} 1s linear infinite;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e1e1e;
  z-index: 9999;
`;

export default function LoadingScreen() {
    return (
        <Overlay>
            <Spinner />
        </Overlay>
    );
}
