import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css";

const services = [
  {
    label: "Sports Physiotherapy",
    to: "/services/sports-physiotherapy",
  },
  {
    label: "Pain Management",
    to: "/services/pain-management",
  },
  {
    label: "Injury Rehabilitation",
    to: "/services/injury-rehabilitation",
  },
  {
    label: "Strength and Mobility",
    to: "/services/strength-mobility",
  },
];

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/about" },
  { label: "For Patients", to: "/patients" },
  { label: "All Services", to: "/services" },
  { label: "Contact Us", to: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FaFacebookF,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    Icon: FaLinkedinIn,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    Icon: FaYoutube,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="rehab-footer">
      <div className="rehab-footer-top-line" />

      <div className="container rehab-footer-container">
        {/* Appointment CTA */}

        <section className="rehab-footer-cta">
          <div className="rehab-footer-cta-glow" />

          <div className="rehab-footer-cta-copy">
            <span className="rehab-footer-eyebrow">
              YOUR JOURNEY STARTS HERE
            </span>

            <h2>
              Get back to
              <br />
              <span>what moves you.</span>
            </h2>

            <p>
              Personalised care. Purposeful recovery. Stronger movement.
              Take your next step with Rehabics.
            </p>
          </div>

          <Link
            to="/appointment"
            className="rehab-footer-main-cta"
          >
            <span>Book Your Session</span>
            <span className="rehab-footer-main-cta-icon">
              <ArrowUpRight size={20} />
            </span>
          </Link>

          <Activity
            className="rehab-footer-cta-watermark"
            aria-hidden="true"
            strokeWidth={0.8}
          />
        </section>

        {/* Main footer */}

        <div className="rehab-footer-main">
          {/* Brand and social media */}

          <div className="rehab-footer-brand-column">
            <Link
              to="/"
              className="rehab-footer-brand"
              aria-label="Rehabics home"
            >
              <span className="rehab-footer-brand-mark">
                <Activity size={25} strokeWidth={2.5} />
                <span className="rehab-footer-brand-dot" />
              </span>

              <span className="rehab-footer-brand-copy">
                <span className="rehab-footer-brand-name">
                  rehabics
                </span>
                <span className="rehab-footer-brand-tagline">
                  PERFORMANCE CARE
                </span>
              </span>
            </Link>

            <p className="rehab-footer-description">
              Recover with purpose. Rebuild with confidence.
              Move towards a stronger, more active life with
              personalised physiotherapy care.
            </p>

            <div className="rehab-footer-social-heading">
              FOLLOW OUR JOURNEY
            </div>

            <div className="rehab-footer-socials">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore links */}

          <div className="rehab-footer-column">
            <h3>Explore</h3>

            <ul>
              {exploreLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>
                    <span>{item.label}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}

          <div className="rehab-footer-column">
            <h3>Our Services</h3>

            <ul>
              {services.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>
                    <span>{item.label}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div className="rehab-footer-column rehab-footer-contact">
            <h3>Get in Touch</h3>

            <p className="rehab-footer-contact-intro">
              Need help choosing the right care? Connect with
              our team to discuss your next step.
            </p>

            <Link
              to="/contact"
              className="rehab-footer-contact-item"
            >
              <span className="rehab-footer-contact-icon">
                <MapPin size={17} />
              </span>
              <span>
                <strong>Our Clinic</strong>
                <small>Find our location</small>
              </span>
            </Link>

            <Link
              to="/contact"
              className="rehab-footer-contact-item"
            >
              <span className="rehab-footer-contact-icon">
                <Phone size={17} />
              </span>
              <span>
                <strong>Get in Touch</strong>
                <small>Speak with our team</small>
              </span>
            </Link>

            <Link
              to="/contact"
              className="rehab-footer-contact-item"
            >
              <span className="rehab-footer-contact-icon">
                <Mail size={17} />
              </span>
              <span>
                <strong>Send an Enquiry</strong>
                <small>We are here to help</small>
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}

        <div className="rehab-footer-bottom">
          <p className="rehab-footer-copyright">
            © {currentYear} Rehabics Performance Care.
            All rights reserved.
          </p>

          <div className="rehab-footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>

          <button
            type="button"
            className="rehab-footer-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <span className="rehab-footer-top-icon">
              <ArrowUp size={16} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}