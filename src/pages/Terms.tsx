import React from 'react';
import Navigation from '../components/Navigation';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="font-luxury-serif text-4xl md:text-5xl font-bold text-luxury-maroon mb-6">
              Terms of Service
            </h1>
            <p className="font-luxury-sans text-lg text-luxury-maroon/70 max-w-2xl mx-auto">
              Last updated: January 2024
            </p>
          </section>

          {/* Terms Content */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-luxury-taupe/20 shadow-xl">
            <div className="prose prose-lg max-w-none">
              
              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                By accessing and using Wedding Ease services, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                2. Services Description
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                Wedding Ease provides luxury wedding planning services, e-commerce marketplace for wedding products, 
                vendor coordination, and consultation services. We connect couples with verified vendors and curated wedding products.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                3. User Account and Registration
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                To access certain services, you must register for an account. You are responsible for maintaining the confidentiality 
                of your account credentials and for all activities that occur under your account. You agree to provide accurate, 
                current, and complete information during the registration process.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                4. Payment Terms
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                Payment for services and products must be made in advance. We accept major credit cards, PayPal, and UPI. 
                All prices are in Indian Rupees unless otherwise specified. Refund policies are outlined separately for each service category.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                5. Cancellation and Refund Policy
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                Cancellation policies vary by service type. Planning packages have specific cancellation terms outlined in your agreement. 
                Product returns are accepted within 30 days for eligible items. Custom-made items are generally non-returnable.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                6. Vendor Relationships
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                Wedding Ease acts as a facilitator between customers and vendors. While we verify our vendor partners, 
                we are not directly responsible for vendor performance. Any disputes with vendors should be reported to us 
                for mediation and resolution.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                7. Intellectual Property
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                All content on Wedding Ease, including text, graphics, logos, images, and software, is our property or that of our 
                licensors and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or 
                create derivative works without our written permission.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                8. Privacy and Data Protection
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your 
                personal information. By using our services, you consent to our privacy practices as outlined in our Privacy Policy.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                9. Limitation of Liability
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                Wedding Ease shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, 
                or other intangible losses resulting from your use of our services.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                10. Force Majeure
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, 
                including but not limited to acts of God, natural disasters, war, terrorism, or government actions.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                11. Governing Law
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these 
                terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                12. Changes to Terms
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                We reserve the right to modify these terms at any time. We will notify users of significant changes via email or 
                through our website. Your continued use of our services after such modifications constitutes acceptance of the updated terms.
              </p>

              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                13. Contact Information
              </h2>
              <p className="font-luxury-sans text-luxury-maroon/80 mb-6">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-luxury-soft-pink/50 rounded-xl p-6 mb-6">
                <p className="font-luxury-sans text-luxury-maroon/80 mb-2">
                  <strong>Email:</strong> legal@weddingease.com
                </p>
                <p className="font-luxury-sans text-luxury-maroon/80 mb-2">
                  <strong>Phone:</strong> +91 8000000000
                </p>
                <p className="font-luxury-sans text-luxury-maroon/80">
                  <strong>Address:</strong> Wedding Ease Pvt. Ltd., Mumbai, Maharashtra, India
                </p>
              </div>

            </div>
          </section>

          {/* Footer CTA */}
          <section className="mt-16 text-center">
            <div className="bg-luxury-maroon text-white rounded-2xl p-8">
              <h3 className="font-luxury-serif text-2xl font-bold mb-4">
                Questions About Our Terms?
              </h3>
              <p className="font-luxury-sans text-lg mb-6 opacity-90">
                Our legal team is available to clarify any questions about our terms of service
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:legal@weddingease.com"
                  className="bg-white text-luxury-maroon px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium inline-flex items-center justify-center"
                >
                  Contact Legal Team
                </a>
                <a 
                  href="/help"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-luxury-maroon transition-colors duration-300 font-medium inline-flex items-center justify-center"
                >
                  General Support
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms; 