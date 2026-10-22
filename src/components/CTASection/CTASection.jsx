
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Activity,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import "./CTASection.css";

function CTASection({
  eyebrow = "YOUR NEXT CHAPTER STARTS HERE",
  title = "Every step forward",
  highlight = "is a step towards you.",
  description = "You deserve to move with confidence. Let our physiotherapy team help you build strength, restore movement, and get back to the moments that matter.",

  primaryText = "Start Your Recovery",
  primaryLink = "/appointment",
  secondaryText = "Explore Our Services",
  secondaryLink = "/services",
  showSecondary = true,

  note = "Personalised care. A stronger you.",
  showNote = true,
  showVisual = true,
  showFloatingCards = true,
  showEyebrowIcon = true,

  visualIcon: VisualIcon = Activity,
  floatingTop = {
    title: "Move with ease",
    subtitle: "One step at a time",
  },
  floatingBottom = {
    title: "Your recovery",
    subtitle: "Built around you",
  },

  className = "",
}) {
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.65,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={`rv3CTASection ${className}`}>
      <div className="rv3CTAContainer">
        <motion.div
          className="rv3CTACard"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
        >
          <div className="rv3CTAGlow rv3CTAGlowOne" />
          <div className="rv3CTAGlow rv3CTAGlowTwo" />

          <div className="rv3CTAContent">
            {eyebrow && (
              <span className="rv3CTAEyebrow">
                {showEyebrowIcon && <Sparkles size={15} />}
                {eyebrow}
              </span>
            )}

            <h2>
              {title}
              {highlight && (
                <>
                  <br />
                  <span>{highlight}</span>
                </>
              )}
            </h2>

            {description && (
              <p className="rv3CTADescription">{description}</p>
            )}

            {(primaryText || (showSecondary && secondaryText)) && (
              <div className="rv3CTAActions">
                {primaryText && primaryLink && (
                  <Link
                    to={primaryLink}
                    className="rv3CTAPrimaryButton"
                  >
                    {primaryText}
                    <ArrowUpRight size={19} />
                  </Link>
                )}

                {showSecondary && secondaryText && secondaryLink && (
                  <Link
                    to={secondaryLink}
                    className="rv3CTASecondaryButton"
                  >
                    {secondaryText}
                  </Link>
                )}
              </div>
            )}

            {showNote && note && (
              <div className="rv3CTANote">
                <span className="rv3CTAStatusDot" />
                {note}
              </div>
            )}
          </div>

          {showVisual && (
            <motion.div
              className="rv3CTAVisual"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -9, 0], rotate: [0, 1.5, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <div className="rv3CTAOrbit rv3CTAOrbitOuter" />
              <div className="rv3CTAOrbit rv3CTAOrbitInner" />

              <div className="rv3CTAIconCircle">
                <VisualIcon size={68} strokeWidth={1.4} />
              </div>

              {showFloatingCards && (
                <>
                  <motion.div
                    className="rv3CTAFloatingCard rv3CTAFloatingTop"
                    animate={
                      reduceMotion ? undefined : { y: [0, -5, 0] }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  >
                    <span className="rv3CTAFloatingIcon">
                      <HeartPulse size={20} />
                    </span>

                    <span>
                      <strong>{floatingTop.title}</strong>
                      <small>{floatingTop.subtitle}</small>
                    </span>
                  </motion.div>

                  <motion.div
                    className="rv3CTAFloatingCard rv3CTAFloatingBottom"
                    animate={
                      reduceMotion ? undefined : { y: [0, 5, 0] }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  >
                    <span className="rv3CTAProgressIcon">
                      <Activity size={20} />
                    </span>

                    <span>
                      <strong>{floatingBottom.title}</strong>
                      <small>{floatingBottom.subtitle}</small>
                    </span>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}

          <div className="rv3CTADecoration rv3CTADecorationOne" />
          <div className="rv3CTADecoration rv3CTADecorationTwo" />
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
