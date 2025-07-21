import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useAuthNavigation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock consultation history for smart routing (in real app this would come from user data)
  const getUserConsultationStatus = (): 'new' | 'used-free' | 'has-package' => {
    if (!user) return 'new';
    
    // Mock data - in real app this would come from user's actual booking history
    const consultationHistory = [
      // Uncomment one of these scenarios to test different user states:
      
      // Scenario 1: New user (no consultations) - default state
      // []
      
      // Scenario 2: User who has used free consultation - ACTIVE FOR TESTING
      { id: 1, type: 'free', date: '2024-01-15', completed: true }
      
      // Scenario 3: User with package (can book more consultations)
      // [
      //   { id: 1, type: 'free', date: '2024-01-15', completed: true },
      //   { id: 2, type: 'package', date: '2024-02-10', completed: true }
      // ]
    ];
    
    const hasActivePackage = false; // Set to true to simulate user with package
    
    if (hasActivePackage) return 'has-package';
    if (consultationHistory.length > 0) return 'used-free';
    return 'new';
  };

  const navigateToBooking = () => {
    if (user) {
      // User is authenticated - determine consultation status and route accordingly
      const consultationStatus = getUserConsultationStatus();
      
      switch (consultationStatus) {
        case 'new':
          // First free consultation: go to bookings page
          navigate('/account?section=bookings');
          break;
        case 'used-free':
          // User already used free consultation: redirect to packages page
          navigate('/');
          setTimeout(() => {
            const packagesSection = document.getElementById('packages');
            if (packagesSection) {
              packagesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
          break;
        case 'has-package':
          // User has package: can book more consultations
          navigate('/account?section=bookings');
          break;
        default:
          navigate('/account?section=bookings');
      }
    } else {
      // User is not authenticated, go to auth flow
      navigate('/auth');
    }
  };

  const navigateToAccount = () => {
    if (user) {
      navigate('/account');
    } else {
      navigate('/auth');
    }
  };

  const requireAuth = (callback: () => void) => {
    if (user) {
      callback();
    } else {
      navigate('/auth');
    }
  };

  return {
    navigateToBooking,
    navigateToAccount,
    requireAuth,
    isAuthenticated: !!user
  };
}; 