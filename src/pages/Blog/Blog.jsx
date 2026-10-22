
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Clock3,
  CalendarDays,
  HeartPulse,
  Activity,
  Bone,
  Dumbbell,
  BookOpen,
  X,
  CheckCircle2,
} from "lucide-react";

import HeroSection from "../../components/HeroSection/HeroSection";
import CTASection from "../../components/CTASection/CTASection";
import "./Blog.css";

const categories = [
  "All articles",
  "Pain management",
  "Movement",
  "Recovery",
  "Wellness",
];

const articles = [
  {
    id: 1,
    category: "Pain management",
    title: "Understanding back pain and when to seek help",
    excerpt:
      "Learn about common causes of back discomfort, everyday habits and when professional assessment may be useful.",
    date: "8 min read",
    published: "Featured guide",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85",
    icon: Bone,
    featured: true,
    content: [
      "Back discomfort can have many causes, including muscle strain, prolonged sitting and changes in activity. The right approach depends on your symptoms and personal health history.",
      "Gentle movement, regular breaks from sitting and gradually returning to comfortable activities may help some people. Avoid pushing through movements that make your symptoms significantly worse.",
      "Seek urgent medical attention for back pain accompanied by new bladder or bowel problems, numbness around the groin, or significant or progressive leg weakness. A clinician can help assess persistent or recurring symptoms.",
    ],
  },
  {
    id: 2,
    category: "Movement",
    title: "Small movement habits for a healthier workday",
    excerpt:
      "Simple ways to add comfortable movement to your daily routine when your work involves long hours at a desk.",
    date: "5 min read",
    published: "Movement guide",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
    icon: Activity,
    content: [
      "Long workdays can make movement easy to overlook. Short breaks to stand, walk or change position can help you vary your posture throughout the day.",
      "Try setting a regular reminder to move, adjusting your workstation for comfort and choosing activities that fit your current ability.",
      "There is no single perfect posture for everyone. If movement causes persistent pain or discomfort, consider speaking with a qualified healthcare professional.",
    ],
  },
  {
    id: 3,
    category: "Recovery",
    title: "What to expect from a physiotherapy session",
    excerpt:
      "Get familiar with the assessment process, goal setting and how your personalised care plan may develop.",
    date: "6 min read",
    published: "Patient guide",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
    icon: HeartPulse,
    content: [
      "A physiotherapy appointment commonly begins with a discussion about your concerns, health history, daily activities and goals.",
      "Your physiotherapist may assess movement, strength or function when appropriate. Together, you can discuss a care plan suited to your needs.",
      "Progress varies from person to person. Ask questions, share changes in your symptoms and follow the guidance provided for your individual situation.",
    ],
  },
  {
    id: 4,
    category: "Wellness",
    title: "Building a realistic routine for everyday wellbeing",
    excerpt:
      "Create a routine that makes room for movement, rest and steady progress without unnecessary pressure.",
    date: "4 min read",
    published: "Wellness guide",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85",
    icon: Dumbbell,
    content: [
      "A sustainable wellbeing routine starts with small steps that fit your schedule and current ability.",
      "You might begin with a short walk, comfortable mobility exercises or regular breaks from sitting. Increase activity gradually according to how you feel.",
      "Rest and consistency both matter. If you have an injury or a medical condition, seek advice about which activities are appropriate for you.",
    ],
  },
  {
    id: 5,
    category: "Pain management",
    title: "Neck discomfort and the role of daily habits",
    excerpt:
      "Explore how screen use, work habits and movement breaks can affect neck comfort throughout the day.",
    date: "5 min read",
    published: "Practical guide",
    image:
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=900&q=85",
    icon: Bone,
    content: [
      "Neck discomfort can be influenced by several factors, including activity levels, sustained positions, stress and sleep.",
      "Changing positions, taking comfortable movement breaks and arranging screens to suit your needs may help reduce some everyday strain.",
      "Seek medical assessment for severe or persistent symptoms, particularly after an injury or when symptoms occur with new weakness, numbness, fever or a severe headache.",
    ],
  },
  {
    id: 6,
    category: "Recovery",
    title: "Returning to activity after an injury",
    excerpt:
      "Why gradual progress, clear goals and appropriate professional guidance matter during recovery.",
    date: "7 min read",
    published: "Recovery guide",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85",
    icon: Activity,
    content: [
      "Returning to activity after an injury depends on the type of injury, healing stage and your individual circumstances.",
      "A gradual plan can help you rebuild activity while monitoring how your body responds. Follow the advice provided by your treating healthcare professional.",
      "If pain, swelling or loss of function increases significantly, pause the activity and seek appropriate guidance before progressing.",
    ],
  },
];

