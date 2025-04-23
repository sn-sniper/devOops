import { useState } from "react";
import { motion } from "framer-motion";

// FAQ Item component for individual questions
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-800 py-6">
      <button
        className="flex w-full justify-between items-center text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-xl md:text-2xl font-medium text-white">{question}</h3>
        <span className="ml-4 flex-shrink-0">
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={`mt-2 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-300 pt-4">{answer}</p>
      </div>
    </div>
  );
};

export function FAQSection() {
  // State to track which FAQ item is open
  const [openIndex, setOpenIndex] = useState(0);

  // FAQ data
  const faqs = [
    {
      question: "What services does devOops offer?",
      answer: "devOops specializes in UI/UX design, mobile and desktop application development, custom software solutions, and secure web development. We create seamless digital experiences with cutting-edge technologies tailored to each client's unique needs."
    },
    {
      question: "How long does a typical project take to complete?",
      answer: "Project timelines vary based on complexity and scope. A simple website might take 2-3 weeks, while complex applications can take 2-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific requirements and project goals."
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer: "Absolutely! We provide comprehensive maintenance and support packages to ensure your digital products continue to function smoothly. Our support includes bug fixes, security updates, performance optimization, and feature enhancements based on your evolving needs."
    },
    {
      question: "What technologies does devOops work with?",
      answer: "We work with a wide range of modern technologies including React, Vue, Angular for frontend; Node.js, Python, PHP for backend; React Native and Flutter for mobile apps; and AWS, Google Cloud, and Azure for cloud services. We select the most appropriate technology stack based on your project requirements."
    },
    {
      question: "How do you handle project communication and updates?",
      answer: "We maintain transparent communication through weekly progress reports, dedicated Slack channels, and regular video meetings. Our agile approach ensures you're always informed about project status, with opportunities to provide feedback throughout the development process."
    },
    {
      question: "Can you work with clients remotely?",
      answer: "Yes, we work with clients globally! Our remote collaboration process is streamlined through project management tools, video conferences, and regular updates. Distance is never a barrier to creating exceptional digital products with our team."
    }
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="faq" className="py-20 bg-devoops-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Frequently Asked <span className="text-devoops-blue">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about our services, process, and expertise.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <div className="space-y-2">
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              </motion.div>
            ))}
          </div>
          <div className="space-y-2">
            {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => {
              const adjustedIndex = index + Math.ceil(faqs.length / 2);
              return (
                <motion.div key={adjustedIndex} variants={itemVariants}>
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === adjustedIndex}
                    onClick={() => setOpenIndex(openIndex === adjustedIndex ? -1 : adjustedIndex)}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xl text-gray-300 mb-6">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-devoops-blue hover:bg-blue-700 transition-colors"
          >
            Contact Us
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}