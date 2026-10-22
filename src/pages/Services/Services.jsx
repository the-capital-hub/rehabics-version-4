
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  HeartPulse,
  Dumbbell,
  Footprints,
  ShieldCheck,
  Target,
  MoveUpRight,
  CheckCircle2,
  Sparkles,
  Plus,
  Minus,
  PersonStanding,
  Bone,
  Stethoscope,
  ClipboardCheck,
} from "lucide-react";

import "./Services.css";
import image1 from '../../assets/services/image1.jpeg'
import image2 from '../../assets/services/image2.jpeg'
import image3 from '../../assets/services/image3.jpeg'
import image4 from '../../assets/services/image4.jpeg'
const services = [
  {
    number: "01",
    icon: Activity,
    title: "Physiotherapy",
    category: "MOVEMENT CARE",
    description:
      "Individualised movement care designed around your concerns, daily activities and recovery goals.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=85",
    alt: "Guided exercise in a rehabilitation setting",
    features: ["Movement assessment", "Personalised care plan", "Progress guidance"],
  },
  {
    number: "02",
    icon: Dumbbell,
    title: "Sports Rehabilitation",
    category: "PERFORMANCE",
    description:
      "A thoughtful approach to rebuilding movement, strength and confidence after a sports related setback.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85",
    alt: "Athlete working on strength and fitness",
    features: ["Movement and strength goals", "Progressive exercises", "Return to activity planning"],
  },
  {
    number: "03",
    icon: Footprints,
    title: "Mobility and Flexibility",
    category: "MOVE WITH CONFIDENCE",
    description:
      "Work on movement control, flexibility and mobility to support the activities that matter to you.",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=85",
    alt: "Person training to improve movement and fitness",
    features: ["Mobility exercises", "Movement control", "Daily activity goals"],
  },
  {
    number: "04",
    icon: Bone,
    title: "Pain and Injury Support",
    category: "RECOVERY SUPPORT",
    description:
      "Understand your movement concerns and explore suitable care options with appropriate professional guidance.",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85",
    alt: "Exercise equipment in a training environment",
    features: ["Understand your concerns", "Discuss care options", "Guided movement plan"],
  },
  {
    number: "05",
    icon: PersonStanding,
    title: "Posture and Movement",
    category: "EVERYDAY MOVEMENT",
    description:
      "Build awareness of movement habits and explore practical ways to support your everyday routine.",
    image:
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=1000&q=85",
    alt: "Person performing a controlled fitness exercise",
    features: ["Movement awareness", "Exercise guidance", "Practical daily habits"],
  },
  {
    number: "06",
    icon: Target,
    title: "Strength and Conditioning",
    category: "BUILD YOUR BASE",
    description:
      "Work towards strength, stability and physical confidence with exercises suited to your needs and goals.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=85",
    alt: "Strength and conditioning workout",
    features: ["Strength focused exercises", "Stability and control", "Goal based progression"],
  },
];

const processSteps = [
  {
    number: "01",
    icon: MessageCircleIcon,
    title: "Tell us your goals",
    description:
      "Share your concerns, daily routine and the activities you want to work towards.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Understand your needs",
    description:
      "Discuss your movement concerns and the care options that may suit your situation.",
  },
  {
    number: "03",
    icon: Target,
    title: "Plan your next steps",
    description:
      "Explore a personalised approach built around your needs and agreed goals.",
  },
  {
    number: "04",
    icon: MoveUpRight,
    title: "Work towards progress",
    description:
      "Follow your plan, review how things are going and adjust the approach when appropriate.",
  },
];

function MessageCircleIcon(props) {
  return <HeartPulse {...props} />;
}

