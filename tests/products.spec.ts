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
    await expect(page.locator('nav').locator('button:has-text("Contact")').first()).toBeVisible();
    
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
    
    await page.locator('button:has-text("Contact")').first().click();
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

  test('should prevent duplicate products in wishlist with notification', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Products"');
    await page.waitForTimeout(500);
    
    // Click on the first product's wishlist heart
    const firstProductCard = page.locator('[data-testid="product-card"]').first();
    const heartButton = firstProductCard.locator('[data-testid="wishlist-heart"]');
    await heartButton.click();
    await page.waitForTimeout(500);
    
    // Create a new wishlist
    await page.fill('input[placeholder="Enter wishlist name"]', 'Test Wishlist');
    await page.fill('textarea[placeholder="Add a description (optional)"]', 'Test description');
    await page.click('text="Create Wishlist"');
    await page.waitForTimeout(500);
    
    // Verify success notification appears
    await expect(page.locator('text="Added"')).toBeVisible();
    await page.waitForTimeout(3000); // Wait for notification to disappear
    
    // Try to add the same product to the same wishlist again
    await heartButton.click();
    await page.waitForTimeout(500);
    
    // Click on the existing wishlist
    await page.click('text="Test Wishlist"');
    await page.waitForTimeout(500);
    
    // Verify duplicate prevention notification appears
    await expect(page.locator('.fixed.top-4.right-4')).toBeVisible();
    const notificationText = await page.locator('.fixed.top-4.right-4').textContent();
    expect(notificationText).toContain('is already in');
    
    // Wait for notification to disappear
    await page.waitForTimeout(3500);
    await expect(page.locator('.fixed.top-4.right-4')).not.toBeVisible();
  });

  test('should display Pinterest-style wishlist modal with grid layout', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Products"');
    await page.waitForTimeout(500);
    
    // Click on the first product's wishlist heart to open modal
    const firstProductCard = page.locator('[data-testid="product-card"]').first();
    const heartButton = firstProductCard.locator('[data-testid="wishlist-heart"]');
    await heartButton.click();
    await page.waitForTimeout(500);
    
    // Check modal is open with Pinterest-style layout
    await expect(page.locator('text="Save to Wishlist"')).toBeVisible();
    
    // Verify compact product preview
    const productPreview = page.locator('.w-8.h-8.object-cover'); // 8x8 image
    await expect(productPreview).toBeVisible();
    
    // Verify grid layout exists
    const gridContainer = page.locator('.grid.grid-cols-3');
    await expect(gridContainer).toBeVisible();
    
    // Verify "Create New" card is square with plus icon
    const createNewCard = page.locator('button:has-text("Create New")');
    await expect(createNewCard).toBeVisible();
    const createNewClass = await createNewCard.getAttribute('class');
    expect(createNewClass).toContain('aspect-square');
    
    // Verify plus icon in create new card
    const plusIcon = createNewCard.locator('.w-6.h-6'); // Plus icon
    await expect(plusIcon).toBeVisible();
    
    // Test create new wishlist functionality
    await createNewCard.click();
    await page.waitForTimeout(300);
    
    // Verify form appears
    await expect(page.locator('input[placeholder="Enter wishlist name"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="Add a description (optional)"]')).toBeVisible();
    
    // Fill form and create wishlist
    await page.fill('input[placeholder="Enter wishlist name"]', 'Pinterest Test Wishlist');
    await page.click('text="Create Wishlist"');
    await page.waitForTimeout(500);
    
    // Verify success notification
    await expect(page.locator('text="Added"')).toBeVisible();
    
    // Open modal again to verify the new wishlist appears in grid
    await page.waitForTimeout(3000); // Wait for notification to disappear
    await heartButton.click();
    await page.waitForTimeout(500);
    
    // Verify the new wishlist appears as a card in the grid
    const wishlistCard = page.locator('button:has-text("Pinterest Test Wishlist")');
    await expect(wishlistCard).toBeVisible();
    const wishlistCardClass = await wishlistCard.getAttribute('class');
    expect(wishlistCardClass).toContain('aspect-square');
  });

  test('should not show empty subcategory banner space when All Products is selected', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Products"');
    await page.waitForTimeout(500);
    
    // Click on "All Products" to ensure it's selected
    await page.click('text="All Products"');
    await page.waitForTimeout(500);
    
    // Check that subcategory banner is not visible
    const subcategoryBanner = page.locator('text="All Types"');
    await expect(subcategoryBanner).not.toBeVisible();
    
    // Check that the header bar has correct positioning (top-24 instead of top-36)
    const headerBar = page.locator('span:has-text("products found")').locator('..');
    const headerClass = await headerBar.getAttribute('class');
    expect(headerClass).toContain('top-24');
    expect(headerClass).not.toContain('top-36');
    
    // Click on a specific category to verify subcategory banner appears
    await page.click('text="Stationery"');
    await page.waitForTimeout(500);
    
    // Check that subcategory banner is now visible
    await expect(subcategoryBanner).toBeVisible();
    
    // Check that the header bar now has correct positioning (top-36)
    const updatedHeaderClass = await headerBar.getAttribute('class');
    expect(updatedHeaderClass).toContain('top-36');
  });

  test('should have improved filter positioning without excessive scrolling', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Products"');
    await page.waitForTimeout(500);
    
    // Click on a category to trigger filter updates
    await page.click('text="Jewelry"');
    await page.waitForTimeout(500);
    
    // Check that sidebar is sticky and full height
    const sidebar = page.locator('.w-80').first();
    const sidebarClass = await sidebar.getAttribute('class');
    expect(sidebarClass).toContain('h-screen');
    expect(sidebarClass).toContain('sticky');
    expect(sidebarClass).toContain('top-0');
    
    // Check that filter sections are visible without scrolling
    await expect(page.locator('text="Price Range"')).toBeVisible();
    await expect(page.locator('text="Color"')).toBeVisible();
    await expect(page.locator('text="Brand"')).toBeVisible();
    
    // Verify compact spacing is applied
    const priceHeader = page.locator('h3:has-text("Price Range")');
    const priceHeaderClass = await priceHeader.getAttribute('class');
    expect(priceHeaderClass).toContain('text-base'); // instead of text-lg
    expect(priceHeaderClass).toContain('mb-3'); // instead of mb-4
    
    // Test that filter interactions work properly
    await page.locator('input[type="checkbox"]').first().click();
    await page.waitForTimeout(200);
    
    // Check that filters are applied (products count changes)
    const productCount = await page.locator('span:has-text("products found")').textContent();
    expect(productCount).toMatch(/\d+ products found/);
  });

  test('should display wrapped subcategories without carousel arrows', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Products"');
    await page.waitForTimeout(500);
    
    // Click on a category to show subcategory banner
    await page.click('text="Jewelry"');
    await page.waitForTimeout(500);
    
    // Verify subcategory banner is visible with wrapping layout
    await expect(page.locator('text="All Types"')).toBeVisible();
    
    // Verify subcategories are displayed in flex-wrap format (no arrows)
    const subcategoryContainer = page.locator('.flex.flex-wrap.items-center.gap-3.justify-center');
    await expect(subcategoryContainer).toBeVisible();
    
    // Test that clicking a subcategory works with brown styling (not gradient)
    await page.click('text="All Types"');
    await page.waitForTimeout(500);
    
    // Verify All Types is active with brown styling
    const activeSubcategory = page.locator('button:has-text("All Types")');
    const activeClass = await activeSubcategory.getAttribute('class');
    expect(activeClass).toContain('bg-luxury-maroon');
    expect(activeClass).toContain('text-white');
    expect(activeClass).not.toContain('bg-gradient-to-r'); // Should not have gradient
  });

  test('should have working navigation from product details back to products', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Products"');
    await page.waitForTimeout(500);
    
    // Click on a product to open detail view
    const firstProductCard = page.locator('[data-testid="product-card"]').or(page.locator('.group:has(img)')).first();
    await firstProductCard.click();
    await page.waitForTimeout(1000);
    
    // Verify detail view is open
    const detailView = page.locator('.fixed.inset-0.z-40');
    await expect(detailView).toBeVisible();
    
    // Verify Navigation is present and functional in detail view (use first() since there may be multiple)
    await expect(page.locator('img[alt="Wedding Ease Logo"]').first()).toBeVisible();
    await expect(page.locator('nav').locator('button:has-text("Products")')).toBeVisible();
    
    // Test "Back to Products" button
    const backButton = page.locator('text="Back to Products"');
    await expect(backButton).toBeVisible();
    await backButton.click();
    await page.waitForTimeout(500);
    
    // Verify we're back to products page and modal is closed
    await expect(detailView).not.toBeVisible();
    await expect(page.locator('span:has-text("products found")')).toBeVisible();
    
    // Open detail view again to test top navigation
    await firstProductCard.click();
    await page.waitForTimeout(1000);
    await expect(detailView).toBeVisible();
    
    // Test top navigation "Products" button from detail view
    const productsNavButton = page.locator('button:has-text("Products")');
    await productsNavButton.click();
    await page.waitForTimeout(500);
    
    // Verify navigation worked and modal is closed
    await expect(detailView).not.toBeVisible();
    await expect(page.locator('span:has-text("products found")')).toBeVisible();
    expect(page.url()).toContain('/products');
    
    // Test navigation to other pages from detail view
    await firstProductCard.click();
    await page.waitForTimeout(1000);
    await expect(detailView).toBeVisible();
    
    // Click Home in top navigation
    const homeNavButton = page.locator('button:has-text("Home")');
    await homeNavButton.click();
    await page.waitForTimeout(500);
    
    // Verify navigation to home worked
    expect(page.url()).toBe(page.url().replace(/\/products.*/, '/'));
  });

  test('should always scroll to top when navigating to Products page', async ({ page }) => {
    // Start from homepage
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Scroll down on homepage
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);
    
    // Navigate to Products
    await page.click('text="Products"');
    await page.waitForTimeout(1000);
    
    // Check that we're at the top of the page
    const scrollPosition = await page.evaluate(() => window.pageYOffset);
    expect(scrollPosition).toBe(0);
    
    // Verify search bar is visible (should be at top)
    await expect(page.locator('input[placeholder*="Search wedding products"]')).toBeVisible();
    
    // Scroll down in Products page
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);
    
    // Navigate to another page
    await page.click('text="Home"');
    await page.waitForTimeout(500);
    
    // Navigate back to Products
    await page.click('text="Products"');
    await page.waitForTimeout(1000);
    
    // Verify we're back at the top
    const finalScrollPosition = await page.evaluate(() => window.pageYOffset);
    expect(finalScrollPosition).toBe(0);
    
    // Test navigation from Account page
    await page.click('text="Account"');
    await page.waitForTimeout(500);
    
    // Scroll down in Account page
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(300);
    
    // Navigate to Products
    await page.click('text="Products"');
    await page.waitForTimeout(1000);
    
    // Verify we're at the top of Products page
    const accountToProductsScroll = await page.evaluate(() => window.pageYOffset);
    expect(accountToProductsScroll).toBe(0);
    await expect(page.locator('input[placeholder*="Search wedding products"]')).toBeVisible();
  });

  test('should have consistent spacing between navigation items including Contact and Account', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Products"');
    await page.waitForTimeout(500);
    
    // Get navigation items
    const aboutButton = page.locator('button:has-text("About")');
    const contactButton = page.locator('button:has-text("Contact")').first();
    const accountButton = page.locator('button:has-text("Account")');
    
    // Verify all navigation buttons are visible
    await expect(aboutButton).toBeVisible();
    await expect(contactButton).toBeVisible();
    await expect(accountButton).toBeVisible();
    
    // Get bounding boxes for spacing calculation
    const aboutBox = await aboutButton.boundingBox();
    const contactBox = await contactButton.boundingBox();
    const accountBox = await accountButton.boundingBox();
    
    if (aboutBox && contactBox && accountBox) {
      // Calculate spacing between About and Contact
      const aboutContactSpacing = contactBox.x - (aboutBox.x + aboutBox.width);
      
      // Calculate spacing between Contact and Account
      const contactAccountSpacing = accountBox.x - (contactBox.x + contactBox.width);
      
      // Contact-Account spacing should be larger than About-Contact spacing (intentionally increased)
      const spacingDifference = Math.abs(aboutContactSpacing - contactAccountSpacing);
      expect(spacingDifference).toBeGreaterThan(15); // Contact-Account gap should be noticeably larger
      expect(contactAccountSpacing).toBeGreaterThan(aboutContactSpacing); // Account should have more space
    }
    
    // Verify Account button has proper wrapper for increased spacing  
    const accountWrapper = page.locator('.mr-8:has(button:has-text("Account"))');
    await expect(accountWrapper).toBeVisible();
    
    // Test that all navigation buttons are functional
    await aboutButton.click();
    await page.waitForTimeout(1000);
    
    await page.click('text="Products"'); // Navigate back to products
    await page.waitForTimeout(500);
    
    await contactButton.click();
    await page.waitForTimeout(1000);
    
    await page.click('text="Products"'); // Navigate back to products
    await page.waitForTimeout(500);
    
    await accountButton.click();
    await page.waitForTimeout(500);
    expect(page.url()).toContain('/account');
  });

  test('should have proper separation between banner and products in list view', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Products"');
    await page.waitForTimeout(500);
    
    // Switch to list view
    const viewToggleContainer = page.locator('.flex.items-center.gap-1.bg-white\\/80.rounded-xl');
    const listButton = viewToggleContainer.locator('button').last();
    await listButton.click();
    await page.waitForTimeout(500);
    
    // Verify list view is active
    const productsContainer = page.locator('.space-y-4.mt-6');
    await expect(productsContainer).toBeVisible();
    
    // Get the banner and first product positions
    const banner = page.locator('span:has-text("products found")').locator('..');
    const firstProduct = page.locator('.group.relative.bg-white\\/90').first();
    
    await expect(banner).toBeVisible();
    await expect(firstProduct).toBeVisible();
    
    // Get bounding boxes
    const bannerBox = await banner.boundingBox();
    const productBox = await firstProduct.boundingBox();
    
    if (bannerBox && productBox) {
      // Calculate the gap between banner bottom and product top
      const gap = productBox.y - (bannerBox.y + bannerBox.height);
      
      // There should be adequate spacing (at least 16px)
      expect(gap).toBeGreaterThan(16);
    }
    
    // Verify list view styling is applied
    const listViewClass = await firstProduct.getAttribute('class');
    expect(listViewClass).toContain('flex');
    expect(listViewClass).toContain('gap-6');
    expect(listViewClass).toContain('p-6');
    
    // Test switching back to grid view
    const gridButton = viewToggleContainer.locator('button').first();
    await gridButton.click();
    await page.waitForTimeout(500);
    
    // Verify grid view is restored
    const gridContainer = page.locator('.grid.grid-cols-1');
    await expect(gridContainer).toBeVisible();
    
    // Switch back to list view to ensure consistency
    await listButton.click();
    await page.waitForTimeout(500);
    
    // Verify list view container has proper styling
    const listContainer = page.locator('.pt-8');
    await expect(listContainer).toBeVisible();
  });

  test('should display only filled color circles in filters, no empty ones', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Products"');
    await page.waitForTimeout(500);
    
    // Test different categories to ensure all colors are properly filled
    const categories = ['All Products', 'Stationery', 'Attire', 'Jewelry'];
    
    for (const category of categories) {
      // Select category
      await page.click(`text="${category}"`);
      await page.waitForTimeout(500);
      
      // Find color filter section
      const colorFilterSection = page.locator('h3:has-text("Color")').locator('..');
      await expect(colorFilterSection).toBeVisible();
      
      // Get all color circle buttons
      const colorButtons = colorFilterSection.locator('button.w-8.h-8.rounded-full');
      const buttonCount = await colorButtons.count();
      
      if (buttonCount > 0) {
        // Check each color button has a proper background
        for (let i = 0; i < buttonCount; i++) {
          const button = colorButtons.nth(i);
          const buttonClass = await button.getAttribute('class');
          
          // Verify button has a background color class (not empty)
          const hasBackgroundColor = 
            buttonClass?.includes('bg-yellow-') ||    // gold
            buttonClass?.includes('bg-gray-') ||      // silver, white-gold, platinum
            buttonClass?.includes('bg-black') ||      // black
            buttonClass?.includes('bg-white') ||      // white
            buttonClass?.includes('bg-amber-') ||     // ivory, copper
            buttonClass?.includes('bg-rose-') ||      // rose-gold
            buttonClass?.includes('bg-red-') ||       // red, maroon
            buttonClass?.includes('bg-blue-') ||      // blue
            buttonClass?.includes('bg-pink-') ||      // pink
            buttonClass?.includes('bg-green-') ||     // green
            buttonClass?.includes('bg-purple-');      // purple
          
          expect(hasBackgroundColor).toBe(true);
          
          // Test clicking the color button
          await button.click();
          await page.waitForTimeout(200);
          
          // Verify the button shows selected state
          const updatedClass = await button.getAttribute('class');
          expect(updatedClass).toContain('border-luxury-dusty-rose');
          expect(updatedClass).toContain('ring-2');
          
          // Click again to deselect
          await button.click();
          await page.waitForTimeout(200);
        }
      }
    }
    
    // Specifically test white and ivory colors have proper borders
    await page.click('text="Stationery"');
    await page.waitForTimeout(500);
    
    const whiteButton = page.locator('button[title="White"]');
    if (await whiteButton.isVisible()) {
      const whiteClass = await whiteButton.getAttribute('class');
      expect(whiteClass).toContain('bg-white');
      expect(whiteClass).toContain('border-gray-300');
    }
    
    const ivoryButton = page.locator('button[title="Ivory"]');
    if (await ivoryButton.isVisible()) {
      const ivoryClass = await ivoryButton.getAttribute('class');
      expect(ivoryClass).toContain('bg-amber-50');
      expect(ivoryClass).toContain('border-amber-200');
    }
  });

  test('should redirect to Products page when clicking Explore button on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    // Find and click the Explore button on the homepage hero section
    const exploreButton = page.locator('button:has-text("Explore")');
    await expect(exploreButton).toBeVisible();
    
    // Verify the button has the correct styling (hero button style)
    const buttonClass = await exploreButton.getAttribute('class');
    expect(buttonClass).toContain('text-white');
    expect(buttonClass).toContain('border-2');
    expect(buttonClass).toContain('border-white');
    
    // Click the Explore button
    await exploreButton.click();
    await page.waitForTimeout(1000);
    
    // Verify we're redirected to Products page
    expect(page.url()).toContain('/products');
    
    // Verify Products page content is loaded
    await expect(page.locator('input[placeholder*="Search wedding products"]')).toBeVisible();
    await expect(page.locator('span:has-text("products found")')).toBeVisible();
    await expect(page.locator('text="All Products"')).toBeVisible();
    
    // Verify we can see products
    const productCards = page.locator('.group:has(img)');
    await expect(productCards.first()).toBeVisible();
    
    // Test navigation back to homepage
    await page.click('text="Home"');
    await page.waitForTimeout(1000);
    expect(page.url()).toBe(page.url().replace(/\/products.*/, '/'));
    
    // Verify Explore button is still functional on return
    await expect(exploreButton).toBeVisible();
  });

  test('should show natural top view when redirected from Services page', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    // Scroll down to Services section
    await page.evaluate(() => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(1000);
    
    // Verify we're scrolled down to Services
    const scrollPosition = await page.evaluate(() => window.pageYOffset);
    expect(scrollPosition).toBeGreaterThan(500);
    
    // Click on a service to redirect to Products (e.g., Wedding Attire)
    const weddingAttireService = page.locator('text="Wedding Attire"').first();
    await expect(weddingAttireService).toBeVisible();
    await weddingAttireService.click();
    await page.waitForTimeout(1000);
    
    // Verify we're redirected to Products page with correct category
    expect(page.url()).toContain('/products');
    expect(page.url()).toContain('category=attire');
    
    // Verify we're at the top of the page (natural view)
    const productsScrollPosition = await page.evaluate(() => window.pageYOffset);
    expect(productsScrollPosition).toBe(0);
    
    // Verify search bar is visible (should be at top)
    await expect(page.locator('input[placeholder*="Search wedding products"]')).toBeVisible();
    
    // Verify category is properly selected
    await expect(page.locator('button:has-text("Attire")').first()).toBeVisible();
    
    // Test another service redirect
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    // Navigate to Services section again
    await page.evaluate(() => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(1000);
    
    // Click on Luxury Jewelry service
    const jewelryService = page.locator('text="Luxury Jewelry"').first();
    await expect(jewelryService).toBeVisible();
    await jewelryService.click();
    await page.waitForTimeout(1000);
    
    // Verify redirect works and shows top view
    expect(page.url()).toContain('/products');
    expect(page.url()).toContain('category=jewelry');
    
    const jewelryScrollPosition = await page.evaluate(() => window.pageYOffset);
    expect(jewelryScrollPosition).toBe(0);
    
    // Verify Jewelry category is selected
    await expect(page.locator('button:has-text("Jewelry")').first()).toBeVisible();
  });

  test('should have Pinterest-style wishlist management in Account page', async ({ page }) => {
    await page.goto('/');
    await page.click('text="Products"');
    await page.waitForTimeout(500);
    
    // Navigate to Account page
    await page.click('text="Account"');
    await page.waitForTimeout(1000);
    
    // Click on Wishlist section
    await page.click('text="Wishlist"');
    await page.waitForTimeout(500);
    
    // Verify wishlist collections description
    await expect(page.locator('text="created"')).toBeVisible();
    
    // Verify wishlist boards are displayed
    const wishlistCards = page.locator('.aspect-square.bg-white.border');
    await expect(wishlistCards.first()).toBeVisible();
    
    // Verify "Create New" card is present
    const createNewCard = page.locator('button:has-text("Create New")');
    await expect(createNewCard).toBeVisible();
    
    // Test creating a new wishlist
    await createNewCard.click();
    await page.waitForTimeout(500);
    
    // Verify modal appears
    await expect(page.locator('text="Create New Wishlist"')).toBeVisible();
    
    // Fill in wishlist details
    await page.fill('input[placeholder="Enter wishlist name"]', 'Test Pinterest Wishlist');
    await page.fill('textarea[placeholder="Add a description"]', 'My test wishlist description');
    
    // Create the wishlist
    await page.click('text="Create Wishlist"');
    await page.waitForTimeout(500);
    
    // Verify success notification
    await expect(page.locator('.fixed.top-4.right-4')).toBeVisible();
    
    // Wait for notification to disappear
    await page.waitForTimeout(3500);
    
    // Verify new wishlist appears in grid
    const newWishlistCard = page.locator('button:has-text("Test Pinterest Wishlist")');
    await expect(newWishlistCard).toBeVisible();
    
    // Test clicking on a wishlist to view products
    await newWishlistCard.click();
    await page.waitForTimeout(500);
    
    // Verify we're in individual wishlist view
    await expect(page.locator('text="Back to Wishlists"')).toBeVisible();
    await expect(page.locator('h2:has-text("Test Pinterest Wishlist")')).toBeVisible();
    
    // Verify empty state for new wishlist
    await expect(page.locator('text="No products in this wishlist"')).toBeVisible();
    await expect(page.locator('text="Browse Products"')).toBeVisible();
    
    // Test back navigation
    await page.click('text="Back to Wishlists"');
    await page.waitForTimeout(500);
    
    // Verify we're back to wishlist boards view
    await expect(wishlistCards.first()).toBeVisible();
    await expect(createNewCard).toBeVisible();
    
    // Test Browse Products button from empty wishlist
    await newWishlistCard.click();
    await page.waitForTimeout(500);
    
    const browseProductsButton = page.locator('text="Browse Products"');
    await browseProductsButton.click();
    await page.waitForTimeout(1000);
    
    // Verify navigation to Products page
    expect(page.url()).toContain('/products');
    await expect(page.locator('input[placeholder*="Search wedding products"]')).toBeVisible();
  });
}); 