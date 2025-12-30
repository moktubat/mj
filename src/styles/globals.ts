"use client";
import { createGlobalStyle } from "styled-components";

export const StyledGlobal = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font.regular};
  }
`;