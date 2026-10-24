import RecoveryProgressChart from "./RecoveryProgressChart";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Dumbbell,
  HeartPulse,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import "./PatientDashboard.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const readStoredUser = () => {
  const raw =
    localStorage.getItem("rehabics_user") ||
    sessionStorage.getItem("rehabics_user") ||
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const readToken = () =>
  localStorage.getItem("rehabics_token") ||
  sessionStorage.getItem("rehabics_token") ||
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");

const initialExercises = [
  {
    id: 1,
    title: "Gentle neck stretches",
    detail: "5 minutes",
    done: false,
  },
  {
    id: 2,
    title: "Shoulder mobility",
    detail: "8 minutes",
    done: false,
  },
  {
    id: 3,
    title: "Breathing and relaxation",
    detail: "3 minutes",
    done: false,
  },
];

const navigation = [
  { label: "Overview", icon: Home },
  { label: "Appointments", icon: CalendarDays },
  { label: "My exercises", icon: Dumbbell },
  { label: "My progress", icon: Activity },
  { label: "Messages", icon: MessageCircle },
];

function PatientDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(readStoredUser);
  const [activePage, setActivePage] = useState("Overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [exercises, setExercises] = useState(initialExercises);
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState("");

  const token = readToken();

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.success || !data.user) {
          throw new Error(data.message || "Please sign in again.");
        }

        if (data.user.role !== "patient") {
          navigate("/login", { replace: true });
          return;
        }

        if (!active) return;

        setUser(data.user);
        localStorage.setItem("rehabics_user", JSON.stringify(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (error) {
        if (!active) return;

        setApiMessage(
          error.message === "Failed to fetch"
            ? "We could not reach the server. Some account details may be unavailable."
            : error.message || "Unable to load your account details."
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, [navigate, token]);

  const completedExercises = useMemo(
    () => exercises.filter((exercise) => exercise.done).length,
    [exercises]
  );

  const filteredNavigation = useMemo(
    () =>
      navigation.filter((item) =>
        item.label.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search]
  );

  const firstName = user?.name?.trim().split(/\s+/)[0] || "there";
  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "P";

  const toggleExercise = (id) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === id
          ? { ...exercise, done: !exercise.done }
          : exercise
      )
    );
  };

  const logout = () => {
    [
      "token",
      "user",
      "rehabics_token",
      "rehabics_user",
    ].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    navigate("/login", { replace: true });
  };

  const selectPage = (label) => {
    setActivePage(label);
    setMobileMenuOpen(false);
  };

  return (
    <div className="patientApp">
      {mobileMenuOpen && (
        <button
          className="patientMobileBackdrop"
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`patientSidebar ${mobileMenuOpen ? "isOpen" : ""}`}
      >
        <div className="patientBrand">
          <span className="patientBrandMark">
            <Activity size={23} strokeWidth={2.6} />
          </span>
          <span className="patientBrandText">
            <strong>rehabics</strong>
            <small>PATIENT SPACE</small>
          </span>
          <button
            className="patientIconButton patientCloseMenu"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <div className="patientSideCaption">YOUR SPACE</div>

        <label className="patientSearch">
          <Search size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find a section"
            aria-label="Find a section"
          />
          <span>/</span>
        </label>

        <nav className="patientNavigation" aria-label="Patient navigation">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.label;

            return (
              <button
                key={item.label}
                className={`patientNavItem ${active ? "active" : ""}`}
                onClick={() => selectPage(item.label)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {active && <span className="patientActiveMark" />}
              </button>
            );
          })}

          {filteredNavigation.length === 0 && (
            <p className="patientSearchEmpty">No matching section found.</p>
          )}
        </nav>

        <div className="patientSidebarSpacer" />

        <div className="patientCareCard">
          <span className="patientCareIcon">
            <HeartPulse size={19} />
          </span>
          <strong>Need a little help?</strong>
          <p>Your care journey matters. Reach out whenever you need support.</p>
          <button onClick={() => selectPage("Messages")}>
            Get support <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="patientSidebarBottom">
          <button
            className="patientNavItem"
            onClick={() => selectPage("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>
          <button className="patientNavItem" onClick={logout}>
            <LogOut size={19} />
            <span>Sign out</span>
          </button>
          <div className="patientVersion">REHABICS V4</div>
        </div>
      </aside>

      <main className="patientMain">
        <header className="patientTopbar">
          <div className="patientTopbarLeft">
            <button
              className="patientIconButton patientOpenMenu"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>
            <div className="patientBreadcrumb">
              <span>Patient space</span>
              <span className="patientBreadcrumbDot">/</span>
              <strong>{activePage}</strong>
            </div>
          </div>

          <div className="patientTopbarActions">
            <span className="patientSecureLabel">
              <ShieldCheck size={15} />
              Private and secure
            </span>

            <div className="patientNotificationWrap">
              <button
                className={`patientIconButton ${
                  notificationsOpen ? "selected" : ""
                }`}
                onClick={() => setNotificationsOpen((value) => !value)}
                aria-label="Notifications"
              >
                <Bell size={19} />
                <span className="patientNotificationDot" />
              </button>

              {notificationsOpen && (
                <div className="patientPopover patientNotificationPanel">
                  <div className="patientPopoverTitle">Notifications</div>
                  <div className="patientNotificationItem">
                    <span className="patientNotificationIcon">
                      <CalendarDays size={17} />
                    </span>
                    <div>
                      <strong>Stay on track</strong>
                      <p>Check your upcoming care schedule here.</p>
                    </div>
                  </div>
                  <div className="patientNotificationItem">
                    <span className="patientNotificationIcon">
                      <Dumbbell size={17} />
                    </span>
                    <div>
                      <strong>Your daily routine</strong>
                      <p>Visit My exercises to track your checklist.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="patientProfileWrap">
              <button
                className="patientProfileButton"
                onClick={() => setProfileMenuOpen((value) => !value)}
              >
                <span className="patientAvatar">{initials}</span>
                <span className="patientProfileName">
                  <strong>{user?.name || "Patient"}</strong>
                  <small>Patient account</small>
                </span>
                <ChevronDown size={16} />
              </button>

              {profileMenuOpen && (
                <div className="patientPopover patientProfileMenu">
                  <div className="patientProfileMenuInfo">
                    <strong>{user?.name || "Patient"}</strong>
                    <span>{user?.email || "Your account"}</span>
                  </div>
                  <button
                    onClick={() => {
                      setActivePage("Settings");
                      setProfileMenuOpen(false);
                    }}
                  >
                    <Settings size={16} /> Account settings
                  </button>
                  <button onClick={logout}>
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="patientContent">
          {apiMessage && (
            <div className="patientInfoNotice" role="status">
              <CircleHelp size={17} />
              <span>{apiMessage}</span>
            </div>
          )}

          {activePage === "Overview" && (
            <>
              <section className="patientWelcome">
                <div className="patientWelcomeCopy">
                  <span className="patientEyebrow">
                    <Sparkles size={15} />
                    YOUR RECOVERY, YOUR PACE
                  </span>
                  <h1>
                    Good to see you, <span>{firstName}.</span>
                  </h1>
                  <p>
                    Small steps make meaningful progress. Let’s make today
                    count.
                  </p>
                  {loading && (
                    <div className="patientLoadingLabel">
                      Checking your account details
                    </div>
                  )}
                </div>

                <div className="patientWelcomeArt" aria-hidden="true">
                  <div className="patientOrbit patientOrbitOne" />
                  <div className="patientOrbit patientOrbitTwo" />
                  <div className="patientArtCore">
                    <Activity size={48} strokeWidth={1.5} />
                  </div>
                  <span className="patientArtSpark patientArtSparkOne">
                    <Zap size={17} />
                  </span>
                  <span className="patientArtSpark patientArtSparkTwo">
                    <Check size={17} />
                  </span>
                </div>
              </section>

              <section className="patientSectionHeading">
                <div>
                  <span className="patientSectionEyebrow">YOUR OVERVIEW</span>
                  <h2>Your care at a glance</h2>
                </div>
                <span className="patientTodayLabel">
                  <span /> YOUR PERSONAL SPACE
                </span>
              </section>

              <section className="patientStatsGrid">
                <article className="patientStatCard">
                  <div className="patientStatTop">
                    <span className="patientStatIcon lime">
                      <CalendarDays size={20} />
                    </span>
                    <span className="patientStatLabel">CARE SCHEDULE</span>
                  </div>
                  <h3>Appointments</h3>
                  <p>Keep your sessions organised in one place.</p>
                  <button
                    className="patientTextLink"
                    onClick={() => selectPage("Appointments")}
                  >
                    View schedule <ArrowUpRight size={16} />
                  </button>
                </article>

                <article className="patientStatCard">
                  <div className="patientStatTop">
                    <span className="patientStatIcon grey">
                      <Dumbbell size={20} />
                    </span>
                    <span className="patientStatLabel">DAILY ROUTINE</span>
                  </div>
                  <h3>{completedExercises} of {exercises.length} complete</h3>
                  <div
                    className="patientProgressTrack"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={exercises.length}
                    aria-valuenow={completedExercises}
                    aria-label="Exercise checklist completion"
                  >
                    <span
                      style={{
                        width: `${
                          (completedExercises / exercises.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <p>Your checklist updates as you complete each item.</p>
                  <button
                    className="patientTextLink"
                    onClick={() => selectPage("My exercises")}
                  >
                    Open exercises <ArrowUpRight size={16} />
                  </button>
                </article>

                <article className="patientStatCard">
                  <div className="patientStatTop">
                    <span className="patientStatIcon grey">
                      <Stethoscope size={20} />
                    </span>
                    <span className="patientStatLabel">YOUR CARE TEAM</span>
                  </div>
                  <h3>Stay connected</h3>
                  <p>Use your care channels for questions and updates.</p>
                  <button
                    className="patientTextLink"
                    onClick={() => selectPage("Messages")}
                  >
                    Open messages <ArrowUpRight size={16} />
                  </button>
                </article>
              </section>

              <RecoveryProgressChart/>

              <section className="patientLowerGrid">
                <article className="patientPanel patientRoutinePanel">
                  <div className="patientPanelHeading">
                    <div>
                      <span className="patientSectionEyebrow">
                        YOUR DAILY ROUTINE
                      </span>
                      <h2>Exercise checklist</h2>
                    </div>
                    <span className="patientPanelIcon">
                      <Dumbbell size={19} />
                    </span>
                  </div>

                  <p className="patientPanelDescription">
                    Mark each item as you complete it. Follow your
                    physiotherapist’s instructions for your own care plan.
                  </p>

                  <div className="patientExerciseList">
                    {exercises.map((exercise) => (
                      <button
                        key={exercise.id}
                        className={`patientExerciseRow ${
                          exercise.done ? "completed" : ""
                        }`}
                        onClick={() => toggleExercise(exercise.id)}
                        aria-pressed={exercise.done}
                      >
                        <span className="patientExerciseCheck">
                          {exercise.done && <Check size={15} />}
                        </span>
                        <span className="patientExerciseText">
                          <strong>{exercise.title}</strong>
                          <small>{exercise.detail}</small>
                        </span>
                        <span className="patientExerciseStatus">
                          {exercise.done ? "Done" : "Mark done"}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="patientRoutineFooter">
                    <span>
                      {completedExercises === exercises.length
                        ? "Routine checklist complete"
                        : `${exercises.length - completedExercises} items left`}
                    </span>
                    <button onClick={() => selectPage("My exercises")}>
                      View routine <ArrowUpRight size={15} />
                    </button>
                  </div>
                </article>

                <article className="patientPanel patientNextPanel">
                  <div className="patientPanelHeading">
                    <div>
                      <span className="patientSectionEyebrow">
                        NEXT STEP
                      </span>
                      <h2>Plan your care</h2>
                    </div>
                    <span className="patientPanelIcon">
                      <HeartPulse size={19} />
                    </span>
                  </div>

                  <div className="patientNextIllustration">
                    <div className="patientNextCircle">
                      <CalendarDays size={31} />
                    </div>
                    <span className="patientNextOrbit" />
                  </div>

                  <h3>Make time for your recovery</h3>
                  <p>
                    Review your schedule or use the booking page to request
                    your next session.
                  </p>

                  <button
                    className="patientPrimaryButton"
                    onClick={() => navigate("/appointment")}
                  >
                    Book an appointment <ArrowUpRight size={17} />
                  </button>

                  <button
                    className="patientSecondaryButton"
                    onClick={() => navigate("/services")}
                  >
                    Explore services
                  </button>
                </article>
              </section>

              <section className="patientBottomBanner">
                <div className="patientBottomIcon">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <strong>Your wellbeing comes first</strong>
                  <p>
                    For exercise guidance, follow the plan provided by your
                    treating physiotherapist.
                  </p>
                </div>
                <button onClick={() => selectPage("Messages")}>
                  Get support <ArrowUpRight size={16} />
                </button>
              </section>
            </>
          )}

          {activePage === "Appointments" && (
            <section className="patientInnerPage">
              <span className="patientSectionEyebrow">YOUR CARE SCHEDULE</span>
              <h1>Appointments</h1>
              <p className="patientInnerIntro">
                Keep track of your physiotherapy visits and plan your next
                step.
              </p>
              <div className="patientEmptyState">
                <span className="patientEmptyIcon">
                  <CalendarDays size={29} />
                </span>
                <h2>Your appointments will appear here</h2>
                <p>
                  Connect your appointment records to see confirmed sessions
                  and visit details.
                </p>
                <button
                  className="patientPrimaryButton"
                  onClick={() => navigate("/appointment")}
                >
                  Request an appointment <ArrowUpRight size={17} />
                </button>
              </div>
            </section>
          )}

          {activePage === "My exercises" && (
            <section className="patientInnerPage">
              <span className="patientSectionEyebrow">DAILY MOVEMENT</span>
              <h1>My exercises</h1>
              <p className="patientInnerIntro">
                Use this checklist to keep track of your routine.
              </p>
              <div className="patientPanel patientExercisePage">
                <div className="patientExercisePageHeader">
                  <div>
                    <h2>Today’s checklist</h2>
                    <p>
                      {completedExercises} of {exercises.length} items complete
                    </p>
                  </div>
                  <div className="patientLargeProgress">
                    {Math.round(
                      (completedExercises / exercises.length) * 100
                    )}%
                  </div>
                </div>
                <div className="patientProgressTrack">
                  <span
                    style={{
                      width: `${
                        (completedExercises / exercises.length) * 100
                      }%`,
                    }}
                  />
                </div>
                {exercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    className={`patientExerciseRow ${
                      exercise.done ? "completed" : ""
                    }`}
                    onClick={() => toggleExercise(exercise.id)}
                    aria-pressed={exercise.done}
                  >
                    <span className="patientExerciseCheck">
                      {exercise.done && <Check size={15} />}
                    </span>
                    <span className="patientExerciseText">
                      <strong>{exercise.title}</strong>
                      <small>{exercise.detail}</small>
                    </span>
                    <span className="patientExerciseStatus">
                      {exercise.done ? "Done" : "Mark done"}
                    </span>
                  </button>
                ))}
                <p className="patientExerciseDisclaimer">
                  These are example checklist items, not a prescribed
                  treatment plan. Follow your own clinician’s advice.
                </p>
              </div>
            </section>
          )}

          {activePage === "My progress" && (
            <section className="patientInnerPage">
              <span className="patientSectionEyebrow">YOUR JOURNEY</span>
              <h1>My progress</h1>
              <p className="patientInnerIntro">
                Your progress view will show recorded milestones once your
                care data is connected.
              </p>
              <div className="patientEmptyState">
                <span className="patientEmptyIcon">
                  <Activity size={29} />
                </span>
                <h2>Your recovery story is personal</h2>
                <p>
                  Progress charts will use recorded information from your
                  care plan, not estimates.
                </p>
              </div>
            </section>
          )}

          {activePage === "Messages" && (
            <section className="patientInnerPage">
              <span className="patientSectionEyebrow">STAY CONNECTED</span>
              <h1>Messages</h1>
              <p className="patientInnerIntro">
                A place for your care conversations and support.
              </p>
              <div className="patientEmptyState">
                <span className="patientEmptyIcon">
                  <MessageCircle size={29} />
                </span>
                <h2>Your messages will appear here</h2>
                <p>
                  Connect the existing messaging service to display
                  conversations with your care team.
                </p>
                <button
                  className="patientPrimaryButton"
                  onClick={() => navigate("/contact")}
                >
                  Contact Rehabics <ArrowUpRight size={17} />
                </button>
              </div>
            </section>
          )}

          {activePage === "Settings" && (
            <section className="patientInnerPage">
              <span className="patientSectionEyebrow">YOUR ACCOUNT</span>
              <h1>Settings</h1>
              <p className="patientInnerIntro">
                Review the profile details linked to your account.
              </p>
              <div className="patientPanel patientAccountPanel">
                <div className="patientAccountAvatar">{initials}</div>
                <div className="patientAccountDetails">
                  <h2>{user?.name || "Patient"}</h2>
                  <p>{user?.email || "Email not available"}</p>
                  <p>{user?.phone || "Phone not provided"}</p>
                  <span className="patientAccountBadge">
                    <ShieldCheck size={14} /> Patient account
                  </span>
                </div>
              </div>
            </section>
          )}

          <footer className="patientFooter">
            <span>REHABICS V4</span>
            <span>Built around your care journey</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default PatientDashboard;
