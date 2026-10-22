
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  HeartPulse,
  ShieldCheck,
  UserRound,
  Stethoscope,
  Mail,
  LockKeyhole,
  Phone,
  CheckCircle2,
} from "lucide-react";
import "./Auth.css";

const Auth = () => {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    remember: true,
    agree: false,
  });

  const isRegister = mode === "register";

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    if (isRegister) {
      if (form.name.trim().length < 2) {
        setMessageType("error");
        setMessage("Please enter your full name.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setMessageType("error");
        setMessage("Please enter a valid email address.");
        return;
      }

      if (!/^\+?[0-9\s()]{10,16}$/.test(form.phone.trim())) {
        setMessageType("error");
        setMessage("Please enter a valid phone number.");
        return;
      }

      if (form.password.length < 8) {
        setMessageType("error");
        setMessage("Your password must contain at least 8 characters.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setMessageType("error");
        setMessage("Your passwords do not match.");
        return;
      }

      if (!form.agree) {
        setMessageType("error");
        setMessage("Please accept the terms to continue.");
        return;
      }
    } else {
      if (!form.email.trim() || !form.password) {
        setMessageType("error");
        setMessage("Please enter your email and password.");
        return;
      }
    }

    setMessageType("success");
    setMessage(
      isRegister
        ? `Your ${role === "patient" ? "patient" : "physiotherapist"} registration form is valid. Connect the backend to create your account.`
        : "Your form is valid. Connect the backend to sign in securely."
    );
  };

  return (
    <main className="rehabAuth">
      <div className="authBackdrop authBackdropOne" />
      <div className="authBackdrop authBackdropTwo" />

      <div className="authShell">
        <motion.section
          className="authVisual"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Link to="/" className="authBrand" aria-label="Rehabics home">
            <span className="authBrandIcon">
              <Activity size={25} strokeWidth={2.4} />
            </span>
            <span>
              <strong>rehabics</strong>
              <small>MOVE BETTER. LIVE BETTER.</small>
            </span>
          </Link>

          <div className="authVisualContent">
            <span className="authEyebrow">
              <HeartPulse size={15} />
              YOUR WELLNESS JOURNEY
            </span>

            <h1>
              Every step
              <br />
              brings you
              <br />
              <span>closer to better.</span>
            </h1>

            <p>
              Connect with trusted physiotherapy professionals and take the
              next step towards a healthier, more active life.
            </p>

            <div className="authBenefits">
              <div className="authBenefit">
                <span className="authBenefitIcon">
                  <ShieldCheck size={21} />
                </span>
                <div>
                  <strong>Care you can trust</strong>
                  <small>Your wellness comes first</small>
                </div>
              </div>

              <div className="authBenefit">
                <span className="authBenefitIcon">
                  <UserRound size={21} />
                </span>
                <div>
                  <strong>Care made personal</strong>
                  <small>Support for your unique needs</small>
                </div>
              </div>
            </div>
          </div>

          <div className="authVisualFooter">
            <span className="authFooterDot" />
            Your journey to better movement starts here
          </div>

          <div className="authDecor authDecorOne" />
          <div className="authDecor authDecorTwo" />
        </motion.section>

        <motion.section
          className="authFormPanel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="authMobileBrand">
            <span className="authBrandIcon">
              <Activity size={23} />
            </span>
            <strong>rehabics</strong>
          </div>

          <div className="authFormTop">
            <span className="authFormEyebrow">
              {isRegister ? "JOIN OUR COMMUNITY" : "WELCOME BACK"}
            </span>

            <h2>
              {isRegister ? "Create your account" : "Welcome back"}
            </h2>

            <p>
              {isRegister
                ? "Start your journey towards better health."
                : "Sign in to continue your wellness journey."}
            </p>
          </div>

          <div className="authModeSwitch" role="tablist" aria-label="Account access">
            <button
              type="button"
              role="tab"
              aria-selected={!isRegister}
              className={!isRegister ? "active" : ""}
              onClick={() => switchMode("login")}
            >
              Sign In
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={isRegister}
              className={isRegister ? "active" : ""}
              onClick={() => switchMode("register")}
            >
              Create Account
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              className="authForm"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              noValidate
            >
              {isRegister && (
                <>
                  <div className="authRoleLabel">I want to join as</div>

                  <div className="authRoleOptions">
                    <button
                      type="button"
                      className={`authRoleCard ${
                        role === "patient" ? "selected" : ""
                      }`}
                      onClick={() => setRole("patient")}
                      aria-pressed={role === "patient"}
                    >
                      <span className="authRoleIcon">
                        <HeartPulse size={20} />
                      </span>
                      <span>
                        <strong>Patient</strong>
                        <small>Find better care</small>
                      </span>
                      <span className="authRoleRadio" />
                    </button>

                    <button
                      type="button"
                      className={`authRoleCard ${
                        role === "physiotherapist" ? "selected" : ""
                      }`}
                      onClick={() => setRole("physiotherapist")}
                      aria-pressed={role === "physiotherapist"}
                    >
                      <span className="authRoleIcon">
                        <Stethoscope size={20} />
                      </span>
                      <span>
                        <strong>Physiotherapist</strong>
                        <small>Help people recover</small>
                      </span>
                      <span className="authRoleRadio" />
                    </button>
                  </div>

                  <div className="authField">
                    <label htmlFor="authName">Full name</label>
                    <div className="authInputWrap">
                      <UserRound size={18} />
                      <input
                        id="authName"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        value={form.name}
                        onChange={updateField}
                        required
                        minLength={2}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="authField">
                <label htmlFor="authEmail">Email address</label>
                <div className="authInputWrap">
                  <Mail size={18} />
                  <input
                    id="authEmail"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={updateField}
                    required
                  />
                </div>
              </div>

              {isRegister && (
                <div className="authField">
                  <label htmlFor="authPhone">Phone number</label>
                  <div className="authInputWrap">
                    <Phone size={18} />
                    <input
                      id="authPhone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={updateField}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="authField">
                <div className="authLabelRow">
                  <label htmlFor="authPassword">Password</label>
                  {!isRegister && (
                    <button
                      type="button"
                      className="authTextButton"
                      onClick={() => {
                        setMessageType("error");
                        setMessage(
                          "Password recovery will be available after backend integration."
                        );
                      }}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className="authInputWrap">
                  <LockKeyhole size={18} />
                  <input
                    id="authPassword"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      isRegister ? "At least 8 characters" : "Enter your password"
                    }
                    autoComplete={
                      isRegister ? "new-password" : "current-password"
                    }
                    value={form.password}
                    onChange={updateField}
                    minLength={isRegister ? 8 : undefined}
                    required
                  />
                  <button
                    type="button"
                    className="authEyeButton"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div className="authField">
                  <label htmlFor="authConfirmPassword">Confirm password</label>
                  <div className="authInputWrap">
                    <LockKeyhole size={18} />
                    <input
                      id="authConfirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter your password again"
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={updateField}
                      required
                    />
                    <button
                      type="button"
                      className="authEyeButton"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {!isRegister && (
                <label className="authCheckRow">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={updateField}
                  />
                  <span>Remember me on this device</span>
                </label>
              )}

              {isRegister && (
                <label className="authCheckRow authTerms">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={updateField}
                  />
                  <span>
                    I agree to the <a href="/terms">Terms of Service</a> and{" "}
                    <a href="/privacy">Privacy Policy</a>.
                  </span>
                </label>
              )}

              {message && (
                <div
                  className={`authMessage ${
                    messageType === "error" ? "error" : "success"
                  }`}
                  role="status"
                >
                  {messageType === "success" && <CheckCircle2 size={17} />}
                  <span>{message}</span>
                </div>
              )}

              <button type="submit" className="authSubmit">
                <span>
                  {isRegister ? "Create my account" : "Sign in to your account"}
                </span>
                <ArrowRight size={19} />
              </button>

              <div className="authSecureNote">
                <ShieldCheck size={16} />
                <span>Your information deserves care and privacy</span>
              </div>
            </motion.form>
          </AnimatePresence>

          <p className="authBottomText">
            {isRegister ? "Already have an account?" : "New to Rehabics?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(isRegister ? "login" : "register")}
            >
              {isRegister ? "Sign in" : "Create an account"}
            </button>
          </p>
        </motion.section>
      </div>
    </main>
  );
};

export default Auth;
