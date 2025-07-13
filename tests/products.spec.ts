import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to products page
    await page.goto('/products');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should display navigation bar with all elements', async ({ page }) => {
    // Check if navigation is present
    await expect(page.locator('nav')).toBeVisible();
    
    // Check logo
    await expect(page.locator('img[alt="Wedding Ease Logo"]').first()).toBeVisible();
    
    // Check navigation links
    await expect(page.locator('text="Home"')).toBeVisible();
    await expect(page.locator('text="Products"')).toBeVisible();
    await expect(page.locator('text="Services"')).toBeVisible();
    await expect(page.locator('text="Packages"')).toBeVisible();
    await expect(page.locator('text="About"')).toBeVisible();
    await expect(page.locator('text="Contact"')).toBeVisible();
    
    // Check account and ease bot buttons
    await expect(page.locator('text="Account"')).toBeVisible();
    await expect(page.locator('text="Ease Bot"')).toBeVisible();
  });

  test('should have functional search bar', async ({ page }) => {
    // Check search bar is visible with new placeholder
    const searchInput = page.locator('input[placeholder*="Search wedding products, categories, or brands"]');
    await expect(searchInput).toBeVisible();
    
    // Test search functionality
    await searchInput.fill('lehenga');
    await expect(searchInput).toHaveValue('lehenga');
    
    // Check if clear button appears
    await expect(page.locator('button:has-text("✕")')).toBeVisible();
    
    // Clear search
    await page.locator('button:has-text("✕")').click();
    await expect(searchInput).toHaveValue('');
  });

  test('should display two-level banner system', async ({ page }) => {
    // Check Banner 1 (Main Categories)
    await expect(page.locator('text="All Products"').first()).toBeVisible();
    await expect(page.locator('text="Wedding Stationery"')).toBeVisible();
    await expect(page.locator('text="Wedding Attire"')).toBeVisible();
    await expect(page.locator('text="Gifts & Favors"')).toBeVisible();
    await expect(page.locator('text="Jewelry & Accessories"')).toBeVisible();
    
    // Click on a category to test Banner 2
    await page.locator('text="Wedding Attire"').click();
    
    // Wait for subcategories to appear
    await page.waitForTimeout(500);
    
    // Check Banner 2 (Subcategories) appears
    await expect(page.locator('button:has-text("bridal lehengas")').first()).toBeVisible();
    await expect(page.locator('button:has-text("grooms sherwanis")').first()).toBeVisible();
  });

  test('should have functional sidebar filters', async ({ page }) => {
    // Check modern sidebar filters are visible (using more specific selectors)
    await expect(page.locator('h2:has-text("Filters")')).toBeVisible();
    await expect(page.locator('h3:has-text("Price Range")')).toBeVisible();
    await expect(page.locator('h3:has-text("Customer Rating")')).toBeVisible();
    await expect(page.locator('h3:has-text("Color")')).toBeVisible();
    await expect(page.locator('h3:has-text("Brand")')).toBeVisible();
    await expect(page.locator('h3:has-text("Size")')).toBeVisible();
    
    // Test price range inputs
    const minPriceInput = page.locator('input[placeholder="₹0"]');
    const maxPriceInput = page.locator('input[placeholder="₹200000"]');
    await expect(minPriceInput).toBeVisible();
    await expect(maxPriceInput).toBeVisible();
    
    // Test rating checkboxes
    const ratingCheckboxes = page.locator('input[type="checkbox"]').first();
    await expect(ratingCheckboxes).toBeVisible();
    
    // Test color swatches
    const colorSwatches = page.locator('button[title]').first();
    await expect(colorSwatches).toBeVisible();
    
    // Test size buttons
    const sizeButtons = page.locator('button:has-text("XS")');
    await expect(sizeButtons).toBeVisible();
  });

  test('should have functional sorting dropdown', async ({ page }) => {
    // Check sorting dropdown is visible
    const sortSelect = page.locator('select');
    await expect(sortSelect).toBeVisible();
    
    // Test sorting options
    await sortSelect.selectOption('price-low');
    await page.waitForTimeout(500);
    
    await sortSelect.selectOption('price-high');
    await page.waitForTimeout(500);
    
    await sortSelect.selectOption('rating');
    await page.waitForTimeout(500);
  });

  test('should have functional view mode toggles', async ({ page }) => {
    // Check view mode buttons in the view toggle section
    const viewToggleContainer = page.locator('.flex.items-center.gap-1.bg-white\\/80.rounded-xl');
    const gridButton = viewToggleContainer.locator('button').first();
    const listButton = viewToggleContainer.locator('button').last();
    
    await expect(gridButton).toBeVisible();
    await expect(listButton).toBeVisible();
    
    // Test switching view modes
    await listButton.click();
    await page.waitForTimeout(500);
    
    await gridButton.click();
    await page.waitForTimeout(500);
  });

  test('should display products and allow interactions', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"], .group:has(img)', { timeout: 10000 });
    
    // Check if products are displayed
    const productCards = page.locator('.group:has(img)');
    await expect(productCards.first()).toBeVisible();
    
    // Test wishlist toggle
    const heartButton = page.locator('button:has(svg[class*="Heart"], svg[stroke*="heart"])').first();
    if (await heartButton.isVisible()) {
      await heartButton.click();
      await page.waitForTimeout(500);
    }
    
    // Test product click to open detail view
    const firstProduct = productCards.first();
    await firstProduct.click();
    
    // Wait for detail view to appear
    await page.waitForTimeout(1000);
    
    // Check if detail view opened (no modal blur background)
    const detailView = page.locator('[class*="fixed"][class*="inset-0"][class*="z-40"]');
    if (await detailView.isVisible()) {
      // Check detail view content
      await expect(page.locator('text="What\'s Included"')).toBeVisible();
      await expect(page.locator('text="Buy Now"')).toBeVisible();
      await expect(page.locator('text="Get Price"')).toBeVisible();
      
      // Check for "Back to Products" button instead of close button
      const backButton = page.locator('text="Back to Products"');
      if (await backButton.isVisible()) {
        // Test detail view buttons
        await page.locator('text="Get Price"').click();
        await page.waitForTimeout(500);
        
        // Test back button
        await backButton.click();
        await page.waitForTimeout(500);
      } else {
        // If using modal, test close button
        const closeButton = page.locator('button:has(svg)').first();
        await closeButton.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('should allow navigation to other pages', async ({ page }) => {
    // Test logo click
    await page.locator('img[alt="Wedding Ease Logo"]').first().click();
    await page.waitForLoadState('networkidle');
    
    // Should navigate to homepage
    expect(page.url()).toContain('/');
    
    // Go back to products
    await page.goto('/products');
    
    // Test account button
    await page.locator('text="Account"').click();
    await page.waitForLoadState('networkidle');
    
    // Should navigate to account page
    expect(page.url()).toContain('/account');
  });

  test('should handle search functionality correctly', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search wedding products, categories, or brands"]');
    
    // Test search with results
    await searchInput.fill('gold');
    await page.waitForTimeout(1000);
    
    // Should show filtered results
    const resultsText = page.locator('span:has-text("products found")');
    await expect(resultsText).toBeVisible();
    
    // Test search with no results
    await searchInput.fill('xyznoresults');
    await page.waitForTimeout(1000);
    
    // Should show no results message
    const noResults = page.locator('text="No products found"');
    await expect(noResults).toBeVisible();
  });

  test('should handle category and subcategory filtering', async ({ page }) => {
    // Test category filtering
    await page.locator('text="Wedding Stationery"').first().click();
    await page.waitForTimeout(500);
    
    const resultsCount = page.locator('span:has-text("products found")');
    await expect(resultsCount).toBeVisible();
    
    // Test subcategory filtering
    await page.locator('button:has-text("invitations")').first().click();
    await page.waitForTimeout(500);
    
    // Results should update
    await expect(resultsCount).toBeVisible();
    
    // Test "All Products" in subcategory
    await page.locator('text="All Products"').last().click();
    await page.waitForTimeout(500);
  });

  test('should maintain functionality across different screen interactions', async ({ page }) => {
    // Test mobile filter button (if visible)
    const mobileFilterButton = page.locator('button:has-text("Filters")');
    if (await mobileFilterButton.isVisible()) {
      await mobileFilterButton.click();
      await page.waitForTimeout(500);
    }
    
    // Test combination of filters
    await page.locator('text="Wedding Attire"').first().click();
    await page.waitForTimeout(500);
    
    await page.locator('button:has-text("bridal lehengas")').first().click();
    await page.waitForTimeout(500);
    
    // Change sorting
    const sortSelect = page.locator('select');
    await sortSelect.selectOption('price-low');
    await page.waitForTimeout(500);
    
    // Add search
    const searchInput = page.locator('input[placeholder*="Search wedding products, categories, or brands"]');
    await searchInput.fill('royal');
    await page.waitForTimeout(1000);
    
    // Clear search
    const clearButton = page.locator('button:has-text("✕")');
    if (await clearButton.isVisible()) {
      await clearButton.click();
    }
  });

  test('comprehensive end-to-end user journey', async ({ page }) => {
    // Test complete user journey through all features
    
    // 1. Logo navigation test
    await page.locator('img[alt="Wedding Ease Logo"]').first().click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/');
    
    // Navigate back to products
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    
    // 2. Navigation buttons test
    await page.locator('button:has-text("Services")').click();
    await page.waitForTimeout(500);
    await page.goBack();
    
    await page.locator('button:has-text("Packages")').click();
    await page.waitForTimeout(500);
    await page.goBack();
    
    await page.locator('button:has-text("About")').click();
    await page.waitForTimeout(500);
    await page.goBack();
    
    await page.locator('button:has-text("Contact")').click();
    await page.waitForTimeout(500);
    await page.goBack();
    
    await page.locator('button:has-text("Account")').click();
    await page.waitForTimeout(500);
    await page.goBack();
    
    // 3. Search functionality test
    const searchInput = page.locator('input[placeholder*="Search wedding products, categories, or brands"]');
    await searchInput.fill('gold');
    await page.waitForTimeout(1000);
    
    // Verify results
    await expect(page.locator('span:has-text("products found")')).toBeVisible();
    
    // Clear search
    await page.locator('button:has-text("✕")').click();
    await page.waitForTimeout(500);
    
    // 4. Category banner functionality
    await page.locator('button:has-text("Wedding Attire")').first().click();
    await page.waitForTimeout(500);
    
    // Check subcategory banner appears
    await expect(page.locator('button:has-text("bridal lehengas")').first()).toBeVisible();
    
    // Click subcategory
    await page.locator('button:has-text("bridal lehengas")').first().click();
    await page.waitForTimeout(500);
    
    // 5. Sidebar filters test
    const minPriceInput = page.locator('input[placeholder="₹0"]');
    await minPriceInput.fill('50000');
    await page.waitForTimeout(500);
    
    // Test rating filter
    const ratingCheckbox = page.locator('input[type="checkbox"]').first();
    await ratingCheckbox.click();
    await page.waitForTimeout(500);
    
    // Test size filter
    const sizeFilterSection = page.locator('h3:has-text("Size")').locator('..');
    const sizeButton = sizeFilterSection.locator('button:has-text("M")').first();
    await sizeButton.click();
    await page.waitForTimeout(500);
    
    // 6. Sorting test
    const sortSelect = page.locator('select');
    await sortSelect.selectOption('price-low');
    await page.waitForTimeout(500);
    
    await sortSelect.selectOption('rating');
    await page.waitForTimeout(500);
    
    // 7. View mode toggle test
    const viewToggleContainer = page.locator('.flex.items-center.gap-1.bg-white\\/80.rounded-xl');
    const listButton = viewToggleContainer.locator('button').last();
    const gridButton = viewToggleContainer.locator('button').first();
    
    await listButton.click();
    await page.waitForTimeout(500);
    
    await gridButton.click();
    await page.waitForTimeout(500);
    
    // 8. Product interaction test
    const productCards = page.locator('.group:has(img)');
    await expect(productCards.first()).toBeVisible();
    
    // Test wishlist
    const heartButton = page.locator('button:has(svg[class*="Heart"])').first();
    if (await heartButton.isVisible()) {
      await heartButton.click();
      await page.waitForTimeout(500);
    }
    
    // Test product detail view
    await productCards.first().click();
    await page.waitForTimeout(1000);
    
    // Verify detail view opened without blur
    const detailView = page.locator('[class*="fixed"][class*="inset-0"][class*="z-40"]');
    if (await detailView.isVisible()) {
      await expect(page.locator('text="What\'s Included"')).toBeVisible();
      await expect(page.locator('text="Buy Now"')).toBeVisible();
      await expect(page.locator('text="Get Price"')).toBeVisible();
      await expect(page.locator('text="Back to Products"')).toBeVisible();
      
      // Test Get Price button
      await page.locator('text="Get Price"').click();
      await page.waitForTimeout(500);
      
      // Test Buy Now button  
      await page.locator('text="Buy Now"').click();
      await page.waitForTimeout(500);
      
      // Go back to products
      await page.locator('text="Back to Products"').click();
      await page.waitForTimeout(500);
    }
    
    // 9. Reset all filters to clean state
    await page.locator('button:has-text("All Products")').first().click();
    await page.waitForTimeout(500);
    
    await sortSelect.selectOption('featured');
    await page.waitForTimeout(500);
    
    // Verify we're back to clean state
    await expect(page.locator('span:has-text("products found")')).toBeVisible();
  });
}); 