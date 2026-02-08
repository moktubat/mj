import LenisProvider from "@/components/provider/LenisProvider";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import HydrationWrapper from "@/components/HydratedWrapper";
import StyledComponentsRegistry from "./registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <LenisProvider>
            <HydrationWrapper>
              {children}
              <Footer />
            </HydrationWrapper>
          </LenisProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}