const Blog = () => {
  const reduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState("All articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featuredArticle = articles.find((article) => article.featured);

  const filteredArticles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      if (article.featured) return false;

      const matchesCategory =
        activeCategory === "All articles" ||
        article.category === activeCategory;

      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const openArticle = (article) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <main className="rv3BlogPage">
      <HeroSection
        eyebrow="THE REHABICS JOURNAL"
        title="Knowledge For"
        highlight="Better Movement"
        secondLine="And Everyday Living"
        description="Explore practical physiotherapy insights, recovery guidance and simple ways to support your movement and wellbeing."
        primaryText="Explore Articles"
        primaryLink="#blog-articles"
        secondaryText="Book an Appointment"
        secondaryLink="/appointment"
        showSecondary
        showStats={false}
        showFloatingCards={false}
        showBenefits={false}
      />

      <section className="rv3BlogIntro">
        <div className="rv3BlogContainer">
          <motion.div
            className="rv3BlogIntroContent"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="rv3BlogEyebrow">
              <BookOpen size={16} />
              LEARN AT YOUR OWN PACE
            </span>

            <h2>
              Better understanding.
              <span> Better everyday choices.</span>
            </h2>

            <p>
              Find approachable information about movement,
              pain management, rehabilitation and healthy
              routines. Use these articles as a starting point
              for informed conversations with your healthcare team.
            </p>
          </motion.div>

          <div className="rv3BlogTopicStrip">
            <div>
              <span className="rv3BlogTopicIcon">
                <Activity size={20} />
              </span>
              <span>Movement and mobility</span>
            </div>

            <div>
              <span className="rv3BlogTopicIcon">
                <HeartPulse size={20} />
              </span>
              <span>Recovery and rehabilitation</span>
            </div>

            <div>
              <span className="rv3BlogTopicIcon">
                <Bone size={20} />
              </span>
              <span>Pain and everyday comfort</span>
            </div>
          </div>
        </div>
      </section>

      {featuredArticle && (
        <section className="rv3BlogFeatured">
          <div className="rv3BlogContainer">
            <motion.div
              className="rv3BlogFeaturedCard"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
            >
              <div className="rv3BlogFeaturedImage">
                <img
                  src={featuredArticle.image}
                  alt="Person receiving physiotherapy care"
                  loading="lazy"
                />

                <span className="rv3BlogFeaturedBadge">
                  FEATURED ARTICLE
                </span>
              </div>

              <div className="rv3BlogFeaturedContent">
                <span className="rv3BlogCategoryLabel">
                  {featuredArticle.category}
                </span>

                <h2>{featuredArticle.title}</h2>

                <p>{featuredArticle.excerpt}</p>

                <div className="rv3BlogArticleMeta">
                  <span>
                    <Clock3 size={15} />
                    {featuredArticle.date}
                  </span>
                  <span>
                    <CalendarDays size={15} />
                    {featuredArticle.published}
                  </span>
                </div>

                <button
                  type="button"
                  className="rv3BlogReadButton"
                  onClick={() => openArticle(featuredArticle)}
                >
                  Read the article
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section
        className="rv3BlogArticles"
        id="blog-articles"
      >
        <div className="rv3BlogContainer">
          <motion.div
            className="rv3BlogSectionHeading"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <div>
              <span className="rv3BlogEyebrow">
                <BookOpen size={16} />
                THE LATEST INSIGHTS
              </span>

              <h2>
                Explore our
                <span> articles.</span>
              </h2>
            </div>

            <p>
              Browse topics that support your understanding
              of movement and recovery.
            </p>
          </motion.div>

          <div className="rv3BlogToolbar">
            <div
              className="rv3BlogCategoryFilters"
              aria-label="Filter articles by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category
                      ? "rv3BlogFilter isActive"
                      : "rv3BlogFilter"
                  }
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="rv3BlogSearch">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search articles"
                aria-label="Search articles"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </label>
          </div>

          <div className="rv3BlogResultsLine">
            <span>
              {filteredArticles.length}{" "}
              {filteredArticles.length === 1 ? "article" : "articles"}
            </span>
            <span>Practical insights for everyday life</span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="rv3BlogGrid">
              {filteredArticles.map((article, index) => {
                const Icon = article.icon;

                return (
                  <motion.article
                    className="rv3BlogCard"
                    key={article.id}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                    variants={fadeUp}
                    transition={{
                      delay: reduceMotion ? 0 : (index % 3) * 0.07,
                    }}
                  >
                    <button
                      type="button"
                      className="rv3BlogCardImage"
                      onClick={() => openArticle(article)}
                      aria-label={`Read ${article.title}`}
                    >
                      <img
                        src={article.image}
                        alt=""
                        loading="lazy"
                      />
                      <span className="rv3BlogCardImageIcon">
                        <Icon size={20} />
                      </span>
                    </button>

                    <div className="rv3BlogCardBody">
                      <div className="rv3BlogCardTopline">
                        <span className="rv3BlogCategoryLabel">
                          {article.category}
                        </span>
                        <span className="rv3BlogReadTime">
                          <Clock3 size={14} />
                          {article.date}
                        </span>
                      </div>

                      <h3>{article.title}</h3>

                      <p>{article.excerpt}</p>

                      <button
                        type="button"
                        className="rv3BlogCardLink"
                        onClick={() => openArticle(article)}
                      >
                        Read article
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="rv3BlogEmpty">
              <span>
                <Search size={23} />
              </span>
              <h3>No matching articles found</h3>
              <p>
                Try another search or choose a different category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All articles");
                }}
              >
                Show all articles
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="rv3BlogCareNote">
        <div className="rv3BlogContainer">
          <div className="rv3BlogCareNoteInner">
            <span className="rv3BlogCareNoteIcon">
              <CheckCircle2 size={22} />
            </span>
            <div>
              <h2>Information to help you make informed choices.</h2>
              <p>
                Articles are for general education and do not
                replace personalised medical advice, diagnosis
                or treatment.
              </p>
            </div>
            <Link
              to="/appointment"
              className="rv3BlogCareButton"
            >
              Talk to our team
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />

      {selectedArticle && (
        <div
          className="rv3BlogModalOverlay"
          onClick={closeArticle}
          role="presentation"
        >
          <section
            className="rv3BlogModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rv3BlogModalTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="rv3BlogModalHeader">
              <span className="rv3BlogCategoryLabel">
                {selectedArticle.category}
              </span>

              <button
                type="button"
                className="rv3BlogModalClose"
                onClick={closeArticle}
                aria-label="Close article"
              >
                <X size={21} />
              </button>
            </div>

            <div className="rv3BlogModalImage">
              <img
                src={selectedArticle.image}
                alt=""
              />
            </div>

            <div className="rv3BlogModalBody">
              <div className="rv3BlogArticleMeta">
                <span>
                  <Clock3 size={15} />
                  {selectedArticle.date}
                </span>
                <span>
                  <CalendarDays size={15} />
                  {selectedArticle.published}
                </span>
              </div>

              <h2 id="rv3BlogModalTitle">
                {selectedArticle.title}
              </h2>

              <p className="rv3BlogModalIntro">
                {selectedArticle.excerpt}
              </p>

              <div className="rv3BlogModalArticleText">
                {selectedArticle.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="rv3BlogModalFooter">
                <p>
                  Need advice for your individual situation?
                  Speak with a qualified healthcare professional.
                </p>
                <Link
                  to="/appointment"
                  className="rv3BlogReadButton"
                  onClick={closeArticle}
                >
                  Request an appointment
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Blog;
