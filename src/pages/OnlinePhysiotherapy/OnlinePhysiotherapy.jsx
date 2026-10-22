import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Video,
  ClipboardCheck,
  CalendarDays,
  Laptop,
  CheckCircle2,
  ArrowUpRight,
  HeartPulse,
  Activity,
  ShieldCheck,
  Clock3,
  Wifi,
  Smartphone,
  CircleHelp,
  Plus,
  Minus,
} from "lucide-react";


import "./OnlinePhysiotherapy.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import CTASection from "../../components/CTASection/CTASection";

const steps = [
  {
    number: "01",
    icon: CalendarDays,
    title: "Book your session",
    description:
      "Choose a convenient appointment time and tell us what you need help with.",
  },
  {
    number: "02",
    icon: Video,
    title: "Meet your physiotherapist",
    description:
      "Connect through a video consultation and discuss your symptoms, goals and daily routine.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Get your recovery plan",
    description:
      "Receive personalised exercises, movement guidance and practical advice for home.",
  },
  {
    number: "04",
    icon: Activity,
    title: "Track your progress",
    description:
      "Attend follow up sessions so your physiotherapist can review progress and adjust your plan.",
  },
];

const benefits = [
  {
    icon: Laptop,
    title: "Care from home",
    description:
      "Connect with a physiotherapist without travelling to a clinic.",
  },
  {
    icon: CalendarDays,
    title: "Flexible scheduling",
    description:
      "Choose a session that fits more comfortably into your daily routine.",
  },
  {
    icon: HeartPulse,
    title: "Personalised guidance",
    description:
      "Get exercise guidance shaped around your goals, abilities and needs.",
  },
  {
    icon: ShieldCheck,
    title: "Professional support",
    description:
      "Receive guidance from a physiotherapist who can assess your needs and recommend suitable next steps.",
  },
];

const conditions = [
  "Back pain",
  "Neck pain",
  "Shoulder discomfort",
  "Knee pain",
  "Posture concerns",
  "Sports related injuries",
  "Muscle stiffness",
  "Balance and mobility",
];

const requirements = [
  "A phone, tablet or computer with a camera",
  "A stable internet connection",
  "A quiet space where you can move comfortably",
  "Comfortable clothing for movement assessment",
];

const faqs = [
  {
    question: "What happens during an online physiotherapy session?",
    answer:
      "Your physiotherapist discusses your symptoms, medical history and goals. Depending on your needs, they may observe your movements, explain suitable exercises and suggest the next steps.",
  },
  {
    question: "Can online physiotherapy help with back pain?",
    answer:
      "Online physiotherapy may help with many types of back pain through movement assessment, exercise guidance and education. Your physiotherapist will decide whether remote care is appropriate for your situation.",
  },
  {
    question: "Do I need any special equipment?",
    answer:
      "Usually, a phone or computer with a camera, reliable internet and enough room to move are a good starting point. Your physiotherapist can tell you if anything else is needed.",
  },
  {
    question: "How long does a session take?",
    answer:
      "Session length depends on your needs and the appointment you book. Your physiotherapist can explain the expected duration before your consultation.",
  },
  {
    question: "Is online physiotherapy suitable for everyone?",
    answer:
      "Not always. Some conditions need an in person examination or urgent medical care. Your physiotherapist can help determine whether an online consultation is suitable.",
  },
];

