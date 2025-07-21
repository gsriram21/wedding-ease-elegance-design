import React from 'react';
import Navigation from '../components/Navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const Help = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I place an order on Wedding Ease?",
      answer: "You can browse our curated collection of wedding products, add items to your cart, and proceed to checkout. If you're logged in, your preferences and past orders will help us recommend the perfect items for your wedding."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Google Pay, and UPI payments. All transactions are secured with industry-standard encryption."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days within India. Express shipping (2-3 days) and international shipping are also available. Custom orders may take 2-4 weeks depending on the vendor and product complexity."
    },
    {
      question: "Can I return or exchange items?",
      answer: "Yes! We offer a 30-day return policy for most items in original condition. Custom-made items and intimate apparel are generally non-returnable. Contact our customer service team to initiate a return."
    },
    {
      question: "Do you offer wedding planning services?",
      answer: "Absolutely! We offer comprehensive wedding planning packages including Royal, Elegant, and Majestic tiers. Each includes personal consultations, venue coordination, vendor management, and day-of coordination."
    },
    {
      question: "How do I book a consultation?",
      answer: "You can book a consultation through your account dashboard or by contacting us directly. First-time consultations are complimentary, and package holders get unlimited consultations."
    },
    {
      question: "Are your vendors verified?",
      answer: "Yes, all our vendors go through a rigorous verification process including business registration checks, quality assessments, and customer service evaluations. We only partner with trusted, high-quality vendors."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order status in your account dashboard under 'Order History'."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 120 countries worldwide. International shipping costs and delivery times vary by destination. Customs duties and taxes are the responsibility of the recipient."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team via email at support@weddingease.com, phone at +91 8000000000, or through the chat feature in your account dashboard. We're available 24/7 to help you."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="font-luxury-serif text-4xl md:text-5xl font-bold text-luxury-maroon mb-6">
              Help & Support Center
            </h1>
            <p className="font-luxury-sans text-xl text-luxury-maroon/70 max-w-2xl mx-auto">
              Find answers to frequently asked questions and get the support you need for your wedding journey.
            </p>
          </section>

          {/* Quick Contact */}
          <section className="mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-luxury-taupe/20 shadow-xl">
              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon text-center mb-6">
                Need Immediate Help?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-luxury-dusty-rose/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h3 className="font-luxury-sans font-semibold text-luxury-maroon mb-2">Phone Support</h3>
                  <p className="font-luxury-sans text-sm text-luxury-maroon/70 mb-3">24/7 customer service</p>
                  <a href="tel:+918000000000" className="text-luxury-dusty-rose hover:text-luxury-maroon transition-colors">
                    +91 8000000000
                  </a>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-luxury-dusty-rose/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <h3 className="font-luxury-sans font-semibold text-luxury-maroon mb-2">Email Support</h3>
                  <p className="font-luxury-sans text-sm text-luxury-maroon/70 mb-3">Response within 24 hours</p>
                  <a href="mailto:support@weddingease.com" className="text-luxury-dusty-rose hover:text-luxury-maroon transition-colors">
                    support@weddingease.com
                  </a>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-luxury-dusty-rose/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="font-luxury-sans font-semibold text-luxury-maroon mb-2">Live Chat</h3>
                  <p className="font-luxury-sans text-sm text-luxury-maroon/70 mb-3">Available in your account</p>
                  <a href="/account?section=enquiries" className="text-luxury-dusty-rose hover:text-luxury-maroon transition-colors">
                    Start Chat
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl border border-luxury-taupe/20 shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-luxury-soft-pink/30 transition-colors duration-300"
                  >
                    <h3 className="font-luxury-sans font-semibold text-luxury-maroon">
                      {faq.question}
                    </h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-luxury-maroon flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-luxury-maroon flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="font-luxury-sans text-luxury-maroon/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Additional Help */}
          <section className="mt-16 text-center">
            <div className="bg-luxury-maroon text-white rounded-2xl p-8">
              <h3 className="font-luxury-serif text-2xl font-bold mb-4">
                Still Need Help?
              </h3>
              <p className="font-luxury-sans text-lg mb-6 opacity-90">
                Our dedicated support team is here to make your wedding planning experience seamless
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact"
                  className="bg-white text-luxury-maroon px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium inline-flex items-center justify-center"
                >
                  Contact Us
                </a>
                <a 
                  href="/vendor/support"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-luxury-maroon transition-colors duration-300 font-medium inline-flex items-center justify-center"
                >
                  Vendor Support
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Help; 