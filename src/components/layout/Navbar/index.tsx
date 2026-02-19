'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import Magnetic from '@/components/common/Magnetic';
import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';
import MJlogo from '@/assets/MJ-Logo.svg';
import { FONT } from '@/styles/font';
import Link from 'next/link';

/* ─── Animations ─── */
const menuSlide = {
  initial: { x: 'calc(100% + 100px)' },
  enter: { x: '0', transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) } },
  exit: { x: 'calc(100% + 100px)', transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) } },
};

const slide = {
  initial: { x: 80 },
  enter: (i: number) => ({ x: 0, transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1), delay: 0.05 * i }, }),
  exit: (i: number) => ({ x: 80, transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1), delay: 0.05 * i }, }),
};

const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
};

/* ─── Data ─── */
const navItems = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/#about' },
  { title: 'Projects', href: '/projects' },
  { title: 'Services', href: '/#services' },
  { title: 'Experience', href: '/#experience' },
  { title: 'Contact', href: '/#contact' },
];

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Resume', href: '#' },
];

/* ─── Header ─── */
const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;

  @media screen and (max-width: ${breakpoints.md}) {
    padding: 16px 24px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;

  svg {
    width: 61px;
    height: 68px;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    svg {
      width: 44px;
      height: 49px;
    }
  }
`;

const MenuBtn = styled.div`
  cursor: pointer;
  padding: 6px 0;
`;

const MenuLabel = styled.span`
  font-family: ${FONT.oktaNeue};
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -0.64px;
  color: #e7e7e7;
  text-transform: uppercase;

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 20px;
  }
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

const NavWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 80px 110px;
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
  color: #d9d9d9;
  gap: 8px;
  margin-top: 40px;

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 36px;
  }
`;

const SectionHeader = styled.div`
  color: #d9d9d9;
  border-bottom: 1px solid rgb(153, 153, 153);
  font-family: ${FONT.oktaNeue};
  font-size: 14px;
  text-transform: uppercase;
  padding-bottom: 12px;
  margin-bottom: 12px;

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 11px;
  }
`;

const LinkWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
`;

const Indicator = styled(motion.div)`
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  left: -25px;
`;


const NavLink = styled(Link)`
  text-decoration: none;
  color: #d9d9d9;
  font-family: ${FONT.alphaLyrae};
  font-size: 48px;
  line-height: 60px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: #ff5948;
    text-decoration: none;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 32px;
    line-height: 44px;
  }
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
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  useEffect(() => {
    if (isActive) setIsActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const height = typeof window !== 'undefined' ? window.innerHeight : 800;
  const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L100 ${height} Q100 ${height / 2} 100 0`;
  const curve = {
    initial: { d: initialPath },
    enter: { d: targetPath, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
    exit: { d: initialPath, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } },
  };



  return (
    <>
      <HeaderBar>
        <Logo href="/">
          <MJlogo width={61} height={68} />
        </Logo>
        <Magnetic>
          <MenuBtn onClick={() => setIsActive((prev) => !prev)}>
            <MenuLabel>{isActive ? 'Close' : 'Menu'}</MenuLabel>
          </MenuBtn>
        </Magnetic>
      </HeaderBar>

      <AnimatePresence mode="wait">
        {isActive && (
          <Menu variants={menuSlide} initial="initial" animate="enter" exit="exit">
            <NavWrapper>

              {/* Nav links */}
              <NavList onMouseLeave={() => setSelectedIndicator(pathname)}>
                <SectionHeader>Navigation</SectionHeader>
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
                    <NavLink href={item.href} onClick={() => setIsActive(false)}>
                      {item.title}
                    </NavLink>
                  </LinkWrapper>
                ))}
              </NavList>

              {/* Social Links */}
              
            </NavWrapper>

            <SvgCurve>
              <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
            </SvgCurve>
          </Menu>
        )}
      </AnimatePresence>
    </>
  );
}