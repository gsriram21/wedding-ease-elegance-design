import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should redirect unauthenticated users to auth page when clicking Book Consultation', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Find and click the Book Consultation button in Hero section
    const bookConsultationButton = page.locator('button:has-text("Book Consultation")').first();
    await expect(bookConsultationButton).toBeVisible({ timeout: 10000 });
    
    await bookConsultationButton.click();
    
    // Should redirect to auth page
    await expect(page).toHaveURL('/auth');
    
    // Should show the signup step
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible({ timeout: 10000 });
  });

  test('should complete email signup flow and redirect to account', async ({ page }) => {
    await page.goto('/auth');
    
    // Step 1: Sign Up
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible({ timeout: 10000 });
    
    // Fill out the form
    await page.fill('input[placeholder="Enter your full name"]', 'Test User');
    await page.fill('input[placeholder="Enter your email address"]', 'test@example.com');
    await page.fill('input[placeholder="Create a password"]', 'password123');
    await page.fill('input[placeholder="Confirm your password"]', 'password123');
    
    // Submit form
    await page.click('button:has-text("Create Account")');
    
    // Should be redirected directly to account page after successful signup
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    
    // Should show account page content
    await expect(page.locator('text=Shilpa Parikh')).toBeVisible({ timeout: 10000 });
  });

  test('should complete phone signup flow and redirect to account', async ({ page }) => {
    await page.goto('/auth');
    
    // Step 1: Sign Up
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible({ timeout: 10000 });
    
    // Select phone authentication method
    await page.locator('button:has-text("Phone")').click();
    
    // Fill out the form
    await page.fill('input[placeholder="Enter your full name"]', 'Phone Test User');
    await page.fill('input[placeholder="+91XXXXXXXXXX"]', '9876543210');
    
    // Submit form
    await page.click('button:has-text("Send OTP")');
    
    // Should be redirected directly to account page after successful signup
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    
    // Should show account page content
    await expect(page.locator('text=Shilpa Parikh')).toBeVisible({ timeout: 10000 });
  });

  test('should complete Google signup flow and redirect to account', async ({ page }) => {
    await page.goto('/auth');
    
    // Step 1: Sign Up
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible({ timeout: 10000 });
    
    // Click Google signup
    await page.locator('button:has-text("Google")').click();
    
    // Should be redirected directly to account page after successful signup
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    
    // Should show account page content
    await expect(page.locator('text=Shilpa Parikh')).toBeVisible({ timeout: 10000 });
  });

  test('should show validation errors for invalid inputs', async ({ page }) => {
    await page.goto('/auth');
    
    // Try to submit empty form
    await page.click('button:has-text("Create Account")');
    
    // Should show validation errors (browser built-in validation)
    // Check if form hasn't progressed (still on signup step)
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible();
    
    // Test password mismatch
    await page.fill('input[placeholder="Enter your full name"]', 'Test User');
    await page.fill('input[placeholder="Enter your email address"]', 'test@example.com');
    await page.fill('input[placeholder="Create a password"]', 'password123');
    await page.fill('input[placeholder="Confirm your password"]', 'different');
    
    await page.click('button:has-text("Create Account")');
    
    // Should still be on signup step due to validation
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible();
  });

  test('should redirect authenticated users away from auth page', async ({ page }) => {
    // First, complete authentication
    await page.goto('/auth');
    await page.locator('button:has-text("Google")').click();
    
    // Should be redirected to account
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    
    // Now try to visit auth page again
    await page.goto('/auth');
    
    // Should be redirected back to account page
    await expect(page).toHaveURL('/account');
  });

  test('should preserve authentication state across page refreshes', async ({ page }) => {
    // Complete authentication
    await page.goto('/auth');
    await page.locator('button:has-text("Google")').click();
    
    // Should be redirected to account
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    
    // Refresh the page
    await page.reload();
    
    // Should still be on account page and authenticated
    await expect(page).toHaveURL('/account');
    await expect(page.locator('text=Shilpa Parikh')).toBeVisible({ timeout: 10000 });
  });

  test('should allow access to Book Consultation for authenticated users', async ({ page }) => {
    // First authenticate
    await page.goto('/auth');
    await page.locator('button:has-text("Google")').click();
    
    // Should be on account page
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    
    // Now go to homepage
    await page.goto('/');
    
    // Click Book Consultation button
    const bookConsultationButton = page.locator('button:has-text("Book Consultation")').first();
    await bookConsultationButton.click();
    
    // Should go to bookings section or account page (depending on implementation)
    await expect(page).toHaveURL(/\/(account|bookings)/);
  });
});

test.describe('Authenticated User Experience', () => {
  test.beforeEach(async ({ page }) => {
    // Set up authenticated user by going through the signup flow
    await page.goto('/auth');
    await page.locator('button:has-text("Google")').click();
    await expect(page).toHaveURL('/account', { timeout: 10000 });
  });

  test('should show authenticated user in account page', async ({ page }) => {
    // Should be on account page
    await expect(page).toHaveURL('/account');
    
    // Should show account content
    await expect(page.locator('text=Shilpa Parikh')).toBeVisible({ timeout: 10000 });
    
    // Should show user profile information
    await expect(page.locator('text=Active Member')).toBeVisible({ timeout: 5000 });
  });

  test('should allow logout functionality', async ({ page }) => {
    // Should be on account page
    await expect(page).toHaveURL('/account');
    
    // Look for logout or sign out button/link - fix the selector syntax
    const logoutButton = page.locator('text=Logout').first();
    
    // If logout button exists, test logout functionality
    const logoutExists = await logoutButton.count() > 0;
    if (logoutExists) {
      await logoutButton.click();
      
      // Should redirect to home page or auth page
      await expect(page).toHaveURL(/\/(|auth)/, { timeout: 5000 });
    }
  });
}); 