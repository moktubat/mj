import LenisProvider from "@/components/provider/LenisProvider";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import HydrationWrapper from "@/components/HydratedWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <HydrationWrapper>
            {children} <Footer />
          </HydrationWrapper>
        </LenisProvider>
      </body>
    </html>
  );
}
