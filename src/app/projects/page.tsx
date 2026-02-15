'use client';

import styled from "styled-components";
import AllProjects from "@/components/page/Projects/AllProjects";

const PageWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

const ProjectsPage = () => {
    return (
        <PageWrapper>
            <AllProjects />
        </PageWrapper>
    );
};

export default ProjectsPage;