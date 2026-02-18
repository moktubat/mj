'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Magnetic from '@/components/common/Magnetic';
import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

/* ─── Animations ─── */
const menuSlide = {
    initial: { x: 'calc(100% + 100px)' },
    enter: { x: '0', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: 'calc(100% + 100px)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

const slide = {
    initial: { x: 80 },
    enter: (i: number) => ({ x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
    exit: (i: number) => ({ x: 80, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
};

const scale = {
    open: { scale: 1, transition: { duration: 0.3 } },
    closed: { scale: 0, transition: { duration: 0.4 } },
};

/* ─── Data ─── */
const navItems = [
    { title: 'Home', href: '#home' },
    { title: 'Work', href: '#work' },
    { title: 'About', href: '#about' },
    { title: 'Contact', href: '#contact' },
];

const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rishi-lahoti-665889166/' },
    { label: 'GitHub', href: 'https://github.com/rishilahoti' },
    { label: 'Twitter', href: 'https://twitter.com/rishii_lahoti' },
    { label: 'Resume', href: 'https://drive.google.com/file/d/1hypQJfvYegfps9uh1_Nc0GXYD2zjzOIX/view?usp=sharing' },
];

/* ─── Menu Button (fixed, always visible) ─── */
const MenuButtonContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 200;
`;

const MenuBtn = styled.div`
  position: relative;
  margin: 20px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #1c1d20;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a2b2f;
  }
`;

const MenuLabel = styled.span`
  font-family: Lexend, sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: white;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

/* ─── Slide-out Menu Panel ─── */
const Menu = styled(motion.div)`
  font-family: Lexend, sans-serif;
  height: 100vh;
  background-color: rgb(41, 41, 41);
  position: fixed;
  right: 0;
  top: 0;
  color: white;
  z-index: 150;
  min-width: 400px;

  @media screen and (max-width: ${breakpoints.md}) {
    min-width: 100vw;
  }
`;

const Body = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: ${breakpoints.md}) {
    padding: 50px;
  }
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 56px;
  gap: 12px;
  margin-top: 80px;

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 36px;
  }
`;

const NavHeader = styled.div`
  color: rgb(153, 153, 153);
  border-bottom: 1px solid rgb(153, 153, 153);
  text-transform: uppercase;
  font-size: 11px;
  margin-bottom: 40px;

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 8px;
  }
`;

/* ─── Nav Link ─── */
const LinkWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
`;

const Indicator = styled(motion.div)`
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  left: -30px;
`;

const Anchor = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 300;
  cursor: pointer;

  &:hover { opacity: 0.7; }
`;

/* ─── Footer ─── */
const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 12px;
  gap: 40px;

  @media screen and (max-width: ${breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
`;

const FooterItem = styled.div`
  position: relative;

  &:hover span { transform: scaleX(1); }
`;

const Underline = styled.span`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: white;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
`;

const FooterLink = styled.a`
  font-family: Lexend, sans-serif;
  font-size: 13px;
  color: white;
  text-decoration: none;
`;

/* ─── SVG Curve ─── */
const SvgCurve = styled.svg`
  position: absolute;
  top: 0;
  left: -99px;
  width: 100px;
  height: 100%;
  stroke: none;
  fill: rgb(41, 41, 41);
`;

/* ════════════════════════════════════════
   Main Component
════════════════════════════════════════ */
export default function Navbar() {
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();

    // Close on route change
    useEffect(() => {
        if (isActive) setIsActive(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // Curve path
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`;
    const targetPath = `M100 0 L100 ${height} Q100 ${height / 2} 100 0`;
    const curve = {
        initial: { d: initialPath },
        enter: { d: targetPath, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
        exit: { d: initialPath, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
    };

    const [selectedIndicator, setSelectedIndicator] = useState(pathname);

    const handleNavClick = (href: string) => {
        const targetId = href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setSelectedIndicator(href);
        setIsActive(false);
    };

    return (
        <>
            {/* Always-visible MENU button */}
            <MenuButtonContainer>
                <MenuBtn onClick={() => setIsActive((prev) => !prev)}>
                    <MenuLabel>{isActive ? 'Close' : 'Menu'}</MenuLabel>
                </MenuBtn>
            </MenuButtonContainer>

            {/* Slide-out panel */}
            <AnimatePresence mode="wait">
                {isActive && (
                    <Menu variants={menuSlide} initial="initial" animate="enter" exit="exit">
                        <Body>
                            {/* Nav links */}
                            <NavList onMouseLeave={() => setSelectedIndicator(pathname)}>
                                <NavHeader><p>Navigation</p></NavHeader>
                                {navItems.map((item, index) => (
                                    <LinkWrapper
                                        key={item.href}
                                        onMouseEnter={() => setSelectedIndicator(item.href)}
                                        custom={index}
                                        variants={slide}
                                        initial="initial"
                                        animate="enter"
                                        exit="exit"
                                    >
                                        <Indicator variants={scale} animate={selectedIndicator === item.href ? 'open' : 'closed'} />
                                        <Anchor href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}>
                                            {item.title}
                                        </Anchor>
                                    </LinkWrapper>
                                ))}
                            </NavList>

                            {/* Social / footer links */}
                            <Footer>
                                {socialLinks.map(({ label, href }) => (
                                    <Magnetic key={label}>
                                        <FooterItem>
                                            <FooterLink href={href} target="_blank" rel="noopener noreferrer">
                                                {label}
                                            </FooterLink>
                                            <Underline />
                                        </FooterItem>
                                    </Magnetic>
                                ))}
                            </Footer>
                        </Body>

                        {/* Decorative curve */}
                        <SvgCurve>
                            <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
                        </SvgCurve>
                    </Menu>
                )}
            </AnimatePresence>
        </>
    );
}