import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Sun, LogOut, ChevronDown, Heart, Gem, FileText, Gift, Calendar } from 'lucide-react';

const Navigation = () => {
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  // Don't show user profile if we're in signup mode
  const isSignupMode = location.pathname === '/auth' && location.search.includes('mode=signup');
  const shouldShowProfile = user && !isSignupMode;

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const aboutMenuItems = [
    {
      title: "Founder's Story",
      description: "Our journey and company philosophy",
      icon: User,
      path: "/about/founder-story"
    },
    {
      title: "Blogs",
      description: "Latest insights and wedding trends", 
      icon: FileText,
      path: "/blog"
    }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleSignIn = () => {
    navigate('/auth?mode=signin');
  };

  const handleSignUp = () => {
    navigate('/auth?mode=signup');
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-luxury-taupe/30">
      <div className="luxury-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo on the left */}
          <div className="flex-1 flex justify-start">
            <div className="flex items-center mr-12">
              <img 
                src="/images/logo.png" 
                alt="Wedding Ease Logo" 
                className="h-12 w-auto cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>
          </div>
          
          {/* Centered navigation links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-baseline space-x-8">
              <button 
                onClick={() => navigate('/products')}
                className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm"
              >
                Products
              </button>
              
              <button 
                onClick={() => {
                  if (location.pathname === '/') {
                    // Already on homepage, scroll directly
                    const packagesSection = document.getElementById('packages');
                    if (packagesSection) {
                      packagesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    // Navigate to homepage first, then scroll
                    navigate('/');
                    setTimeout(() => {
                      const packagesSection = document.getElementById('packages');
                      if (packagesSection) {
                        packagesSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }
                }}
                className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm"
              >
                Packages
              </button>
              
              {/* About Dropdown */}
              <div className="relative" ref={aboutDropdownRef}>
                <button 
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm flex items-center gap-1"
                >
                  About
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-luxury-taupe/20 p-3 z-50">
                    <div className="space-y-1">
                      {aboutMenuItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => {
                            navigate(item.path);
                            setAboutDropdownOpen(false);
                          }}
                          className="w-full flex items-start gap-4 p-3 rounded-lg hover:bg-luxury-dusty-rose/10 transition-colors duration-200 text-left"
                        >
                          <div className="w-10 h-10 bg-luxury-dusty-rose/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                            <item.icon className="w-5 h-5 text-luxury-maroon" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-luxury-serif font-bold text-luxury-maroon text-sm mb-1">
                              {item.title}
                            </h3>
                            <p className="font-luxury-sans text-luxury-maroon/70 text-xs leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => {
                  if (location.pathname === '/') {
                    // Already on homepage, scroll directly
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    // Navigate to homepage first, then scroll
                    navigate('/');
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }
                }}
                className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Right side - Authentication-aware buttons */}
          <div className="flex justify-end flex-1 items-center gap-6">
            {shouldShowProfile ? (
              // Authenticated user
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-luxury-dusty-rose/10 transition-colors duration-200"
                  aria-label="Account menu"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName} 
                      className="w-9 h-9 rounded-full object-cover border-2 border-luxury-taupe/20 hover:border-luxury-maroon/30 transition-colors"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-gradient-to-br from-luxury-maroon to-luxury-burgundy rounded-full flex items-center justify-center border-2 border-luxury-taupe/20 hover:border-luxury-maroon/30 transition-colors">
                      <span className="text-white font-luxury-serif font-bold text-sm">
                        {user.displayName?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </button>

                {userDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    
                    {/* Dropdown */}
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-luxury-taupe/20 p-4 z-50">
                      {/* Welcome Header */}
                      <div className="p-3 mb-3 bg-luxury-dusty-rose/5 rounded-lg border border-luxury-dusty-rose/10">
                        <div className="text-center">
                          <div className="font-luxury-sans text-lg font-medium text-luxury-maroon mb-1">
                            Welcome back, {user.displayName?.split(' ')[0] || 'there'}!
                          </div>
                          {user.email && (
                            <div className="font-luxury-sans text-sm text-luxury-maroon/60">
                              {user.email}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Navigation Items */}
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            navigate('/account?section=profile');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-luxury-dusty-rose/10 transition-colors duration-200 text-left group"
                        >
                          <div className="w-8 h-8 bg-luxury-maroon/10 rounded-lg flex items-center justify-center group-hover:bg-luxury-maroon/20 transition-colors">
                            <User className="w-4 h-4 text-luxury-maroon" />
                          </div>
                          <div className="flex-1">
                            <div className="font-luxury-sans text-luxury-maroon text-sm font-medium tracking-wide">My Account</div>
                          </div>
                        </button>
                        


                        <button
                          onClick={() => {
                            // Toggle theme functionality can be added here
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-luxury-dusty-rose/10 transition-colors duration-200 text-left group"
                        >
                          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                            <Sun className="w-4 h-4 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-luxury-sans text-luxury-maroon text-sm font-medium tracking-wide">Light Mode</div>
                          </div>
                        </button>
                        
                        <hr className="my-2 border-luxury-taupe/20" />
                        
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 text-left text-red-600 hover:text-red-700 group"
                        >
                          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="font-luxury-sans text-sm font-medium tracking-wide">Sign Out</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Unauthenticated user
              <Button 
                onClick={handleSignIn}
                className="bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans font-medium tracking-wide uppercase text-sm px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                SIGN IN
              </Button>
            )}
            
            <Button 
              className="text-white font-luxury-sans tracking-wide uppercase text-sm px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:bg-opacity-90"
              style={{ backgroundColor: '#1a0000' }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Ease Bot</span>
              <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-md">AI</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
