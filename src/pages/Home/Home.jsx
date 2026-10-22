import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  HeartPulse,
  ShieldCheck,
  Target,
  ClipboardCheck,
  ChevronDown,
  CalendarCheck,
  Dumbbell,
  Footprints,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

import "./Home.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import intro from "../../assets/home/intro.jpeg";
import serviceImg1 from "../../assets/services/image1.jpeg";
import serviceImg2 from "../../assets/services/image2.jpeg";
import serviceImg3 from "../../assets/services/image3.jpeg";
import serviceImg4 from "../../assets/services/image4.jpeg";
import image from "../../assets/approch.png";
const services = [
  {
    number: "01",
    title: "Sports Physiotherapy",
    description:
      "Personalised care to help you recover, improve performance and return to the sport you love.",
    icon: Footprints,
    link: "/services/sports-physiotherapy",
  },
  {
    number: "02",
    title: "Pain Management",
    description:
      "Understand the source of discomfort and work towards better movement with guided care.",
    icon: HeartPulse,
    link: "/services/pain-management",
  },
  {
    number: "03",
    title: "Injury Rehabilitation",
    description:
      "Build strength, improve mobility and progress through a structured recovery programme.",
    icon: Activity,
    link: "/services/injury-rehabilitation",
  },
  {
    number: "04",
    title: "Strength and Mobility",
    description:
      "Improve balance, flexibility and movement confidence with a personalised approach.",
    icon: Dumbbell,
    link: "/services/strength-mobility",
  },
];

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We begin by understanding your concerns, movement patterns and recovery goals.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Your physiotherapist creates a care plan suited to your needs and daily routine.",
  },
  {
    number: "03",
    title: "Recover",
    description:
      "Progress through guided exercises and personalised support at every stage.",
  },
  {
    number: "04",
    title: "Move Forward",
    description:
      "Build confidence in your movement and work towards a more active lifestyle.",
  },
];

const benefits = [
  "Personalised treatment plans",
  "Movement focused rehabilitation",
  "Guided exercise programmes",
  "Support throughout recovery",
];

