import Navigation from "../components/Navigation";
import { Heart, Star, Users, Award, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthNavigation } from "../hooks/useAuthNavigation";

const FounderStory = () => {
  const navigate = useNavigate();
  const { navigateToBooking } = useAuthNavigation();

  const milestones = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Started with a simple vision: making luxury weddings accessible to every couple"
    },
    {
      year: "2019", 
      title: "First 100 Weddings",
      description: "Celebrated our first major milestone with couples across India"
    },
    {
      year: "2021",
      title: "Digital Innovation",
      description: "Launched our AI-powered wedding planning platform"
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Awarded 'Best Luxury Wedding Planner' by WeddingWire"
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Now serving couples across multiple countries"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Love First",
      description: "Every decision we make is rooted in celebrating the unique love story of each couple"
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We pursue perfection in every detail, from the first consultation to the last dance"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building lasting relationships with couples, vendors, and partners worldwide"
    },
    {
      icon: Award,
      title: "Innovation",
      description: "Continuously evolving to bring the latest trends and technology to your special day"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-soft-pink to-white">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="luxury-container">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-luxury-maroon hover:text-luxury-dusty-rose transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-luxury-sans font-medium">Back to Home</span>
          </button>

          {/* Hero Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-luxury-serif text-5xl font-bold text-luxury-maroon mb-6">
                  Our Story
                </h1>
                <p className="font-luxury-sans text-xl text-luxury-maroon/70 mb-8 leading-relaxed">
                  Born from a passion for creating unforgettable moments, WeddingEase began as a dream 
                  to transform how couples experience their most important day.
                </p>
                <div className="flex items-center gap-8 text-luxury-maroon/60">
                  <div className="text-center">
                    <div className="font-luxury-serif text-2xl font-bold text-luxury-maroon">1000+</div>
                    <div className="font-luxury-sans text-sm">Weddings Planned</div>
                  </div>
                  <div className="text-center">
                    <div className="font-luxury-serif text-2xl font-bold text-luxury-maroon">50+</div>
                    <div className="font-luxury-sans text-sm">Cities Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="font-luxury-serif text-2xl font-bold text-luxury-maroon">6</div>
                    <div className="font-luxury-sans text-sm">Years of Excellence</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/wedding-portrait.jpg" 
                    alt="Shilpa Parikh - Founder & CEO"
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-luxury-maroon text-white p-6 rounded-xl shadow-xl">
                  <div className="font-luxury-serif text-lg font-bold">Founded in 2018</div>
                  <div className="font-luxury-sans text-sm opacity-90">With love and dedication</div>
                </div>
              </div>
            </div>
          </section>

          {/* Founder's Personal Story */}
          <section className="mb-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-luxury-taupe/10">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-8 text-center">
                  A Personal Journey
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="md:col-span-1">
                    <div className="w-32 h-32 bg-luxury-dusty-rose/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-16 h-16 text-luxury-dusty-rose" />
                    </div>
                    <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon text-center">
                      Shilpa Parikh
                    </h3>
                    <p className="font-luxury-sans text-luxury-maroon/70 text-center">
                      Founder & CEO
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="font-luxury-sans text-luxury-maroon/80 leading-relaxed mb-6">
                      "It all started with my own wedding in 2017. Despite having a clear vision, 
                      I found myself overwhelmed by countless decisions, scattered vendor communications, 
                      and the stress of coordinating every detail. I realized there had to be a better way."
                    </p>
                    <p className="font-luxury-sans text-luxury-maroon/80 leading-relaxed mb-6">
                      "After my honeymoon, I couldn't stop thinking about all the couples who were 
                      going through the same struggles. That's when the idea for WeddingEase was born - 
                      a platform that would make luxury wedding planning accessible, stress-free, and joyful."
                    </p>
                    <p className="font-luxury-sans text-luxury-maroon/80 leading-relaxed">
                      "Today, every couple we work with reminds me why we started this journey. 
                      Their happiness, their tears of joy, their 'thank you' messages - these are 
                      what fuel our passion and drive us to continuously innovate and improve."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Values */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-4">
                Our Core Values
              </h2>
              <p className="font-luxury-sans text-xl text-luxury-maroon/70 max-w-3xl mx-auto">
                These principles guide every decision we make and every service we provide
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-luxury-taupe/10 text-center">
                    <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-luxury-dusty-rose" />
                    </div>
                    <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-4">
                      {value.title}
                    </h3>
                    <p className="font-luxury-sans text-luxury-maroon/70 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-4">
                Our Journey
              </h2>
              <p className="font-luxury-sans text-xl text-luxury-maroon/70 max-w-3xl mx-auto">
                From a simple idea to transforming thousands of love stories
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-luxury-dusty-rose/30 h-full"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-luxury-taupe/10">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-luxury-dusty-rose rounded-full flex items-center justify-center">
                            <span className="font-luxury-serif font-bold text-white">{milestone.year}</span>
                          </div>
                          <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon">
                            {milestone.title}
                          </h3>
                        </div>
                        <p className="font-luxury-sans text-luxury-maroon/70">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-luxury-dusty-rose rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-luxury-maroon to-luxury-burgundy rounded-2xl p-12 text-center text-white">
              <h2 className="font-luxury-serif text-3xl font-bold mb-6">
                Our Philosophy
              </h2>
              <p className="font-luxury-sans text-xl leading-relaxed max-w-4xl mx-auto opacity-95">
                "We believe that every love story deserves to be celebrated in its own unique way. 
                Technology should enhance human connection, not replace it. Luxury should be about 
                the experience and emotions, not just the price tag. And most importantly, 
                your wedding day should be about you - stress-free, joyful, and absolutely perfect."
              </p>
              <div className="mt-8">
                <span className="font-luxury-serif text-lg opacity-90">- Shilpa Parikh, Founder</span>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-luxury-taupe/10">
              <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="font-luxury-sans text-xl text-luxury-maroon/70 mb-8 max-w-2xl mx-auto">
                Let us help you create the wedding of your dreams. Every love story is unique, 
                and yours deserves to be celebrated perfectly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={navigateToBooking}
                  className="bg-luxury-maroon text-white px-8 py-3 rounded-lg hover:bg-luxury-burgundy transition-colors duration-300 font-luxury-sans font-medium"
                >
                  Book Consultation
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="bg-transparent border-2 border-luxury-maroon text-luxury-maroon px-8 py-3 rounded-lg hover:bg-luxury-maroon hover:text-white transition-colors duration-300 font-luxury-sans font-medium"
                >
                  Browse Products
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FounderStory; 