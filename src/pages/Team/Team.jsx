
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  HeartPulse,
  ShieldCheck,
  UsersRound,
  Activity,
  Award,
  CalendarDays,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";

import HeroSection from "../../components/HeroSection/HeroSection";
import CTASection from "../../components/CTASection/CTASection";
import "./Team.css";

const teamMembers = [
  {
    name: "Dr. Aditi Sharma",
    role: "Lead Physiotherapist",
    category: "CLINICAL CARE",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85",
    experience: "Patient focused care",
    description:
      "Helping people improve movement, manage pain and build confidence through personalised rehabilitation.",
    expertise: ["Pain management", "Movement therapy"],
  },
  {
    name: "Dr. Rohan Mehta",
    role: "Sports Rehabilitation Specialist",
    category: "SPORTS RECOVERY",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85",
    experience: "Active recovery",
    description:
      "Supporting recovery from sports injuries with progressive movement plans and guided exercise.",
    expertise: ["Sports injuries", "Strength recovery"],
  },
  {
    name: "Dr. Neha Kapoor",
    role: "Musculoskeletal Physiotherapist",
    category: "MOVEMENT HEALTH",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85",
    experience: "Personalised plans",
    description:
      "Focused on improving everyday movement, flexibility and function with practical rehabilitation.",
    expertise: ["Joint mobility", "Posture care"],
  },
  {
    name: "Dr. Arjun Verma",
    role: "Rehabilitation Specialist",
    category: "RECOVERY SUPPORT",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85",
    experience: "Guided rehabilitation",
    description:
      "Helping patients work towards meaningful recovery goals through structured and supportive care.",
    expertise: ["Functional training", "Recovery planning"],
  },
];

const teamValues = [
  {
    icon: HeartPulse,
    title: "Care that starts with you",
    description:
      "We listen to your concerns and shape care around your goals, needs and daily routine.",
  },
  {
    icon: ShieldCheck,
    title: "Thoughtful clinical care",
    description:
      "We focus on suitable rehabilitation plans and responsible guidance throughout recovery.",
  },
  {
    icon: UsersRound,
    title: "Progress through partnership",
    description:
      "We work with you to build confidence, consistency and better movement over time.",
  },
];

const Team = () => {
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
    <main className="rv3TeamPage">
      <HeroSection
        eyebrow="MEET THE PEOPLE BEHIND YOUR CARE"
        title="Care Led By"
        highlight="People"
        secondLine="Who Understand You"
        description="Meet the team committed to helping you move with greater comfort, confidence and independence."
        primaryText="Book an Appointment"
        primaryLink="/appointment"
        secondaryText="Explore Our Approach"
        secondaryLink="#team-values"
        showSecondary
        showStats={false}
        showFloatingCards={false}
        showBenefits={false}
      />

      <section className="rv3TeamIntro">
        <div className="rv3TeamContainer">
          <motion.div
            className="rv3TeamIntroContent"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="rv3TeamEyebrow">
              <UsersRound size={16} />
              YOUR RECOVERY PARTNERS
            </span>

            <h2>
              Real care.
              <span> A team that listens.</span>
            </h2>

            <p>
              Every recovery journey is different. Our approach
              begins with understanding your concerns, identifying
              your needs and helping you take the next step with
              confidence.
            </p>
          </motion.div>

          <div className="rv3TeamIntroHighlights">
            <div className="rv3TeamHighlight">
              <span className="rv3TeamHighlightIcon">
                <Stethoscope size={22} />
              </span>
              <div>
                <h3>Individual attention</h3>
                <p>Care shaped around your goals</p>
              </div>
            </div>

            <div className="rv3TeamHighlight">
              <span className="rv3TeamHighlightIcon">
                <Activity size={22} />
              </span>
              <div>
                <h3>Movement focused</h3>
                <p>Support for everyday activity</p>
              </div>
            </div>

            <div className="rv3TeamHighlight">
              <span className="rv3TeamHighlightIcon">
                <Award size={22} />
              </span>
              <div>
                <h3>Progress together</h3>
                <p>Guidance through your journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rv3TeamMembers" id="team-members">
        <div className="rv3TeamContainer">
          <motion.div
            className="rv3TeamSectionHeading"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <div>
              <span className="rv3TeamEyebrow">
                <HeartPulse size={16} />
                OUR PEOPLE
              </span>

              <h2>
                Meet your care
                <span> team.</span>
              </h2>
            </div>

            <p>
              A supportive team focused on your comfort,
              mobility and long term wellbeing.
            </p>
          </motion.div>

          <div className="rv3TeamGrid">
            {teamMembers.map((member, index) => (
              <motion.article
                className="rv3TeamCard"
                key={member.name}
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
              >
                <div className="rv3TeamImageWrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                  />

                  <span className="rv3TeamCategory">
                    {member.category}
                  </span>

                  <span className="rv3TeamImageIcon">
                    <HeartPulse size={19} />
                  </span>
                </div>

                <div className="rv3TeamCardBody">
                  <span className="rv3TeamRole">
                    {member.role}
                  </span>

                  <h3>{member.name}</h3>

                  <p className="rv3TeamDescription">
                    {member.description}
                  </p>

                  <div className="rv3TeamExpertise">
                    {member.expertise.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className="rv3TeamCardFooter">
                    <span>
                      <CheckCircle2 size={15} />
                      {member.experience}
                    </span>

                    <a
                      href="/appointment"
                      aria-label={`Book an appointment with ${member.name}`}
                    >
                      <ArrowUpRight size={19} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="rv3TeamContentNote">
            Team profiles and photographs are sample content.
            Replace them with verified Rehabics team details
            before publishing.
          </p>
        </div>
      </section>

      <section className="rv3TeamValues" id="team-values">
        <div className="rv3TeamContainer">
          <motion.div
            className="rv3TeamValuesHeading"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="rv3TeamEyebrow">
              OUR COMMITMENT
            </span>

            <h2>
              What makes our care
              <span> personal.</span>
            </h2>

            <p>
              Your goals guide our approach. We believe good
              rehabilitation starts with trust, clear guidance
              and a plan that works for you.
            </p>
          </motion.div>

          <div className="rv3TeamValuesGrid">
            {teamValues.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  className="rv3TeamValueCard"
                  key={value.title}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{
                    delay: reduceMotion ? 0 : index * 0.08,
                  }}
                >
                  <span className="rv3TeamValueIcon">
                    <Icon size={24} />
                  </span>

                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rv3TeamBookingBanner">
        <div className="rv3TeamContainer">
          <div className="rv3TeamBookingInner">
            <div className="rv3TeamBookingIcon">
              <CalendarDays size={25} />
            </div>

            <div className="rv3TeamBookingCopy">
              <span>YOUR NEXT STEP</span>
              <h2>Let us help you move forward.</h2>
              <p>
                Request an online session or a clinic visit
                with the Rehabics team.
              </p>
            </div>

            <a
              href="/appointment"
              className="rv3TeamBookingButton"
            >
              Book an Appointment
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default Team;
