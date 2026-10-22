
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  HeartPulse,
  ClipboardCheck,
  CalendarCheck,
  MessageCircle,
  ShieldCheck,
  Target,
  CheckCircle2,
  Clock3,
  FileText,
  Activity,
  CircleHelp,
  Plus,
  Minus,
  Sparkles,
  Footprints,
} from "lucide-react";

import "./Patients.css";
import image1 from '../../assets/patient/image1.jpeg'
import image2 from '../../assets/patient/image2.jpeg'
import image3 from '../../assets/patient/image3.jpeg'



const patientSteps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Tell us what you need",
    description:
      "Share your concerns, daily challenges and the activities you would like to work towards.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Discuss your needs",
    description:
      "Your first consultation is an opportunity to discuss your history, goals and suitable next steps.",
  },
  {
    number: "03",
    icon: Target,
    title: "Understand your plan",
    description:
      "Explore a care approach that considers your individual circumstances and agreed goals.",
  },
  {
    number: "04",
    icon: Activity,
    title: "Review your progress",
    description:
      "Keep track of how you are doing and discuss changes to your plan when appropriate.",
  },
];

const preparationItems = [
  {
    icon: FileText,
    title: "Relevant medical information",
    description:
      "Bring any relevant reports, prescriptions or previous assessment notes you have available.",
  },
  {
    icon: MessageCircle,
    title: "Your questions and concerns",
    description:
      "Think about your symptoms, daily activities and anything you would like to understand better.",
  },
  {
    icon: Clock3,
    title: "Appointment details",
    description:
      "Confirm your appointment time and allow enough time to arrive and get comfortable.",
  },
  {
    icon: Footprints,
    title: "Comfortable clothing",
    description:
      "Wear comfortable clothing that allows movement if your appointment includes a physical assessment.",
  },
];

const patientResources = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Before your appointment",
    description:
      "Know what to bring, what to share and how to prepare for your first visit.",
    linkText: "Book or enquire",
    to: "/appointment",
  },
  {
    number: "02",
    icon: HeartPulse,
    title: "Understanding your care",
    description:
      "Learn how your concerns, goals and individual assessment can inform the next steps.",
    linkText: "Explore services",
    to: "/services",
  },
  {
    number: "03",
    icon: CircleHelp,
    title: "Questions and support",
    description:
      "Reach out if you need help understanding available services or appointment details.",
    linkText: "Contact our team",
    to: "/contact",
  },
];

