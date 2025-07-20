import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useAuthNavigation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navigateToBooking = () => {
    if (user) {
      // User is authenticated, go to bookings section
      navigate('/account?section=bookings');
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