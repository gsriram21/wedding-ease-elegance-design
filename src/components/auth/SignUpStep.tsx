import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Eye, EyeOff, User, Chrome, Calendar, MessageSquare, Camera, Upload } from 'lucide-react';
import GoogleConsentModal from './GoogleConsentModal';
import PhoneInput from '../ui/PhoneInput';

interface SignUpStepProps {
  formData: {
    email: string;
    phone: string;
    name: string;
    authMethod: 'email' | 'phone' | 'google';
    profileImage: File | null;
  };
  updateFormData: (data: Partial<SignUpStepProps['formData']>) => void;
  onNext: () => void;
  onSwitchToSignIn?: () => void;
}

const SignUpStep: React.FC<SignUpStepProps> = ({ formData, updateFormData, onNext, onSwitchToSignIn }) => {
  const { signUp, signInWithGoogle, signInWithPhone, loading, error } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showGoogleConsent, setShowGoogleConsent] = useState(false);

  const validateForm = () => {
    const errors: string[] = [];

    if (formData.authMethod === 'email') {
      if (!formData.email) errors.push('Email is required');
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.push('Please enter a valid email');
      
      if (!password) errors.push('Password is required');
      else if (password.length < 6) errors.push('Password must be at least 6 characters');
      
      if (password !== confirmPassword) errors.push('Passwords do not match');
    } else if (formData.authMethod === 'phone') {
      if (!formData.phone) errors.push('Phone number is required');
      else if (!/^\+\d{1,4}\s?\d{4,14}$/.test(formData.phone)) {
        errors.push('Please enter a valid phone number with country code');
      }
    }

    if (!formData.name) errors.push('Full name is required');
    else if (formData.name.length < 2) errors.push('Name must be at least 2 characters');

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (formData.authMethod === 'email') {
        await signUp(formData.email, password, formData.name, formData.profileImage);
        // Go to booking step to complete the integrated signup+booking flow
        onNext(); // This will go to verification first, then booking
      } else if (formData.authMethod === 'phone') {
        await signInWithPhone(formData.phone);
        // Phone auth is immediate, so skip verification and go to booking
        onNext(); // This should go directly to booking step
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleGoogleSignUp = () => {
    setShowGoogleConsent(true);
  };

  const handleGoogleConsentComplete = async (granted: boolean) => {
    setShowGoogleConsent(false);
    if (granted) {
      try {
        await signInWithGoogle();
        updateFormData({ authMethod: 'google' });
        // Google auth is immediate, so skip verification and go to booking
        onNext(); // This will go to booking step to complete the integrated flow
      } catch (error) {
        console.error('Google signup error:', error);
      }
    }
  };

  const handleGoogleConsentCancel = () => {
    setShowGoogleConsent(false);
  };



  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-luxury-taupe/20 p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-2">
          Create Your Account
        </h1>
        <p className="font-luxury-sans text-luxury-maroon/70 text-sm">
          Join us to plan your perfect wedding
        </p>
      </div>

      {/* Step Preview - REMOVED: Now shown in main progress banner */}
      
      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-sm"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Profile Picture Upload */}
        <div className="flex items-center gap-4 p-3 border border-gray-300 rounded-lg bg-gray-50">
          <div className="flex-shrink-0">
            {formData.profileImage ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => updateFormData({ profileImage: null })}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 bg-luxury-maroon/10 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-luxury-maroon" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-luxury-maroon mb-1">Profile Picture (Optional)</h4>
            <p className="text-xs text-gray-500 mb-2">Add a photo to personalize your profile</p>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    updateFormData({ profileImage: file });
                  }
                }}
                className="hidden"
              />
              <span className="inline-flex items-center gap-1 text-xs text-luxury-maroon hover:text-luxury-dusty-rose font-medium">
                <Upload className="w-3 h-3" />
                {formData.profileImage ? 'Change Photo' : 'Upload Photo'}
              </span>
            </label>
          </div>
        </div>

        {/* Email Fields */}
        {formData.authMethod === 'email' && (
          <>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-sm"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-sm"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-sm"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </>
        )}

        {/* Phone Fields */}
        {formData.authMethod === 'phone' && (
          <div>
            <PhoneInput
              value={formData.phone}
              onChange={(value) => updateFormData({ phone: value })}
              placeholder="Enter your phone number"
              defaultCountry="IN"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll send you an OTP to verify your number
            </p>
          </div>
        )}

        {/* Error Messages */}
        {(validationErrors.length > 0 || error) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            {validationErrors.map((error, index) => (
              <p key={index} className="text-red-600 text-xs mb-1">{error}</p>
            ))}
            {error && <p className="text-red-600 text-xs">{error}</p>}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-luxury-maroon text-white py-3 px-6 rounded-lg font-medium hover:bg-luxury-burgundy transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Creating Account...
            </div>
          ) : (
            formData.authMethod === 'phone' ? 'Send OTP' : 'Create Account'
          )}
        </button>
      </form>





      {/* Switch to Sign In */}
      {onSwitchToSignIn && (
        <div className="mt-6 text-center p-4 bg-white/50 rounded-lg border border-luxury-taupe/20">
          <p className="text-luxury-maroon/70 font-luxury-sans text-sm mb-2">
            Already have an account?
          </p>
          <button
            onClick={onSwitchToSignIn}
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-luxury-maroon bg-white border border-luxury-maroon rounded-lg hover:bg-luxury-maroon hover:text-white transition-colors duration-300"
          >
            Sign In Instead
          </button>
        </div>
      )}

      {/* Terms */}
      <p className="text-center text-xs text-gray-500 mt-3">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-luxury-maroon hover:underline">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="text-luxury-maroon hover:underline">Privacy Policy</a>
      </p>

      {/* Google Consent Modal */}
      <GoogleConsentModal
        isOpen={showGoogleConsent}
        onComplete={handleGoogleConsentComplete}
        onCancel={handleGoogleConsentCancel}
        appName="Wedding Ease"
      />
    </div>
  );
};

export default SignUpStep; 