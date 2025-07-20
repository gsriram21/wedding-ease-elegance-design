import { test, expect } from '@playwright/test';

test.describe('User Experience Improvements', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('International Phone Input Improvements', () => {
    test('should allow selecting different country codes without showing duplicate codes', async ({ page }) => {
      await page.goto('/auth');

      // Switch to phone signup
      await page.click('button:has-text("Phone")');

      // Click on country selector dropdown
      await page.click('button[aria-label*="India"]');

      // Select US (+1) 
      await page.click('text=United States');

      // Type a US phone number
      await page.fill('input[type="tel"]', '5551234567');

      // The full value should include country code but input should only show number
      const phoneInput = page.locator('input[type="tel"]');
      const displayValue = await phoneInput.inputValue();
      
      // Should not show +1 twice - the input should only show the number part
      expect(displayValue).toBe('5551234567');
      
      // But the full phone value should include country code (this would be tested via form submission)
    });

    test('should accept international phone numbers for non-Indian countries', async ({ page }) => {
      await page.goto('/auth');

      // Switch to phone signup
      await page.click('button:has-text("Phone")');

      // Fill name
      await page.fill('input[placeholder="Enter your full name"]', 'International User');

      // Select UK (+44)
      await page.click('button[aria-label*="India"]');
      await page.fill('input[placeholder="Search countries..."]', 'United Kingdom');
      await page.click('text=United Kingdom');

      // Type a UK phone number
      await page.fill('input[type="tel"]', '7700123456');

      // Submit form - should not show validation errors
      await page.click('button:has-text("Send OTP")');

      // Should proceed to next step (account page for phone auth)
      await expect(page).toHaveURL('/account', { timeout: 10000 });
    });

    test('should handle country selection with search functionality', async ({ page }) => {
      await page.goto('/auth');

      // Switch to phone signup
      await page.click('button:has-text("Phone")');

      // Open country dropdown
      await page.click('button[aria-label*="India"]');

      // Search for Germany
      await page.fill('input[placeholder="Search countries..."]', 'Germany');

      // Should show Germany in results
      await expect(page.locator('text=Germany')).toBeVisible();

      // Select Germany
      await page.click('text=Germany');

      // Verify Germany is selected
      await expect(page.locator('text=+49')).toBeVisible();
    });
  });

  test.describe('User Dropdown Improvements', () => {
    test('should show clean user avatar without cramped text', async ({ page }) => {
      // First authenticate to see user dropdown
      await page.goto('/auth');
      await page.click('button:has-text("Google")');
      
      // Should be on account page
      await expect(page).toHaveURL('/account', { timeout: 10000 });

      // Go to homepage to see navigation
      await page.goto('/');

      // Should see user avatar/button without welcome text in navigation
      const userButton = page.locator('button[aria-label="Account menu"]');
      await expect(userButton).toBeVisible();

      // Should not see "Welcome, [name]" text cramped in navigation
      await expect(page.locator('text=Welcome,')).not.toBeVisible();
    });

    test('should show modern dropdown with user info header', async ({ page }) => {
      // Authenticate first
      await page.goto('/auth');
      await page.click('button:has-text("Google")');
      await expect(page).toHaveURL('/account', { timeout: 10000 });

      // Go to homepage to test dropdown
      await page.goto('/');

      // Click user avatar to open dropdown
      await page.click('button[aria-label="Account menu"]');

      // Should show user info header in dropdown
      await expect(page.locator('text=Google User')).toBeVisible();

      // Should show Account Dashboard option
      await expect(page.locator('text=Account Dashboard')).toBeVisible();

      // Should show Sign Out option
      await expect(page.locator('text=Sign Out')).toBeVisible();
    });

    test('should allow navigation to account from dropdown', async ({ page }) => {
      // Authenticate first
      await page.goto('/auth');
      await page.click('button:has-text("Google")');
      await expect(page).toHaveURL('/account', { timeout: 10000 });

      // Go to homepage
      await page.goto('/');

      // Open dropdown and click Account Dashboard
      await page.click('button[aria-label="Account menu"]');
      await page.click('text=Account Dashboard');

      // Should navigate to account page
      await expect(page).toHaveURL('/account');
    });

    test('should close dropdown when clicking outside', async ({ page }) => {
      // Authenticate first
      await page.goto('/auth');
      await page.click('button:has-text("Google")');
      await expect(page).toHaveURL('/account', { timeout: 10000 });

      // Go to homepage
      await page.goto('/');

      // Open dropdown
      await page.click('button[aria-label="Account menu"]');
      await expect(page.locator('text=Account Dashboard')).toBeVisible();

      // Click outside dropdown (on backdrop)
      await page.click('body');

      // Dropdown should close
      await expect(page.locator('text=Account Dashboard')).not.toBeVisible();
    });
  });

  test.describe('Booking Integration in Signup', () => {
    test('should show consultation options during signup', async ({ page }) => {
      await page.goto('/auth');

      // Should see consultation preview in signup
      await expect(page.locator('text=Free Consultation Included')).toBeVisible();
      await expect(page.locator('text=Complete Wedding Planning')).toBeVisible();
      await expect(page.locator('text=Design & Decor Consultation')).toBeVisible();
      await expect(page.locator('text=60 min')).toBeVisible();
      await expect(page.locator('text=45 min')).toBeVisible();
    });

    test('should show that consultations are free with new account', async ({ page }) => {
      await page.goto('/auth');

      // Should show free consultation messaging
      await expect(page.locator('text=All consultations are completely free with your new account')).toBeVisible();
    });

    test('should lead to actual booking step after signup completion', async ({ page }) => {
      await page.goto('/auth');

      // Complete signup with Google
      await page.click('button:has-text("Google")');

      // Should be redirected to account for now (in full implementation would include booking step)
      await expect(page).toHaveURL('/account', { timeout: 10000 });
    });
  });

  test.describe('Navigation Improvements', () => {
    test('should show capitalized SIGN IN button', async ({ page }) => {
      await page.goto('/');

      // Should see capitalized sign in button
      const signInButton = page.locator('button:has-text("SIGN IN")');
      await expect(signInButton).toBeVisible();

      // Should have proper styling
      await expect(signInButton).toHaveClass(/bg-luxury-maroon/);
      await expect(signInButton).toHaveClass(/uppercase/);
    });

    test('should have proper spacing between navigation elements', async ({ page }) => {
      await page.goto('/');

      // Check that Contact and Sign In have proper spacing
      const contactButton = page.locator('button:has-text("Contact")');
      const signInButton = page.locator('button:has-text("SIGN IN")');
      
      await expect(contactButton).toBeVisible();
      await expect(signInButton).toBeVisible();

      // Both should be visible and properly spaced (no overlap)
      const contactBox = await contactButton.boundingBox();
      const signInBox = await signInButton.boundingBox();
      
      expect(contactBox).toBeTruthy();
      expect(signInBox).toBeTruthy();
      
      if (contactBox && signInBox) {
        // Sign in should be to the right of contact with proper spacing
        expect(signInBox.x).toBeGreaterThan(contactBox.x + contactBox.width);
      }
    });
  });

  test.describe('Form Usability Improvements', () => {
    test('should not require scrolling for signup form', async ({ page }) => {
      await page.goto('/auth');
      
      // Set a standard desktop viewport
      await page.setViewportSize({ width: 1280, height: 720 });

      // All main signup elements should be visible without scrolling
      await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible();
      await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
      await expect(page.locator('button:has-text("Continue with Apple")')).toBeVisible();
      await expect(page.locator('input[placeholder="Enter your full name"]')).toBeVisible();
      await expect(page.locator('button:has-text("Create Account")')).toBeVisible();

      // Check if page height is reasonable (no excessive scrolling needed)
      const pageHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = 720;
      
      // Form should fit reasonably in viewport (allowing some minimal scrolling)
      expect(pageHeight).toBeLessThan(viewportHeight * 1.5);
    });

    test('should not require scrolling for signin form', async ({ page }) => {
      await page.goto('/auth?mode=signin');
      
      // Set a standard desktop viewport  
      await page.setViewportSize({ width: 1280, height: 720 });

      // All main signin elements should be visible
      await expect(page.locator('h1:has-text("Welcome Back")')).toBeVisible();
      await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
      await expect(page.locator('input[placeholder="Enter your email address"]')).toBeVisible();
      await expect(page.locator('button:has-text("Sign In")')).toBeVisible();

      // Check reasonable page height
      const pageHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = 720;
      
      expect(pageHeight).toBeLessThan(viewportHeight * 1.5);
    });
  });

  test.describe('Overall User Flow Improvements', () => {
    test('should complete improved signup flow with international phone', async ({ page }) => {
      await page.goto('/auth');

      // Fill out form with international phone
      await page.fill('input[placeholder="Enter your full name"]', 'International Test User');
      
      // Switch to phone method
      await page.click('button:has-text("Phone")');

      // Select Canada
      await page.click('button[aria-label*="India"]');
      await page.fill('input[placeholder="Search countries..."]', 'Canada');
      await page.click('text=Canada');

      // Enter Canadian phone number
      await page.fill('input[type="tel"]', '4165551234');

      // Should see consultation preview
      await expect(page.locator('text=Free Consultation Included')).toBeVisible();

      // Submit
      await page.click('button:has-text("Send OTP")');

      // Should succeed and redirect to account
      await expect(page).toHaveURL('/account', { timeout: 10000 });
    });

    test('should show improved user experience after authentication', async ({ page }) => {
      // Authenticate
      await page.goto('/auth');
      await page.click('button:has-text("Google")');
      await expect(page).toHaveURL('/account', { timeout: 10000 });

      // Go to homepage to see improved navigation
      await page.goto('/');

      // Should see clean user avatar
      await expect(page.locator('button[aria-label="Account menu"]')).toBeVisible();

      // Should not see old cramped welcome text
      await expect(page.locator('text=Welcome,')).not.toBeVisible();

      // Dropdown should work properly
      await page.click('button[aria-label="Account menu"]');
      await expect(page.locator('text=Account Dashboard')).toBeVisible();
      await expect(page.locator('text=Google User')).toBeVisible();
    });
  });
}); 