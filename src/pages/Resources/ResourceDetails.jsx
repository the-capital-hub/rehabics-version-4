
import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  Share2,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";

import CTASection from "../../components/CTASection/CTASection";
import resourcesData from "./resourcesData";
import "./ResourceDetails.css";

const ResourceDetails = () => {
  const { slug } = useParams();
  const reduceMotion = useReducedMotion();

  const article = resourcesData.find(
    (item) => item.slug === slug
  );

  const relatedArticles = resourcesData
    .filter(
      (item) =>
        item.slug !== slug &&
        item.category === article?.category
    )
    .concat(
      resourcesData.filter(
        (item) =>
          item.slug !== slug &&
          item.category !== article?.category
      )
    )
    .slice(0, 3);

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

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          window.location.href
        );
        alert("Article link copied!");
      } else {
        window.prompt(
          "Copy this article link:",
          window.location.href
        );
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        window.prompt(
          "Copy this article link:",
          window.location.href
        );
      }
    }
  };

  if (!article) {
    return (
      <main className="rv3ResourceDetailNotFound">
        <div className="rv3ResourceDetailNotFoundIcon">
          <BookOpen size={30} />
        </div>

        <span className="rv3ResourceDetailEyebrow">
          RESOURCE NOT FOUND
        </span>

        <h1>This article is unavailable</h1>

        <p>
          The resource may have moved or the link may be
          incorrect. Explore our other physiotherapy guides.
        </p>

        <Link
          to="/resources"
          className="rv3ResourceDetailPrimaryButton"
        >
          <ArrowLeft size={17} />
          Back to resources
        </Link>
      </main>
    );
  }

  return (
    <main className="rv3ResourceDetailPage">
      <section className="rv3ResourceDetailHero">
        <div className="rv3ResourceDetailHeroGlow" />

        <div className="rv3ResourceDetailContainer">
          <motion.div
            className="rv3ResourceDetailBreadcrumb"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
          >
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/resources">Resources</Link>
            <span>/</span>
            <span className="rv3ResourceDetailCurrent">
              Article
            </span>
          </motion.div>

          <motion.div
            className="rv3ResourceDetailHeroContent"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
          >
            <span className="rv3ResourceDetailCategory">
              <BookOpen size={14} />
              {article.category}
            </span>

            <h1>{article.title}</h1>

            <p className="rv3ResourceDetailExcerpt">
              {article.excerpt}
            </p>

            <div className="rv3ResourceDetailMeta">
              <span>
                <CalendarDays size={16} />
                {article.date}
              </span>

              <span>
                <Clock3 size={16} />
                {article.readTime}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="rv3ResourceDetailCover"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, scale: 0.98 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
            }}
          >
            <img
              src={article.image}
              alt={article.title}
            />

            <div className="rv3ResourceDetailCoverBadge">
              <ShieldCheck size={18} />
              <span>Move better. Feel better.</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="rv3ResourceDetailBody">
        <div className="rv3ResourceDetailContainer">
          <div className="rv3ResourceDetailLayout">
            <article className="rv3ResourceDetailArticle">
              <motion.div
                className="rv3ResourceDetailIntro"
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
              >
                <span className="rv3ResourceDetailSectionLabel">
                  INTRODUCTION
                </span>

                <p>{article.intro}</p>
              </motion.div>

              <div className="rv3ResourceDetailSections">
                {article.sections?.map((section, index) => (
                  <motion.section
                    className="rv3ResourceDetailSection"
                    key={`${section.heading}-${index}`}
                    initial={
                      reduceMotion ? false : "hidden"
                    }
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.12,
                    }}
                    variants={fadeUp}
                  >
                    <div className="rv3ResourceDetailSectionNumber">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="rv3ResourceDetailSectionContent">
                      <h2>{section.heading}</h2>
                      <p>{section.content}</p>

                      {section.points?.length > 0 && (
                        <ul className="rv3ResourceDetailPoints">
                          {section.points.map(
                            (point, pointIndex) => (
                              <li key={pointIndex}>
                                <CheckCircle2 size={17} />
                                <span>{point}</span>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </motion.section>
                ))}
              </div>

              {article.takeaway && (
                <motion.div
                  className="rv3ResourceDetailTakeaway"
                  initial={reduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                >
                  <div className="rv3ResourceDetailTakeawayIcon">
                    <Stethoscope size={23} />
                  </div>

                  <div>
                    <span>KEY TAKEAWAY</span>
                    <h2>What to remember</h2>
                    <p>{article.takeaway}</p>
                  </div>
                </motion.div>
              )}

              <div className="rv3ResourceDetailDisclaimer">
                <ShieldCheck size={19} />

                <p>
                  This article is for general educational
                  purposes and is not a substitute for
                  individual medical advice. Consult a
                  qualified healthcare professional for
                  personalised guidance.
                </p>
              </div>

              <div className="rv3ResourceDetailArticleFooter">
                <Link
                  to="/resources"
                  className="rv3ResourceDetailBackLink"
                >
                  <ArrowLeft size={17} />
                  All resources
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  className="rv3ResourceDetailShareButton"
                >
                  <Share2 size={16} />
                  Share article
                </button>
              </div>
            </article>

            <aside className="rv3ResourceDetailSidebar">
              <div className="rv3ResourceDetailSidebarCard">
                <span className="rv3ResourceDetailSidebarIcon">
                  <Stethoscope size={22} />
                </span>

                <span className="rv3ResourceDetailSidebarEyebrow">
                  YOUR WELLNESS JOURNEY
                </span>

                <h3>Small steps. Better movement.</h3>

                <p>
                  Get guidance to help you understand your
                  body and build healthier movement habits.
                </p>

                <Link
                  to="/services"
                  className="rv3ResourceDetailSidebarLink"
                >
                  Explore our services
                  <ArrowUpRight size={17} />
                </Link>
              </div>

              <div className="rv3ResourceDetailSidebarNote">
                <ShieldCheck size={20} />

                <div>
                  <h4>Care that puts you first</h4>
                  <p>
                    Your movement goals deserve guidance
                    tailored to your individual needs.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="rv3ResourceDetailRelated">
          <div className="rv3ResourceDetailContainer">
            <div className="rv3ResourceDetailRelatedHeader">
              <div>
                <span className="rv3ResourceDetailSectionLabel">
                  KEEP LEARNING
                </span>

                <h2>Continue exploring</h2>

                <p>
                  Discover more practical guides for
                  healthier movement.
                </p>
              </div>

              <Link
                to="/resources"
                className="rv3ResourceDetailViewAll"
              >
                View all resources
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="rv3ResourceDetailRelatedGrid">
              {relatedArticles.map((item, index) => (
                <motion.div
                  className="rv3ResourceDetailRelatedCard"
                  key={item.slug}
                  initial={
                    reduceMotion ? false : "hidden"
                  }
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeUp}
                  transition={{
                    delay: reduceMotion ? 0 : index * 0.08,
                  }}
                >
                  <Link
                    to={`/resources/${item.slug}`}
                    className="rv3ResourceDetailRelatedImage"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />

                    <span>{item.category}</span>
                  </Link>

                  <div className="rv3ResourceDetailRelatedContent">
                    <div className="rv3ResourceDetailRelatedMeta">
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

                    <Link
                      to={`/resources/${item.slug}`}
                      className="rv3ResourceDetailReadLink"
                    >
                      Read article
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </main>
  );
};

export default ResourceDetails;
