
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  HeartPulse,
  Target,
  ShieldCheck,
  UsersRound,
  CheckCircle2,
  Sparkles,
  MoveUpRight,
  HandHeart,
  Footprints,
  Dumbbell,
  Compass,
  MessageCircle,
  ClipboardCheck,
} from "lucide-react";

import "./About.css";

const values = [
  {
    number: "01",
    icon: HeartPulse,
    title: "People first",
    description:
      "We listen to your concerns, understand your goals and respect your individual experience.",
  },
  {
    number: "02",
    icon: Target,
    title: "Purposeful care",
    description:
      "We focus on meaningful goals and a plan shaped around your individual needs.",
  },
  {
    number: "03",
    icon: Activity,
    title: "Movement matters",
    description:
      "We help you work towards better movement and the activities that matter to your life.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Trust and clarity",
    description:
      "Clear explanations and thoughtful guidance help you understand your next steps.",
  },
];
import image1 from '../../assets/about/image1.jpeg'
import image2 from '../../assets/about/image2.jpeg'
import image3 from '../../assets/about/image3.jpeg'
import image4 from '../../assets/about/image4.jpeg'


const principles = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Listen first",
    description:
      "We start with your experience, concerns and the things you want to do more comfortably.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Understand your needs",
    description:
      "We consider your movement goals and discuss a suitable direction for your care.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Create a personal plan",
    description:
      "Your plan should reflect your needs, goals and the practical realities of your daily life.",
  },
  {
    number: "04",
    icon: HandHeart,
    title: "Support your progress",
    description:
      "We help you understand each step and work towards your goals with appropriate guidance.",
  },
];

const supportAreas = [
  {
    number: "01",
    icon: Footprints,
    title: "Everyday movement",
    description:
      "Work towards greater comfort and confidence in the movements your daily routine requires.",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85",
    alt: "Person exercising and building movement confidence",
  },
  {
    number: "02",
    icon: Dumbbell,
    title: "Strength and fitness",
    description:
      "Build a thoughtful approach to strength, mobility and your personal fitness goals.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
    alt: "Strength training in a fitness environment",
  },
  {
    number: "03",
    icon: Activity,
    title: "Recovery and mobility",
    description:
      "Explore guided movement and rehabilitation support suited to your individual needs.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85",
    alt: "Guided exercise in a rehabilitation setting",
  },
];