export default function OnlinePhysiotherapy() {
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(0);

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.55 },
      };

  return (
    <main className="onlinePhysioPage">
      <HeroSection
        eyebrow="PHYSIOTHERAPY THAT FITS YOUR LIFE"
        title="Expert care,"
        highlight="where you feel at home."
        description="Move with more confidence through personalised online physiotherapy. Connect with a physiotherapist, understand your movement and work towards your recovery from home."
        buttonText="Book an Appointment"
        buttonLink="/appointment"
        secondaryText="How It Works"
        secondaryLink="#onlineHowItWorks"
        image="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg"
        imageAlt="Physiotherapist guiding a patient through a movement exercise"
        imageLabel="Your recovery, your space"
        imageDescription="Personalised guidance for your everyday movement"
        features={[
          "Personalised exercise guidance",
          "Convenient video consultations",
          "Support for your recovery goals",
        ]}
      />

      <section className="opSection opIntro">
        <div className="opContainer opIntroGrid">
          <motion.div className="opIntroContent" {...reveal}>
            <span className="opEyebrow">CARE THAT COMES TO YOU</span>
            <h2>
              Better movement starts with
              <span> the right guidance.</span>
            </h2>
            <p>
              Getting help with movement should feel approachable. Online
              physiotherapy lets you speak with a professional, learn exercises
              suited to your needs and build healthy movement habits in a
              familiar environment.
            </p>
            <p>
              Your care begins with understanding your concerns, your routine
              and what you want to achieve.
            </p>
            <Link className="opTextLink" to="/appointment">
              Start your recovery journey
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          <motion.div className="opIntroVisual" {...reveal}>
            <img
              src="https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg"
              alt="Physiotherapist helping a patient practise a guided exercise"
              loading="lazy"
            />
            <div className="opImageNote">
              <span className="opNoteIcon">
                <HeartPulse size={22} />
              </span>
              <div>
                <strong>Care built around you</strong>
                <p>Guidance for your everyday goals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="opSection opSteps" id="onlineHowItWorks">
        <div className="opContainer">
          <motion.div className="opSectionHeading" {...reveal}>
            <span className="opEyebrow">SIMPLE FROM THE START</span>
            <h2>
              How online physiotherapy
              <span> works</span>
            </h2>
            <p>
              A clear process that helps you understand your needs and take
              practical steps towards better movement.
            </p>
          </motion.div>

          <div className="opStepsGrid">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  className="opStepCard"
                  key={step.number}
                  {...reveal}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.08,
                  }}
                >
                  <div className="opStepTop">
                    <span className="opStepNumber">{step.number}</span>
                    <span className="opStepIcon">
                      <Icon size={23} strokeWidth={1.8} />
                    </span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="opSection opBenefits">
        <div className="opContainer">
          <motion.div className="opSectionHeading" {...reveal}>
            <span className="opEyebrow">MADE FOR YOUR ROUTINE</span>
            <h2>
              Support that makes
              <span> care more convenient</span>
            </h2>
            <p>
              Get professional guidance in a way that works with your life.
            </p>
          </motion.div>

          <div className="opBenefitsGrid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.article
                  className="opBenefitCard"
                  key={benefit.title}
                  {...reveal}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.07,
                  }}
                >
                  <span className="opBenefitIcon">
                    <Icon size={25} strokeWidth={1.8} />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="opSection opConditions">
        <div className="opContainer opConditionsGrid">
          <motion.div className="opConditionsVisual" {...reveal}>
            <img
              src="https://images.pexels.com/photos/6740056/pexels-photo-6740056.jpeg"
              alt="Person practising a guided home movement exercise"
              loading="lazy"
            />
            <div className="opConditionsTag">
              <Activity size={18} />
              Movement matters
            </div>
          </motion.div>

          <motion.div className="opConditionsContent" {...reveal}>
            <span className="opEyebrow">PERSONALISED MOVEMENT SUPPORT</span>
            <h2>
              Help for the movement
              <span> challenges you face</span>
            </h2>
            <p>
              Online physiotherapy may be appropriate for a range of
              musculoskeletal and movement concerns. Your physiotherapist will
              discuss your symptoms and decide what care is suitable.
            </p>

            <div className="opConditionList">
              {conditions.map((condition) => (
                <div className="opConditionItem" key={condition}>
                  <CheckCircle2 size={17} />
                  <span>{condition}</span>
                </div>
              ))}
            </div>

            <p className="opSmallNote">
              If you have severe or sudden symptoms, seek appropriate medical
              attention rather than relying on an online session alone.
            </p>

            <Link className="opButton opButtonPrimary" to="/conditions">
              Explore Conditions
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="opSection opRequirements">
        <div className="opContainer">
          <motion.div className="opSectionHeading" {...reveal}>
            <span className="opEyebrow">GET READY FOR YOUR SESSION</span>
            <h2>
              A few simple things
              <span> to get started</span>
            </h2>
            <p>
              Prepare a comfortable space and connect with your
              physiotherapist from home.
            </p>
          </motion.div>

          <motion.div className="opRequirementsCard" {...reveal}>
            <div className="opRequirementsVisual">
              <div className="opDeviceIcon">
                <Smartphone size={35} />
              </div>
              <div className="opDeviceIcon opWifiIcon">
                <Wifi size={29} />
              </div>
              <span className="opRequirementsCaption">
                Your space. Your session.
              </span>
            </div>

            <div className="opRequirementsList">
              {requirements.map((item) => (
                <div className="opRequirement" key={item}>
                  <CheckCircle2 size={19} />
                  <span>{item}</span>
                </div>
              ))}

              <div className="opRequirementsTip">
                <Clock3 size={19} />
                <p>
                  Keep a little extra time before your session to check your
                  connection and prepare any questions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="opSection opFaq">
        <div className="opContainer opFaqGrid">
          <motion.div className="opFaqIntro" {...reveal}>
            <span className="opEyebrow">COMMON QUESTIONS</span>
            <h2>
              Everything you need
              <span> to know</span>
            </h2>
            <p>
              Have questions about online physiotherapy? Start with these
              answers, or contact our team for further guidance.
            </p>
            <Link className="opTextLink" to="/contact">
              Contact our team
              <ArrowUpRight size={18} />
            </Link>
            <div className="opFaqDecoration">
              <CircleHelp size={36} strokeWidth={1.3} />
              <span>We are here to help</span>
            </div>
          </motion.div>

          <motion.div className="opFaqList" {...reveal}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  className={`opFaqItem ${isOpen ? "isOpen" : ""}`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    className="opFaqQuestion"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.question}</span>
                    <span className="opFaqToggle">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="opFaqAnswer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CTASection
        eyebrow="YOUR NEXT STEP STARTS HERE"
        title="Ready to move with more confidence?"
        description="Book an appointment to discuss your needs and find out whether online physiotherapy is right for you."
        buttonText="Book an Appointment"
        buttonLink="/appointment"
        secondaryText="Explore Our Services"
        secondaryLink="/services"
      />
    </main>
  );
}
