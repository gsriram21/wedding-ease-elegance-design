import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SignUpStep from '../components/auth/SignUpStep';
import SignInStep from '../components/auth/SignInStep';
import VerificationStep from '../components/auth/VerificationStep';
import BookingStep from '../components/auth/BookingStep';
import SuccessStep from '../components/auth/SuccessStep';
import { useAuth } from '../contexts/AuthContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type AuthStep = 'auth' | 'verification' | 'booking' | 'success';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  
  // Get mode from URL parameters (signin or signup)
  const mode = searchParams.get('mode') || 'signup';
  const isSignInMode = mode === 'signin';
  
  // Start at booking step if test mode is enabled
  const isTestMode = searchParams.get('test') === 'true';
  const [currentStep, setCurrentStep] = useState<AuthStep>(
    isTestMode ? 'booking' : 'auth'
  );
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    authMethod: 'email' as 'email' | 'phone' | 'google',
    profileImage: null as File | null
  });

  // If user is already authenticated, redirect to account (unless testing or in signup flow)
  React.useEffect(() => {
    const isTestMode = searchParams.get('test') === 'true';
    const isSignUpMode = mode === 'signup';
    
    // Don't redirect if we're in the middle of the signup flow
    if (user && !isTestMode && !isSignUpMode) {
      navigate('/account');
    }
    
    // Don't auto-redirect from success step - let user manually proceed
  }, [user, navigate, searchParams, mode, currentStep]);

  const steps = [
    { id: 'auth', title: isSignInMode ? 'Sign In' : 'Create Account' },
    { id: 'verification', title: 'Verify Identity' },
    { id: 'booking', title: 'Book Consultation' },
    { id: 'success', title: 'Welcome!' }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setCurrentStep(nextStep.id as AuthStep);
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      setCurrentStep(prevStep.id as AuthStep);
    }
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSwitchToSignIn = () => {
    setSearchParams({ mode: 'signin' });
    setCurrentStep('auth');
  };

  const handleSwitchToSignUp = () => {
    setSearchParams({ mode: 'signup' });
    setCurrentStep('auth');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'auth':
        return isSignInMode ? (
          <SignInStep onSwitchToSignUp={handleSwitchToSignUp} />
        ) : (
          <SignUpStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onSwitchToSignIn={handleSwitchToSignIn}
          />
        );
      case 'verification':
        return (
          <VerificationStep
            formData={formData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'booking':
        return (
          <BookingStep
            formData={formData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'success':
        return (
          <SuccessStep
            formData={formData}
            onNext={() => navigate('/account')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-soft-pink via-white to-luxury-dusty-rose/30">
      <Navigation />
      
      <div className={`px-4 min-h-screen flex flex-col ${currentStep === 'booking' ? 'pt-24 pb-8' : 'pt-32 pb-16 justify-center'}`}>
        <div className="max-w-5xl mx-auto w-full">
          {/* Unified Single Container */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-luxury-taupe/20 shadow-xl p-8 lg:p-12">
            
            {/* Progress Bar - Show for all signup flow steps */}
            {!isSignInMode && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center flex-1 relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-3 transition-all duration-300 ${
                        index <= getCurrentStepIndex()
                          ? 'bg-luxury-dusty-rose text-white shadow-lg'
                          : 'bg-luxury-taupe/30 text-luxury-maroon/60 border-2 border-luxury-taupe/40'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`font-luxury-sans text-sm font-medium text-center transition-all duration-300 ${
                        index <= getCurrentStepIndex()
                          ? 'text-luxury-maroon'
                          : 'text-luxury-maroon/50'
                      }`}>
                        {step.title}
                      </span>
                      {/* Connecting line between steps */}
                      {index < steps.length - 1 && (
                        <div className="absolute left-[calc(50%+24px)] top-6 w-[calc(100%-48px)] h-0.5 bg-luxury-taupe/20"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-luxury-taupe/20 rounded-full h-2 overflow-hidden mb-8">
                  <div 
                    className="h-full bg-gradient-to-r from-luxury-dusty-rose to-luxury-maroon transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${((getCurrentStepIndex() + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Step Content */}
            <div className="relative">
              {renderStep()}
            </div>

            {/* Navigation Buttons - Outside the main container for better positioning */}
            {!isSignInMode && currentStep !== 'auth' && currentStep !== 'success' && (
              <button
                onClick={handlePrevious}
                className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-luxury-taupe/20 flex items-center justify-center hover:bg-white transition-colors duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 text-luxury-maroon group-hover:text-luxury-dusty-rose transition-colors" />
              </button>
            )}

            {!isSignInMode && currentStep !== 'success' && (
              <button
                onClick={handleNext}
                className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-luxury-taupe/20 flex items-center justify-center hover:bg-white transition-colors duration-300 group"
              >
                <ChevronRight className="w-5 h-5 text-luxury-maroon group-hover:text-luxury-dusty-rose transition-colors" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <img 
          src="/images/bg-flower.png" 
          alt="" 
          className="absolute top-20 right-0 translate-x-1/3 w-[25rem] opacity-10"
        />
        <img 
          src="/images/bg-branch.png" 
          alt="" 
          className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/4 w-[35rem] opacity-10"
        />
      </div>
    </div>
  );
};

export default Auth; 