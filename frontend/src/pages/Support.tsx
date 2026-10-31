import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiMessageCircle } from "react-icons/fi";
import Seo from "../components/Seo";
import { contactDetails, socials } from "../constants/siteData";
import "../styles/support.css";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse the menu, add your choices to the cart, and follow the checkout steps to submit your order.",
  },
  {
    question: "Which payment methods are available?",
    answer:
      "Available payment options will be shown during checkout. Contact us if you need help before placing an order.",
  },
  {
    question: "How does delivery work?",
    answer:
      "Delivery availability and the relevant details are confirmed when you place your order.",
  },
  {
    question: "Can I change or cancel an order?",
    answer:
      "Contact us as soon as possible after submitting an order. We will let you know whether a change can still be made.",
  },
  {
    question: "How can I ask about allergens?",
    answer:
      "Please contact us before ordering with any allergy questions. Ask us to confirm ingredients and preparation details for your chosen items.",
  },
  {
    question: "How can I contact Burger Taste?",
    answer:
      "Message us on WhatsApp or use the contact details listed below. Details marked [TO FILL] will be updated when available.",
  },
];

const whatsapp = socials.find(({ name }) => name === "WhatsApp");

function Support() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <main className="support-page">
      <Seo
        title="Support"
        description="Find answers to common Burger Taste ordering questions and get in touch with our team."
        image="/og-share-image.jpg"
        path="/support"
      />
      <section className="support-hero container">
        <p className="support-eyebrow">We’re here to help</p>
        <h1>How can we help?</h1>
        <p>Answers to common questions, with a direct way to reach us.</p>
      </section>

      <section className="support-content container" aria-labelledby="faq-heading">
        <div className="support-faq">
          <h2 id="faq-heading">Frequently asked questions</h2>
          <div className="faq-list">
            {faqs.map(({ question, answer }, index) => {
              const isOpen = openQuestion === index;
              const answerId = `faq-answer-${index}`;

              return (
                <article className="faq-item" key={question}>
                  <h3>
                    <button
                      type="button"
                      className="faq-question"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() =>
                        setOpenQuestion(isOpen ? null : index)
                      }
                    >
                      {question}
                      <motion.span
                        animate={
                          reduceMotion ? undefined : { rotate: isOpen ? 180 : 0 }
                        }
                        aria-hidden="true"
                      >
                        <FiChevronDown />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        className="faq-answer"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          reduceMotion
                            ? undefined
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: reduceMotion ? 0 : 0.2 }}
                      >
                        <p>{answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="support-contact-card">
          <FiMessageCircle className="support-contact-icon" aria-hidden="true" />
          <h2>Still need help?</h2>
          <p>Send us a message and we’ll be glad to assist.</p>
          {whatsapp && (
            <a
              className="support-whatsapp"
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
          )}
          <dl>
            <div>
              <dt>Phone</dt>
              <dd>{contactDetails.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{contactDetails.email}</dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{contactDetails.openingHours}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section
        id="terms"
        className="support-legal container"
        aria-labelledby="terms-heading"
      >
        <h2 id="terms-heading">Terms</h2>
        <p>
          Terms of service will be published here. Please contact Burger Taste
          if you need information before then.
        </p>
      </section>

      <section
        id="privacy"
        className="support-legal container"
        aria-labelledby="privacy-heading"
      >
        <h2 id="privacy-heading">Privacy</h2>
        <p>
          Our privacy information will be published here. Please contact Burger
          Taste with questions about your information.
        </p>
      </section>
    </main>
  );
}

export default Support;
