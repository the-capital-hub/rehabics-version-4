
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bone,
  Brain,
  CheckCircle2,
  CircleHelp,
  Dumbbell,
  Footprints,
  HeartPulse,
  Move,
  PersonStanding,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import "./Conditions.css";
import CTASection from "../../components/CTASection/CTASection";

const conditions = [
  {
    number: "01",
    title: "Back Pain",
    description:
      "Support for lower back discomfort, muscle tension and movement limitations through an individually planned physiotherapy approach.",
    icon: Activity,
    tags: ["Lower back", "Movement", "Strength"],
  },
  {
    number: "02",
    title: "Neck Pain",
    description:
      "Care focused on neck stiffness, posture related discomfort and improving comfortable movement in everyday activities.",
    icon: PersonStanding,
    tags: ["Neck stiffness", "Posture", "Mobility"],
  },
  {
    number: "03",
    title: "Shoulder Pain",
    description:
      "Physiotherapy support to improve shoulder mobility, build strength and make reaching or lifting more comfortable.",
    icon: Bone,
    tags: ["Shoulder mobility", "Strength", "Flexibility"],
  },
  {
    number: "04",
    title: "Knee Pain",
    description:
      "A personalised approach to knee discomfort, movement confidence and gradual improvement in daily physical activities.",
    icon: Footprints,
    tags: ["Knee mobility", "Walking", "Strength"],
  },
  {
    number: "05",
    title: "Sports Injuries",
    description:
      "Recovery support for sports related injuries, with a focus on restoring movement and progressing towards your activity goals.",
    icon: Dumbbell,
    tags: ["Recovery", "Movement", "Performance"],
  },
  {
    number: "06",
    title: "Arthritis",
    description:
      "Guided movement and strengthening strategies that may help you manage stiffness and maintain everyday function.",
    icon: HeartPulse,
    tags: ["Joint care", "Flexibility", "Daily activity"],
  },
  {
    number: "07",
    title: "Post Surgery Recovery",
    description:
      "Rehabilitation support designed around your procedure, recovery stage and the guidance provided by your healthcare team.",
    icon: ShieldCheck,
    tags: ["Rehabilitation", "Strength", "Recovery"],
  },
  {
    number: "08",
    title: "Muscle and Joint Stiffness",
    description:
      "Support to work on restricted movement, flexibility and functional strength through suitable exercises and guided care.",
    icon: Move,
    tags: ["Flexibility", "Joint movement", "Exercise"],
  },
  {
    number: "09",
    title: "Balance and Mobility",
    description:
      "Movement focused support to improve balance, coordination and confidence during everyday activities.",
    icon: PersonStanding,
    tags: ["Balance", "Coordination", "Confidence"],
  },
];

const careSteps = [
  {
    number: "01",
    title: "Understand your concerns",
    description:
      "Discuss your symptoms, daily activities and movement goals with your physiotherapist.",
    icon: Brain,
  },
  {
    number: "02",
    title: "Plan your care",
    description:
      "Your physiotherapist can recommend an approach based on your assessment and individual needs.",
    icon: Stethoscope,
  },
  {
    number: "03",
    title: "Progress with guidance",
    description:
      "Follow your care plan and review your progress with your physiotherapist.",
    icon: Sparkles,
  },
];

