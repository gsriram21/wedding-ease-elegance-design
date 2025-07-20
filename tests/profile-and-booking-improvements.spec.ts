import { test, expect } from '@playwright/test';

test.describe('Profile and Booking Improvements', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('Profile Picture Upload', () => {
    test('should show profile upload option during signup', async ({ page }) => {
      await page.goto('/auth?mode=signup');

      // Should see profile picture upload section
      await expect(page.locator('text=Profile Picture (Optional)')).toBeVisible();
      await expect(page.locator('text=Add a photo to personalize your profile')).toBeVisible();
      await expect(page.locator('text=Upload Photo')).toBeVisible();

      // Should show camera icon when no image uploaded
      await expect(page.locator('[data-testid="camera-icon"]')).toBeVisible();
    });

    test('should handle profile picture upload and preview', async ({ page }) => {
      await page.goto('/auth?mode=signup');

      // Upload a test image file
      const fileInput = page.locator('input[type="file"][accept="image/*"]');
      
      // Create a test file (1x1 pixel PNG)
      const testImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA60e6kgAAAABJRU5ErkJggg==', 'base64');
      
      await fileInput.setInputFiles({
        name: 'test-profile.png',
        mimeType: 'image/png',
        buffer: testImageBuffer,
      });

      // Should show preview and remove button
      await expect(page.locator('img[alt="Profile preview"]')).toBeVisible();
      await expect(page.locator('text=Change Photo')).toBeVisible();
      await expect(page.locator('button:has-text("×")')).toBeVisible();

      // Should be able to remove the uploaded image
      await page.click('button:has-text("×")');
      await expect(page.locator('img[alt="Profile preview"]')).not.toBeVisible();
      await expect(page.locator('text=Upload Photo')).toBeVisible();
    });
  });

  test.describe('Improved User Dropdown', () => {
    test('should show modern user dropdown for authenticated users', async ({ page }) => {
      // Sign up first
      await page.goto('/auth?mode=signup');
      await page.fill('input[placeholder="Enter your full name"]', 'Test User');
      await page.fill('input[placeholder="Enter your email address"]', 'test@example.com');
      await page.fill('input[placeholder="Create a password"]', 'password123');
      await page.fill('input[placeholder="Confirm your password"]', 'password123');
      await page.click('button[type="submit"]');

      // Wait for authentication and navigation
      await page.waitForURL('/account', { timeout: 10000 });

      // Navigate back to home to test dropdown
      await page.goto('/');

      // Should show user avatar/initials button
      await expect(page.locator('button[aria-label="Account menu"]')).toBeVisible();

      // Click to open dropdown
      await page.click('button[aria-label="Account menu"]');

      // Should show welcome message without duplication
      await expect(page.locator('text=Welcome back, Test!')).toBeVisible();
      
      // Should show user email
      await expect(page.locator('text=test@example.com')).toBeVisible();

      // Should show improved navigation options
      await expect(page.locator('text=My Account')).toBeVisible();
      await expect(page.locator('text=Manage profile & settings')).toBeVisible();
      await expect(page.locator('text=Bookings')).toBeVisible();
      await expect(page.locator('text=View consultations')).toBeVisible();
      await expect(page.locator('text=Appearance')).toBeVisible();
      await expect(page.locator('text=Light mode')).toBeVisible();

      // Should show sign out option
      await expect(page.locator('text=Sign Out')).toBeVisible();
      await expect(page.locator('text=End your session')).toBeVisible();
    });

    test('should navigate correctly from dropdown options', async ({ page }) => {
      // Sign up and authenticate
      await page.goto('/auth?mode=signup');
      await page.fill('input[placeholder="Enter your full name"]', 'Test User');
      await page.fill('input[placeholder="Enter your email address"]', 'test@example.com');
      await page.fill('input[placeholder="Create a password"]', 'password123');
      await page.fill('input[placeholder="Confirm your password"]', 'password123');
      await page.click('button[type="submit"]');
      await page.waitForURL('/account', { timeout: 10000 });

      await page.goto('/');
      await page.click('button[aria-label="Account menu"]');

      // Test account navigation
      await page.click('text=My Account');
      await expect(page).toHaveURL('/account');

      // Test bookings navigation
      await page.goto('/');
      await page.click('button[aria-label="Account menu"]');
      await page.click('text=Bookings');
      await expect(page).toHaveURL('/account?tab=bookings');
    });
  });

  test.describe('Interactive Booking Integration', () => {
    test('should show interactive booking options in signup', async ({ page }) => {
      await page.goto('/auth?mode=signup');

      // Should show consultation options
      await expect(page.locator('text=✨ Free Consultation Included')).toBeVisible();
      await expect(page.locator('text=Select your preferred consultation type')).toBeVisible();

      // Should show consultation type options as radio buttons
      await expect(page.locator('input[name="consultationType"][value="full"]')).toBeVisible();
      await expect(page.locator('input[name="consultationType"][value="design"]')).toBeVisible();

      // Should show consultation details
      await expect(page.locator('text=Complete Wedding Planning')).toBeVisible();
      await expect(page.locator('text=Full planning session • 60 min')).toBeVisible();
      await expect(page.locator('text=Design & Decor')).toBeVisible();
      await expect(page.locator('text=Themes & styling focus • 45 min')).toBeVisible();

      // Should show next steps preview
      await expect(page.locator('text=🗓️ Next: Choose Your Preferred')).toBeVisible();
      await expect(page.locator('text=📅 Date & Time')).toBeVisible();
      await expect(page.locator('text=👩‍💼 Expert Consultant')).toBeVisible();
    });

    test('should allow selecting consultation types', async ({ page }) => {
      await page.goto('/auth?mode=signup');

      // Select full planning consultation
      await page.click('input[name="consultationType"][value="full"]');
      await expect(page.locator('input[name="consultationType"][value="full"]')).toBeChecked();

      // Select design consultation
      await page.click('input[name="consultationType"][value="design"]');
      await expect(page.locator('input[name="consultationType"][value="design"]')).toBeChecked();
      await expect(page.locator('input[name="consultationType"][value="full"]')).not.toBeChecked();
    });
  });

  test.describe('Improved Auth Layout', () => {
    test('should show larger, centered auth layout', async ({ page }) => {
      await page.goto('/auth?mode=signup');

      // Should have max-width of lg (more than md)
      const container = page.locator('.max-w-lg');
      await expect(container).toBeVisible();

      // Should have proper vertical centering
      const wrapper = page.locator('.min-h-screen.flex.flex-col.justify-center');
      await expect(wrapper).toBeVisible();

      // Should not require scrolling for main content
      const authForm = page.locator('[data-testid="auth-form"]');
      if (await authForm.isVisible()) {
        const bbox = await authForm.boundingBox();
        const viewport = page.viewportSize();
        
        if (bbox && viewport) {
          expect(bbox.height).toBeLessThanOrEqual(viewport.height * 0.9);
        }
      }
    });

    test('should show prominent sign-in/sign-up switching buttons', async ({ page }) => {
      // Test signup to signin switch
      await page.goto('/auth?mode=signup');
      
      await expect(page.locator('text=Already have an account?')).toBeVisible();
      
      const signInButton = page.locator('button:has-text("Sign In Instead")');
      await expect(signInButton).toBeVisible();
      await expect(signInButton).toHaveClass(/border-luxury-maroon/);

      await signInButton.click();
      await expect(page).toHaveURL('/auth?mode=signin');

      // Test signin to signup switch
      await expect(page.locator('text=Don\'t have an account?')).toBeVisible();
      
      const createAccountButton = page.locator('button:has-text("Create Account")');
      await expect(createAccountButton).toBeVisible();
      await expect(createAccountButton).toHaveClass(/border-luxury-maroon/);

      await createAccountButton.click();
      await expect(page).toHaveURL('/auth?mode=signup');
    });
  });

  test.describe('International Phone Input', () => {
    test('should allow selecting different countries and show correct format', async ({ page }) => {
      await page.goto('/auth?mode=signup');

      // Switch to phone method
      await page.click('button:has-text("Phone")');

      // Should show country selector with default India
      await expect(page.locator('text=🇮🇳')).toBeVisible();
      await expect(page.locator('text=+91')).toBeVisible();

      // Click country selector
      await page.click('button:has([title*="India"])');

      // Should show country search
      await expect(page.locator('input[placeholder="Search countries..."]')).toBeVisible();

      // Search for US
      await page.fill('input[placeholder="Search countries..."]', 'United States');
      await expect(page.locator('text=United States')).toBeVisible();

      // Select US
      await page.click('text=United States');

      // Should show US flag and dial code
      await expect(page.locator('text=🇺🇸')).toBeVisible();
      await expect(page.locator('text=+1')).toBeVisible();

      // Type a phone number
      await page.fill('input[type="tel"]', '5551234567');

      // The full number should include country code
      const phoneInput = page.locator('input[type="tel"]');
      await expect(phoneInput).toHaveValue('+1 5551234567');
    });

    test('should not show country code twice in the input field', async ({ page }) => {
      await page.goto('/auth?mode=signup');
      await page.click('button:has-text("Phone")');

      // Select US country
      await page.click('button:has([title*="India"])');
      await page.fill('input[placeholder="Search countries..."]', 'United States');
      await page.click('text=United States');

      // Type just the number
      await page.fill('input[type="tel"]', '5551234567');

      // Should show +1 5551234567, not +1 +1 5551234567
      const phoneInput = page.locator('input[type="tel"]');
      const value = await phoneInput.inputValue();
      
      // Should not contain duplicate country codes
      expect(value).not.toMatch(/\+1.*\+1/);
      expect(value).toBe('+1 5551234567');
    });
  });

  test.describe('Complete User Flow Integration', () => {
    test('should complete signup with profile upload and consultation selection', async ({ page }) => {
      await page.goto('/auth?mode=signup');

      // Fill basic information
      await page.fill('input[placeholder="Enter your full name"]', 'John Doe');
      await page.fill('input[placeholder="Enter your email address"]', 'john@example.com');
      await page.fill('input[placeholder="Create a password"]', 'password123');
      await page.fill('input[placeholder="Confirm your password"]', 'password123');

      // Upload profile picture
      const fileInput = page.locator('input[type="file"][accept="image/*"]');
      const testImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA60e6kgAAAABJRU5ErkJggg==', 'base64');
      
      await fileInput.setInputFiles({
        name: 'profile.png',
        mimeType: 'image/png',
        buffer: testImageBuffer,
      });

      // Select consultation type
      await page.click('input[name="consultationType"][value="full"]');

      // Submit form
      await page.click('button[type="submit"]');

      // Should proceed to next step or account page
      await page.waitForURL(/\/(account|auth)/, { timeout: 10000 });

      // If redirected to account, check for proper user display
      if (page.url().includes('/account')) {
        await page.goto('/');
        await page.click('button[aria-label="Account menu"]');
        await expect(page.locator('text=Welcome back, John!')).toBeVisible();
      }
    });
  });
}); 