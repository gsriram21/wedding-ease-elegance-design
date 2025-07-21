import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { ChevronRight, Check, Star, Users, TrendingUp, Shield, Heart, Package, Truck, HeadphonesIcon } from 'lucide-react';

const VendorApply = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    website: '',
    experience: '',
    products: '',
    monthlyVolume: '',
    businessRegistration: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Vendor application submitted:', formData);
    // Show success message or redirect
    alert('Thank you for your application! We will review it and get back to you within 2-3 business days.');
  };

  const benefits = [
    {
      icon: Users,
      title: "Access to Premium Customers",
      description: "Reach thousands of couples planning their dream weddings worldwide"
    },
    {
      icon: TrendingUp,
      title: "Boost Your Sales",
      description: "Leverage our platform to increase your revenue by up to 300%"
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Protected transactions and verified customer base for peace of mind"
    },
    {
      icon: Heart,
      title: "Brand Building",
      description: "Enhance your brand visibility in the luxury wedding market"
    },
    {
      icon: Package,
      title: "Full Support",
      description: "Dedicated vendor success team to help you grow your business"
    },
    {
      icon: Truck,
      title: "Fulfillment Services",
      description: "Optional fulfillment and logistics support to streamline operations"
    }
  ];

  const requirements = [
    "Registered business with valid tax documentation",
    "Minimum 2 years of experience in wedding industry",
    "High-quality product catalogs with professional photography",
    "Compliance with Wedding Ease quality and delivery standards",
    "Customer service capabilities and return policy",
    "Ability to fulfill orders within specified timeframes"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Hero Section */}
          <section className="text-center mb-20">
            <h1 className="font-luxury-serif text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-maroon mb-6">
              Become a Wedding Ease Vendor
            </h1>
            <p className="font-luxury-sans text-xl text-luxury-maroon/70 mb-8 max-w-3xl mx-auto">
              Join thousands of successful vendors who are growing their wedding businesses with Wedding Ease. 
              Reach premium customers, increase sales, and build your brand in the luxury wedding market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-luxury-maroon hover:bg-luxury-burgundy text-white px-8 py-3 text-lg"
              >
                Apply Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-luxury-maroon text-luxury-maroon hover:bg-luxury-maroon hover:text-white px-8 py-3 text-lg"
              >
                Learn More
              </Button>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-luxury-taupe/20 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-2">5,000+</div>
                  <div className="font-luxury-sans text-sm text-luxury-maroon/70">Active Vendors</div>
                </div>
                <div>
                  <div className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-2">50,000+</div>
                  <div className="font-luxury-sans text-sm text-luxury-maroon/70">Happy Customers</div>
                </div>
                <div>
                  <div className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-2">₹500Cr+</div>
                  <div className="font-luxury-sans text-sm text-luxury-maroon/70">Vendor Revenue</div>
                </div>
                <div>
                  <div className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-2">120+</div>
                  <div className="font-luxury-sans text-sm text-luxury-maroon/70">Countries Served</div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="mb-20">
            <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon text-center mb-4">
              Why Choose Wedding Ease?
            </h2>
            <p className="font-luxury-sans text-lg text-luxury-maroon/70 text-center mb-12 max-w-2xl mx-auto">
              Partner with us and unlock the full potential of your wedding business
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-luxury-taupe/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-luxury-dusty-rose/20 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-luxury-maroon" />
                  </div>
                  <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-3">
                    {benefit.title}
                  </h3>
                  <p className="font-luxury-sans text-luxury-maroon/70">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-luxury-taupe/20 shadow-xl">
              <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon text-center mb-8">
                Vendor Requirements
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="font-luxury-sans text-luxury-maroon/80">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section id="application-form" className="mb-20">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-luxury-taupe/20 shadow-xl">
              <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon text-center mb-8">
                Start Your Application
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                      placeholder="Your business/company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                      Business Type *
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                    >
                      <option value="">Select business type</option>
                      <option value="wedding-attire">Wedding Attire & Fashion</option>
                      <option value="jewelry">Jewelry & Accessories</option>
                      <option value="decor">Wedding Decor & Flowers</option>
                      <option value="photography">Photography & Videography</option>
                      <option value="catering">Catering & Food Services</option>
                      <option value="venues">Venues & Locations</option>
                      <option value="planning">Wedding Planning Services</option>
                      <option value="transportation">Transportation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                    >
                      <option value="">Select experience</option>
                      <option value="2-5">2-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                      Monthly Sales Volume
                    </label>
                    <select
                      name="monthlyVolume"
                      value={formData.monthlyVolume}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                    >
                      <option value="">Select volume</option>
                      <option value="under-1l">Under ₹1 Lakh</option>
                      <option value="1l-5l">₹1-5 Lakhs</option>
                      <option value="5l-20l">₹5-20 Lakhs</option>
                      <option value="20l+">₹20 Lakhs+</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                    Products/Services Description *
                  </label>
                  <textarea
                    name="products"
                    value={formData.products}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                    placeholder="Describe your products or services in detail..."
                  />
                </div>
                
                <div>
                  <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                    Business Registration Number
                  </label>
                  <input
                    type="text"
                    name="businessRegistration"
                    value={formData.businessRegistration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                    placeholder="GST/Registration number"
                  />
                </div>
                
                <div>
                  <label className="block font-luxury-sans text-sm font-semibold text-luxury-maroon mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-300"
                    placeholder="Tell us why you'd like to partner with Wedding Ease..."
                  />
                </div>
                
                <div className="text-center pt-6">
                  <Button 
                    type="submit"
                    className="bg-luxury-maroon hover:bg-luxury-burgundy text-white px-12 py-3 text-lg"
                  >
                    Submit Application
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  <p className="font-luxury-sans text-sm text-luxury-maroon/60 mt-4">
                    We'll review your application and get back to you within 2-3 business days.
                  </p>
                </div>
              </form>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <div className="bg-luxury-maroon text-white rounded-2xl p-8">
              <h3 className="font-luxury-serif text-2xl font-bold mb-4">
                Questions? We're Here to Help
              </h3>
              <p className="font-luxury-sans text-lg mb-6 opacity-90">
                Our vendor success team is ready to support your journey with Wedding Ease
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:vendors@weddingease.com"
                  className="bg-white text-luxury-maroon px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium inline-flex items-center justify-center"
                >
                  <HeadphonesIcon className="w-5 h-5 mr-2" />
                  Email Support
                </a>
                <a 
                  href="tel:+918000000000"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-luxury-maroon transition-colors duration-300 font-medium inline-flex items-center justify-center"
                >
                  Call +91 8000000000
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default VendorApply; 