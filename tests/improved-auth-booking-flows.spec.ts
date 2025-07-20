import { test, expect } from '@playwright/test';

test.describe('Improved Authentication and Booking Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('Improved Navigation for Unauthenticated Users', () => {
    test('should show only Sign In button with proper styling', async ({ page }) => {
      await page.goto('/');
      
      // Should show only Sign In button (no Sign Up)
      await expect(page.locator('button:has-text("Sign In")')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('button:has-text("Sign Up")')).not.toBeVisible();
      
      // Verify Sign In button has proper styling and positioning
      const signInButton = page.locator('button:has-text("Sign In")');
      await expect(signInButton).toHaveClass(/bg-luxury-maroon/);
      await expect(signInButton).toHaveClass(/text-white/);
      
      // Should be positioned properly with gap from Contact
      const contactButton = page.locator('button:has-text("Contact")');
      await expect(contactButton).toBeVisible();
    });

    test('should redirect to signin mode when clicking Sign In button', async ({ page }) => {
      await page.goto('/');
      
      // Click Sign In button
      await page.click('button:has-text("Sign In")');
      
      // Should redirect to auth page in signin mode
      await expect(page).toHaveURL('/auth?mode=signin');
      await expect(page.locator('h1:has-text("Welcome Back")')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Improved User Dropdown for Authenticated Users', () => {
    test('should show improved user dropdown without email display', async ({ page }) => {
      // First authenticate
      await page.goto('/auth?mode=signin');
      await page.click('button:has-text("Google")');
      await page.click('text=john.doe@gmail.com');
      await page.click('button:has-text("Continue")');
      await page.click('button:has-text("Allow")');
      
      // Go to homepage
      await page.goto('/');
      
      // Should show welcome message with first name only
      await expect(page.locator('text=Welcome, Google')).toBeVisible({ timeout: 10000 });
      
      // Should not show email anywhere in the dropdown button
      await expect(page.locator('text=john.doe@gmail.com')).not.toBeVisible();
      
      // Click on user dropdown
      await page.click('button:has-text("Welcome, Google")');
      
      // Should show simplified dropdown with only Account and Sign Out
      await expect(page.locator('text=Account')).toBeVisible();
      await expect(page.locator('text=Sign Out')).toBeVisible();
      
      // Should not show redundant options that are in sidebar
      await expect(page.locator('text=My Bookings')).not.toBeVisible();
      await expect(page.locator('text=My Wishlist')).not.toBeVisible();
      await expect(page.locator('text=My Account')).not.toBeVisible();
    });

    test('should navigate directly to account page from dropdown', async ({ page }) => {
      // First authenticate
      await page.goto('/auth?mode=signin');
      await page.click('button:has-text("Google")');
      await page.click('text=john.doe@gmail.com');
      await page.click('button:has-text("Continue")');
      await page.click('button:has-text("Allow")');
      
      // Go to homepage
      await page.goto('/');
      
      // Click on user dropdown and select Account
      await page.click('button:has-text("Welcome, Google")');
      await page.click('text=Account');
      
      // Should navigate to account page
      await expect(page).toHaveURL('/account');
      await expect(page.locator('text=Shilpa Parikh')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Modern OAuth UI Patterns', () => {
    test('should display modern OAuth buttons in signup mode', async ({ page }) => {
      await page.goto('/auth?mode=signup');
      
      // Should show modern OAuth pattern buttons
      await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('button:has-text("Continue with Apple")')).toBeVisible();
      
      // Should show email/phone toggle option
      await expect(page.locator('text=Email')).toBeVisible();
      await expect(page.locator('text=Phone')).toBeVisible();
      
      // Verify Google button has proper styling
      const googleButton = page.locator('button:has-text("Continue with Google")');
      await expect(googleButton).toBeVisible();
    });

    test('should display modern OAuth buttons in signin mode', async ({ page }) => {
      await page.goto('/auth?mode=signin');
      
      // Should show modern OAuth pattern buttons
      await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('button:has-text("Continue with Apple")')).toBeVisible();
      
      // Should show signin-specific text
      await expect(page.locator('h1:has-text("Welcome Back")')).toBeVisible();
    });

    test('should switch between signup and signin with proper OAuth button updates', async ({ page }) => {
      await page.goto('/auth?mode=signup');
      
      // Should be in signup mode with proper buttons
      await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
      
      // Switch to signin
      await page.click('text=Sign in here');
      
      // Should switch to signin mode with same OAuth buttons
      await expect(page).toHaveURL('/auth?mode=signin');
      await expect(page.locator('h1:has-text("Welcome Back")')).toBeVisible();
      await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
      
      // Switch back to signup
      await page.click('text=Sign up here');
      
      // Should be back in signup mode
      await expect(page).toHaveURL('/auth?mode=signup');
      await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible();
    });
  });

  test.describe('Integrated Booking Flow', () => {
    test('should show consultation booking prominently in signup flow', async ({ page }) => {
      await page.goto('/auth?mode=signup');
      
      // Complete email signup
      await page.fill('input[placeholder="Enter your full name"]', 'Test User');
      await page.fill('input[placeholder="Enter your email address"]', 'test@example.com');
      await page.fill('input[placeholder="Create a password"]', 'password123');
      await page.fill('input[placeholder="Confirm your password"]', 'password123');
      await page.click('button:has-text("Create Account")');
      
      // Should proceed to booking step
      await expect(page.locator('h2:has-text("Book Your Free Consultation")')).toBeVisible({ timeout: 10000 });
      
      // Should show consultation types prominently
      await expect(page.locator('text=Complete Wedding Planning')).toBeVisible();
      await expect(page.locator('text=Design & Decor Consultation')).toBeVisible();
      await expect(page.locator('text=Vendor Selection Guidance')).toBeVisible();
      await expect(page.locator('text=Timeline & Logistics')).toBeVisible();
      
      // Should show skip option
      await expect(page.locator('text=Skip for now - I\'ll book a consultation later')).toBeVisible();
    });

    test('should allow completing signup with booking integration', async ({ page }) => {
      await page.goto('/auth?mode=signup');
      
      // Complete email signup
      await page.fill('input[placeholder="Enter your full name"]', 'Test User');
      await page.fill('input[placeholder="Enter your email address"]', 'test@example.com');
      await page.fill('input[placeholder="Create a password"]', 'password123');
      await page.fill('input[placeholder="Confirm your password"]', 'password123');
      await page.click('button:has-text("Create Account")');
      
      // Should be in booking step
      await expect(page.locator('h2:has-text("Book Your Free Consultation")')).toBeVisible({ timeout: 10000 });
      
      // Select consultation type
      await page.click('text=Complete Wedding Planning');
      
      // Select date (first available)
      const firstDate = page.locator('select').first();
      await firstDate.selectOption({ index: 1 });
      
      // Select time
      const timeSelect = page.locator('select').nth(1);
      await timeSelect.selectOption('10:00 AM');
      
      // Select consultant
      await page.click('text=Shilpa Parikh');
      
      // Submit booking
      await page.click('button:has-text("Confirm Booking")');
      
      // Should proceed to success step
      await expect(page.locator('text=You\'re all set!')).toBeVisible({ timeout: 10000 });
      
      // Should show booking details in success
      await expect(page.locator('text=Complete Wedding Planning')).toBeVisible();
      await expect(page.locator('text=Shilpa Parikh')).toBeVisible();
    });

    test('should allow skipping booking during signup', async ({ page }) => {
      await page.goto('/auth?mode=signup');
      
      // Complete email signup
      await page.fill('input[placeholder="Enter your full name"]', 'Test User');
      await page.fill('input[placeholder="Enter your email address"]', 'test@example.com');
      await page.fill('input[placeholder="Create a password"]', 'password123');
      await page.fill('input[placeholder="Confirm your password"]', 'password123');
      await page.click('button:has-text("Create Account")');
      
      // Should be in booking step
      await expect(page.locator('h2:has-text("Book Your Free Consultation")')).toBeVisible({ timeout: 10000 });
      
      // Check skip option
      await page.check('input[type="checkbox"]');
      
      // Submit with skip
      await page.click('button:has-text("Complete Sign Up")');
      
      // Should proceed to success step without booking details
      await expect(page.locator('text=You\'re all set!')).toBeVisible({ timeout: 10000 });
      
      // Should eventually redirect to account
      await expect(page).toHaveURL('/account', { timeout: 10000 });
    });
  });

  test.describe('Book Consultation Button Behavior', () => {
    test('should redirect unauthenticated users to auth page from homepage', async ({ page }) => {
      await page.goto('/');
      
      // Click Book Consultation button
      const bookButton = page.locator('button:has-text("Book Consultation")').first();
      await expect(bookButton).toBeVisible({ timeout: 10000 });
      await bookButton.click();
      
      // Should redirect to auth page (signup mode by default)
      await expect(page).toHaveURL('/auth');
      await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible({ timeout: 10000 });
    });

    test('should redirect authenticated users directly to bookings', async ({ page }) => {
      // First authenticate
      await page.goto('/auth?mode=signin');
      await page.click('button:has-text("Google")');
      await page.click('text=john.doe@gmail.com');
      await page.click('button:has-text("Continue")');
      await page.click('button:has-text("Allow")');
      
      // Go to homepage
      await page.goto('/');
      
      // Click Book Consultation button
      const bookButton = page.locator('button:has-text("Book Consultation")').first();
      await bookButton.click();
      
      // Should redirect directly to account bookings
      await expect(page).toHaveURL('/account?section=bookings');
      await expect(page.locator('text=Book Your Wedding Consultation')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Complete End-to-End Flow', () => {
    test('should complete full signup with booking and verify account access', async ({ page }) => {
      // Start from homepage as unauthenticated user
      await page.goto('/');
      
      // Click Book Consultation
      await page.click('button:has-text("Book Consultation")');
      
      // Should be on auth page
      await expect(page).toHaveURL('/auth');
      
      // Complete Google signup with integrated booking
      await page.click('button:has-text("Continue with Google")');
      await page.click('text=john.doe@gmail.com');
      await page.click('button:has-text("Continue")');
      await page.click('button:has-text("Allow")');
      
      // Should be redirected to account page
      await expect(page).toHaveURL('/account', { timeout: 10000 });
      
      // Verify account page is accessible
      await expect(page.locator('text=Shilpa Parikh')).toBeVisible({ timeout: 10000 });
      
      // Go back to homepage and verify authentication state
      await page.goto('/');
      
      // Should show user dropdown instead of Sign In button
      await expect(page.locator('button:has-text("Welcome, Google")')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('button:has-text("Sign In")')).not.toBeVisible();
      
      // Book Consultation should now redirect directly to bookings
      await page.click('button:has-text("Book Consultation")');
      await expect(page).toHaveURL('/account?section=bookings');
    });

    test('should handle complete cycle with email signup including booking', async ({ page }) => {
      await page.goto('/');
      
      // Click Sign In button to go to auth page
      await page.click('button:has-text("Sign In")');
      
      // Switch to signup mode
      await page.click('text=Sign up here');
      
      // Complete email signup
      await page.fill('input[placeholder="Enter your full name"]', 'John Doe');
      await page.fill('input[placeholder="Enter your email address"]', 'john@example.com');
      await page.fill('input[placeholder="Create a password"]', 'password123');
      await page.fill('input[placeholder="Confirm your password"]', 'password123');
      await page.click('button:has-text("Create Account")');
      
      // Complete booking in the integrated flow
      await page.click('text=Design & Decor Consultation');
      const dateSelect = page.locator('select').first();
      await dateSelect.selectOption({ index: 1 });
      const timeSelect = page.locator('select').nth(1);
      await timeSelect.selectOption('2:00 PM');
      await page.click('text=Priya Mehta');
      await page.click('button:has-text("Confirm Booking")');
      
      // Should show success and then redirect to account
      await expect(page.locator('text=You\'re all set!')).toBeVisible({ timeout: 10000 });
      await expect(page).toHaveURL('/account', { timeout: 15000 });
      
      // Verify user is properly authenticated
      await page.goto('/');
      await expect(page.locator('button:has-text("Welcome, John")')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('should handle auth page access for already authenticated users', async ({ page }) => {
      // First authenticate
      await page.goto('/auth?mode=signin');
      await page.click('button:has-text("Google")');
      await page.click('text=john.doe@gmail.com');
      await page.click('button:has-text("Continue")');
      await page.click('button:has-text("Allow")');
      
      // Try to access auth page again
      await page.goto('/auth');
      
      // Should redirect to account page
      await expect(page).toHaveURL('/account');
    });

    test('should preserve authentication state across page refreshes', async ({ page }) => {
      // Authenticate
      await page.goto('/auth?mode=signin');
      await page.click('button:has-text("Google")');
      await page.click('text=john.doe@gmail.com');
      await page.click('button:has-text("Continue")');
      await page.click('button:has-text("Allow")');
      
      // Go to homepage
      await page.goto('/');
      
      // Refresh page
      await page.reload();
      
      // Should still be authenticated
      await expect(page.locator('button:has-text("Welcome, Google")')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('button:has-text("Sign In")')).not.toBeVisible();
    });

    test('should handle sign out and return to unauthenticated state', async ({ page }) => {
      // Authenticate
      await page.goto('/auth?mode=signin');
      await page.click('button:has-text("Google")');
      await page.click('text=john.doe@gmail.com');
      await page.click('button:has-text("Continue")');
      await page.click('button:has-text("Allow")');
      
      // Go to homepage
      await page.goto('/');
      
      // Sign out
      await page.click('button:has-text("Welcome, Google")');
      await page.click('text=Sign Out');
      
      // Should return to unauthenticated state
      await expect(page).toHaveURL('/');
      await expect(page.locator('button:has-text("Sign In")')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('button:has-text("Welcome, Google")')).not.toBeVisible();
      
      // Book Consultation should redirect to auth page again
      await page.click('button:has-text("Book Consultation")');
      await expect(page).toHaveURL('/auth');
    });
  });
}); 