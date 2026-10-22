import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  MoveUpRight,
  LogIn
} from "lucide-react";
import "./Navbar.css";

const serviceLinks = [
  { label: "Sports Physiotherapy", to: "/services/sports-physiotherapy" },
  { label: "Pain Management", to: "/services/pain-management" },
  { label: "Injury Rehabilitation", to: "/services/injury-rehabilitation" },
  { label: "Strength and Mobility", to: "/services/strength-mobility" },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/about" },
  { label: "For Patients", to: "/patients" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navbarRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const location = useLocation();

  const closeMenus = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.22,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : 6,
      transition: {
        duration: reduceMotion ? 0 : 0.14,
      },
    },
  };

  const renderServiceLinks = (mobile = false) =>
    serviceLinks.map((service, index) => (
      <NavLink
        key={service.to}
        to={service.to}
        className={({ isActive }) =>
          `${mobile ? "rehab-mobile-subitem" : "rehab-dropdown-item"} ${
            isActive ? "is-active" : ""
          }`
        }
        onClick={closeMenus}
      >
        <span className="rehab-service-number">
          0{index + 1}
        </span>
        <span className="rehab-service-label">{service.label}</span>
        <ArrowUpRight size={16} />
      </NavLink>
    ));

  return (
    <header className="rehab-navbar" ref={navbarRef}>
      <div className="rehab-nav-shell">
        <div className="rehab-nav-inner container">
          <Link
            to="/"
            className="rehab-brand"
            aria-label="Rehabics home"
            onClick={closeMenus}
          >
            <span className="rehab-brand-mark">
              <Activity size={24} strokeWidth={2.5} />
              <span className="rehab-brand-mark-dot" />
            </span>

            <span className="rehab-brand-copy">
              <span className="rehab-brand-name">rehabics</span>
              <span className="rehab-brand-tagline">
                PERFORMANCE CARE
              </span>
            </span>
          </Link>

          <nav
            className="rehab-desktop-nav"
            aria-label="Main navigation"
          >
            {navLinks.slice(0, 2).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rehab-nav-link ${isActive ? "is-active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="rehab-nav-dropdown">
              <button
                type="button"
                className={`rehab-nav-link rehab-dropdown-trigger ${
                  servicesOpen ||
                  location.pathname.startsWith("/services")
                    ? "is-active"
                    : ""
                }`}
                aria-expanded={servicesOpen}
                aria-controls="rehab-services-menu"
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services
                <ChevronDown
                  size={15}
                  className={servicesOpen ? "chevron-open" : ""}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    id="rehab-services-menu"
                    className="rehab-dropdown-panel"
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="rehab-dropdown-heading">
                      <span className="rehab-dropdown-eyebrow">
                        YOUR RECOVERY
                      </span>
                      <span className="rehab-dropdown-title">
                        Find your focus
                      </span>
                    </div>

                    <div className="rehab-dropdown-links">
                      {renderServiceLinks()}
                    </div>

                    <Link
                      to="/services"
                      className="rehab-all-services"
                      onClick={closeMenus}
                    >
                      Explore all services
                      <MoveUpRight size={16} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(2).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rehab-nav-link ${isActive ? "is-active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="rehab-nav-actions">
              <Link
    to="/login"
    className="rehab-nav-login"
    onClick={closeMenus}
  >
    <LogIn size={16} />
    <span>Login</span>
  </Link>

            <Link
              to="/appointment"
              className="rehab-nav-cta"
              onClick={closeMenus}
            >
              <span>Book a Session</span>
              <span className="rehab-cta-icon">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="rehab-mobile-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="rehab-mobile-menu"
            onClick={() => {
              setMenuOpen((open) => !open);
              setServicesOpen(false);
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: reduceMotion ? 0 : 0.15 }}
              >
                {menuOpen ? <X size={23} /> : <Menu size={23} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="rehab-mobile-menu"
            className="rehab-mobile-nav"
            aria-label="Mobile navigation"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="rehab-mobile-topline">
              <span>EXPLORE REHABICS</span>
              <span className="rehab-mobile-indicator" />
            </div>

            {navLinks.slice(0, 2).map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rehab-mobile-link ${isActive ? "is-active" : ""}`
                }
                onClick={closeMenus}
              >
                <span className="rehab-mobile-index">
                  0{index + 1}
                </span>
                <span>{item.label}</span>
                <ArrowUpRight size={17} />
              </NavLink>
            ))}

            <div className="rehab-mobile-services">
              <button
                type="button"
                className={`rehab-mobile-link ${
                  location.pathname.startsWith("/services")
                    ? "is-active"
                    : ""
                }`}
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((open) => !open)}
              >
                <span className="rehab-mobile-index">03</span>
                <span>Services</span>
                <ChevronDown
                  size={17}
                  className={servicesOpen ? "chevron-open" : ""}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    className="rehab-mobile-submenu"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {renderServiceLinks(true)}
                    <Link
                      to="/services"
                      className="rehab-mobile-all-services"
                      onClick={closeMenus}
                    >
                      Explore all services
                      <ArrowUpRight size={16} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(2).map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rehab-mobile-link ${isActive ? "is-active" : ""}`
                }
                onClick={closeMenus}
              >
                <span className="rehab-mobile-index">
                  0{index + 4}
                </span>
                <span>{item.label}</span>
                <ArrowUpRight size={17} />
              </NavLink>
            ))}

            <Link
              to="/appointment"
              className="rehab-mobile-cta"
              onClick={closeMenus}
            >
              <span>
                <span className="rehab-mobile-cta-label">
                  TAKE THE NEXT STEP
                </span>
                <strong>Book a Session</strong>
              </span>
              <span className="rehab-mobile-cta-icon">
                <ArrowUpRight size={21} />
              </span>
            </Link>

            <div className="rehab-mobile-footer">
              <Activity size={16} />
              <span>RECOVER. REBUILD. PERFORM.</span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}