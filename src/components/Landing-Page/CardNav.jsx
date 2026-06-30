import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';
// Arrow icon for card links
import { GoArrowUpRight } from 'react-icons/go';

// ─── CHANGE: Removed logo, logoAlt, buttonBgColor, buttonTextColor, menuColor props.
//      These are now handled by the parent Navbar.
//      The component is now an inline dropdown trigger + dropdown panel.
const CardNav = ({
  items,
  className = '',
  ease = 'power3.out',
}) => {
  // ─── PRESERVED: All original state and refs remain unchanged.
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // ─── CHANGE: navRef now points to the dropdown panel (not the whole nav bar).
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  
  // ─── ADDED: containerRef to detect clicks outside the entire dropdown container
  const containerRef = useRef(null);

  const location = useLocation();

  // ─── PRESERVED: calculateHeight() — same logic, adapted for dropdown panel.
  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        // Force reflow
        contentEl.offsetHeight;

        const padding = 20;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return contentHeight + padding;
      }
    }
    // ─── Desktop dropdown height (enough for 3 cards with links)
    return 240;
  };

  // ─── PRESERVED: createTimeline() — identical GSAP timeline logic.
  // ─── IMPROVEMENT: Added slight fade (opacity animation) alongside height animation.
  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    // ─── CHANGE: The dropdown panel starts at height 0 (hidden) and opacity 0.
    gsap.set(navEl, { height: 0, opacity: 0, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      opacity: 1, // Slight fade-in
      duration: 0.4,
      ease
    });

    // ─── PRESERVED: Stagger animation on cards — identical to original.
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  // ─── PRESERVED: useLayoutEffect for timeline creation — identical.
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  // ─── PRESERVED: useLayoutEffect for resize handling — identical.
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  // ─── ADDED: useEffect hook to handle click-outside event listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isExpanded && containerRef.current && !containerRef.current.contains(event.target)) {
        const tl = tlRef.current;
        if (tl) {
          setIsHamburgerOpen(false);
          tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
          tl.reverse();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // ─── ADDED: Escape key closes menu
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isExpanded) {
        const tl = tlRef.current;
        if (tl) {
          setIsHamburgerOpen(false);
          tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
          tl.reverse();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  // ─── ADDED: Close on route change
  useEffect(() => {
    if (isExpanded) {
      const tl = tlRef.current;
      if (tl) {
        setIsHamburgerOpen(false);
        tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
        tl.reverse();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // ─── PRESERVED: toggleMenu() — identical to original.
  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  // ─── PRESERVED: setCardRef — identical.
  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    // ─── CHANGE: Removed absolute/left-1/2/top/translate-x positioning.
    //      Now uses `relative` so the trigger sits inline within the parent Navbar.
    //      The dropdown panel is absolutely positioned relative to this wrapper.
    //      Added ref={containerRef} to detect click outside.
    <div ref={containerRef} className={`card-nav-container relative ${className}`}>

      {/* ─── CHANGE: Replaced hamburger with "Browse Space ▼" text button.
           This sits OUTSIDE the GSAP-animated panel so it's always visible.
           The chevron arrow rotates 180° when expanded. */}
      <button
        type="button"
        className={`group flex items-center gap-1 cursor-pointer bg-transparent border-0 text-sm font-medium transition-colors duration-200
          ${isExpanded ? 'text-[#2B7FFF]' : 'text-[#71717B] hover:text-[#18181B]'}`}
        onClick={toggleMenu}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
          }
        }}
        aria-label={isExpanded ? 'Close browse menu' : 'Open browse menu'}
        aria-expanded={isExpanded}
        tabIndex={0}
      >
        Browse Space
        {/* ─── Arrow indicator: rotates 180° when dropdown is open */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-3.5 h-3.5 transition-transform duration-300 ease-out
            ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* ─── CHANGE: The dropdown panel is now a separate div, positioned absolutely
           below the trigger button. GSAP animates its height from 0 → calculated.
           The navRef is on this element so GSAP controls it.
           IMPROVEMENT: Added bg-white/95 backdrop-blur-md for a modern glassmorphic SaaS appearance. */}
      <div
        ref={navRef}
        className={`card-nav absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[min(90vw,640px)]
          rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl ring-1 ring-black/[0.06]
          will-change-[height,opacity] z-[99] overflow-hidden`}
      >
        {/* ─── Dropdown card grid: stacks on mobile, row on desktop */}
        <div
          className={`card-nav-content p-3 flex flex-col items-stretch gap-2.5 justify-start
            ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}
            md:flex-row md:items-stretch md:gap-3`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              // ─── CHANGE: Premium SaaS card styling:
              //   - rounded-2xl for modern corners
              //   - shadow-sm with hover:shadow-lg for depth
              //   - hover:-translate-y-0.5 for subtle lift effect
              //   - transition-all for smooth hover animations
              //   - Proper padding and spacing for premium feel
              className="nav-card select-none relative flex flex-col gap-3 p-5 rounded-2xl min-w-0
                flex-[1_1_auto] h-auto min-h-[60px]
                md:h-full md:min-h-0 md:flex-[1_1_0%]
                shadow-sm hover:shadow-lg hover:-translate-y-0.5
                transition-all duration-300 ease-out cursor-default"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              {/* ─── Card title — uppercase label for premium SaaS feel */}
              <div className="nav-card-label font-semibold tracking-wide text-[11px] md:text-[12px] uppercase opacity-70">
                {item.label}
              </div>

              {/* ─── Card links — clean spacing for readability */}
              <div className="nav-card-links mt-auto flex flex-col gap-0.5">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-1.5 no-underline cursor-pointer
                      transition-all duration-200
                      hover:opacity-70 hover:translate-x-0.5
                      text-[13px] md:text-[14px] font-medium py-0.5"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    style={{ color: item.textColor }}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0 w-3.5 h-3.5" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardNav;
