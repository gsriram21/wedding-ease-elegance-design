import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Phone, CheckCircle, Clock } from 'lucide-react';

interface VerificationStepProps {
  formData: {
    email: string;
    phone: string;
    name: string;
    authMethod: 'email' | 'phone' | 'google';
  };
  onNext: () => void;
  onPrevious: () => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ formData, onNext, onPrevious }) => {
  const { verifyPhoneOTP, sendEmailVerification, loading, error } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Auto-continue for Google sign-in
    if (formData.authMethod === 'google') {
      setIsVerified(true);
      setTimeout(() => onNext(), 1000);
      return;
    }

    // Start countdown timer
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeRemaining, formData.authMethod, onNext]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit) && formData.authMethod === 'phone') {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOTP = async (otpValue: string = otp.join('')) => {
    try {
      await verifyPhoneOTP(otpValue);
      setIsVerified(true);
      setTimeout(() => onNext(), 1500);
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  const handleResendOTP = async () => {
    try {
      setTimeRemaining(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      // In real implementation, call the resend OTP API
      console.log('Resending OTP to:', formData.phone);
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  };

  const handleSendEmailVerification = async () => {
    try {
      await sendEmailVerification();
      setIsVerified(true);
      setTimeout(() => onNext(), 1500);
    } catch (error) {
      console.error('Email verification error:', error);
    }
  };

  if (formData.authMethod === 'google') {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-luxury-taupe/20 p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-2">
          Google Account Verified
        </h2>
        <p className="text-luxury-maroon/70 mb-4">
          Your Google account has been successfully verified.
        </p>
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-luxury-maroon/30 border-t-luxury-maroon rounded-full animate-spin mr-2" />
          <span className="text-luxury-maroon/70">Proceeding to next step...</span>
        </div>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-luxury-taupe/20 p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-2">
          Verification Successful!
        </h2>
        <p className="text-luxury-maroon/70 mb-4">
          {formData.authMethod === 'phone' 
            ? 'Your phone number has been verified.'
            : 'Your email has been verified.'
          }
        </p>
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-luxury-maroon/30 border-t-luxury-maroon rounded-full animate-spin mr-2" />
          <span className="text-luxury-maroon/70">Proceeding to next step...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-luxury-taupe/20 p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-luxury-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
          {formData.authMethod === 'phone' ? (
            <Phone className="w-8 h-8 text-luxury-maroon" />
          ) : (
            <Mail className="w-8 h-8 text-luxury-maroon" />
          )}
        </div>
        <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-2">
          {formData.authMethod === 'phone' ? 'Verify Your Phone' : 'Verify Your Email'}
        </h2>
        <p className="text-luxury-maroon/70">
          {formData.authMethod === 'phone' 
            ? `We've sent a 6-digit code to ${formData.phone}`
            : `Please check your email ${formData.email} and click the verification link`
          }
        </p>
      </div>

      {formData.authMethod === 'phone' ? (
        <>
          {/* OTP Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-luxury-maroon mb-4 text-center">
              Enter verification code
            </label>
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-luxury-maroon focus:ring-2 focus:ring-luxury-maroon/20 transition-all duration-200"
                />
              ))}
            </div>
          </div>

          {/* Timer and Resend */}
          <div className="text-center mb-6">
            {!canResend ? (
              <div className="flex items-center justify-center text-luxury-maroon/70">
                <Clock className="w-4 h-4 mr-2" />
                <span>Resend code in {timeRemaining}s</span>
              </div>
            ) : (
              <button
                onClick={handleResendOTP}
                className="text-luxury-maroon hover:text-luxury-dusty-rose font-medium transition-colors duration-200"
              >
                Resend verification code
              </button>
            )}
          </div>

          {/* Error Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={() => handleVerifyOTP()}
            disabled={loading || otp.some(digit => !digit)}
            className="w-full bg-luxury-maroon text-white py-3 px-6 rounded-xl font-medium hover:bg-luxury-burgundy transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Verifying...
              </div>
            ) : (
              'Verify Code'
            )}
          </button>
        </>
      ) : (
        <>
          {/* Email Verification */}
          <div className="text-center mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <Mail className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <p className="text-blue-700 mb-4">
                We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
              </p>
              <p className="text-sm text-blue-600">
                Don't forget to check your spam folder if you don't see the email.
              </p>
            </div>
          </div>

          {/* Error Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Resend Email Button */}
          <button
            onClick={handleSendEmailVerification}
            disabled={loading}
            className="w-full bg-luxury-maroon text-white py-3 px-6 rounded-xl font-medium hover:bg-luxury-burgundy transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Sending...
              </div>
            ) : (
              'Resend Verification Email'
            )}
          </button>


        </>
      )}

      {/* Back Button */}
      <button
        onClick={onPrevious}
        className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors duration-300"
      >
        Back to Sign Up
      </button>
    </div>
  );
};

export default VerificationStep; 