const faqs = [
  {
    question: "When should I visit a physiotherapist?",
    answer:
      "You can consult a physiotherapist for pain, stiffness, movement difficulties, sports injuries or support after an injury or surgery. A professional assessment can help determine the right next steps.",
  },
  {
    question: "Will my treatment plan be personalised?",
    answer:
      "Your care plan should be based on your symptoms, assessment, movement goals and progress. Your physiotherapist can adjust the plan as your needs change.",
  },
  {
    question: "How long does recovery take?",
    answer:
      "Recovery varies depending on your condition, its severity and your individual progress. Your physiotherapist can discuss realistic milestones after assessing your needs.",
  },
  {
    question: "Can physiotherapy help improve mobility?",
    answer:
      "Physiotherapy may help improve mobility, strength, balance and movement confidence through appropriate exercises and professional guidance.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <main className="rehab-home">
      {/* HERO SECTION */}
      <HeroSection />

      {/* INTRODUCTION */}

      <section className="home-intro home-section">
        <div className="home-container">
          <motion.div
            className="home-intro-grid"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Image area */}
            <div className="home-intro-visual">
              <img
                src={intro}
                alt="Personalised physiotherapy and guided rehabilitation"
                loading="lazy"
              />

              <div className="home-intro-image-overlay" />

              <div className="home-intro-image-top">
                <span className="home-intro-live-dot" />
                <span>PERSONALISED RECOVERY</span>
              </div>

              <div className="home-intro-image-bottom">
                <div>
                  <span className="home-intro-image-label">
                    THE REHABICS PHILOSOPHY
                  </span>

                  <h3>
                    Every movement
                    <br />
                    has a purpose.
                  </h3>
                </div>

                <span className="home-intro-image-arrow">
                  <ArrowUpRight size={22} />
                </span>
              </div>

              <span className="home-intro-image-number">
                01 <span /> 04
              </span>
            </div>

            {/* Text area */}
            <div className="home-intro-content">
              {/* <div className="home-eyebrow">
          <span className="rehab-hero-eyebrow-line" />
          A BETTER WAY TO MOVE
        </div> */}

              <h2>
                Your body.
                <br />
                Your movement.
                <br />
                <span>Your comeback.</span>
              </h2>

              <div className="home-intro-divider">
                <span />
                <span />
                <span />
              </div>

              <div className="home-intro-copy">
                <span className="home-intro-index">01 / OUR PHILOSOPHY</span>

                <p className="home-intro-lead">
                  Recovery is more than getting out of pain. It is about getting
                  back to the life you love.
                </p>

                <p className="home-intro-description">
                  Every recovery journey is different. We take the time to
                  understand your movement, your challenges and your goals, then
                  guide you with personalised physiotherapy that helps you build
                  strength and move with confidence.
                </p>

                <Link to="/about" className="home-text-link">
                  <span>Discover our approach</span>
                  <ArrowUpRight size={18} />
                </Link>
              </div>

              {/* Recovery journey */}
              <div className="home-intro-highlights">
                <div className="home-intro-highlight">
                  <span className="home-intro-step">01</span>
                  <div>
                    <strong>Understand</strong>
                    <small>Know your movement</small>
                  </div>
                </div>

                <div className="home-intro-highlight">
                  <span className="home-intro-step">02</span>
                  <div>
                    <strong>Rebuild</strong>
                    <small>Restore your strength</small>
                  </div>
                </div>

                <div className="home-intro-highlight">
                  <span className="home-intro-step">03</span>
                  <div>
                    <strong>Move forward</strong>
                    <small>Build lasting confidence</small>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="home-services home-section">
        <div className="home-container">
          <motion.div
            className="home-services-heading"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="home-services-heading-copy">
              <span className="home-eyebrow">
                <span className="rehab-hero-eyebrow-line" />
                HOW WE CAN HELP
              </span>

              <h2>
                Care designed around
                <br />
                <span>your movement.</span>
              </h2>

              <p>
                Personalised physiotherapy to help you recover, rebuild strength
                and get back to doing what you love.
              </p>
            </div>

            <Link to="/services" className="home-services-view-all">
              <span>View all services</span>
              <ArrowUpRight size={19} />
            </Link>
          </motion.div>

          <div className="home-service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;

              const images = [
                serviceImg1,
                serviceImg2,
                serviceImg3,
                serviceImg4,
              ];

              return (
                <motion.article
                  className="home-service-card"
                  key={service.number}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.09 }}
                >
                  <Link
                    to={service.link}
                    className="home-service-card-image"
                    aria-label={`Explore ${service.title}`}
                    tabIndex={-1}
                  >
                    <img
                      src={images[index % images.length]}
                      alt={service.title}
                      loading="lazy"
                    />

                    <span className="home-service-image-overlay" />

                    <span className="home-service-number">
                      {service.number}
                    </span>

                    <span className="home-service-icon">
                      <Icon size={23} strokeWidth={1.7} />
                    </span>

                    <span className="home-service-image-arrow">
                      <ArrowUpRight size={21} />
                    </span>
                  </Link>

                  <div className="home-service-card-content">
                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <Link
                      to={service.link}
                      className="home-service-link"
                      aria-label={`Explore ${service.title}`}
                    >
                      <span>Explore service</span>
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="home-services-footer">
            <span>REHABICS</span>
            <span className="home-services-footer-line" />
            <span>MOVE BETTER. LIVE STRONGER.</span>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}

      <section className="home-approach home-section">
        <div className="home-container">
          <div className="home-approach-grid">
            {/* Visual side */}

            <motion.div
              className="home-approach-visual"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <img
                className="home-approach-image"
                src={image}
                alt="Physiotherapist guiding a patient through a rehabilitation exercise"
                loading="lazy"
              />

              <div className="home-approach-image-overlay" />

              <div className="home-approach-top-label">
                <span className="home-approach-status-dot" />
                CARE BUILT AROUND YOU
              </div>

              <div className="home-approach-image-caption">
                <span>THE REHABICS METHOD</span>
                <h3>
                  Small steps.
                  <br />
                  Stronger tomorrows.
                </h3>
              </div>

              <div className="home-approach-progress-card">
                <span className="home-approach-progress-icon">
                  <Activity size={23} />
                </span>
                <span>
                  <strong>Progress with purpose</strong>
                  <small>Your journey, at your pace</small>
                </span>
                <CheckCircle2 className="home-approach-check" size={20} />
              </div>

              <span className="home-approach-index">
                OUR APPROACH <span /> 02
              </span>
            </motion.div>

            {/* Content side */}

            <motion.div
              className="home-approach-content"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className="home-eyebrow">
                <span className="rehab-hero-eyebrow-line" />
                THE REHABICS APPROACH
              </span>

              <h2>
                Your journey.
                <br />
                Your goals.
                <br />
                <span>Your recovery.</span>
              </h2>

              <div className="home-approach-accent">
                <span />
                <span />
                <span />
              </div>

              <p className="home-approach-lead">
                No two recovery journeys are the same. Your care should reflect
                that.
              </p>

              <p className="home-approach-description">
                We begin by understanding your movement, your challenges and
                what you want to achieve. From there, we help you work towards
                your goals with personalised physiotherapy and guided
                rehabilitation.
              </p>

              <ul className="home-benefit-list">
                {benefits.map((benefit, index) => (
                  <li key={benefit}>
                    <span className="home-benefit-icon">
                      <CheckCircle2 size={17} />
                    </span>
                    <span>{benefit}</span>
                    <span className="home-benefit-number">0{index + 1}</span>
                  </li>
                ))}
              </ul>

              <Link to="/about" className="home-primary-link">
                <span>Learn about Rehabics</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RECOVERY PROCESS */}

      <section className="home-process home-section">
        <div className="home-container">
          <motion.div
            className="home-process-heading"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="home-process-heading-copy">
              

              <span className="home-eyebrow">
                <span className="rehab-hero-eyebrow-line" />
                                YOUR PATH TO PROGRESS

              </span>

              <h2>
                Better movement.
                <br />
                <span>One step at a time.</span>
              </h2>

              <p>
                Recovery feels easier when you know what comes next. We guide
                you through every stage with a clear plan built around your
                goals.
              </p>
            </div>

            <div className="home-process-heading-note">
              <span className="home-process-note-icon">
                <Activity size={21} />
              </span>
              <span>
                <strong>Progress with purpose</strong>
                <small>Your recovery, guided by you</small>
              </span>
            </div>
          </motion.div>

          <div className="home-process-grid">
            {steps.map((step, index) => {
              const icons = [ClipboardCheck, Activity, Target, TrendingUp];

              const StepIcon = icons[index % icons.length];

              return (
                <motion.article
                  className="home-process-card"
                  key={step.number}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="home-process-card-top">
                    <span className="home-process-number">
                      {String(step.number).padStart(2, "0")}
                    </span>

                    <span className="home-process-icon">
                      <StepIcon size={23} strokeWidth={1.7} />
                    </span>
                  </div>

                  <div className="home-process-track">
                    <span className="home-process-track-fill" />
                  </div>

                  <span className="home-process-step-label">
                    STEP {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  <div className="home-process-card-bottom">
                    <span>BUILT AROUND YOU</span>
                    <CheckCircle2 size={17} />
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            className="home-process-footer"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p>Every step brings you closer to moving with confidence.</p>

            <Link to="/contact" className="home-process-cta">
              <span>Start your recovery</span>
              <ArrowUpRight size={19} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TRUST */}

      <section className="home-trust home-section">
        <div className="home-container home-trust-inner">
          <motion.div
            className="home-trust-copy"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="home-eyebrow">
              <span className="rehab-hero-eyebrow-line" />
              CARE WITH PURPOSE
            </span>

            <h2>
              Move beyond
              <br />
              <span>your limitations.</span>
            </h2>

            <p>
              Your recovery deserves a thoughtful approach. Get personalised
              guidance, understand your progress and work towards the activities
              that matter most to you.
            </p>

            <Link to="/appointment" className="home-primary-link">
              <span>Start your journey</span>
              <ArrowUpRight size={18} />
            </Link>

            <div className="home-trust-note">
              <span className="home-trust-note-icon">
                <ShieldCheck size={19} />
              </span>
              <span>
                <strong>Your goals come first</strong>
                <small>Care shaped around your needs</small>
              </span>
            </div>
          </motion.div>

          <div className="home-trust-cards">
            <motion.article
              className="home-trust-card"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.08 }}
            >
              <div className="home-trust-card-top">
                <span className="home-trust-icon">
                  <ShieldCheck size={24} strokeWidth={1.7} />
                </span>
                <span className="home-trust-card-number">01</span>
              </div>

              <h3>Individualised care</h3>
              <p>
                A treatment approach shaped around your needs, abilities and
                recovery goals.
              </p>

              <span className="home-trust-card-line" />
            </motion.article>

            <motion.article
              className="home-trust-card"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.16 }}
            >
              <div className="home-trust-card-top">
                <span className="home-trust-icon">
                  <ClipboardCheck size={24} strokeWidth={1.7} />
                </span>
                <span className="home-trust-card-number">02</span>
              </div>

              <h3>Clear guidance</h3>
              <p>
                Understand your recovery plan and why each step matters to your
                progress.
              </p>

              <span className="home-trust-card-line" />
            </motion.article>

            <motion.article
              className="home-trust-card home-trust-card-wide"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.24 }}
            >
              <div className="home-trust-card-top">
                <span className="home-trust-icon">
                  <Sparkles size={24} strokeWidth={1.7} />
                </span>
                <span className="home-trust-card-number">03</span>
              </div>

              <h3>Progress with confidence</h3>
              <p>
                Develop healthier movement habits with appropriate professional
                support at every stage.
              </p>

              <span className="home-trust-card-line" />
            </motion.article>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="home-faq home-section">
        <div className="home-container home-faq-grid">
          <motion.div
            className="home-faq-heading"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="home-eyebrow">
              <span className="rehab-hero-eyebrow-line" />
              GOOD TO KNOW
            </span>

            <h2>
              Questions about
              <br />
              <span>physiotherapy?</span>
            </h2>

            <p>
              Find helpful answers about your treatment, recovery journey and
              how Rehabics can support your movement goals.
            </p>

            <Link to="/contact" className="home-faq-contact">
              <span>Still have questions?</span>
              <span className="home-faq-contact-link">
                Talk to our team
                <ArrowUpRight size={18} />
              </span>
            </Link>

            <div className="home-faq-note">
              <span className="home-faq-note-icon">
                <MessageCircle size={20} />
              </span>
              <span>
                <strong>We are here to help</strong>
                <small>Get guidance for your next step</small>
              </span>
            </div>
          </motion.div>

          <div className="home-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;

              return (
                <motion.article
                  className={`home-faq-item ${isOpen ? "is-open" : ""}`}
                  key={faq.question}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <button
                    className="home-faq-question"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                  >
                    <span className="home-faq-question-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="home-faq-question-text">
                      {faq.question}
                    </span>

                    <span className="home-faq-chevron-wrap">
                      <ChevronDown size={19} className="home-faq-chevron" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="home-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
    </main>
  );
}
