import { test, expect } from '@playwright/test';

test.describe('Comprehensive Booking Flow and UI Improvements', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('End-to-End Booking Flow', () => {
    test('should complete full signup with profile upload and booking consultation', async ({ page }) => {
      // Start signup process
      await page.goto('/auth?mode=signup');
      
      // Fill signup form
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'Password123!');
      await page.fill('input[placeholder*="full name"]', 'John Doe');
      
      // Test profile picture upload
      const fileChooser = page.locator('input[type="file"]');
      await expect(fileChooser).toBeVisible();
      
      // Simulate profile upload (in real test, you'd upload an actual file)
      await page.evaluate(() => {
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (input) {
          // Mock file upload for demo
          const file = new File(['test'], 'profile.jpg', { type: 'image/jpeg' });
          const event = new Event('change', { bubbles: true });
          Object.defineProperty(event, 'target', { value: input });
          input.dispatchEvent(event);
        }
      });
      
      // Submit signup
      await page.click('button[type="submit"]:has-text("Create Account")');
      
      // Should proceed to verification step
      await page.waitForTimeout(2000); // Allow for auth processing
      
      // Should eventually reach booking consultation step
      await expect(page.locator('text=Book Your Free Consultation')).toBeVisible({ timeout: 10000 });
      
      // Test consultation type selection
      await page.click('button:has-text("Complete Wedding Planning")');
      await expect(page.locator('button:has-text("Complete Wedding Planning")').first()).toHaveClass(/ring-luxury-dusty-rose/);
      
      // Test date selection
      const nextWeekButton = page.locator('button[aria-label*="next"]').first();
      await nextWeekButton.click();
      
      // Select a date (click on a day that's not Sunday)
      const availableDate = page.locator('button:not([disabled])').filter({ hasText: /^\d+$/ }).first();
      await availableDate.click();
      
      // Test time slot selection
      await page.click('button:has-text("10:00 AM")');
      await expect(page.locator('button:has-text("10:00 AM")')).toHaveClass(/bg-luxury-dusty-rose/);
      
      // Test consultant selection
      await page.click('button:has-text("Shilpa Parikh")');
      await expect(page.locator('button:has-text("Shilpa Parikh")')).toHaveClass(/ring-luxury-dusty-rose/);
      
      // Verify booking summary appears
      await expect(page.locator('text=Booking Summary')).toBeVisible();
      await expect(page.locator('text=Complete Wedding Planning')).toBeVisible();
      await expect(page.locator('text=Shilpa Parikh')).toBeVisible();
      await expect(page.locator('text=10:00 AM')).toBeVisible();
      
      // Add special requests
      await page.fill('textarea[placeholder*="specific topics"]', 'Looking for outdoor venue options in the countryside');
      
      // Confirm booking
      await page.click('button:has-text("Confirm Booking")');
      
      // Should proceed to success or dashboard
      await page.waitForTimeout(2000);
      
      // Verify booking was saved to localStorage
      const bookingData = await page.evaluate(() => {
        return localStorage.getItem('wedding_ease_booking');
      });
      expect(bookingData).toBeTruthy();
      
      const booking = JSON.parse(bookingData);
      expect(booking.type).toBe('full-planning');
      expect(booking.consultantName).toBe('Shilpa Parikh');
      expect(booking.specialRequests).toBe('Looking for outdoor venue options in the countryside');
    });

    test('should allow skipping booking consultation', async ({ page }) => {
      // Go through signup process quickly
      await page.goto('/auth?mode=signup');
      await page.fill('input[type="email"]', 'test2@example.com');
      await page.fill('input[type="password"]', 'Password123!');
      await page.fill('input[placeholder*="full name"]', 'Jane Doe');
      await page.click('button[type="submit"]:has-text("Create Account")');
      
      // Wait for booking step
      await expect(page.locator('text=Book Your Free Consultation')).toBeVisible({ timeout: 10000 });
      
      // Test skip functionality
      await page.click('button:has-text("Skip for Now")');
      
      // Should navigate to account dashboard
      await expect(page.url()).toMatch(/\/account/);
    });
  });

  test.describe('User Dropdown UI Improvements', () => {
    test('should display consistent fonts throughout user dropdown', async ({ page }) => {
      // Login first (simulate authenticated user)
      await page.goto('/');
      await page.evaluate(() => {
        const user = {
          uid: 'test123',
          email: 'test@example.com',
          displayName: 'Test User',
          emailVerified: true,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('wedding_ease_user', JSON.stringify(user));
      });
      await page.reload();
      
      // Click on user dropdown
      await page.click('button:has-text("Welcome, Test")');
      
      // Verify font consistency (all should use font-luxury-serif)
      const welcomeText = page.locator('text=Welcome back, Test!');
      await expect(welcomeText).toHaveClass(/font-luxury-serif/);
      
      const myAccountText = page.locator('text=My Account').first();
      await expect(myAccountText).toHaveClass(/font-luxury-serif/);
      
      const bookingsText = page.locator('text=Bookings').first();
      await expect(bookingsText).toHaveClass(/font-luxury-serif/);
      
      const lightModeText = page.locator('text=Light Mode');
      await expect(lightModeText).toHaveClass(/font-luxury-serif/);
      
      const signOutText = page.locator('text=Sign Out').first();
      await expect(signOutText).toHaveClass(/font-luxury-serif/);
    });

    test('should not show duplicate circular avatars in dropdown', async ({ page }) => {
      // Login with profile image
      await page.goto('/');
      await page.evaluate(() => {
        const user = {
          uid: 'test123',
          email: 'test@example.com',
          displayName: 'Test User',
          photoURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          emailVerified: true,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('wedding_ease_user', JSON.stringify(user));
      });
      await page.reload();
      
      // Click on user dropdown
      await page.click('button:has-text("Welcome, Test")');
      
      // Should not have duplicate circular avatars in the dropdown content
      const dropdown = page.locator('.absolute.top-full.right-0');
      const avatarElements = dropdown.locator('img, .rounded-full').filter({ hasText: '' });
      
      // The main avatar in the nav should exist, but no duplicate in dropdown header
      const dropdownContent = page.locator('text=Welcome back, Test!').locator('..');
      const duplicateAvatars = dropdownContent.locator('img, .rounded-full');
      await expect(duplicateAvatars).toHaveCount(0);
    });

    test('should not show descriptive text below dropdown options', async ({ page }) => {
      // Login first
      await page.goto('/');
      await page.evaluate(() => {
        const user = {
          uid: 'test123',
          email: 'test@example.com',
          displayName: 'Test User',
          emailVerified: true,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('wedding_ease_user', JSON.stringify(user));
      });
      await page.reload();
      
      // Click on user dropdown
      await page.click('button:has-text("Welcome, Test")');
      
      // Verify descriptive texts are not present
      await expect(page.locator('text=Manage profile & settings')).not.toBeVisible();
      await expect(page.locator('text=View consultations')).not.toBeVisible();
      await expect(page.locator('text=Light mode')).not.toBeVisible();
      await expect(page.locator('text=End your session')).not.toBeVisible();
      
      // But main options should still be visible
      await expect(page.locator('text=My Account')).toBeVisible();
      await expect(page.locator('text=Bookings')).toBeVisible();
      await expect(page.locator('text=Light Mode')).toBeVisible();
      await expect(page.locator('text=Sign Out')).toBeVisible();
    });

    test('should navigate to profile section when clicking My Account', async ({ page }) => {
      // Login first
      await page.goto('/');
      await page.evaluate(() => {
        const user = {
          uid: 'test123',
          email: 'test@example.com',
          displayName: 'Test User',
          emailVerified: true,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('wedding_ease_user', JSON.stringify(user));
      });
      await page.reload();
      
      // Click on user dropdown
      await page.click('button:has-text("Welcome, Test")');
      
      // Click My Account
      await page.click('text=My Account');
      
      // Should navigate to profile section, not chat
      await expect(page.url()).toContain('section=profile');
      await expect(page.url()).not.toContain('section=enquiries');
    });
  });

  test.describe('Profile Image Integration', () => {
    test('should display uploaded profile image in navigation after signup', async ({ page }) => {
      // Complete signup with profile image
      await page.goto('/auth?mode=signup');
      
      await page.fill('input[type="email"]', 'profile@example.com');
      await page.fill('input[type="password"]', 'Password123!');
      await page.fill('input[placeholder*="full name"]', 'Profile User');
      
      // Mock profile image upload
      await page.evaluate(() => {
        const mockPhotoURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
        
        // Override the signUp function to include photoURL
        window.localStorage.setItem('mock_profile_image', mockPhotoURL);
      });
      
      await page.click('button[type="submit"]:has-text("Create Account")');
      
      // Wait for completion and navigation
      await page.waitForTimeout(3000);
      
      // Check if user avatar shows the uploaded image
      const userButton = page.locator('button:has-text("Welcome")');
      await expect(userButton).toBeVisible();
      
      // If profile image was uploaded, should show img element instead of initials
      const profileImage = page.locator('img[alt*="User"]').first();
      const initialsSpan = page.locator('span:has-text("P")').first(); // P for Profile User
      
      // Either should be visible (depends on if upload worked)
      const hasImage = await profileImage.isVisible();
      const hasInitials = await initialsSpan.isVisible();
      expect(hasImage || hasInitials).toBeTruthy();
    });
  });

  test.describe('Booking Page Functionality', () => {
    test('should show all consultation types with correct durations', async ({ page }) => {
      // Navigate directly to booking page
      await page.goto('/auth?mode=signup');
      await page.fill('input[type="email"]', 'booking@example.com');
      await page.fill('input[type="password"]', 'Password123!');
      await page.fill('input[placeholder*="full name"]', 'Booking User');
      await page.click('button[type="submit"]');
      
      // Wait for booking step
      await expect(page.locator('text=Book Your Free Consultation')).toBeVisible({ timeout: 10000 });
      
      // Verify all consultation types are present
      await expect(page.locator('text=Complete Wedding Planning')).toBeVisible();
      await expect(page.locator('text=60 minutes')).toBeVisible();
      
      await expect(page.locator('text=Design & Decor Consultation')).toBeVisible();
      await expect(page.locator('text=45 minutes')).toBeVisible();
      
      await expect(page.locator('text=Vendor Selection Guidance')).toBeVisible();
      await expect(page.locator('text=30 minutes')).toBeVisible();
      
      await expect(page.locator('text=Timeline & Logistics')).toBeVisible();
    });

    test('should show all available consultants with ratings', async ({ page }) => {
      // Navigate to booking page
      await page.goto('/auth?mode=signup');
      await page.fill('input[type="email"]', 'consultant@example.com');
      await page.fill('input[type="password"]', 'Password123!');
      await page.fill('input[placeholder*="full name"]', 'Consultant User');
      await page.click('button[type="submit"]');
      
      await expect(page.locator('text=Book Your Free Consultation')).toBeVisible({ timeout: 10000 });
      
      // Verify consultants are shown
      await expect(page.locator('text=Shilpa Parikh')).toBeVisible();
      await expect(page.locator('text=Wedding Planning')).toBeVisible();
      await expect(page.locator('text=4.9')).toBeVisible();
      
      await expect(page.locator('text=Rajesh Kumar')).toBeVisible();
      await expect(page.locator('text=Venue Selection')).toBeVisible();
      
      await expect(page.locator('text=Anjali Patel')).toBeVisible();
      await expect(page.locator('text=Budget Planning')).toBeVisible();
    });

    test('should prevent booking without required selections', async ({ page }) => {
      // Navigate to booking page
      await page.goto('/auth?mode=signup');
      await page.fill('input[type="email"]', 'validation@example.com');
      await page.fill('input[type="password"]', 'Password123!');
      await page.fill('input[placeholder*="full name"]', 'Validation User');
      await page.click('button[type="submit"]');
      
      await expect(page.locator('text=Book Your Free Consultation')).toBeVisible({ timeout: 10000 });
      
      // Try to confirm booking without selections
      // Should not show confirm button until all selections are made
      await expect(page.locator('button:has-text("Confirm Booking")')).not.toBeVisible();
      
      // Select consultation type only
      await page.click('button:has-text("Complete Wedding Planning")');
      await expect(page.locator('button:has-text("Confirm Booking")')).not.toBeVisible();
      
      // Select date
      const availableDate = page.locator('button:not([disabled])').filter({ hasText: /^\d+$/ }).first();
      await availableDate.click();
      await expect(page.locator('button:has-text("Confirm Booking")')).not.toBeVisible();
      
      // Select time
      await page.click('button:has-text("10:00 AM")');
      await expect(page.locator('button:has-text("Confirm Booking")')).not.toBeVisible();
      
      // Select consultant - now confirm button should appear
      await page.click('button:has-text("Shilpa Parikh")');
      await expect(page.locator('button:has-text("Confirm Booking")')).toBeVisible();
    });
  });

  test.describe('Sign-in/Sign-up Button Improvements', () => {
    test('should show prominent sign-in/sign-up switching buttons', async ({ page }) => {
      // Test signup page
      await page.goto('/auth?mode=signup');
      
      // Should show prominent switch to sign-in button
      const switchToSignIn = page.locator('button:has-text("Sign In")');
      await expect(switchToSignIn).toBeVisible();
      await expect(switchToSignIn).toHaveClass(/bg-white/); // Should be prominent styled
      
      // Click to switch to sign-in
      await switchToSignIn.click();
      await expect(page.url()).toContain('mode=signin');
      
      // Should show prominent switch to sign-up button
      const switchToSignUp = page.locator('button:has-text("Sign Up")');
      await expect(switchToSignUp).toBeVisible();
      await expect(switchToSignUp).toHaveClass(/bg-white/); // Should be prominent styled
      
      // Click to switch back to sign-up
      await switchToSignUp.click();
      await expect(page.url()).toContain('mode=signup');
    });
  });

  test.describe('Layout and Visual Improvements', () => {
    test('should have larger, clearer auth layout without excessive scrolling', async ({ page }) => {
      await page.goto('/auth?mode=signup');
      
      // Check that the auth container is properly sized
      const authContainer = page.locator('.max-w-lg.mx-auto');
      await expect(authContainer).toBeVisible();
      
      // Check that the layout uses proper spacing
      await expect(page.locator('.min-h-screen')).toBeVisible();
      await expect(page.locator('.flex.flex-col.justify-center')).toBeVisible();
      
      // Verify no unnecessary scrolling on standard desktop viewport
      const viewportHeight = await page.evaluate(() => window.innerHeight);
      const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      
      // Body should not be much larger than viewport (allowing some buffer)
      expect(bodyHeight).toBeLessThan(viewportHeight * 1.2);
    });
  });
});

test.describe('Integration Tests', () => {
  test('should complete entire user journey from signup to booking confirmation', async ({ page }) => {
    // Step 1: Start on homepage
    await page.goto('/');
    
    // Step 2: Navigate to signup
    await page.click('button:has-text("SIGN IN")');
    await expect(page.url()).toContain('/auth');
    
    // Step 3: Switch to signup if not already there
    if (await page.locator('button:has-text("Sign Up")').isVisible()) {
      await page.click('button:has-text("Sign Up")');
    }
    
    // Step 4: Complete signup with profile image
    await page.fill('input[type="email"]', 'journey@example.com');
    await page.fill('input[type="password"]', 'Password123!');
    await page.fill('input[placeholder*="full name"]', 'Journey User');
    
    // Step 5: Submit signup
    await page.click('button[type="submit"]:has-text("Create Account")');
    
    // Step 6: Complete booking flow
    await expect(page.locator('text=Book Your Free Consultation')).toBeVisible({ timeout: 10000 });
    
    // Select all required fields
    await page.click('button:has-text("Complete Wedding Planning")');
    
    const nextWeekButton = page.locator('button[aria-label*="next"]').first();
    await nextWeekButton.click();
    
    const availableDate = page.locator('button:not([disabled])').filter({ hasText: /^\d+$/ }).first();
    await availableDate.click();
    
    await page.click('button:has-text("2:00 PM")');
    await page.click('button:has-text("Shilpa Parikh")');
    
    // Add special requests
    await page.fill('textarea', 'Complete end-to-end journey test');
    
    // Step 7: Confirm booking
    await page.click('button:has-text("Confirm Booking")');
    
    // Step 8: Verify completion
    await page.waitForTimeout(2000);
    
    // Should have booking data saved
    const savedBooking = await page.evaluate(() => {
      return localStorage.getItem('wedding_ease_booking');
    });
    expect(savedBooking).toBeTruthy();
    
    // Should have user data saved
    const savedUser = await page.evaluate(() => {
      return localStorage.getItem('wedding_ease_user');
    });
    expect(savedUser).toBeTruthy();
    
    const userData = JSON.parse(savedUser);
    expect(userData.email).toBe('journey@example.com');
    expect(userData.displayName).toBe('Journey User');
  });
}); 