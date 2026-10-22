
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock3,
  Search,
  HeartPulse,
  X,
} from "lucide-react";

import HeroSection from "../../components/HeroSection/HeroSection";
import CTASection from "../../components/CTASection/CTASection";
import resourcesData from "./resourcesData";
import "./Resources.css";

const Resources = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const reduceMotion = useReducedMotion();

  const categories = useMemo(
    () => [
      "All",
      ...new Set(resourcesData.map((item) => item.category)),
    ],
    []
  );

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();

    return resourcesData.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const searchableText =
        `${item.title} ${item.category} ${item.excerpt}`.toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [search, category]);

  const featured = resourcesData[0];

  return (
    <main className="rv3ResourcesPage">
      <HeroSection
        eyebrow="THE REHABICS RESOURCE LIBRARY"
        title="Knowledge for"
        highlight="better movement."
        secondLine="Confidence for everyday life."
        description="Explore practical guides on physiotherapy, mobility, posture and recovery. Learn about your body and take informed steps towards moving with confidence."
        primaryText="Explore Resources"
        primaryLink="#resource-library"
        secondaryText="Book an Appointment"
        secondaryLink="/appointment"
        showSecondary={true}
        showStats={false}
        showFloatingCards={false}
        showBenefits={false}
      />

      <section className="rv3ResourcesIntro">
        <div className="rv3ResourcesContainer">
          <div className="rv3ResourcesIntroCard">
            <span className="rv3ResourcesIntroIcon">
              <BookOpen size={25} />
            </span>

            <div>
              <span className="rv3ResourcesEyebrow">
                LEARN AT YOUR OWN PACE
              </span>
              <h2>Small steps. Better understanding.</h2>
              <p>
                Discover practical information that helps you
                understand movement, wellbeing and recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="rv3ResourcesLibrary"
        id="resource-library"
      >
        <div className="rv3ResourcesContainer">
          <div className="rv3ResourcesSectionHeading">
            <div>
              <span className="rv3ResourcesEyebrow">
                EXPLORE THE LIBRARY
              </span>
              <h2>
                Your guide to <span>moving better.</span>
              </h2>
              <p>
                Find useful guides for your everyday movement.
              </p>
            </div>

            <span className="rv3ResourcesCount">
              <BookOpen size={18} />
              {filteredResources.length} articles
            </span>
          </div>

          <div className="rv3ResourcesToolbar">
            <label className="rv3ResourcesSearch">
              <Search size={19} />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search articles and topics"
                aria-label="Search resources"
              />

              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  <X size={17} />
                </button>
              )}
            </label>

            <div className="rv3ResourcesFilters">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    category === item
                      ? "rv3ResourcesFilter active"
                      : "rv3ResourcesFilter"
                  }
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {featured &&
            category === "All" &&
            !search.trim() && (
              <article className="rv3ResourcesFeatured">
                <Link
                  to={`/resources/${featured.slug}`}
                  className="rv3ResourcesFeaturedImage"
                >
                  <img src={featured.image} alt="" />
                  <span className="rv3ResourcesImageTag">
                    {featured.category}
                  </span>
                </Link>

                <div className="rv3ResourcesFeaturedContent">
                  <span className="rv3ResourcesEyebrow">
                    FEATURED GUIDE
                  </span>

                  <div className="rv3ResourcesCardMeta">
                    <span>
                      <Clock3 size={14} />
                      {featured.readTime}
                    </span>
                    <span>{featured.date}</span>
                  </div>

                  <h3>
                    <Link to={`/resources/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h3>

                  <p>{featured.excerpt}</p>

                  <Link
                    to={`/resources/${featured.slug}`}
                    className="rv3ResourcesReadLink"
                  >
                    Read the Guide
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </article>
            )}

          {filteredResources.length > 0 ? (
            <div className="rv3ResourcesGrid">
              {filteredResources
                .filter(
                  (item) =>
                    !(
                      item.slug === featured?.slug &&
                      category === "All" &&
                      !search.trim()
                    )
                )
                .map((item, index) => (
                  <motion.article
                    key={item.slug}
                    className="rv3ResourcesCard"
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.4,
                      delay: reduceMotion ? 0 : index * 0.06,
                    }}
                  >
                    <Link
                      to={`/resources/${item.slug}`}
                      className="rv3ResourcesCardImage"
                      aria-label={`Read ${item.title}`}
                    >
                      <img src={item.image} alt="" loading="lazy" />

                      <span className="rv3ResourcesImageTag">
                        {item.category}
                      </span>

                      <span className="rv3ResourcesImageArrow">
                        <ArrowUpRight size={19} />
                      </span>
                    </Link>

                    <div className="rv3ResourcesCardBody">
                      <div className="rv3ResourcesCardMeta">
                        <span>
                          <Clock3 size={14} />
                          {item.readTime}
                        </span>
                        <span>{item.date}</span>
                      </div>

                      <h3>
                        <Link to={`/resources/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>

                      <p>{item.excerpt}</p>

                      <div className="rv3ResourcesCardFooter">
                        <Link
                          to={`/resources/${item.slug}`}
                          className="rv3ResourcesReadLink"
                        >
                          Read Article
                          <ArrowRight size={17} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
            </div>
          ) : (
            <div className="rv3ResourcesEmpty">
              <Search size={27} />
              <h3>No matching resources found</h3>
              <p>Try another search or category.</p>

              <button
                type="button"
                className="rv3ResourcesReset"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                View All Resources
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="rv3ResourcesSupport">
        <div className="rv3ResourcesContainer">
          <div className="rv3ResourcesSupportCard">
            <span className="rv3ResourcesSupportIcon">
              <HeartPulse size={25} />
            </span>

            <div className="rv3ResourcesSupportCopy">
              <span className="rv3ResourcesEyebrow">
                PERSONAL GUIDANCE MATTERS
              </span>
              <h2>Every recovery journey is different.</h2>
              <p>
                Speak with our team about your movement goals
                and the care options that may suit you.
              </p>
            </div>

            <Link
              to="/appointment"
              className="rv3ResourcesSupportButton"
            >
              Talk to Our Team
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="YOUR NEXT STEP"
        title="Move forward"
        highlight="with confidence."
        description="Have questions about your movement or recovery? Our team can help you explore the next step that fits your needs."
        primaryText="Book an Appointment"
        primaryLink="/appointment"
        secondaryText="Explore Services"
        secondaryLink="/services"
        showSecondary={true}
        note="Personalised care. A stronger you."
        showNote={true}
        showVisual={true}
        showFloatingCards={true}
        className="rv3ResourcesCTA"
      />
    </main>
  );
};

export default Resources;