export default function Conditions() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="rehabConditions">
      <section className="conditionsHero">
        <div className="conditionsContainer conditionsHeroGrid">
          <motion.div
            className="conditionsHeroContent"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="conditionsEyebrow">
              <span className="conditionsEyebrowIcon">
                <HeartPulse size={17} />
              </span>
              PERSONALIZED PHYSIOTHERAPY CARE
            </div>

            <h1 className="conditionsHeroTitle">
              Understand your pain.
              <span>Find your way forward.</span>
            </h1>

            <p className="conditionsHeroDescription">
              Every movement matters. Explore common conditions we may
              be able to support with personalised physiotherapy,
              guided exercises and a care plan built around your needs.
            </p>

            <div className="conditionsHeroActions">
              <Link
                to="/appointment"
                className="conditionsButton conditionsButtonPrimary"
              >
                Book an Appointment
                <ArrowUpRight size={18} />
              </Link>

              <a
                href="#conditionsList"
                className="conditionsTextLink"
              >
                Explore Conditions
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="conditionsHeroNote">
              <span className="conditionsNoteIcon">
                <CheckCircle2 size={18} />
              </span>
              <p>
                Care that considers your symptoms, goals and daily life.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="conditionsHeroVisual"
            initial={
              reduceMotion ? false : { opacity: 0, scale: 0.97 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: "easeOut",
            }}
          >
            <div className="conditionsImageAccent" aria-hidden="true" />

            <div className="conditionsHeroImageFrame">
              <img
                src="https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg"
                alt="Physiotherapist guiding a patient through rehabilitation"
                className="conditionsHeroImage"
                fetchPriority="high"
              />

              <div className="conditionsImageCaption">
                <span className="conditionsCaptionIcon">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <strong>Care built around you</strong>
                  <span>Guidance for your movement journey</span>
                </div>
              </div>
            </div>

            <div className="conditionsFloatingCard">
              <span className="conditionsFloatingIcon">
                <Activity size={20} />
              </span>
              <div>
                <strong>Move at your pace</strong>
                <span>Individual care and guidance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="conditionsListSection"
        id="conditionsList"
      >
        <div className="conditionsContainer">
          <motion.div
            className="conditionsSectionHeading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="conditionsEyebrow">
              CONDITIONS WE SUPPORT
            </span>

            <h2>
              Support for your
              <span> movement needs.</span>
            </h2>

            <p>
              Explore common concerns and discover how physiotherapy
              may help you work towards better movement and daily
              function.
            </p>
          </motion.div>

          <div className="conditionsGrid">
            {conditions.map((condition, index) => {
              const Icon = condition.icon;

              return (
                <motion.article
                  className="conditionCard"
                  key={condition.number}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.12,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : (index % 3) * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <div className="conditionCardTop">
                    <span className="conditionIcon">
                      <Icon size={23} strokeWidth={1.7} />
                    </span>

                    <span className="conditionNumber">
                      {condition.number}
                    </span>
                  </div>

                  <h3>{condition.title}</h3>

                  <p className="conditionDescription">
                    {condition.description}
                  </p>

                  <div className="conditionTags">
                    {condition.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <Link
                    to="/appointment"
                    className="conditionCardLink"
                    aria-label={`Book an appointment about ${condition.title}`}
                  >
                    Discuss your concern
                    <ArrowUpRight size={16} />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <div className="conditionsDisclaimer">
            <CircleHelp size={19} />
            <p>
              The conditions listed are common examples, not a
              diagnosis or a guarantee of treatment suitability.
              Your physiotherapist can assess your needs and advise
              on appropriate care.
            </p>
          </div>
        </div>
      </section>

      <section className="conditionsCareSection">
        <div className="conditionsContainer">
          <div className="conditionsCareLayout">
            <motion.div
              className="conditionsCareIntro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <span className="conditionsEyebrow">
                YOUR CARE JOURNEY
              </span>

              <h2>
                A thoughtful approach to
                <span> better movement.</span>
              </h2>

              <p>
                Your needs are individual. Your physiotherapy journey
                should reflect your symptoms, comfort and personal
                goals.
              </p>

              <Link
                to="/appointment"
                className="conditionsCareLink"
              >
                Start your journey
                <ArrowRight size={17} />
              </Link>
            </motion.div>

            <div className="conditionsSteps">
              {careSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    className="conditionsStep"
                    key={step.number}
                    initial={{
                      opacity: 0,
                      x: reduceMotion ? 0 : 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      delay: reduceMotion ? 0 : index * 0.1,
                    }}
                  >
                    <div className="conditionsStepIcon">
                      <Icon size={21} strokeWidth={1.7} />
                    </div>

                    <div className="conditionsStepContent">
                      <span>STEP {step.number}</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="YOUR MOVEMENT MATTERS"
        title="Ready to Move with More Confidence?"
        description="Tell us about your concerns and explore the physiotherapy support that may be right for you."
        buttonText="Book an Appointment"
        buttonLink="/appointment"
        secondaryText="Explore Our Services"
        secondaryLink="/services"
      />
    </main>
  );
}
