import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  HeartPulse,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Waves,
  Zap,
} from "lucide-react";
import "./ServiceDetail.css";
import sport from '../../assets/services/sport.jpeg'
import injury from '../../assets/services/injury.jpeg'
import pain from '../../assets/services/pain.jpeg'
import stren from '../../assets/services/stren.jpeg'

const serviceContent = {
  "sports-physiotherapy": {
    number: "01",
    category: "PERFORMANCE & SPORT",
    title: "Return to the sport you love.",
    shortTitle: "Sports Physiotherapy",
    lead: "An injury can interrupt your rhythm. Your recovery should help you find it again, with a plan built around your sport, your body, and the demands you want to return to.",
    image:
      sport,
    imageAlt:
      "Athlete working through a focused strength and conditioning session",
    imageNote: "BUILT AROUND YOUR NEXT MOVE",
    introLabel: "BE MORE THAN READY",
    introTitle:
      "Recovery is not just getting back. It is preparing for what comes next.",
    intro:
      "Whether you are chasing a personal best, returning to weekend football, or trying to train without the same recurring setback, your rehabilitation needs to reflect the movements your sport asks of you. We look beyond the sore spot to understand strength, mobility, control, training load, and confidence.",
    quote:
      "Your goal is not simply to feel better in the clinic. It is to feel prepared when it matters.",
    focusTitle: "From the first assessment to your return to play.",
    focusLead:
      "A progressive plan shaped by your current capacity and the demands of your sport.",
    focuses: [
      {
        title: "Understand the setback",
        text: "Explore your symptoms, training history, movement patterns, and the moments that currently feel difficult.",
      },
      {
        title: "Rebuild your capacity",
        text: "Work progressively on strength, mobility, balance, and control relevant to your activity.",
      },
      {
        title: "Prepare for performance",
        text: "Build toward sport specific movements and discuss a sensible return to training with your clinician.",
      },
    ],
    whoTitle: "For the athlete in every kind of you.",
    who: "From competitive athletes to recreational runners and active people, care starts with what you want to get back to doing. Your plan should fit your sport, schedule, experience, and current abilities.",
    details: [
      "Sports related strains and sprains",
      "Return to running or training",
      "Movement and strength assessment",
      "Load management and injury prevention strategies",
    ],
    faqs: [
      {
        q: "When should I see a sports physiotherapist?",
        a: "Consider an assessment when pain, reduced movement, or a recurring issue affects your training or sport. Seek urgent medical care for a severe injury, major swelling, deformity, or inability to bear weight.",
      },
      {
        q: "Will I be able to keep training?",
        a: "That depends on your symptoms and assessment. Your physiotherapist can help you understand which activities may be appropriate, what to modify, and when medical review is needed.",
      },
      {
        q: "How long does sports rehabilitation take?",
        a: "There is no single timeline. It depends on the injury, your health, the demands of your sport, and how your body responds to rehabilitation.",
      },
    ],
    icon: Activity,
    stat: "SPORT SPECIFIC",
    statCaption: "A plan that reflects the way you move",
  },
  "pain-management": {
    number: "02",
    category: "EVERYDAY MOVEMENT",
    title: "Make room for movement again.",
    shortTitle: "Pain Management",
    lead: "When pain starts deciding what your day looks like, even familiar things can feel complicated. Physiotherapy can help you understand your movement, explore practical strategies, and build confidence at your own pace.",
    image:
      pain,
    imageAlt:
      "Physiotherapy professional discussing care in a bright clinical setting",
    imageNote: "CARE THAT STARTS BY LISTENING",
    introLabel: "YOUR EXPERIENCE MATTERS",
    introTitle: "Pain is personal. Your care should be, too.",
    intro:
      "Pain can affect sleep, work, exercise, family life, and the small routines that make a day feel like yours. There is rarely one answer that fits everyone. A thoughtful assessment considers your symptoms, health history, daily demands, concerns, and goals before building a plan that makes sense for you.",
    quote:
      "The first step is not pushing through. It is understanding what you are experiencing and what support may help.",
    focusTitle: "A clearer way to approach difficult days.",
    focusLead:
      "Practical, individualised support to help you move with greater understanding and confidence.",
    focuses: [
      {
        title: "Listen to your story",
        text: "Talk through when symptoms began, what changes them, and how they affect your everyday life.",
      },
      {
        title: "Find useful strategies",
        text: "Explore suitable movement, pacing, mobility, and exercise options based on your assessment.",
      },
      {
        title: "Build confidence gradually",
        text: "Review what is helping and adapt your plan as your needs, symptoms, and goals evolve.",
      },
    ],
    whoTitle: "For people who want daily life to feel more manageable.",
    who: "If pain is limiting the activities that matter to you, an assessment can help clarify possible next steps. Your experience will be taken seriously, without assuming that every person or every pain problem is the same.",
    details: [
      "Back and neck discomfort",
      "Joint pain affecting everyday movement",
      "Activity modification and pacing",
      "Individualised movement and exercise guidance",
    ],
    faqs: [
      {
        q: "Can physiotherapy help with persistent pain?",
        a: "Physiotherapy may help some people improve function and find ways to manage persistent pain. The right approach depends on the cause, symptoms, medical history, and individual goals.",
      },
      {
        q: "Do I need to exercise when I am in pain?",
        a: "Not every exercise is suitable for every person. A clinician can help you understand what movement may be appropriate and when symptoms need further medical assessment.",
      },
      {
        q: "Will my pain disappear completely?",
        a: "No one can promise a specific outcome. Care focuses on understanding your situation, supporting function, and reviewing progress honestly as you go.",
      },
    ],
    icon: HeartPulse,
    stat: "PERSON FIRST",
    statCaption: "Your experience shapes the plan",
  },
  "injury-rehabilitation": {
    number: "03",
    category: "RECOVERY & REBUILDING",
    title: "Recovery is a journey. Let's rebuild.",
    shortTitle: "Injury Rehabilitation",
    lead: "An injury can change how much you trust your body. Step by step, a considered rehabilitation plan can help you work toward stronger movement, everyday independence, and the activities you miss.",
    image:
      injury,
    imageAlt:
      "Healthcare professional supporting a patient during a rehabilitation session",
    imageNote: "SMALL STEPS. MEANINGFUL PROGRESS.",
    introLabel: "NO RUSH. NO GUESSWORK.",
    introTitle: "A good recovery plan meets you where you are today.",
    intro:
      "The early days after an injury can bring uncertainty: what is safe, what should change, and how do you know when to do more? Rehabilitation should make that process clearer. Based on your assessment and any relevant medical guidance, your programme can progress from restoring comfortable movement to rebuilding strength and the skills needed for everyday life.",
    quote:
      "Progress is not always dramatic. Sometimes it is the ordinary movement you can do with a little more confidence.",
    focusTitle: "Build a foundation. Then build on it.",
    focusLead:
      "The pace and content of rehabilitation depend on your injury, assessment, and recovery goals.",
    focuses: [
      {
        title: "Know where you are starting",
        text: "Review movement, strength, balance, symptoms, and the activities you need to return to.",
      },
      {
        title: "Restore useful movement",
        text: "Work on appropriate mobility, control, and strength with progressions suited to your recovery.",
      },
      {
        title: "Return to daily life",
        text: "Build toward the tasks and activities that matter to you, while adapting the plan as needed.",
      },
    ],
    whoTitle: "For the next step after an injury.",
    who: "Rehabilitation may be appropriate after many musculoskeletal injuries or some surgical procedures, when guided by your treating clinician. Your care plan should account for medical advice, healing stage, and individual needs.",
    details: [
      "Movement limitations after injury",
      "Strength and balance rebuilding",
      "Functional activity practice",
      "Progress planning alongside relevant medical advice",
    ],
    faqs: [
      {
        q: "When can I start rehabilitation?",
        a: "Timing depends on the injury, its severity, and any treatment or surgical instructions. Follow your medical team's advice and arrange an assessment to discuss a suitable starting point.",
      },
      {
        q: "Will rehabilitation be painful?",
        a: "Experiences vary. Your clinician should discuss how to monitor symptoms and adjust exercises. Severe or unexpected worsening should be assessed rather than ignored.",
      },
      {
        q: "How will I know I am progressing?",
        a: "Progress may include changes in movement, strength, balance, confidence, or daily function. Your goals and plan should be reviewed as your abilities change.",
      },
    ],
    icon: ShieldCheck,
    stat: "STEP BY STEP",
    statCaption: "Progress shaped around your recovery",
  },
  "strength-mobility": {
    number: "04",
    category: "MOVEMENT & CAPACITY",
    title: "Build strength for the life you live.",
    shortTitle: "Strength and Mobility",
    lead: "Reach, bend, lift, walk, train, and move through your day with more confidence. Build the foundations of strength and mobility with a plan shaped around your body and your goals.",
    image:
      stren,
    imageAlt: "Person performing a controlled mobility and strength exercise",
    imageNote: "STRENGTH FOR REAL LIFE",
    introLabel: "CAPABILITY OVER PERFECTION",
    introTitle:
      "Better movement is not about doing everything. It is about doing more of what matters to you.",
    intro:
      "Mobility and strength show up in everyday moments: getting up from the floor, carrying shopping, working comfortably, returning to a hobby, or feeling ready for a new challenge. The right starting point is not a perfect routine. It is an understanding of what you can do now and what you want to build toward.",
    quote:
      "Train for the life you have, and the life you want to make possible.",
    focusTitle: "A stronger foundation for everyday movement.",
    focusLead:
      "A balanced approach to mobility, strength, control, and consistency.",
    focuses: [
      {
        title: "Find your starting point",
        text: "Explore your current movement, strength, comfort, routines, and personal goals.",
      },
      {
        title: "Build with intention",
        text: "Use appropriate exercises to develop strength, range of movement, and control over time.",
      },
      {
        title: "Make it sustainable",
        text: "Create realistic progressions and habits that fit your schedule and everyday life.",
      },
    ],
    whoTitle: "For every body with a goal to move better.",
    who: "Whether you are getting back into activity, building a foundation, or working on a specific movement goal, your programme should reflect your current ability and be adapted when needed.",
    details: [
      "Functional strength and control",
      "Mobility and flexibility work",
      "Balance and movement confidence",
      "Exercise planning for daily activities",
    ],
    faqs: [
      {
        q: "Do I need to be fit before starting?",
        a: "No particular fitness level is required to discuss your goals. Exercises and starting levels should be selected around your current ability and any relevant health considerations.",
      },
      {
        q: "Is mobility training the same as stretching?",
        a: "Stretching can be one part of mobility work, but mobility also involves control and the ability to use a range of movement for a task.",
      },
      {
        q: "How often should I do the exercises?",
        a: "Frequency depends on your goals, exercise plan, recovery, and current capacity. Your clinician can help you establish a realistic routine.",
      },
    ],
    icon: Zap,
    stat: "BUILT FOR LIFE",
    statCaption: "Movement that serves your everyday goals",
  },
};

