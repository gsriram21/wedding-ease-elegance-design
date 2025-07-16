import { test, expect } from '@playwright/test';

test.describe('Product & Offerings Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Services section should show updated product-specific cards', async ({ page }) => {
    // Check that the services section has the updated cards
    await expect(page.locator('text="Invites & Stationery"')).toBeVisible();
    await expect(page.locator('text="Gifts & Accessories"')).toBeVisible();
    
    // Verify that old "Wedding Decor" and "Special Collections" are not present
    await expect(page.locator('text="Wedding Decor"')).not.toBeVisible();
    await expect(page.locator('text="Special Collections"')).not.toBeVisible();
    
    // Check descriptions are updated
    await expect(page.locator('text="Beautiful wedding invitations, save-the-dates, menu cards"')).toBeVisible();
    await expect(page.locator('text="Thoughtful wedding gifts, favors, and elegant accessories"')).toBeVisible();
  });

  test('Products page should have updated functionality', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Test that star ratings are removed from product cards
    await expect(page.locator('[data-testid="product-card"] .fill-yellow-400')).not.toBeVisible();
    
    // Test that emojis are removed from filter headers
    await expect(page.locator('text="🎨"')).not.toBeVisible();
    await expect(page.locator('text="🏷️"')).not.toBeVisible();
    await expect(page.locator('text="📏"')).not.toBeVisible();
    
    // Test that brands filter is removed
    await expect(page.locator('text="Brand"').and(page.locator('h3'))).not.toBeVisible();
    
    // Test that gender filter is present
    await expect(page.locator('text="Gender"').and(page.locator('h3'))).toBeVisible();
    await expect(page.locator('text="Men"')).toBeVisible();
    await expect(page.locator('text="Women"')).toBeVisible();
    await expect(page.locator('text="Unisex"')).toBeVisible();
  });

  test('Custom package creation functionality', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Click Create Package button
    await page.click('button:has-text("Create Package")');
    
    // Verify package mode is active
    await expect(page.locator('text="Custom Package Mode"')).toBeVisible();
    await expect(page.locator('text="Click on products to add them to your custom package"')).toBeVisible();
    
    // Select some products
    const productCards = page.locator('[data-testid="product-card"]');
    await productCards.first().click();
    await productCards.nth(1).click();
    
    // Verify selected products are highlighted
    await expect(page.locator('[data-testid="product-card"]').first()).toHaveClass(/border-green-500/);
    
    // Create the package
    await page.click('button:has-text("Create Package (2)")');
    
    // Verify package creation success message
    await expect(page.locator('text="Custom package created"')).toBeVisible();
  });

  test('Heart color changes when adding/removing from wishlist', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    const heartButton = page.locator('[data-testid="wishlist-heart"]').first();
    
    // Check initial state (should be gray/white)
    await expect(heartButton).toHaveClass(/text-gray-400/);
    
    // Click to add to wishlist
    await heartButton.click();
    
    // Wait for the wishlist modal and add to a wishlist
    await page.click('text="Dream Wedding Collection"');
    
    // Check that heart is now red and filled
    await expect(heartButton).toHaveClass(/bg-red-500/);
    await expect(heartButton.locator('svg')).toHaveClass(/fill-current/);
  });

  test('See Similar functionality in product detail modal', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Click on a product to open detail modal
    await page.locator('[data-testid="product-card"]').first().click();
    
    // Wait for modal to open
    await expect(page.locator('text="Back to Products"')).toBeVisible();
    
    // Check for See Similar section
    await expect(page.locator('text="See Similar Products"')).toBeVisible();
    
    // Verify similar products are shown
    const similarProducts = page.locator('text="See Similar Products"').locator('..').locator('img');
    await expect(similarProducts.first()).toBeVisible();
  });

  test('Filter sidebar remains visible when product is opened', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Verify filter sidebar is visible
    await expect(page.locator('text="Filters"').and(page.locator('h2'))).toBeVisible();
    
    // Open a product detail modal
    await page.locator('[data-testid="product-card"]').first().click();
    
    // Wait for modal to open
    await expect(page.locator('text="Back to Products"')).toBeVisible();
    
    // Verify filter sidebar is still visible (not covered by modal)
    await expect(page.locator('text="Filters"').and(page.locator('h2'))).toBeVisible();
    await expect(page.locator('text="Color"').and(page.locator('h3'))).toBeVisible();
  });

  test('Star ratings and reviews are completely removed', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Open product detail modal to check ratings are removed there too
    await page.locator('[data-testid="product-card"]').first().click();
    
    // Verify no star ratings in modal
    await expect(page.locator('.fill-yellow-400')).not.toBeVisible();
    await expect(page.locator('text="reviews"')).not.toBeVisible();
    await expect(page.locator('text="Rating"')).not.toBeVisible();
  });

  test('Services navigation redirects to correct product categories', async ({ page }) => {
    // Test Invites & Stationery navigation
    await page.click('text="Invites & Stationery"');
    await expect(page).toHaveURL(/\/products\?category=stationery/);
    
    await page.goto('/');
    
    // Test Gifts & Accessories navigation
    await page.click('text="Gifts & Accessories"');
    await expect(page).toHaveURL(/\/products\?category=gifts-favors/);
  });
}); 