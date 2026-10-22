import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock3,
  Send,
  HeartPulse,
  CalendarCheck,
  ShieldCheck,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import "./Contact.css";
import image1 from '../../assets/contact/image1.jpeg'
import image2 from '../../assets/contact/image2.jpeg'
import image3 from '../../assets/contact/image3.jpeg'
import image4 from '../../assets/contact/image4.jpeg'

import image5 from '../../assets/contact/image5.jpeg'
const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 XXXXXXXXXX",
    note: "Speak with our team",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@rehabics.in",
    note: "Send us your enquiry",
    href: "mailto:hello@rehabics.in",
  },
  {
    icon: MapPin,
    title: "Visit Our Clinic",
    value: "Add your clinic address",
    note: "We look forward to meeting you",
    href: "#clinic",
  },
  {
    icon: Clock3,
    title: "Clinic Hours",
    value: "Monday to Saturday",
    note: "Add your confirmed timings",
    href: "#clinic",
  },
];

const benefits = [
  {
    icon: HeartPulse,
    title: "Personalised Guidance",
    description:
      "Tell us what support you are looking for and we will help you understand the next step.",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Enquiries",
    description:
      "Ask about appointment availability and the services offered at our clinic.",
  },
  {
    icon: ShieldCheck,
    title: "Your Information Matters",
    description:
      "Share only the details needed for our team to understand your enquiry.",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/YOUR_HANDLE/",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/YOUR_PAGE/",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/YOUR_PAGE/",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "https://www.youtube.com/@YOUR_CHANNEL",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    href: "https://wa.me/91XXXXXXXXXX",
  },
];

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Send us an enquiry or call the clinic using the contact details above. Our team can guide you through the available booking options.",
  },
  {
    question: "Which physiotherapy service is right for me?",
    answer:
      "Tell us about the type of support you are looking for. A suitable treatment plan may require an individual assessment by a qualified professional.",
  },
  {
    question: "What should I bring to my first visit?",
    answer:
      "Follow the instructions shared when your appointment is confirmed. You may also bring relevant medical reports or previous assessment details if available.",
  },
  {
    question: "Can I contact you with a general question?",
    answer:
      "Yes. You can use the enquiry form for general questions about clinic information, services and appointments.",
  },
];

