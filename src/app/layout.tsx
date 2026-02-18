import LenisProvider from "@/components/provider/LenisProvider";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import HydrationWrapper from "@/components/HydratedWrapper";
import StyledComponentsRegistry from "./registry";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/layout/Navbar";

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
              <CustomCursor />
              <Navbar />
              {children}
              <Footer />
            </HydrationWrapper>
          </LenisProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}