const journey = [
  {
    number: "01",
    title: "Start a conversation",
    description:
      "Tell us about your concerns, routine and the goals you want to work towards.",
  },
  {
    number: "02",
    title: "Understand your needs",
    description:
      "Discuss your movement needs and the options that may be appropriate for you.",
  },
  {
    number: "03",
    title: "Build your plan",
    description:
      "Explore a personalised approach based on your needs and agreed goals.",
  },
  {
    number: "04",
    title: "Work towards progress",
    description:
      "Follow your plan with guidance and review your progress along the way.",
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

function AboutEyebrow({ children }) {
  return (
    <span className="about-eyebrow">
      <span className="rehab-hero-eyebrow-line" />
      {children}
    </span>
  );
}

function About() {
  const reduceMotion = useReducedMotion();

  const revealProps = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          variants: reveal,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.14 },
          transition: { duration: 0.6, delay },
        };

  return (
    <main className="rehab-about">
      {/* 01. Hero */}
      <section className="about-hero">
        <div className="about-hero-background" />
        <div className="about-hero-overlay" />
        <div className="about-hero-grid" />

        <div className="about-container about-hero-layout">
          <motion.div className="about-hero-copy" {...revealProps()}>
            <AboutEyebrow>GET TO KNOW REHABICS</AboutEyebrow>

            <h1>
              Better care.
              <br />
              <span>Stronger movement.</span>
              <br />
              A life in motion.
            </h1>

            <p>
              We believe better movement can open the door to a more confident
              life. Our approach begins with understanding you, your needs and
              the goals you want to achieve.
            </p>

            <div className="about-actions">
              <Link to="/services" className="about-button-primary">
                Explore our services <ArrowUpRight size={19} />
              </Link>
              <Link to="/contact" className="about-button-secondary">
                Talk to our team <ArrowRight size={18} />
              </Link>
            </div>

            {/* <div className="about-hero-footnote">
              <span className="about-live-dot" />
              YOUR MOVEMENT. YOUR GOALS. YOUR JOURNEY.
            </div> */}
          </motion.div>

          <motion.div
            className="about-hero-visual"
            {...revealProps(0.12)}
          >
            <div className="about-hero-photo">
              <img
                src={image1}
                alt="Guided exercise in a fitness and rehabilitation setting"
                fetchPriority="high"
              />
              <div className="about-photo-overlay" />

              <div className="about-photo-caption">
                <span className="about-photo-icon">
                  <Activity size={21} />
                </span>
                <span>
                  <strong>Movement with meaning</strong>
                  <small>Focused on what matters to you</small>
                </span>
              </div>

              <span className="about-photo-index">REHABICS / 01</span>
            </div>

            <div className="about-hero-floating-card">
              <Sparkles size={20} />
              <span>
                <strong>Care built around you</strong>
                <small>Every journey is personal</small>
              </span>
            </div>
          </motion.div>
        </div>

        {/* <div className="about-hero-bottom">
          <span>ABOUT REHABICS</span>
          <span className="about-bottom-line" />
          <span>MOVE BETTER. LIVE STRONGER.</span>
        </div> */}
      </section>

      {/* 02. Story */}
      <section className="about-story about-section">
        <div className="about-container about-story-grid">
          <motion.div className="about-story-visual" {...revealProps()}>
            <div className="about-story-image">
              <img
                src={image2}
                alt="Person working towards strength and movement goals"
                loading="lazy"
              />
            </div>

            <div className="about-story-corner" />

            <div className="about-story-card">
              <span className="about-story-card-icon">
                <HeartPulse size={22} />
              </span>
              <span>
                <strong>Every journey is different</strong>
                <small>Your care should be personal too.</small>
              </span>
            </div>

            <span className="about-vertical-label">
              THE REHABICS PHILOSOPHY
            </span>
          </motion.div>

          <motion.div className="about-story-copy" {...revealProps(0.08)}>
            <AboutEyebrow>OUR STORY</AboutEyebrow>

            <h2>
              Recovery is personal.
              <br />
              <span>Your care should be too.</span>
            </h2>

            <p className="about-lead">
              At Rehabics, we see more than an injury or a movement challenge.
              We see a person with goals, routines and a life they want to get
              back to.
            </p>

            <p>
              That is why we believe physiotherapy should begin with
              understanding. Your experience, your daily activities and your
              goals all matter when thinking about the right direction for your
              care.
            </p>

            <p>
              Our approach is centred on making the process more personal,
              easier to understand and focused on meaningful progress. We want
              you to feel informed about your options and supported as you
              work towards your goals.
            </p>

            <p>
              Every journey is different. We believe the care you receive
              should recognise those differences rather than treat every
              person the same way.
            </p>

            <div className="about-signoff">
              <span className="about-signoff-icon">
                <Activity size={23} />
              </span>
              <span>
                <strong>Move better. Live stronger.</strong>
                <small>The Rehabics approach</small>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 03. The difference */}
      <section className="about-difference about-section">
        <div className="about-container about-difference-grid">
          <motion.div className="about-difference-copy" {...revealProps()}>
            <AboutEyebrow>THE REHABICS DIFFERENCE</AboutEyebrow>

            <h2>
              More than a plan.
              <br />
              <span>A partner in progress.</span>
            </h2>

            <p>
              A good care experience should help you understand what you are
              working towards and why it matters. We put your goals at the
              centre of the conversation.
            </p>

            <ul className="about-check-list">
              <li>
                <CheckCircle2 size={19} />
                <span>Care shaped around individual needs</span>
              </li>
              <li>
                <CheckCircle2 size={19} />
                <span>Clear conversations about your goals</span>
              </li>
              <li>
                <CheckCircle2 size={19} />
                <span>Guidance that helps you understand each step</span>
              </li>
              <li>
                <CheckCircle2 size={19} />
                <span>A focus on meaningful movement and daily life</span>
              </li>
            </ul>

            <Link to="/services" className="about-text-link">
              Discover our services <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            className="about-difference-visual"
            {...revealProps(0.1)}
          >
            <img
              src={image3}
              alt="A guided movement session"
              loading="lazy"
            />
            <div className="about-difference-shade" />
            <div className="about-difference-label">
              <span>OUR FOCUS</span>
              <strong>Understand. Plan. Progress.</strong>
            </div>
            <span className="about-difference-number">03</span>
          </motion.div>
        </div>
      </section>

      {/* 04. Mission and vision */}
      <section className="about-purpose about-section">
        <div className="about-container">
          <motion.div className="about-section-heading" {...revealProps()}>
            <AboutEyebrow>WHAT GUIDES US</AboutEyebrow>
            <h2>
              Care with direction.
              <br />
              <span>Progress with purpose.</span>
            </h2>
            <p>
              Our purpose is rooted in making movement care personal,
              understandable and focused on each individual's goals.
            </p>
          </motion.div>

          <div className="about-purpose-grid">
            <motion.article
              className="about-purpose-card about-mission"
              {...revealProps()}
            >
              <div className="about-card-top">
                <span className="about-icon-box">
                  <Target size={25} />
                </span>
                <span className="about-card-label">01 / OUR MISSION</span>
              </div>

              <h3>Make movement a meaningful part of life.</h3>

              <p>
                To support people with thoughtful, individualised
                physiotherapy care that helps them work towards better
                movement and personal goals.
              </p>

              <div className="about-purpose-decoration">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </motion.article>

            <motion.article
              className="about-purpose-card about-vision"
              {...revealProps(0.1)}
            >
              <div className="about-card-top">
                <span className="about-icon-box">
                  <MoveUpRight size={25} />
                </span>
                <span className="about-card-label">02 / OUR VISION</span>
              </div>

              <h3>A more confident way to move forward.</h3>

              <p>
                To make personalised movement care more approachable, easier
                to understand and connected to the activities that matter in
                everyday life.
              </p>

              <div className="about-purpose-bottom">
                <span>YOUR GOALS LEAD THE WAY</span>
                <ArrowUpRight size={19} />
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* 05. Care philosophy */}
      <section className="about-philosophy about-section">
        <div className="about-container">
          <motion.div className="about-philosophy-heading" {...revealProps()}>
            <div>
              <AboutEyebrow>OUR CARE PHILOSOPHY</AboutEyebrow>
              <h2>
                Personal care.
                <br />
                <span>A thoughtful process.</span>
              </h2>
            </div>
            <p>
              We believe the way forward starts with listening, understanding
              and making the next step clear.
            </p>
          </motion.div>

          <div className="about-principles-grid">
            {principles.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className="about-principle-card"
                  key={item.number}
                  {...revealProps(index * 0.07)}
                >
                  <div className="about-principle-top">
                    <span className="about-icon-box">
                      <Icon size={23} />
                    </span>
                    <span>{item.number}</span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <div className="about-principle-bottom">
                    <span />
                    <ArrowUpRight size={17} />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06. Values */}
      <section className="about-values about-section">
        <div className="about-container">
          <motion.div className="about-values-heading" {...revealProps()}>
            <div>
              <AboutEyebrow>WHAT WE BELIEVE</AboutEyebrow>
              <h2>
                The values behind
                <br />
                <span>every step.</span>
              </h2>
            </div>

            <p>
              Thoughtful care is about more than a plan. It is also about how
              you are heard, guided and supported along the way.
            </p>
          </motion.div>

          <div className="about-values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  className="about-value-card"
                  key={value.number}
                  {...revealProps(index * 0.07)}
                >
                  <div className="about-value-top">
                    <span className="about-icon-box">
                      <Icon size={23} />
                    </span>
                    <span className="about-value-number">{value.number}</span>
                  </div>

                  <h3>{value.title}</h3>
                  <p>{value.description}</p>

                  <div className="about-value-bottom">
                    <span />
                    <CheckCircle2 size={17} />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 07. Who we support */}
      <section className="about-support about-section">
        <div className="about-container">
          <motion.div className="about-support-heading" {...revealProps()}>
            <div>
              <AboutEyebrow>WHO WE SUPPORT</AboutEyebrow>
              <h2>
                Your goals.
                <br />
                <span>Your kind of progress.</span>
              </h2>
            </div>
            <p>
              Different people have different movement goals. Our approach
              starts by understanding what matters to you.
            </p>
          </motion.div>

          <div className="about-support-grid">
            {supportAreas.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className="about-support-card"
                  key={item.number}
                  {...revealProps(index * 0.08)}
                >
                  <div className="about-support-image">
                    <img src={item.image} alt={item.alt} loading="lazy" />
                    <span className="about-support-image-shade" />
                    <span className="about-support-number">{item.number}</span>
                    <span className="about-support-icon">
                      <Icon size={22} />
                    </span>
                  </div>

                  <div className="about-support-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link
                      to="/services"
                      className="about-support-link"
                      aria-label={`Explore services for ${item.title}`}
                    >
                      Explore services <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 08. Journey */}
      <section className="about-journey about-section">
        <div className="about-journey-background" />
        <div className="about-journey-overlay" />

        <div className="about-container about-journey-inner">
          <motion.div className="about-journey-heading" {...revealProps()}>
            <AboutEyebrow>YOUR JOURNEY WITH US</AboutEyebrow>

            <h2>
              A clearer path
              <br />
              <span>towards progress.</span>
            </h2>

            <p>
              Knowing what comes next can make the process easier to navigate.
              Here is how we approach the conversation and your care journey.
            </p>
          </motion.div>

          <div className="about-journey-grid">
            {journey.map((step, index) => (
              <motion.article
                className="about-journey-card"
                key={step.number}
                {...revealProps(index * 0.08)}
              >
                <div className="about-journey-top">
                  <span>{step.number}</span>
                  <span className="about-journey-line" />
                  <CheckCircle2 size={18} />
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 09. Commitment */}
      <section className="about-commitment about-section">
        <div className="about-container about-commitment-grid">
          <motion.div className="about-commitment-visual" {...revealProps()}>
            <img
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1100&q=85"
              alt="Training environment focused on movement and strength"
              loading="lazy"
            />
            <div className="about-commitment-image-overlay" />
            <div className="about-commitment-image-caption">
              <span>OUR COMMITMENT</span>
              <strong>Thoughtful care at every step.</strong>
            </div>
          </motion.div>

          <motion.div className="about-commitment-copy" {...revealProps(0.1)}>
            <AboutEyebrow>OUR COMMITMENT TO YOU</AboutEyebrow>

            <h2>
              You deserve to feel
              <br />
              <span>heard and supported.</span>
            </h2>

            <p>
              We want every conversation to help you better understand your
              needs, your options and the next steps in your care.
            </p>

            <div className="about-commitment-points">
              <div>
                <CheckCircle2 size={20} />
                <span>
                  <strong>Listen with care</strong>
                  <small>Your questions and concerns matter.</small>
                </span>
              </div>

              <div>
                <CheckCircle2 size={20} />
                <span>
                  <strong>Explain the process</strong>
                  <small>Understand the purpose behind each step.</small>
                </span>
              </div>

              <div>
                <CheckCircle2 size={20} />
                <span>
                  <strong>Respect your goals</strong>
                  <small>Your needs help guide the conversation.</small>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. Final CTA */}
      {/* <section className="about-cta about-section">
        <div className="about-container">
          <motion.div className="about-cta-panel" {...revealProps()}>
            <div className="about-cta-glow" />

            <div className="about-cta-copy">
              <AboutEyebrow>YOUR NEXT STEP STARTS HERE</AboutEyebrow>

              <h2>
                Let us work towards
                <br />
                <span>better movement.</span>
              </h2>

              <p>
                Tell us what you want to achieve. Start a conversation about
                the care and guidance that may be right for you.
              </p>
            </div>

            <div className="about-cta-actions">
              <Link to="/appointment" className="about-button-primary">
                Book an appointment <ArrowUpRight size={19} />
              </Link>

              <Link to="/contact" className="about-cta-contact">
                Have a question? <span>Contact us</span>
              </Link>
            </div>

            <span className="about-cta-watermark">REHABICS</span>
          </motion.div>
        </div>
      </section> */}
    </main>
  );
}

export default About;
