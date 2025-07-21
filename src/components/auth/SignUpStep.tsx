import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Eye, EyeOff, User, Chrome, Calendar, MessageSquare, Camera, Upload, Phone, Lock } from 'lucide-react';
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
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ profileImage: file });
    }
  };

  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);


  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-luxury-taupe/20 p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-2">
          Create Your Account
        </h1>
        <p className="text-luxury-data-supporting">
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
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-luxury-form-input"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Profile Picture Upload */}
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-luxury-data-secondary">
              {profilePicture ? profilePicture.name : 'Click to upload profile picture'}
            </p>
            <p className="text-luxury-caption mt-1">Optional • PNG, JPG up to 5MB</p>
          </div>
        </div>

        {/* Auth Method Selection */}
        <div className="space-y-3">
          <label className="text-luxury-data-secondary text-gray-700">
            How would you like to verify your account?
          </label>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAuthMethod('email')}
              className={`p-3 border-2 rounded-lg transition-all duration-300 text-left ${
                authMethod === 'email'
                  ? 'border-luxury-maroon bg-luxury-maroon/5'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-luxury-maroon" />
                <span className="text-luxury-data-secondary text-gray-900">Email</span>
              </div>
              <p className="text-luxury-caption text-gray-500">Quick email verification</p>
            </button>
            
            <button
              type="button"
              onClick={() => setAuthMethod('phone')}
              className={`p-3 border-2 rounded-lg transition-all duration-300 text-left ${
                authMethod === 'phone'
                  ? 'border-luxury-maroon bg-luxury-maroon/5'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-luxury-maroon" />
                <span className="text-luxury-data-secondary text-gray-900">Phone</span>
              </div>
              <p className="text-luxury-caption text-gray-500">SMS verification</p>
            </button>
          </div>
        </div>

        {/* Email Field */}
        {authMethod === 'email' && (
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-luxury-form-input"
              placeholder="Enter your email address"
              required
            />
          </div>
        )}

        {/* Phone Field */}
        {authMethod === 'phone' && (
          <div>
            <PhoneInput
              value={formData.phone}
              onChange={(value) => updateFormData({ phone: value })}
              placeholder="Enter your phone number"
              defaultCountry="IN"
              required
            />
          </div>
        )}

        {/* Password Fields */}
        <div className="space-y-3">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-sm font-luxury-sans"
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
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-sm font-luxury-sans"
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
        </div>

                 {/* Terms Agreement */}
         <div className="flex items-start gap-3">
           <input
             type="checkbox"
             id="terms"
             checked={agreeToTerms}
             onChange={(e) => setAgreeToTerms(e.target.checked)}
             className="mt-1 rounded border-gray-300 text-luxury-maroon focus:ring-luxury-maroon"
             required
           />
           <label htmlFor="terms" className="text-luxury-data-supporting text-gray-600">
             I agree to the{' '}
             <button type="button" className="text-luxury-link">
               Terms of Service
             </button>{' '}
             and{' '}
             <button type="button" className="text-luxury-link">
               Privacy Policy
             </button>
           </label>
         </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-luxury-maroon hover:bg-luxury-burgundy text-white text-luxury-button-primary py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      {/* Switch to Sign In */}
      <div className="mt-6 text-center p-4 bg-white/50 rounded-lg border border-luxury-taupe/20">
        <p className="text-luxury-data-supporting mb-2">
          Already have an account?
        </p>
        <button
          onClick={onSwitchToSignIn}
          className="inline-flex items-center justify-center px-6 py-2.5 text-luxury-button-secondary text-luxury-maroon bg-white border border-luxury-maroon rounded-lg hover:bg-luxury-maroon hover:text-white transition-colors duration-300"
        >
          Sign In Instead
        </button>
      </div>

      {/* Terms */}
      <p className="text-center text-luxury-caption text-gray-500 mt-3">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-luxury-link">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="text-luxury-link">Privacy Policy</a>
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