const faqs = [
  {
    question: "How do I choose the right service?",
    answer:
      "Start by sharing your concerns and goals with us. We can help you understand the available options and discuss what may be appropriate for your needs.",
  },
  {
    question: "Do I need an appointment before visiting?",
    answer:
      "We recommend contacting us before your visit so you can confirm availability and understand the next steps for your chosen service.",
  },
  {
    question: "Will my care plan be personalised?",
    answer:
      "The aim is to consider your individual needs, concerns and goals when discussing a care plan. Your approach may differ depending on your circumstances and professional assessment.",
  },
  {
    question: "How long does recovery take?",
    answer:
      "Recovery varies by person, condition and goals. A suitable timeline can only be discussed after understanding your individual situation.",
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

function ServicesEyebrow({ children }) {
  return (
    <span className="services-eyebrow">
      <span className="rehab-hero-eyebrow-line" />
      {children}
    </span>
  );
}

function Services() {
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(0);

  const revealProps = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          variants: reveal,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.12 },
          transition: { duration: 0.6, delay },
        };

  return (
    <main className="rehab-services">
      {/* 01. Hero */}
      <section className="services-hero">
        <div className="services-hero-background" />
        <div className="services-hero-overlay" />
        <div className="services-hero-grid" />

        <div className="services-container services-hero-layout">
          <motion.div className="services-hero-copy" {...revealProps()}>
            <ServicesEyebrow>OUR SERVICES</ServicesEyebrow>

            <h1>
              Move beyond
              <br />
              <span>limitations.</span>
              <br />
              Find your strength.
            </h1>

            <p>
              Every movement journey is different. Explore care and exercise
              options designed to help you understand your needs and work
              towards the activities that matter to you.
            </p>

            <div className="services-hero-actions">
              <a href="#service-list" className="services-button-primary">
                Explore services <ArrowRight size={18} />
              </a>

              <Link to="/appointment" className="services-button-secondary">
                Book an appointment <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="services-hero-note">
              <span />
              CARE THAT STARTS WITH YOUR GOALS
            </div>
          </motion.div>

          <motion.div
            className="services-hero-visual"
            {...revealProps(0.1)}
          >
            <div className="services-hero-image">
              <img
                src={image2}
                alt="Guided physical exercise in a rehabilitation environment"
                fetchPriority="high"
              />
              <div className="services-hero-image-shade" />

              <div className="services-hero-image-caption">
                <span className="services-hero-image-icon">
                  <Activity size={22} />
                </span>
                <span>
                  <strong>Movement with purpose</strong>
                  <small>A personal approach to care</small>
                </span>
              </div>

              <span className="services-image-index">REHABICS / SERVICES</span>
            </div>

            <div className="services-hero-floating">
              <Sparkles size={19} />
              <span>
                <strong>Your goals come first</strong>
                <small>Every step has a purpose</small>
              </span>
            </div>
          </motion.div>
        </div>

        {/* <div className="services-hero-footer">
          <span>PERSONALISED CARE</span>
          <span className="services-hero-footer-line" />
          <span>MOVE BETTER. LIVE STRONGER.</span>
        </div> */}
      </section>

      {/* 02. Intro */}
      <section className="services-intro services-section">
        <div className="services-container services-intro-layout">
          <motion.div className="services-intro-heading" {...revealProps()}>
            <ServicesEyebrow>CARE BUILT AROUND YOU</ServicesEyebrow>
            <h2>
              Different goals.
              <br />
              <span>One personal approach.</span>
            </h2>
          </motion.div>

          <motion.div className="services-intro-copy" {...revealProps(0.08)}>
            <p>
              From everyday movement to sports related goals, the right
              starting point is understanding your needs.
            </p>
            <p>
              Explore the service areas below and get in touch if you need
              help deciding which direction to take.
            </p>
            <a href="#service-list" className="services-text-link">
              Find your starting point <ArrowRight size={17} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 03. Services grid */}
      <section
        className="services-list services-section"
        id="service-list"
      >
        <div className="services-container">
          <motion.div className="services-section-heading" {...revealProps()}>
            <div>
              <ServicesEyebrow>EXPLORE OUR SERVICES</ServicesEyebrow>
              <h2>
                Find the right
                <br />
                <span>way forward.</span>
              </h2>
            </div>
            <p>
              Each service area offers a different starting point. Your
              individual needs and professional assessment help determine
              which approach is suitable for you.
            </p>
          </motion.div>

          <div className="services-card-grid">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  className="services-card"
                  key={service.number}
                  {...revealProps(index * 0.06)}
                >
                  <div className="services-card-image">
                    <img
                      src={service.image}
                      alt={service.alt}
                      loading="lazy"
                    />
                    <span className="services-card-image-shade" />
                    <span className="services-card-number">
                      {service.number}
                    </span>
                    <span className="services-card-icon">
                      <Icon size={23} />
                    </span>
                  </div>

                  <div className="services-card-content">
                    <span className="services-card-category">
                      {service.category}
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>

                    <ul className="services-feature-list">
                      {service.features.map((feature) => (
                        <li key={feature}>
                          <CheckCircle2 size={15} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/appointment"
                      className="services-card-link"
                      aria-label={`Ask about ${service.title}`}
                    >
                      Enquire about this service
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04. Approach */}
      <section className="services-approach services-section">
        <div className="services-container services-approach-layout">
          <motion.div
            className="services-approach-visual"
            {...revealProps()}
          >
            <img
              src={image3}
              alt="Person working on movement and fitness goals"
              loading="lazy"
            />
            <div className="services-approach-shade" />

            <div className="services-approach-stamp">
              <Activity size={25} />
              <span>MOVE WITH PURPOSE</span>
            </div>

            <span className="services-approach-index">04 / OUR APPROACH</span>
          </motion.div>

          <motion.div
            className="services-approach-copy"
            {...revealProps(0.08)}
          >
            <ServicesEyebrow>HOW WE THINK ABOUT CARE</ServicesEyebrow>

            <h2>
              Your needs lead.
              <br />
              <span>Your plan follows.</span>
            </h2>

            <p>
              Meaningful care begins with listening. Understanding your
              concerns and goals helps shape a more relevant conversation
              about the next steps.
            </p>

            <div className="services-approach-points">
              <div>
                <span className="services-approach-point-icon">
                  <HeartPulse size={20} />
                </span>
                <span>
                  <strong>Understand the person</strong>
                  <small>Consider your needs, routine and priorities.</small>
                </span>
              </div>

              <div>
                <span className="services-approach-point-icon">
                  <Target size={20} />
                </span>
                <span>
                  <strong>Focus on meaningful goals</strong>
                  <small>Discuss the movements you want to work towards.</small>
                </span>
              </div>

              <div>
                <span className="services-approach-point-icon">
                  <ShieldCheck size={20} />
                </span>
                <span>
                  <strong>Keep the process clear</strong>
                  <small>Understand your options and what comes next.</small>
                </span>
              </div>
            </div>

            <Link to="/about" className="services-text-link">
              Learn about our approach <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 05. Process */}
      <section className="services-process services-section">
        <div className="services-container">
          <motion.div className="services-section-heading" {...revealProps()}>
            <div>
              <ServicesEyebrow>YOUR NEXT STEPS</ServicesEyebrow>
              <h2>
                A process that
                <br />
                <span>starts with listening.</span>
              </h2>
            </div>
            <p>
              You do not need to have every answer before getting in touch.
              Start with your concerns and we can discuss the next step.
            </p>
          </motion.div>

          <div className="services-process-grid">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  className="services-process-card"
                  key={step.number}
                  {...revealProps(index * 0.07)}
                >
                  <div className="services-process-top">
                    <span>{step.number}</span>
                    <span className="services-process-line" />
                    <Icon size={20} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06. Why Rehabics */}
      <section className="services-why services-section">
        <div className="services-container services-why-layout">
          <motion.div className="services-why-copy" {...revealProps()}>
            <ServicesEyebrow>THE REHABICS DIFFERENCE</ServicesEyebrow>
            <h2>
              Care should make
              <br />
              <span>the next step clearer.</span>
            </h2>
            <p>
              Choosing a service is only the beginning. We want you to feel
              informed about the process and comfortable asking questions
              about your care.
            </p>

            <Link to="/contact" className="services-button-primary">
              Talk to our team <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="services-why-grid">
            <motion.div
              className="services-why-item"
              {...revealProps(0.04)}
            >
              <span className="services-why-icon">
                <HeartPulse size={22} />
              </span>
              <h3>Individual needs</h3>
              <p>Care conversations shaped around your concerns and goals.</p>
            </motion.div>

            <motion.div
              className="services-why-item"
              {...revealProps(0.1)}
            >
              <span className="services-why-icon">
                <ClipboardCheck size={22} />
              </span>
              <h3>Clear next steps</h3>
              <p>Understand the options and the purpose of your plan.</p>
            </motion.div>

            <motion.div
              className="services-why-item"
              {...revealProps(0.16)}
            >
              <span className="services-why-icon">
                <Target size={22} />
              </span>
              <h3>Meaningful goals</h3>
              <p>Keep the activities that matter to you in focus.</p>
            </motion.div>

            <motion.div
              className="services-why-item"
              {...revealProps(0.22)}
            >
              <span className="services-why-icon">
                <ShieldCheck size={22} />
              </span>
              <h3>Thoughtful guidance</h3>
              <p>Ask questions and make informed decisions about your care.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 07. FAQ */}
      <section className="services-faq services-section">
        <div className="services-container services-faq-layout">
          <motion.div className="services-faq-intro" {...revealProps()}>
            <ServicesEyebrow>GOOD TO KNOW</ServicesEyebrow>
            <h2>
              Questions before
              <br />
              <span>you begin?</span>
            </h2>
            <p>
              Here are a few things you may want to know before exploring your
              care options.
            </p>

            <Link to="/contact" className="services-text-link">
              Ask us a question <ArrowRight size={17} />
            </Link>
          </motion.div>

          <motion.div className="services-faq-list" {...revealProps(0.08)}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  className={`services-faq-item ${isOpen ? "is-open" : ""}`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    className="services-faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.question}</span>
                    <span className="services-faq-toggle">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="services-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 08. Final CTA */}
      {/* <section className="services-cta services-section">
        <div className="services-container">
          <motion.div className="services-cta-panel" {...revealProps()}>
            <div className="services-cta-glow" />

            <div className="services-cta-copy">
              <ServicesEyebrow>TAKE YOUR NEXT STEP</ServicesEyebrow>
              <h2>
                Start with your goals.
                <br />
                <span>Move forward with purpose.</span>
              </h2>
              <p>
                Tell us what you are looking for. We can discuss the available
                options and how to get started.
              </p>
            </div>

            <div className="services-cta-actions">
              <Link to="/appointment" className="services-button-primary">
                Book an appointment <ArrowUpRight size={19} />
              </Link>
              <Link to="/contact" className="services-cta-contact">
                Have a question? <span>Contact us</span>
              </Link>
            </div>

            <span className="services-cta-watermark">REHABICS</span>
          </motion.div>
        </div>
      </section> */}
    </main>
  );
}

export default Services;
