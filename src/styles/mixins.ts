import { breakpoints } from "./breakpoints";

// Helper for media queries
export const media = {
  xl: (styles: TemplateStringsArray | string) => `
    @media (max-width: ${breakpoints.xl}) {
      ${styles}
    }
  `,
  lg: (styles: TemplateStringsArray | string) => `
    @media (max-width: ${breakpoints.lg}) {
      ${styles}
    }
  `,
  md: (styles: TemplateStringsArray | string) => `
    @media (max-width: ${breakpoints.md}) {
      ${styles}
    }
  `,
  sm: (styles: TemplateStringsArray | string) => `
    @media (max-width: ${breakpoints.sm}) {
      ${styles}
    }
  `,
  xs: (styles: TemplateStringsArray | string) => `
    @media (max-width: ${breakpoints.xs}) {
      ${styles}
    }
  `,
};

// Flex helper
export const flexCenter = (direction: "row" | "column" = "row") => `
  display: flex;
  flex-direction: ${direction};
  justify-content: center;
  align-items: center;
`;

// Responsive container padding
export const responsivePadding = `

  ${media.xl(`padding-left: 10px; padding-right: 10px;`)}
  ${media.lg(`padding-left: 10px; padding-right: 10px;`)}
  ${media.md(`padding-left: 16px; padding-right: 16px;`)}
  ${media.sm(`padding-left: 16px; padding-right: 16px;`)}
  ${media.xs(`padding-left: 16px; padding-right: 16px;`)}
`;
