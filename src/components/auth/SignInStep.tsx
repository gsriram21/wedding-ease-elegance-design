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

  const handleAppleSignIn = () => {
    // Apple auth would go here
  };


  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-luxury-taupe/20 p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-2">
          Welcome Back
        </h1>
        <p className="text-luxury-data-supporting">
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
            <span className="text-luxury-button-secondary text-gray-700">Continue with Google</span>
          </button>

          {/* Apple OAuth (simulated) */}
          <button
            type="button"
            onClick={handleAppleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 p-3 border-2 border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-300 hover:shadow-md disabled:opacity-50 bg-white"
          >
            <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">🍎</span>
            </div>
            <span className="text-luxury-button-secondary text-gray-700">Continue with Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3 bg-white text-gray-500 text-luxury-caption">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setAuthMethod('email')}
            className={`flex-1 px-4 py-2 rounded-md text-luxury-button-secondary transition-all duration-300 ${
              authMethod === 'email'
                ? 'bg-white text-luxury-maroon shadow-sm'
                : 'text-gray-600 hover:text-luxury-maroon'
            }`}
          >
            Email Address
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('phone')}
            className={`flex-1 px-4 py-2 rounded-md text-luxury-button-secondary transition-all duration-300 ${
              authMethod === 'phone'
                ? 'bg-white text-luxury-maroon shadow-sm'
                : 'text-gray-600 hover:text-luxury-maroon'
            }`}
          >
            Phone Number
          </button>
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

      {/* Form Fields */}
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-luxury-form-input"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-maroon focus:border-luxury-maroon text-luxury-form-input"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-luxury-maroon focus:ring-luxury-maroon mr-2" />
                <span className="text-luxury-data-supporting text-gray-600">Remember me</span>
              </label>

              <div className="text-right mt-1">
                <button
                  type="button"
                  className="text-luxury-caption text-luxury-maroon hover:text-luxury-dusty-rose transition-colors"
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
            <p className="text-luxury-caption text-gray-500 mt-1">
              We'll send you an OTP to verify your number
            </p>
          </div>
        )}

        {/* Submit Button */}
        {authMethod !== 'google' && (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-luxury-maroon hover:bg-luxury-burgundy text-white text-luxury-button-primary py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? 'Signing In...' : authMethod === 'phone' ? 'Send OTP' : 'Sign In'}
          </button>
        )}
      </form>

      {/* Switch to Sign Up */}
      <div className="mt-6 text-center p-4 bg-white/50 rounded-lg border border-luxury-taupe/20">
        <p className="text-luxury-data-supporting mb-2">
          Don't have an account?
        </p>
        <button
          onClick={onSwitchToSignUp}
          className="inline-flex items-center justify-center px-6 py-2.5 text-luxury-button-secondary text-luxury-maroon bg-white border border-luxury-maroon rounded-lg hover:bg-luxury-maroon hover:text-white transition-colors duration-300"
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