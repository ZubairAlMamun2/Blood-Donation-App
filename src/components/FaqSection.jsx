import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Who can donate blood?",
      answer: "Anyone in good health, aged 18-65, and meeting the weight criteria can donate blood.",
    },
    {
      question: "Is blood donation safe?",
      answer: "Yes, blood donation is completely safe. All equipment used is sterile and disposed of after use.",
    },
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 8 weeks and platelets every 2 weeks, depending on your health condition.",
    },
    {
      question: "What should I do before donating blood?",
      answer: "Eat a healthy meal, drink plenty of fluids, and avoid alcohol 24 hours before donating.",
    },
    {
      question: "Where can I find a blood donation center?",
      answer: "You can use our platform to locate nearby blood donation camps and centers.",
    },
  ];

  return (
    <div className="container mx-auto md:px-4 mt-8 mb-8">
      <section className="bg-white dark:bg-gray-900 py-12 rounded-2xl my-2 md:px-4 shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            Find answers to common questions about blood donation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 text-left text-lg font-semibold text-gray-900 dark:text-white"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-red-500">{openIndex === index ? "▲" : "▼"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