const faqs = [
  {
    question: "What should I expect at my first appointment?",
    answer:
      "Your first appointment may include a discussion of your concerns, relevant history, goals and movement needs. The exact process depends on your situation and the type of appointment.",
  },
  {
    question: "What should I bring with me?",
    answer:
      "If available, bring relevant medical reports, prescriptions, previous assessment notes and a list of questions. Contact the clinic beforehand if you are unsure what is required.",
  },
  {
    question: "Do I need to book in advance?",
    answer:
      "Contact the clinic or use the appointment page to enquire about availability and confirm the arrangements before visiting.",
  },
  {
    question: "Will my care plan be personalised?",
    answer:
      "Your needs, concerns and goals can help guide discussions about suitable care. Recommendations depend on an appropriate professional assessment.",
  },
  {
    question: "How long will my recovery take?",
    answer:
      "Recovery timelines vary according to the individual, the condition and other circumstances. Your healthcare professional can discuss expectations based on your assessment.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function PatientsEyebrow({ children }) {
  return (
    <span className="patients-eyebrow">
      <span className="rehab-hero-eyebrow-line" />
      {children}
    </span>
  );
}

function Patients() {
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
    <main className="rehab-patients">
      {/* 01. Patient hero */}
      <section className="patients-hero">
        <div className="patients-hero-background" />
        <div className="patients-hero-overlay" />
        <div className="patients-hero-grid" />

        <div className="patients-container patients-hero-layout">
          <motion.div className="patients-hero-copy" {...revealProps()}>
            <PatientsEyebrow>YOUR JOURNEY WITH REHABICS</PatientsEyebrow>

            <h1>
              Your goals.
              <br />
              Your journey.
              <br />
              <span>Your next step.</span>
            </h1>

            <p>
              Getting started with physiotherapy should feel clear and
              approachable. Understand what to expect, prepare for your visit
              and explore the support that may suit your needs.
            </p>

            <div className="patients-hero-actions">
              <Link to="/appointment" className="patients-button-primary">
                Book an appointment <ArrowRight size={18} />
              </Link>

              <a href="#patient-journey" className="patients-button-secondary">
                Understand your journey <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="patients-hero-note">
              <span />
              START WITH A CONVERSATION
            </div>
          </motion.div>

          <motion.div className="patients-hero-visual" {...revealProps(0.1)}>
            <div className="patients-hero-image">
              <img
                src={image1}
                alt="Guided physical exercise in a rehabilitation setting"
                fetchPriority="high"
              />

              <div className="patients-hero-image-shade" />

              <div className="patients-hero-image-caption">
                <span className="patients-hero-image-icon">
                  <HeartPulse size={22} />
                </span>
                <span>
                  <strong>Care starts with you</strong>
                  <small>Your needs, questions and goals</small>
                </span>
              </div>

              <span className="patients-hero-image-index">
                REHABICS / PATIENTS
              </span>
            </div>

            <div className="patients-hero-floating">
              <Sparkles size={19} />
              <span>
                <strong>One step at a time</strong>
                <small>Know what comes next</small>
              </span>
            </div>
          </motion.div>
        </div>

        {/* <div className="patients-hero-footer">
          <span>INFORMATION FOR PATIENTS</span>
          <span className="patients-hero-footer-line" />
          <span>YOUR CARE JOURNEY STARTS HERE</span>
        </div> */}
      </section>

      {/* 02. Welcome */}
      <section className="patients-welcome patients-section">
        <div className="patients-container patients-welcome-layout">
          <motion.div className="patients-welcome-heading" {...revealProps()}>
            <PatientsEyebrow A="PATIENT SUPPORT">
              PATIENT SUPPORT
            </PatientsEyebrow>

            <h2>
              Feel informed.
              <br />
              <span>Take your next step.</span>
            </h2>
          </motion.div>

          <motion.div className="patients-welcome-copy" {...revealProps(0.08)}>
            <p>
              Every person comes with different needs, experiences and goals.
              You may be managing discomfort, returning to an activity or
              simply looking for guidance about movement.
            </p>
            <p>
              This page helps you understand how to prepare, what to ask and
              where to find more information before getting started.
            </p>
            <Link to="/services" className="patients-text-link">
              Explore available services <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 03. Patient journey */}
      <section
        className="patients-journey patients-section"
        id="patient-journey"
      >
        <div className="patients-container">
          <motion.div className="patients-section-heading" {...revealProps()}>
            <div>
              <PatientsEyebrow>YOUR CARE JOURNEY</PatientsEyebrow>
              <h2>
                Know what to
                <br />
                <span>expect along the way.</span>
              </h2>
            </div>

            <p>
              The process starts with understanding your needs and discussing
              suitable options. Your individual experience may vary.
            </p>
          </motion.div>

          <div className="patients-journey-grid">
            {patientSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  className="patients-journey-card"
                  key={step.number}
                  {...revealProps(index * 0.07)}
                >
                  <div className="patients-journey-top">
                    <span className="patients-journey-number">
                      {step.number}
                    </span>
                    <span className="patients-journey-line" />
                    <Icon size={21} />
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04. Appointment preparation */}
      <section className="patients-prepare patients-section">
        <div className="patients-container patients-prepare-layout">
          <motion.div className="patients-prepare-visual" {...revealProps()}>
            <img
              src={image2}
              alt="Healthcare professional preparing for a patient consultation"
              loading="lazy"
            />

            <div className="patients-prepare-image-shade" />

            <div className="patients-prepare-image-caption">
              <span className="patients-prepare-image-icon">
                <ClipboardCheck size={22} />
              </span>
              <span>
                <strong>A little preparation helps</strong>
                <small>Arrive ready to discuss your needs</small>
              </span>
            </div>

            <span className="patients-prepare-image-index">
              BEFORE YOUR VISIT
            </span>
          </motion.div>

          <motion.div className="patients-prepare-copy" {...revealProps(0.08)}>
            <PatientsEyebrow>BEFORE YOUR APPOINTMENT</PatientsEyebrow>

            <h2>
              Make your first
              <br />
              <span>visit feel simpler.</span>
            </h2>

            <p>
              You do not need to have everything figured out. A few simple
              preparations can help you explain your concerns and make better
              use of your appointment.
            </p>

            <div className="patients-prepare-list">
              {preparationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="patients-prepare-item" key={item.title}>
                    <span className="patients-prepare-item-icon">
                      <Icon size={20} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                  </div>
                );
              })}
            </div>

            <Link to="/appointment" className="patients-text-link">
              Arrange an appointment <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 05. Patient resources */}
      <section className="patients-resources patients-section">
        <div className="patients-container">
          <motion.div className="patients-section-heading" {...revealProps()}>
            <div>
              <PatientsEyebrow>HELPFUL RESOURCES</PatientsEyebrow>
              <h2>
                The information
                <br />
                <span>you need to get started.</span>
              </h2>
            </div>

            <p>
              Find your next step, learn about available services or get in
              touch if you need further guidance.
            </p>
          </motion.div>

          <div className="patients-resource-grid">
            {patientResources.map((resource, index) => {
              const Icon = resource.icon;

              return (
                <motion.article
                  className="patients-resource-card"
                  key={resource.number}
                  {...revealProps(index * 0.07)}
                >
                  <div className="patients-resource-top">
                    <span>{resource.number}</span>
                    <Icon size={24} />
                  </div>

                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>

                  <Link to={resource.to} className="patients-resource-link">
                    {resource.linkText}
                    <ArrowUpRight size={17} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06. Patient principles */}
      <section className="patients-principles patients-section">
        <div className="patients-container patients-principles-layout">
          <motion.div
            className="patients-principles-copy"
            {...revealProps()}
          >
            <PatientsEyebrow>WHAT MATTERS THROUGHOUT YOUR JOURNEY</PatientsEyebrow>

            <h2>
              Clear information.
              <br />
              <span>Thoughtful care.</span>
            </h2>

            <p>
              We want you to feel able to ask questions, understand the options
              discussed with you and take part in decisions about your care.
            </p>

            <Link to="/about" className="patients-button-primary">
              Learn about Rehabics <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="patients-principles-grid">
            <motion.article
              className="patients-principle-card"
              {...revealProps(0.04)}
            >
              <span className="patients-principle-icon">
                <MessageCircle size={22} />
              </span>
              <h3>Open communication</h3>
              <p>Share your concerns and ask questions about your care.</p>
            </motion.article>

            <motion.article
              className="patients-principle-card"
              {...revealProps(0.1)}
            >
              <span className="patients-principle-icon">
                <ShieldCheck size={22} />
              </span>
              <h3>Informed decisions</h3>
              <p>Understand the options and recommendations discussed with you.</p>
            </motion.article>

            <motion.article
              className="patients-principle-card"
              {...revealProps(0.16)}
            >
              <span className="patients-principle-icon">
                <Target size={22} />
              </span>
              <h3>Personal goals</h3>
              <p>Keep your priorities and everyday activities in focus.</p>
            </motion.article>

            <motion.article
              className="patients-principle-card"
              {...revealProps(0.22)}
            >
              <span className="patients-principle-icon">
                <CheckCircle2 size={22} />
              </span>
              <h3>Clear next steps</h3>
              <p>Know what has been discussed and what happens next.</p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* 07. FAQ */}
      <section className="patients-faq patients-section">
        <div className="patients-container patients-faq-layout">
          <motion.div className="patients-faq-intro" {...revealProps()}>
            <PatientsEyebrow>FREQUENTLY ASKED QUESTIONS</PatientsEyebrow>

            <h2>
              Questions before
              <br />
              <span>your first visit?</span>
            </h2>

            <p>
              Find answers to common questions about preparing for an
              appointment and understanding your care journey.
            </p>

            <Link to="/contact" className="patients-text-link">
              Need more help? Contact us <ArrowRight size={17} />
            </Link>
          </motion.div>

          <motion.div className="patients-faq-list" {...revealProps(0.08)}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  className={`patients-faq-item ${isOpen ? "is-open" : ""}`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    className="patients-faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.question}</span>

                    <span className="patients-faq-toggle">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="patients-faq-answer">
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
      {/* <section className="patients-cta patients-section">
        <div className="patients-container">
          <motion.div className="patients-cta-panel" {...revealProps()}>
            <div className="patients-cta-glow" />

            <div className="patients-cta-copy">
              <PatientsEyebrow>READY TO GET STARTED?</PatientsEyebrow>

              <h2>
                Your next step
                <br />
                <span>starts with a conversation.</span>
              </h2>

              <p>
                Have a question or want to explore your options? Get in touch
                and take the first step towards understanding your care.
              </p>
            </div>

            <div className="patients-cta-actions">
              <Link to="/appointment" className="patients-button-primary">
                Book an appointment <ArrowUpRight size={19} />
              </Link>

              <Link to="/contact" className="patients-cta-contact">
                Have a question? <span>Contact us</span>
              </Link>
            </div>

            <span className="patients-cta-watermark">REHABICS</span>
          </motion.div>
        </div>
      </section> */}
    </main>
  );
}

export default Patients;