const processIcons = [Target, Activity, ArrowUpRight];

export default function ServiceDetail() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();
  const service = serviceContent[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setOpenFaq(0);
  }, [slug]);

  if (!service) {
    return (
      <main className="sd-not-found">
        <span className="sd-kicker">SERVICE DIRECTORY</span>
        <h1>Let's find the right path.</h1>
        <p>This service page could not be found.</p>
        <Link to="/services" className="sd-button sd-button-lime">
          Explore services <ArrowUpRight size={17} />
        </Link>
      </main>
    );
  }

  const HeroIcon = service.icon;

  return (
    <main className="sd-page">
      <section className="sd-hero">
        <div className="sd-hero-orb" aria-hidden="true" />
        <div className="sd-container">
          <div className="sd-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span>{service.shortTitle}</span>
          </div>

          <div className="sd-hero-grid">
            <motion.div
              className="sd-hero-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55 }}
            >
              <div className="sd-kicker">
                <span className="sd-kicker-line" />
                {service.category}
              </div>
              <div className="sd-index">REHABICS / {service.number}</div>
              <h1>{service.title}</h1>
              <p className="sd-lead">{service.lead}</p>
              <div className="sd-hero-actions">
                <Link to="/appointment" className="sd-button sd-button-lime">
                  Book a session <ArrowUpRight size={18} />
                </Link>
                <a href="#the-approach" className="sd-text-link">
                  Explore the approach <ArrowDownRight size={17} />
                </a>
              </div>
              <div className="sd-hero-assurance">
                <ShieldCheck size={17} />
                <span>Personalised care. Clear next steps.</span>
              </div>
            </motion.div>

            <motion.div
              className="sd-hero-image-wrap"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.975 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: 0.08 }}
            >
              <img
                className="sd-hero-image"
                src={service.image}
                alt={service.imageAlt}
              />
              <div className="sd-image-shade" />
              <div className="sd-image-topline">
                <span>THE REHABICS APPROACH</span>
                <span>{service.number} / 04</span>
              </div>
              <div className="sd-image-caption">
                <div className="sd-image-icon">
                  <HeroIcon size={22} strokeWidth={1.7} />
                </div>
                <div>
                  <strong>{service.stat}</strong>
                  <span>{service.statCaption}</span>
                </div>
                <MoveUpRight size={20} />
              </div>
            </motion.div>
          </div>
          <div className="sd-hero-foot">
            <span>ASSESS WITH CARE</span>
            <span className="sd-foot-line" />
            <span>BUILD WITH PURPOSE</span>
            <span className="sd-foot-line" />
            <span>MOVE FORWARD</span>
          </div>
        </div>
      </section>

      <section className="sd-story sd-section" id="the-approach">
        <div className="sd-container sd-story-grid">
          <div className="sd-story-heading">
            <div className="sd-kicker">
              <span className="sd-kicker-line" />
              {service.introLabel}
            </div>
            <h2>{service.introTitle}</h2>
          </div>
          <div className="sd-story-body">
            <p>{service.intro}</p>
            <div className="sd-story-signature">
              <span className="sd-signature-mark">
                <Activity size={19} />
              </span>
              <span>Care that sees the person, not just the problem.</span>
            </div>
          </div>
        </div>
        <div className="sd-container">
          <blockquote className="sd-quote">
            <span className="sd-quote-mark">“</span>
            <p>{service.quote}</p>
            <span className="sd-quote-label">
              A MORE PERSONAL APPROACH TO PHYSIOTHERAPY
            </span>
          </blockquote>
        </div>
      </section>

      <section className="sd-focus sd-section">
        <div className="sd-container">
          <div className="sd-section-heading">
            <div>
              <div className="sd-kicker">
                <span className="sd-kicker-line" />
                HOW WE WORK
              </div>
              <h2>{service.focusTitle}</h2>
            </div>
            <p>{service.focusLead}</p>
          </div>
          <div className="sd-focus-list">
            {service.focuses.map((item, index) => {
              const StepIcon = processIcons[index];
              return (
                <motion.article
                  className="sd-focus-row"
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                    delay: reduceMotion ? 0 : index * 0.07,
                  }}
                >
                  <span className="sd-focus-number">0{index + 1}</span>
                  <div className="sd-focus-icon">
                    <StepIcon size={21} strokeWidth={1.7} />
                  </div>
                  <div className="sd-focus-copy">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <ArrowUpRight className="sd-focus-arrow" size={20} />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sd-details sd-section">
        <div className="sd-container sd-details-grid">
          <div className="sd-details-intro">
            <div className="sd-kicker">
              <span className="sd-kicker-line" />
              AREAS WE CAN EXPLORE
            </div>
            <h2>Start with what is getting in your way.</h2>
            <p>
              Your assessment helps determine which parts of your movement and
              activity deserve attention first. The right plan depends on your
              symptoms, history, and goals.
            </p>
            <Link to="/appointment" className="sd-inline-link">
              Talk through your goals <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="sd-detail-items">
            {service.details.map((detail, index) => (
              <div className="sd-detail-item" key={detail}>
                <span>0{index + 1}</span>
                <p>{detail}</p>
                <Check size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sd-audience sd-section">
        <div className="sd-container sd-audience-grid">
          <div className="sd-audience-art">
            <div className="sd-audience-art-ring" />
            <div className="sd-audience-art-icon">
              <Waves size={54} strokeWidth={1.2} />
            </div>
            <span>CARE, BUILT AROUND YOU</span>
          </div>
          <div className="sd-audience-copy">
            <div className="sd-kicker">
              <span className="sd-kicker-line" />
              YOUR GOALS COME FIRST
            </div>
            <h2>{service.whoTitle}</h2>
            <p>{service.who}</p>
            <div className="sd-audience-note">
              <Sparkles size={17} />
              <span>
                Your plan should be individual, practical, and reviewed as your
                needs change.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="sd-faq sd-section">
        <div className="sd-container sd-faq-grid">
          <div className="sd-faq-heading">
            <div className="sd-kicker">
              <span className="sd-kicker-line" />
              GOOD TO KNOW
            </div>
            <h2>Questions, answered with care.</h2>
            <p>
              Not sure what to expect? Here are a few useful starting points.
              Your own situation may need individual advice.
            </p>
            <Link to="/contact" className="sd-inline-link">
              Ask our team <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="sd-faq-list">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  className={`sd-faq-item ${isOpen ? "is-open" : ""}`}
                  key={faq.q}
                >
                  <button
                    className="sd-faq-question"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={19} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="sd-faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.22 }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sd-cta">
        <div className="sd-container sd-cta-inner">
          <div className="sd-cta-mark">
            <HeartPulse size={25} />
          </div>
          <div className="sd-cta-copy">
            <div className="sd-kicker">
              <span className="sd-kicker-line" />
              YOUR NEXT CHAPTER
            </div>
            <h2>Let's work out your next step.</h2>
            <p>
              Tell us what you want to get back to. We can help you explore
              whether this service is the right place to begin.
            </p>
          </div>
          <Link to="/appointment" className="sd-button sd-button-lime">
            Book a session <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="sd-other-services">
        <div className="sd-container sd-other-inner">
          <div>
            <span className="sd-kicker">EXPLORE REHABICS</span>
            <h2>Care for the way you want to move.</h2>
          </div>
          <div className="sd-other-links">
            {Object.entries(serviceContent)
              .filter(([key]) => key !== slug)
              .map(([key, item]) => (
                <Link key={key} to={`/services/${key}`}>
                  <span>{item.number}</span>
                  {item.shortTitle}
                  <ArrowUpRight size={16} />
                </Link>
              ))}
          </div>
        </div>
      </section>
      <p className="sd-disclaimer">
        Information on this page is general and does not replace an individual
        assessment or medical advice. If symptoms are severe, sudden, or
        concerning, seek appropriate medical care.
      </p>
    </main>
  );
}
