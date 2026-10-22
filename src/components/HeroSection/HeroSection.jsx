
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  HeartPulse,
  PersonStanding,
  Dumbbell,
  Footprints,
  Play,
  ShieldCheck,
} from "lucide-react";
import heroImg from "../../assets/home/hero.png";
import "./HeroSection.css";

const stats = [
  { value: "500+", label: "Patients Recovered" },
  { value: "10+", label: "Years of Experience" },
  { value: "95%", label: "Patient Satisfaction" },
];

const services = [
  {
    number: "01",
    title: "Sports",
    secondLine: "Physiotherapy",
    description: "Return to the activities you love.",
    icon: Footprints,
    to: "/services/sports-physiotherapy",
  },
  {
    number: "02",
    title: "Pain",
    secondLine: "Management",
    description: "Move with greater comfort.",
    icon: PersonStanding,
    to: "/services/pain-management",
  },
  {
    number: "03",
    title: "Injury",
    secondLine: "Rehabilitation",
    description: "Build strength through recovery.",
    icon: HeartPulse,
    to: "/services/injury-rehabilitation",
  },
  {
    number: "04",
    title: "Strength",
    secondLine: "and Mobility",
    description: "Improve movement and control.",
    icon: Dumbbell,
    to: "/services/strength-mobility",
  },
];

const easing = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      delay: reduceMotion ? 0 : delay,
      ease: easing,
    },
  });

  return (
    <section className="rehab-hero">
      <div className="rehab-hero-background" aria-hidden="true" />
      <div className="rehab-hero-grid" aria-hidden="true" />

      <div className="rehab-hero-image" aria-hidden="true">
        <img src={heroImg} alt="" fetchPriority="high" />
        <div className="rehab-hero-image-overlay" />
      </div>

      <div className="rehab-hero-watermark" aria-hidden="true">
        REHABICS
      </div>

      <div className="rehab-hero-inner">
        <div className="rehab-hero-main">
          <motion.div
            className="rehab-hero-copy"
            {...reveal(0.05)}
          >
            <div className="rehab-hero-eyebrow">
              <span className="rehab-hero-eyebrow-line" />
              <span className="rehab-hero-eyebrow-text">
                MOVE BETTER. LIVE STRONGER.
              </span>
            </div>

            <h1>
              Expert Physiotherapy
              <br className="rehab-hero-desktop-break" />
              <span className="rehab-hero-heading-second">
                for an <span>Active Life.</span>
              </span>
            </h1>

            <p className="rehab-hero-description">
              Personalised physiotherapy to help you recover
              from pain, restore movement and return to an
              active life with confidence.
            </p>

            <div className="rehab-hero-actions">
              <Link
                to="/appointment"
                className="rehab-hero-button rehab-hero-button-primary"
              >
                <span>Book a Session</span>
                <ArrowUpRight size={19} />
              </Link>

              <Link
                to="/services"
                className="rehab-hero-button rehab-hero-button-secondary"
              >
                <span>Explore Services</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="rehab-hero-stats"
            {...reveal(0.18)}
          >
            {stats.map((stat) => (
              <div className="rehab-hero-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="rehab-hero-image-note"
          {...reveal(0.3)}
        >
          <span className="rehab-hero-image-note-icon">
            <Activity size={20} />
          </span>
          <span>
            <small>YOUR RECOVERY</small>
            <strong>Starts with movement</strong>
          </span>
        </motion.div>

        <motion.div
          className="rehab-hero-story"
          {...reveal(0.35)}
        >
          <Link to="/about" className="rehab-hero-story-link">
            <span className="rehab-hero-story-play">
              <Play size={16} fill="currentColor" />
            </span>
            <span className="rehab-hero-story-copy">
              <small>GET TO KNOW US</small>
              <strong>Our Story</strong>
            </span>
            <ArrowUpRight className="rehab-hero-story-arrow" size={18} />
          </Link>
        </motion.div>

        <motion.div
          className="rehab-hero-services"
          {...reveal(0.42)}
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                to={service.to}
                className="rehab-hero-service-card"
                key={service.number}
              >
                <div className="rehab-hero-service-top">
                  <span className="rehab-hero-service-icon">
                    <Icon size={24} strokeWidth={1.7} />
                  </span>
                  <span className="rehab-hero-service-number">
                    {service.number}
                  </span>
                </div>

                <h2>
                  {service.title}
                  <br />
                  {service.secondLine}
                </h2>

                <p>{service.description}</p>

                <span className="rehab-hero-service-link">
                  <span>Explore service</span>
                  <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </motion.div>

        <div className="rehab-hero-assurance">
          <ShieldCheck size={16} />
          <span>CARE THAT MOVES WITH YOU</span>
        </div>
      </div>

      <div className="rehab-hero-bottom-glow" aria-hidden="true" />
    </section>
  );
}
