import { test, expect } from '@playwright/test';

test.describe('Complete Authentication Experience', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should show Sign In and Sign Up buttons for unauthenticated users', async ({ page }) => {
    await page.goto('/');
    
    // Should show Sign In and Sign Up buttons in navigation
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button:has-text("Sign Up")')).toBeVisible({ timeout: 10000 });
    
    // Should not show user dropdown
    await expect(page.locator('text=Shilpa Parikh')).not.toBeVisible();
  });

  test('should redirect to auth page when clicking Sign In button', async ({ page }) => {
    await page.goto('/');
    
    // Click Sign In button
    await page.click('button:has-text("Sign In")');
    
    // Should be on auth page in sign in mode
    await expect(page).toHaveURL('/auth?mode=signin');
    await expect(page.locator('h1:has-text("Welcome Back")')).toBeVisible({ timeout: 10000 });
  });

  test('should redirect to auth page when clicking Sign Up button', async ({ page }) => {
    await page.goto('/');
    
    // Click Sign Up button
    await page.click('button:has-text("Sign Up")');
    
    // Should be on auth page in sign up mode
    await expect(page).toHaveURL('/auth?mode=signup');
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible({ timeout: 10000 });
  });

  test('should complete realistic Google OAuth flow in sign up mode', async ({ page }) => {
    await page.goto('/auth?mode=signup');
    
    // Should show sign up form
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible({ timeout: 10000 });
    
    // Click Google button
    await page.click('button:has-text("Google")');
    
    // Should show Google consent modal
    await expect(page.locator('text=Choose an account')).toBeVisible({ timeout: 5000 });
    
    // Select first account
    await page.click('text=john.doe@gmail.com');
    
    // Should proceed to consent step
    await expect(page.locator('text=Sign in to continue to Wedding Ease')).toBeVisible({ timeout: 5000 });
    
    // Click Continue
    await page.click('button:has-text("Continue")');
    
    // Should show permissions step
    await expect(page.locator('text=Wedding Ease wants to:')).toBeVisible({ timeout: 5000 });
    
    // Click Allow
    await page.click('button:has-text("Allow")');
    
    // Should show success step
    await expect(page.locator('text=You\'re all set!')).toBeVisible({ timeout: 5000 });
    
    // Should eventually redirect to account page
    await expect(page).toHaveURL('/account', { timeout: 10000 });
  });

  test('should complete realistic Google OAuth flow in sign in mode', async ({ page }) => {
    await page.goto('/auth?mode=signin');
    
    // Should show sign in form
    await expect(page.locator('h1:has-text("Welcome Back")')).toBeVisible({ timeout: 10000 });
    
    // Click Google button
    await page.click('button:has-text("Google")');
    
    // Should show Google consent modal and complete the flow
    await expect(page.locator('text=Choose an account')).toBeVisible({ timeout: 5000 });
    await page.click('text=john.doe@gmail.com');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Allow")');
    
    // Should eventually redirect to account page
    await expect(page).toHaveURL('/account', { timeout: 10000 });
  });

  test('should switch between Sign In and Sign Up modes', async ({ page }) => {
    await page.goto('/auth?mode=signup');
    
    // Should be in sign up mode
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible({ timeout: 10000 });
    
    // Click "Sign in here" link
    await page.click('text=Sign in here');
    
    // Should switch to sign in mode
    await expect(page).toHaveURL('/auth?mode=signin');
    await expect(page.locator('h1:has-text("Welcome Back")')).toBeVisible({ timeout: 10000 });
    
    // Click "Sign up here" link
    await page.click('text=Sign up here');
    
    // Should switch back to sign up mode
    await expect(page).toHaveURL('/auth?mode=signup');
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible({ timeout: 10000 });
  });

  test('should show user dropdown when authenticated', async ({ page }) => {
    // First authenticate
    await page.goto('/auth?mode=signin');
    await page.click('button:has-text("Google")');
    await page.click('text=john.doe@gmail.com');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Allow")');
    
    // Should be on account page
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    
    // Go back to homepage
    await page.goto('/');
    
    // Should show user dropdown instead of Sign In/Sign Up buttons
    await expect(page.locator('button:has-text("Sign In")')).not.toBeVisible();
    await expect(page.locator('button:has-text("Sign Up")')).not.toBeVisible();
    
    // Should show user info in navigation - check for user dropdown button
    await expect(page.locator('button:has-text("Google User")')).toBeVisible({ timeout: 10000 });
  });

  test('should show user dropdown menu with correct options', async ({ page }) => {
    // First authenticate
    await page.goto('/auth?mode=signin');
    await page.click('button:has-text("Google")');
    await page.click('text=john.doe@gmail.com');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Allow")');
    
    // Go back to homepage
    await page.goto('/');
    
    // Click on user dropdown
    await page.click('button:has-text("Google User")');
    
    // Should show dropdown menu with options
    await expect(page.locator('text=My Account')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=My Bookings')).toBeVisible();
    await expect(page.locator('text=My Wishlist')).toBeVisible();
    await expect(page.locator('text=Sign Out')).toBeVisible();
  });

  test('should navigate to account sections from user dropdown', async ({ page }) => {
    // First authenticate
    await page.goto('/auth?mode=signin');
    await page.click('button:has-text("Google")');
    await page.click('text=john.doe@gmail.com');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Allow")');
    
    // Go back to homepage
    await page.goto('/');
    
    // Click on user dropdown and navigate to bookings
    await page.click('button:has-text("Google User")');
    await page.click('text=My Bookings');
    
    // Should navigate to bookings section
    await expect(page).toHaveURL('/account?section=bookings');
  });

  test('should sign out user and return to unauthenticated state', async ({ page }) => {
    // First authenticate
    await page.goto('/auth?mode=signin');
    await page.click('button:has-text("Google")');
    await page.click('text=john.doe@gmail.com');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Allow")');
    
    // Go to homepage
    await page.goto('/');
    
    // Click on user dropdown and sign out
    await page.click('button:has-text("Google User")');
    await page.click('text=Sign Out');
    
    // Should be redirected to homepage and show Sign In/Sign Up buttons
    await expect(page).toHaveURL('/');
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button:has-text("Sign Up")')).toBeVisible();
    await expect(page.locator('button:has-text("Google User")')).not.toBeVisible();
  });

  test('should preserve authentication state across page refreshes', async ({ page }) => {
    // First authenticate
    await page.goto('/auth?mode=signin');
    await page.click('button:has-text("Google")');
    await page.click('text=john.doe@gmail.com');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Allow")');
    
    // Should be on account page
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    
    // Refresh the page
    await page.reload();
    
    // Should still be authenticated and on account page
    await expect(page).toHaveURL('/account');
    await expect(page.locator('text=Shilpa Parikh')).toBeVisible({ timeout: 10000 });
  });

  test('should redirect to auth page after sign out when clicking Book Consultation', async ({ page }) => {
    // First authenticate
    await page.goto('/auth?mode=signin');
    await page.click('button:has-text("Google")');
    await page.click('text=john.doe@gmail.com');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Allow")');
    
    // Go to homepage
    await page.goto('/');
    
    // Sign out
    await page.click('button:has-text("Google User")');
    await page.click('text=Sign Out');
    
    // Now click Book Consultation
    const bookButton = page.locator('button:has-text("Book Consultation")').first();
    await bookButton.click();
    
    // Should redirect to auth page
    await expect(page).toHaveURL('/auth');
  });

  test('should handle OAuth consent cancellation gracefully', async ({ page }) => {
    await page.goto('/auth?mode=signup');
    
    // Click Google button
    await page.click('button:has-text("Google")');
    
    // Should show Google consent modal
    await expect(page.locator('text=Choose an account')).toBeVisible({ timeout: 5000 });
    
    // Click Cancel (X button in modal header)
    await page.locator('.fixed.inset-0 button:has(svg)').first().click();
    
    // Should close modal and stay on auth page
    await expect(page.locator('text=Choose an account')).not.toBeVisible();
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible();
    await expect(page).toHaveURL('/auth?mode=signup');
  });

  test('should handle OAuth consent cancellation at different steps', async ({ page }) => {
    await page.goto('/auth?mode=signup');
    
    // Start OAuth flow
    await page.click('button:has-text("Google")');
    await page.click('text=john.doe@gmail.com');
    
    // Cancel at consent step
    await page.click('button:has-text("Cancel")');
    
    // Should close modal and stay on auth page
    await expect(page.locator('text=Sign in to continue')).not.toBeVisible();
    await expect(page.locator('h1:has-text("Create Your Account")')).toBeVisible();
  });

  test('should complete full cycle: sign up -> sign out -> sign in', async ({ page }) => {
    // Step 1: Sign up
    await page.goto('/auth?mode=signup');
    await page.click('button:has-text("Google")');
    await page.click('text=john.doe@gmail.com');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Allow")');
    
    // Should be authenticated and on account page
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    
    // Step 2: Sign out
    await page.goto('/');
    await page.click('button:has-text("Google User")');
    await page.click('text=Sign Out');
    
    // Should be signed out
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible({ timeout: 10000 });
    
    // Step 3: Sign in
    await page.click('button:has-text("Sign In")');
    await page.click('button:has-text("Google")');
    await page.click('text=john.doe@gmail.com');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Allow")');
    
    // Should be authenticated again
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    await expect(page.locator('text=Shilpa Parikh')).toBeVisible({ timeout: 10000 });
  });
}); 