import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import GoogleConsentModal from './GoogleConsentModal';
import PhoneInput from '../ui/PhoneInput';

interface SignInStepProps {
  onSwitchToSignUp: () => void;
}

const SignInStep: React.FC<SignInStepProps> = ({ onSwitchToSignUp }) => {
  const { signIn, signInWithPhone, signInWithGoogle, loading, error } = useAuth();
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | 'google'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showGoogleConsent, setShowGoogleConsent] = useState(false);

  const validateForm = () => {
    const errors: string[] = [];

    if (authMethod === 'email') {
      if (!email) errors.push('Email is required');
      else if (!/\S+@\S+\.\S+/.test(email)) errors.push('Please enter a valid email');
      
      if (!password) errors.push('Password is required');
    } else if (authMethod === 'phone') {
      if (!phone) errors.push('Phone number is required');
      else if (!/^\+\d{1,4}\s?\d{4,14}$/.test(phone)) {
        errors.push('Please enter a valid phone number with country code');
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (authMethod === 'email') {
        await signIn(email, password);
      } else if (authMethod === 'phone') {
        await signInWithPhone(phone);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleGoogleSignIn = () => {
    setShowGoogleConsent(true);
  };

  const handleGoogleConsentComplete = async (granted: boolean) => {
    setShowGoogleConsent(false);
    if (granted) {
      try {
        await signInWithGoogle();
      } catch (error) {
        console.error('Google sign in error:', error);
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
          Welcome Back
        </h1>
        <p className="font-luxury-sans text-luxury-maroon/70 text-sm">
          Sign in to continue with your consultation
        </p>
      </div>

      {/* Authentication Method Selection */}
      <div className="mb-6">
        <div className="space-y-3">
          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 p-3 border-2 border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-300 hover:shadow-md disabled:opacity-50 bg-white"
          >
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="font-luxury-sans font-medium text-gray-700 text-sm">Continue with Google</span>
          </button>

          {/* Apple OAuth (simulated) */}
          <button
            type="button"
            onClick={() => {/* Apple auth would go here */}}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 p-3 border-2 border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-300 hover:shadow-md disabled:opacity-50 bg-white"
          >
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="font-luxury-sans font-medium text-gray-700 text-sm">Continue with Apple</span>
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 font-luxury-sans text-xs">or</span>
            </div>
          </div>

          {/* Email/Phone Toggle */}
          <div className="grid grid-cols-2 gap-1 p-0.5 bg-gray-100 rounded-md">
            <button
              type="button"
              onClick={() => setAuthMethod('email')}
              className={`py-2 px-3 rounded text-xs font-medium transition-all duration-200 ${
                authMethod === 'email'
                  ? 'bg-white text-luxury-maroon shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('phone')}
              className={`py-2 px-3 rounded text-xs font-medium transition-all duration-200 ${
                authMethod === 'phone'
                  ? 'bg-white text-luxury-maroon shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Phone
            </button>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {(error || validationErrors.length > 0) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          {error && (
            <p className="text-red-600 text-xs font-medium mb-1">{error}</p>
          )}
          {validationErrors.map((err, index) => (
            <p key={index} className="text-red-600 text-xs">{err}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Fields */}
        {authMethod === 'email' && (
          <>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-sm"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-sm"
                  placeholder="Enter your password"
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
              <div className="text-right mt-1">
                <button
                  type="button"
                  className="text-xs text-luxury-maroon hover:text-luxury-dusty-rose transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </>
        )}

        {/* Phone Fields */}
        {authMethod === 'phone' && (
          <div>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              placeholder="Enter your phone number"
              defaultCountry="IN"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll send you an OTP to verify your number
            </p>
          </div>
        )}

        {/* Submit Button */}
        {authMethod !== 'google' && (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm"
          >
            {loading ? 'Signing In...' : authMethod === 'phone' ? 'Send OTP' : 'Sign In'}
          </button>
        )}
      </form>

      {/* Switch to Sign Up */}
      <div className="mt-6 text-center p-4 bg-white/50 rounded-lg border border-luxury-taupe/20">
        <p className="text-luxury-maroon/70 font-luxury-sans text-sm mb-2">
          Don't have an account?
        </p>
        <button
          onClick={onSwitchToSignUp}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-luxury-maroon bg-white border border-luxury-maroon rounded-lg hover:bg-luxury-maroon hover:text-white transition-colors duration-300"
        >
          Create Account
        </button>
      </div>

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

export default SignInStep; 