const Contact = () => {
  const reduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(0);
  const [formStatus, setFormStatus] = useState("");

  const reveal = {
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (formStatus) {
      setFormStatus("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // This is a frontend demo.
    // Connect an API or form service to actually deliver enquiries.
    setFormStatus(
      "Your details are ready. The form still needs to be connected to the clinic inbox before your enquiry can be sent."
    );
  };

  return (
    <main className="rehab-contact">
      {/* HERO */}

      <section className="contact-hero">
        <div className="contact-hero-content">
          <motion.div
            className="contact-hero-copy"
            variants={reveal}
            initial="hidden"
            animate="visible"
          >
            <span className="contact-eyebrow">
              <span className="contact-eyebrow-dot" />
              CONTACT REHABICS
            </span>

            <h1>
              Let’s Get You
              <span> Moving Forward.</span>
            </h1>

            <p>
              Have a question about physiotherapy, recovery or our services?
              We’re here to help you understand your options and take the next
              step with confidence.
            </p>

            <div className="contact-hero-actions">
              <a className="contact-btn contact-btn-primary" href="#enquiry">
                Send an Enquiry
                <ArrowRight size={18} />
              </a>

              <Link className="contact-btn contact-btn-outline" to="/services">
                Explore Services
                <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="contact-hero-note">
              <span className="contact-note-icon">
                <HeartPulse size={20} />
              </span>
              <div>
                <strong>Here for your next step</strong>
                <span>Support, clarity and better movement.</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-hero-visual"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7 }}
          >
            <img
              src={image1}
              alt="Physiotherapist helping a patient with a guided mobility exercise"
            />

            <div className="contact-image-label">
              <span className="contact-image-label-icon">
                <HeartPulse size={21} />
              </span>
              <div>
                <strong>Movement with purpose</strong>
                <span>Care that starts with a conversation.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT DETAILS */}

      <section className="contact-info-section">
        <div className="contact-info-grid">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.a
                href={item.href}
                key={item.title}
                className="contact-info-card"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06 }}
              >
                <span className="contact-info-icon">
                  <Icon size={21} />
                </span>

                <div className="contact-info-copy">
                  <span className="contact-info-title">{item.title}</span>
                  <strong>{item.value}</strong>
                  <span className="contact-info-note">{item.note}</span>
                </div>

                <ArrowUpRight
                  className="contact-info-arrow"
                  size={17}
                />
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* ENQUIRY FORM */}

      <section className="contact-enquiry-section" id="enquiry">
        <div className="contact-enquiry-layout">
          <motion.div
            className="contact-enquiry-copy"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="contact-eyebrow">
              <span className="contact-eyebrow-dot" />
              SEND US A MESSAGE
            </span>

            <h2>
              Tell Us How
              <span> We Can Help.</span>
            </h2>

            <p className="contact-section-description">
              Share your contact details and a brief message. Our team can
              review your enquiry once the form is connected to the clinic’s
              inbox.
            </p>

            <div className="contact-benefits">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div className="contact-benefit" key={benefit.title}>
                    <span className="contact-benefit-icon">
                      <Icon size={19} />
                    </span>

                    <div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="contact-direct-card">
              <span className="contact-direct-icon">
                <Mail size={19} />
              </span>
              <div>
                <span>Prefer email?</span>
                <a href="mailto:hello@rehabics.in">
                  hello@rehabics.in
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-card"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="contact-form-heading">
              <div>
                <span className="contact-form-kicker">YOUR ENQUIRY</span>
                <h3>Let’s start a conversation.</h3>
              </div>

              <span className="contact-form-heading-icon">
                <Send size={20} />
              </span>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <div className="contact-field">
                  <label htmlFor="contact-name">
                    Full Name <span>*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    minLength={2}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">
                    Email Address <span>*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-phone">
                    Phone Number <span>*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-service">
                    Enquiry Type <span>*</span>
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="appointment">
                      Appointment enquiry
                    </option>
                    <option value="physiotherapy">
                      Physiotherapy services
                    </option>
                    <option value="recovery">
                      Recovery support
                    </option>
                    <option value="general">
                      General question
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="contact-field contact-field-full">
                  <label htmlFor="contact-message">
                    Your Message <span>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    placeholder="Tell us a little about how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <p className="contact-form-privacy">
                Please avoid sharing sensitive medical information in this
                initial enquiry.
              </p>

              <button
                type="submit"
                className="contact-btn contact-btn-primary contact-submit-btn"
              >
                Send Enquiry
                <ArrowRight size={18} />
              </button>

              {formStatus && (
                <div className="contact-form-status" role="status">
                  <CheckCircle2 size={20} />
                  <p>{formStatus}</p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* CLINIC */}

      <section className="contact-clinic-section" id="clinic">
        <div className="contact-clinic-image">
          <img
            src={image2}
            alt="Modern physiotherapy clinic reception and waiting area"
            loading="lazy"
          />
          <div className="contact-clinic-image-caption">
            <MapPin size={18} />
            <span>Your space for movement and recovery</span>
          </div>
        </div>

        <motion.div
          className="contact-clinic-copy"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <span className="contact-eyebrow">
            <span className="contact-eyebrow-dot" />
            VISIT OUR CLINIC
          </span>

          <h2>
            A Space Designed
            <span> For Your Recovery.</span>
          </h2>

          <p>
            We aim to provide a welcoming environment where you can ask
            questions, understand your options and take your next step with
            confidence.
          </p>

          <div className="contact-clinic-address">
            <span className="contact-clinic-address-icon">
              <MapPin size={21} />
            </span>
            <div>
              <strong>Find Rehabics</strong>
              <p>
                Add your verified clinic address here before publishing the
                website.
              </p>
            </div>
          </div>

          <a
            className="contact-btn contact-btn-outline"
            href="https://maps.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </section>

      {/* SOCIAL MEDIA */}

      <section className="contact-social-map-section">
        <div className="contact-social-card">
          <span className="contact-eyebrow">
            <span className="contact-eyebrow-dot" />
            FOLLOW REHABICS
          </span>

          <h2>
            Stay Connected
            <span> With Us.</span>
          </h2>

          <p>
            Follow our channels for clinic updates, movement education and
            helpful recovery information.
          </p>

          <div className="contact-social-list">
            {socialLinks.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                className="contact-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Rehabics on ${name}`}
                title={name}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <span className="contact-social-note">
            Replace these sample links with your official social profiles.
          </span>
        </div>

        <div className="contact-map-card">
          <img
            src={image3}
            alt="Bright physiotherapy treatment room with rehabilitation equipment"
            loading="lazy"
          />

          <div className="contact-map-overlay">
            <span className="contact-map-icon">
              <MapPin size={22} />
            </span>

            <div>
              <strong>Rehabics Clinic</strong>
              <p>Add your verified address to help visitors find you.</p>

              <a
                href="https://maps.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Google Maps
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="contact-faq-section">
        <div className="contact-faq-heading">
          <div>
            <span className="contact-eyebrow">
              <span className="contact-eyebrow-dot" />
              FREQUENTLY ASKED QUESTIONS
            </span>

            <h2>
              Quick Answers<span>.</span>
            </h2>

            <p>
              A few helpful details before you get in touch with our team.
            </p>
          </div>

          <div className="contact-faq-help">
            <span>Still have a question?</span>
            <a href="#enquiry">
              Contact Us
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="contact-faq-grid">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                className={`contact-faq-item ${isOpen ? "is-open" : ""}`}
                key={faq.question}
              >
                <button
                  className="contact-faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <span className="contact-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{faq.question}</span>

                  <span className="contact-faq-toggle">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="contact-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}

      {/* <section className="contact-final-cta">
        <div className="contact-final-glow" />

        <div className="contact-final-copy">
          <span className="contact-eyebrow">
            <span className="contact-eyebrow-dot" />
            YOUR NEXT STEP STARTS HERE
          </span>

          <h2>
            Ready to Move
            <span> Forward?</span>
          </h2>

          <p>
            Reach out to our team with your questions and learn more about
            the support available to you.
          </p>
        </div>

        <div className="contact-final-actions">
          <a className="contact-btn contact-btn-primary" href="#enquiry">
            Talk to Our Team
            <ArrowRight size={18} />
          </a>

          <Link className="contact-btn contact-btn-outline" to="/services">
            Explore Services
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section> */}
    </main>
  );
};

export default Contact;