"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate is your ATS scoring?",
      answer: "Our ATS scoring system is trained on real data from major applicant tracking systems used by Fortune 500 companies. We maintain a 95% accuracy rate by continuously updating our algorithms based on the latest ATS requirements."
    },
    {
      question: "What file formats do you support?",
      answer: "We support all major resume formats including PDF, DOC, DOCX, and TXT files. For best results, we recommend uploading a PDF version of your resume as it maintains formatting consistency."
    },
    {
      question: "How is this different from other resume checkers?",
      answer: "Unlike basic grammar checkers, IntelliResume provides context-aware analysis that understands industry nuances, role requirements, and career progression. We offer personalized career roadmaps, not just generic feedback."
    },
    {
      question: "Can I analyze resumes for different industries?",
      answer: "Absolutely! Our AI is trained on resume data across 50+ industries including tech, finance, healthcare, marketing, and more. We provide industry-specific recommendations and keyword optimization."
    },
    {
      question: "How long does the analysis take?",
      answer: "Our basic analysis takes about 2 minutes to complete. For comprehensive Professional and Career Accelerator analyses, you'll receive results within 5-10 minutes depending on the depth of review requested."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take data security seriously. All uploads are encrypted, and we never share your personal information with third parties. You can delete your data at any time, and we automatically purge files after 30 days unless you're a paying subscriber."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied with the quality of our analysis or recommendations, contact us for a full refund, no questions asked."
    },
    {
      question: "Can I get help with LinkedIn optimization too?",
      answer: "Yes! Our Career Accelerator plan includes LinkedIn profile optimization. We'll analyze your profile and provide specific recommendations to improve your professional online presence and attract recruiters."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Everything you need to know about IntelliResume
          </p>
        </motion.div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <AccordionItem 
                value={`item-${index}`} 
                className="bg-white rounded-lg mb-4 border border-gray-200 px-6 hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-lg text-gray-900 hover:text-blue-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-lg pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;