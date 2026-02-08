"use client";

import { useState } from "react";
import WorkShowCase from "@/components/page/Work/WorkShowCase";
import styled from "styled-components";

const WorkPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  /* Hide footer on this page */
  & ~ footer,
  & + footer {
    display: none;
  }
`;

export default function WorkPage() {
    const [logoColor, setLogoColor] = useState("#fff");

    return (
        <WorkPageContainer>
            <WorkShowCase setLogoColor={setLogoColor} />
        </WorkPageContainer>
    );
}