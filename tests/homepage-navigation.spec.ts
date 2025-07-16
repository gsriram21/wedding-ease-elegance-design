import { test, expect } from '@playwright/test';

test.describe('Homepage & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('Book Consultation button should redirect to account bookings section', async ({ page }) => {
    // Find the Book Consultation button in the hero section
    const bookConsultationButton = page.locator('button:has-text("Book Consultation")');
    await expect(bookConsultationButton).toBeVisible();
    
    // Click the button
    await bookConsultationButton.click();
    
    // Verify we're redirected to the account page with bookings section
    await expect(page).toHaveURL('/account?section=bookings');
    
    // Verify we can see account layout and calendar booking elements
    await expect(page.locator(':has-text("Bookings")')).toBeVisible();
    await expect(page.locator(':has-text("Book Your Wedding Consultation")')).toBeVisible();
  });

  test('Book Consultation from chat should redirect to account bookings', async ({ page }) => {
    // Navigate to account chat section
    await page.goto('/account?section=enquiries');
    await page.waitForLoadState('networkidle');
    
    // Find and click a Book Consultation button in the chat
    const chatBookButton = page.locator('button:has-text("Book Consultation")').first();
    await expect(chatBookButton).toBeVisible();
    
    // Click the button
    await chatBookButton.click();
    
    // Wait for redirect
    await page.waitForTimeout(1500);
    
    // Verify we're redirected to the account bookings section
    await expect(page).toHaveURL('/account?section=bookings');
  });

  test('Navigation should not contain Home button', async ({ page }) => {
    // Check that the navigation bar exists
    await expect(page.locator('nav')).toBeVisible();
    
    // Verify that Products, Packages, About, and Contact buttons are visible
    await expect(page.locator('nav button:has-text("Products")')).toBeVisible();
    await expect(page.locator('nav button:has-text("Packages")')).toBeVisible();
    await expect(page.locator('nav button:has-text("About")')).toBeVisible();
    await expect(page.locator('nav button:has-text("Contact")')).toBeVisible();
    
    // Verify that Home and Services buttons are NOT present in the navigation
    await expect(page.locator('nav button:has-text("Home")')).not.toBeVisible();
    await expect(page.locator('nav button:has-text("Services")')).not.toBeVisible();
  });

  test('Hero section should contain Shop Now button instead of Explore', async ({ page }) => {
    // Verify that "Shop Now" button is visible in the hero section
    const shopNowButton = page.locator('button:has-text("Shop Now")');
    await expect(shopNowButton).toBeVisible();
    
    // Verify that "Explore" button is NOT present
    await expect(page.locator('button:has-text("Explore")')).not.toBeVisible();
    
    // Test that Shop Now button navigates to products page
    await shopNowButton.click();
    await expect(page).toHaveURL('/products');
  });

  test('Page should have Wedding Ease branding', async ({ page }) => {
    // Verify page title contains "Wedding Ease"
    await expect(page).toHaveTitle(/Wedding Ease/);
    
    // Verify logo has correct alt text
    await expect(page.locator('img[alt="Wedding Ease Logo"]')).toBeVisible();
    
    // Verify meta description contains Wedding Ease
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('Wedding Ease');
  });

  test('New color palette should be applied correctly', async ({ page }) => {
    // Check that the navigation has the updated styling
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    
    // Check that buttons exist and are styled (they should inherit the luxury color classes)
    const productsButton = page.locator('nav button:has-text("Products")');
    await expect(productsButton).toBeVisible();
    
    // Check that luxury gradient background is applied to the main page
    const mainDiv = page.locator('div.luxury-gradient').first();
    await expect(mainDiv).toBeVisible();
    
    // Verify CSS custom properties are defined
    const luxuryMaroonValue = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--luxury-maroon').trim();
    });
    expect(luxuryMaroonValue).toBeTruthy();
    expect(luxuryMaroonValue).toContain('15');  // Should contain the original hue value
  });

  test('Cards should have consistent sizing across components', async ({ page }) => {
    // Check Services section cards
    await page.locator('#services').scrollIntoViewIfNeeded();
    const serviceCards = page.locator('#services .card-standard');
    const serviceCardCount = await serviceCards.count();
    expect(serviceCardCount).toBeGreaterThan(0);
    
    // Verify service cards have consistent heights
    for (let i = 0; i < Math.min(serviceCardCount, 4); i++) {
      const card = serviceCards.nth(i);
      await expect(card).toBeVisible();
      await expect(card).toHaveClass(/card-medium/);
    }
    
    // Check Packages section cards
    await page.locator('#packages').scrollIntoViewIfNeeded();
    const packageCards = page.locator('#packages .card-standard');
    const packageCardCount = await packageCards.count();
    expect(packageCardCount).toBeGreaterThan(0);
    
    // Verify package cards have consistent heights
    for (let i = 0; i < Math.min(packageCardCount, 3); i++) {
      const card = packageCards.nth(i);
      await expect(card).toBeVisible();
      await expect(card).toHaveClass(/card-large/);
    }
    
    // Check Account page cards
    await page.goto('/account?section=enquiries');
    await page.waitForLoadState('networkidle');
    
    const actionCards = page.locator('.card-standard.card-small');
    const actionCardCount = await actionCards.count();
    expect(actionCardCount).toBeGreaterThan(0);
    
    // Verify action cards have consistent heights
    for (let i = 0; i < Math.min(actionCardCount, 4); i++) {
      const card = actionCards.nth(i);
      await expect(card).toBeVisible();
      await expect(card).toHaveClass(/card-small/);
    }
  });
}); 