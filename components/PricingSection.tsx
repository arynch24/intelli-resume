"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const PricingSection = () => {
  const plans = [
    {
      name: "Free Analysis",
      price: "$0",
      period: "one-time",
      description: "Perfect for getting started",
      features: [
        "Basic ATS score analysis",
        "Top 3 improvement suggestions", 
        "General formatting tips",
        "PDF download of results"
      ],
      cta: "Get Free Analysis",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "Everything you need to optimize your resume",
      features: [
        "Unlimited resume analyses",
        "Detailed ATS optimization",
        "Industry-specific recommendations",
        "Skills gap analysis",
        "Course suggestions",
        "Job match scoring",
        "Priority email support"
      ],
      cta: "Start 7-Day Free Trial",
      popular: true
    },
    {
      name: "Career Accelerator",
      price: "$79",
      period: "per month", 
      description: "Complete career transformation package",
      features: [
        "Everything in Professional",
        "Personal career strategist",
        "1-on-1 resume review calls",
        "Interview preparation",
        "LinkedIn profile optimization",
        "Salary negotiation guidance",
        "Priority phone support"
      ],
      cta: "Accelerate My Career",
      popular: false
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Career Growth Plan
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Transparent pricing that scales with your ambitions
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className={`relative p-8 h-full ${
                plan.popular ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-200'
              } bg-white`}>
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Most Popular
                  </motion.div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className={`w-full ${plan.popular 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600">
            All plans include a 30-day money-back guarantee. No questions asked.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;