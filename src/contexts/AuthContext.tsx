import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Simulated Firebase auth types for this implementation
interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  phoneVerified?: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  
  // Authentication methods
  signUp: (email: string, password: string, displayName: string, profileImage?: File | null) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signInWithPhone: (phoneNumber: string) => Promise<User>;
  verifyPhoneOTP: (otp: string) => Promise<User>;
  signOut: () => Promise<void>;
  
  // Password management
  resetPassword: (email: string) => Promise<void>;
  
  // Verification
  sendEmailVerification: () => Promise<void>;
  
  // Profile management
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);

  // Initialize auth state on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setLoading(true);
      // Check if user is stored in localStorage (simulate Firebase persistence)
      const storedUser = localStorage.getItem('wedding_ease_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Auth state check error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert File to data URL
  const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Simulate Firebase Auth methods
  const signUp = async (email: string, password: string, displayName: string, profileImage?: File | null): Promise<User> => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Convert profile image to data URL if provided
      let photoURL: string | undefined;
      if (profileImage) {
        photoURL = await fileToDataURL(profileImage);
      }

      // Simulate user creation
      const newUser: User = {
        uid: `user_${Date.now()}`,
        email,
        displayName,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        ...(photoURL && { photoURL })
      };

      // Store user
      localStorage.setItem('wedding_ease_user', JSON.stringify(newUser));
      setUser(newUser);

      return newUser;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create account';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<User> => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate sign in
      const mockUser: User = {
        uid: `user_${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        emailVerified: true,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('wedding_ease_user', JSON.stringify(mockUser));
      setUser(mockUser);

      return mockUser;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign in';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<User> => {
    try {
      setLoading(true);
      setError(null);

      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1200));

      const googleUser: User = {
        uid: `google_${Date.now()}`,
        email: 'user@gmail.com',
        displayName: 'Google User',
        photoURL: 'https://via.placeholder.com/150',
        emailVerified: true,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('wedding_ease_user', JSON.stringify(googleUser));
      setUser(googleUser);

      return googleUser;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign in with Google';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithPhone = async (phoneNumber: string): Promise<User> => {
    try {
      setLoading(true);
      setError(null);

      // Send OTP for verification
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create user after OTP verification
      const phoneUser: User = {
        uid: `phone_${Date.now()}`,
        email: '', // Phone users might not have email
        displayName: 'Phone User',
        phoneNumber: phoneNumber,
        phoneVerified: true,
        emailVerified: false,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('wedding_ease_user', JSON.stringify(phoneUser));
      setUser(phoneUser);

      console.log(`Phone ${phoneNumber} authenticated successfully`);
      
      return phoneUser;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to authenticate with phone';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyPhoneOTP = async (otp: string): Promise<User> => {
    try {
      setLoading(true);
      setError(null);

      if (!verificationId) {
        throw new Error('No verification in progress');
      }

      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (otp !== '123456') {
        throw new Error('Invalid OTP');
      }

      const phoneUser: User = {
        uid: `phone_${Date.now()}`,
        email: '',
        displayName: 'Phone User',
        phoneNumber: '+91XXXXXXXXXX',
        emailVerified: false,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('wedding_ease_user', JSON.stringify(phoneUser));
      setUser(phoneUser);
      setVerificationId(null);

      return phoneUser;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to verify OTP';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Simulate sign out delay
      await new Promise(resolve => setTimeout(resolve, 500));

      localStorage.removeItem('wedding_ease_user');
      setUser(null);
      setVerificationId(null);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign out';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Simulate password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(`Password reset email sent to ${email}`);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to send password reset email';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const sendEmailVerification = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('No user signed in');
      }

      // Simulate email verification
      await new Promise(resolve => setTimeout(resolve, 800));

      console.log(`Verification email sent to ${user.email}`);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to send verification email';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('No user signed in');
      }

      // Simulate profile update
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = { ...user, ...data };
      localStorage.setItem('wedding_ease_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithPhone,
    verifyPhoneOTP,
    signOut,
    resetPassword,
    sendEmailVerification,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 