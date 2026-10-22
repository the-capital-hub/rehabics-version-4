
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartPulse,
  ShieldCheck,
  UserRound,
  Activity,
  Sparkles,
  MoveUpRight,
} from "lucide-react";
import "./Appointment.css";
import aapp from '../../assets/appointemnt.jpeg'

const services = [
  "Back and neck pain",
  "Sports injury rehabilitation",
  "Post surgery rehabilitation",
  "Joint and muscle pain",
  "Mobility and movement training",
  "General physiotherapy",
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
  concern: "",
};

function getToday() {
  const date = new Date();
  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );

  return localDate.toISOString().split("T")[0];
}

const Appointment = () => {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    visible: { opacity: 1, y: 0 },
  };

  const updateForm = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSuccess(false);
  };

  const validateForm = () => {
    const nextErrors = {};
    const phoneDigits = form.phone.replace(/\D/g, "");

    if (form.name.trim().length < 2) {
      nextErrors.name = "Please enter your full name.";
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.service) {
      nextErrors.service = "Please select a service.";
    }

    if (!form.date || form.date < getToday()) {
      nextErrors.date = "Please select a valid date.";
    }

    if (!form.time) {
      nextErrors.time = "Please select a preferred time.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Demo only. Connect an API to create a real appointment.
      setSuccess(true);
    }
  };

  return (
    <main className="rehab-appointment">
      <section className="ra-hero">
        <div className="ra-hero-glow" />

        <div className="ra-container ra-hero-grid">
          <motion.div
            className="ra-hero-copy"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.12,
                },
              },
            }}
          >
            <motion.div className="ra-eyebrow" variants={reveal}>
              <span className="ra-dot" />
              TAKE THE FIRST STEP
            </motion.div>

            <motion.h1 variants={reveal}>
              Book your
              <br />
              appointment
              <br />
              <span>with confidence.</span>
            </motion.h1>

            <motion.p className="ra-hero-description" variants={reveal}>
              Better movement starts with the right support. Tell us
              what you need, choose your preferred time, and take the
              next step in your recovery journey.
            </motion.p>

            <motion.a
              href="#ra-booking"
              className="ra-button ra-button-primary"
              variants={reveal}
            >
              Schedule your session
              <ArrowRight size={18} />
            </motion.a>

            <motion.div className="ra-trust-points" variants={reveal}>
              <div>
                <span className="ra-trust-icon">
                  <UserRound size={18} />
                </span>
                <p>Personalised<br />care</p>
              </div>

              <div>
                <span className="ra-trust-icon">
                  <ShieldCheck size={18} />
                </span>
                <p>Patient first<br />approach</p>
              </div>

              <div>
                <span className="ra-trust-icon">
                  <CalendarDays size={18} />
                </span>
                <p>Flexible<br />scheduling</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="ra-hero-visual"
            initial={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0.97,
            }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <img
              className="ra-hero-image"
              src={aapp}
              alt="Movement training in a fitness and rehabilitation setting"
            />

            <div className="ra-image-overlay" />

            <div className="ra-image-caption">
              <span className="ra-caption-icon">
                <HeartPulse size={20} />
              </span>
              <div>
                <strong>Progress starts with you.</strong>
                <span>Your recovery journey, one step at a time.</span>
              </div>
            </div>

            <div className="ra-image-badge">
              <Sparkles size={17} />
              Care that moves with you
            </div>
          </motion.div>
        </div>
      </section>

      <section className="ra-benefit-strip">
        <div className="ra-container ra-benefit-grid">
          <div className="ra-benefit">
            <span><Activity size={22} /></span>
            <div>
              <h3>Movement focused</h3>
              <p>Support for everyday movement and recovery goals.</p>
            </div>
          </div>

          <div className="ra-benefit">
            <span><HeartPulse size={22} /></span>
            <div>
              <h3>Personalised approach</h3>
              <p>Care shaped around your individual needs.</p>
            </div>
          </div>

          <div className="ra-benefit">
            <span><Clock3 size={22} /></span>
            <div>
              <h3>Your preferred time</h3>
              <p>Choose a time that fits your schedule.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ra-booking-section" id="ra-booking">
        <div className="ra-container ra-booking-grid">
          <motion.aside
            className="ra-booking-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
            transition={{ duration: 0.55 }}
          >
            <div className="ra-section-label">
              <span className="ra-dot" />
              YOUR NEXT CHAPTER
            </div>

            <h2>
              Make room for
              <br />
              <span>better movement.</span>
            </h2>

            <p className="ra-booking-description">
              Every person has different needs and goals. Share a few
              details so your appointment request starts with a clearer
              picture of what matters to you.
            </p>

            <div className="ra-process-list">
              <div className="ra-process-item">
                <span className="ra-process-number">01</span>
                <div>
                  <h3>Tell us about yourself</h3>
                  <p>Share your contact details and area of concern.</p>
                </div>
              </div>

              <div className="ra-process-item">
                <span className="ra-process-number">02</span>
                <div>
                  <h3>Choose your preferences</h3>
                  <p>Select a service, date and preferred time.</p>
                </div>
              </div>

              <div className="ra-process-item">
                <span className="ra-process-number">03</span>
                <div>
                  <h3>Take the next step</h3>
                  <p>Your request can be reviewed once booking is connected.</p>
                </div>
              </div>
            </div>

            <div className="ra-note-card">
              <ShieldCheck size={22} />
              <div>
                <strong>Your comfort matters.</strong>
                <p>
                  Share only the details needed to arrange your session.
                </p>
              </div>
            </div>
          </motion.aside>

          <motion.div
            className="ra-form-card"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            {success ? (
              <div className="ra-success" role="status">
                <span className="ra-success-icon">
                  <CheckCircle2 size={38} />
                </span>

                <span className="ra-form-kicker">REQUEST PREVIEW</span>
                <h2>All set, {form.name.trim().split(/\s+/)[0]}.</h2>
                <p>
                  Your details are valid. This frontend demo does not
                  send or save appointment requests yet.
                </p>

                <div className="ra-summary">
                  <div>
                    <span>Service</span>
                    <strong>{form.service}</strong>
                  </div>
                  <div>
                    <span>Date</span>
                    <strong>{form.date}</strong>
                  </div>
                  <div>
                    <span>Preferred time</span>
                    <strong>{form.time}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="ra-button ra-button-primary ra-full-button"
                  onClick={() => {
                    setForm(emptyForm);
                    setErrors({});
                    setSuccess(false);
                  }}
                >
                  Make another request
                  <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <>
                <div className="ra-form-heading">
                  <span className="ra-form-icon">
                    <CalendarDays size={23} />
                  </span>
                  <div>
                    <span className="ra-form-kicker">
                      APPOINTMENT DETAILS
                    </span>
                    <h2>Let's get started.</h2>
                    <p>Complete the form below to prepare your request.</p>
                  </div>
                </div>

                <form className="ra-form" onSubmit={handleSubmit} noValidate>
                  <div className="ra-form-section-title">
                    <span>01</span>
                    YOUR INFORMATION
                  </div>

                  <div className="ra-field-grid">
                    <div className="ra-field">
                      <label htmlFor="ra-name">Full name <b>*</b></label>
                      <input
                        id="ra-name"
                        name="name"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={updateForm}
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name && <small>{errors.name}</small>}
                    </div>

                    <div className="ra-field">
                      <label htmlFor="ra-phone">Phone number <b>*</b></label>
                      <input
                        id="ra-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={updateForm}
                        aria-invalid={Boolean(errors.phone)}
                      />
                      {errors.phone && <small>{errors.phone}</small>}
                    </div>

                    <div className="ra-field ra-field-full">
                      <label htmlFor="ra-email">
                        Email address <span>(optional)</span>
                      </label>
                      <input
                        id="ra-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={updateForm}
                        aria-invalid={Boolean(errors.email)}
                      />
                      {errors.email && <small>{errors.email}</small>}
                    </div>
                  </div>

                  <div className="ra-form-divider" />

                  <div className="ra-form-section-title">
                    <span>02</span>
                    YOUR SESSION
                  </div>

                  <div className="ra-field ra-field-full">
                    <label htmlFor="ra-service">
                      Select treatment or service <b>*</b>
                    </label>
                    <select
                      id="ra-service"
                      name="service"
                      value={form.service}
                      onChange={updateForm}
                      aria-invalid={Boolean(errors.service)}
                    >
                      <option value="">Choose a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && <small>{errors.service}</small>}
                  </div>

                  <div className="ra-field-grid">
                    <div className="ra-field">
                      <label htmlFor="ra-date">Preferred date <b>*</b></label>
                      <input
                        id="ra-date"
                        name="date"
                        type="date"
                        min={getToday()}
                        value={form.date}
                        onChange={updateForm}
                        aria-invalid={Boolean(errors.date)}
                      />
                      {errors.date && <small>{errors.date}</small>}
                    </div>

                    <div className="ra-field">
                      <label htmlFor="ra-time">
                        Preferred time <b>*</b>
                      </label>
                      <select
                        id="ra-time"
                        name="time"
                        value={form.time}
                        onChange={updateForm}
                        aria-invalid={Boolean(errors.time)}
                      >
                        <option value="">Choose a time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.time && <small>{errors.time}</small>}
                    </div>
                  </div>

                  <div className="ra-field ra-field-full">
                    <label htmlFor="ra-concern">
                      Anything else we should know?
                      <span>(optional)</span>
                    </label>
                    <textarea
                      id="ra-concern"
                      name="concern"
                      rows={3}
                      maxLength={500}
                      placeholder="Tell us about your concern or recovery goals..."
                      value={form.concern}
                      onChange={updateForm}
                    />
                    <span className="ra-character-count">
                      {form.concern.length}/500
                    </span>
                  </div>

                  <div className="ra-privacy-note">
                    <ShieldCheck size={17} />
                    <p>
                      This is a frontend demo. Your information will not
                      be sent or stored.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="ra-button ra-button-primary ra-full-button"
                  >
                    Request appointment
                    <MoveUpRight size={18} />
                  </button>

                  <p className="ra-required-note">
                    Fields marked <b>*</b> are required.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* <section className="ra-bottom-cta">
        <div className="ra-container ra-bottom-inner">
          <div className="ra-bottom-mark">
            <HeartPulse size={23} />
          </div>
          <div>
            <h2>Your next step starts here.</h2>
            <p>Take a moment for your movement and wellbeing.</p>
          </div>
          <a href="#ra-booking" className="ra-bottom-link">
            Book a session <ArrowRight size={17} />
          </a>
        </div>
      </section> */}
    </main>
  );
};

export default Appointment;
