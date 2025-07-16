import { test, expect } from '@playwright/test';

test.describe('Chat & Consultation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to chat interface
    await page.goto('/account?section=enquiries');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('Video call option should be removed from chat interface', async ({ page }) => {
    // Verify Video Call button is not present
    const videoCallButton = page.locator('button:has-text("Video Call")');
    await expect(videoCallButton).not.toBeVisible();
    
    // Verify only Schedule Meeting button is present
    const scheduleMeetingButton = page.locator('button:has-text("Schedule Meeting")');
    await expect(scheduleMeetingButton).toBeVisible();
  });

  test('Schedule Meeting should implement smart logic based on user status', async ({ page }) => {
    // Click Schedule Meeting button
    const scheduleMeetingButton = page.locator('button:has-text("Schedule Meeting")');
    await expect(scheduleMeetingButton).toBeVisible();
    
    await scheduleMeetingButton.click();
    
    // Wait for navigation
    await page.waitForTimeout(1000);
    
    // Should redirect to bookings section for new users (free consultation)
    await expect(page).toHaveURL('/account?section=bookings');
    
    // Verify booking interface is visible
    await expect(page.locator('text=Book Your Wedding Consultation').first()).toBeVisible();
  });

  test('Chat interface should not have horizontal scroll', async ({ page }) => {
    // Check chat messages area for overflow-x-hidden
    const chatArea = page.locator('div.overflow-y-auto.overflow-x-hidden');
    await expect(chatArea).toBeVisible();
    
    // Verify no horizontal scrollbar
    const scrollWidth = await chatArea.evaluate(el => el.scrollWidth);
    const clientWidth = await chatArea.evaluate(el => el.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test('Input field should be properly positioned at bottom without whitespace', async ({ page }) => {
    // Verify input area has sticky positioning
    const inputArea = page.locator('div.sticky.bottom-0');
    await expect(inputArea).toBeVisible();
    
    // Verify input field is accessible
    const inputField = page.locator('input[placeholder*="Type your message"]');
    await expect(inputField).toBeVisible();
  });

  test('Action buttons should only appear after first message', async ({ page }) => {
    // Send a message to trigger AI response
    const inputField = page.locator('input[placeholder*="Type your message"]');
    await inputField.fill('Hello, I need help with wedding planning');
    await inputField.press('Enter');
    
    // Wait for AI response
    await page.waitForTimeout(1500);
    
    // Verify action buttons appear in first response (should be exactly 2 - initial cards + first response)
    const actionButtons = page.locator('button:has-text("Book Consultation")');
    const buttonCount = await actionButtons.count();
    expect(buttonCount).toBe(2);
    
    // Send another message
    await inputField.fill('Tell me more about packages');
    await inputField.press('Enter');
    
    // Wait for second response
    await page.waitForTimeout(1500);
    
    // Action buttons should not increase (still only 2)
    const finalButtonCount = await actionButtons.count();
    expect(finalButtonCount).toBe(2); // Should not repeat after first interaction
  });

  test('Save booking button should be available and functional', async ({ page }) => {
    // Send a message to trigger options
    const inputField = page.locator('input[placeholder*="Type your message"]');
    await inputField.fill('I want to book a consultation');
    await inputField.press('Enter');
    
    // Wait for AI response with options
    await page.waitForTimeout(1500);
    
    // Click Save Booking button
    const saveBookingButton = page.locator('button:has-text("Save Booking")');
    await expect(saveBookingButton).toBeVisible();
    
    await saveBookingButton.click();
    
    // Verify confirmation message appears in the chat
    await expect(page.locator('text=consultation booking has been saved').first()).toBeVisible();
  });

  test('Product selection and viewing should work in chat', async ({ page }) => {
    // Send a message to trigger product display
    const inputField = page.locator('input[placeholder*="Type your message"]');
    await inputField.fill('Show me your products');
    await inputField.press('Enter');
    
    // Wait for AI response
    await page.waitForTimeout(1500);
    
    // Click Browse Products action button (use first one from the response)
    const browseProductsButton = page.locator('button:has-text("Browse Products")').first();
    await expect(browseProductsButton).toBeVisible();
    
    await browseProductsButton.click();
    
    // Wait for products to load
    await page.waitForTimeout(1000);
    
    // Verify products are displayed
    await expect(page.locator(':has-text("Elegant Bridal Gown")')).toBeVisible();
    await expect(page.locator(':has-text("Diamond Wedding Ring")')).toBeVisible();
    
    // Select a product
    const productCard = page.locator(':has-text("Elegant Bridal Gown")').first();
    await productCard.click();
    
    // Verify selection indicator appears
    await expect(page.locator('div.ring-2.ring-luxury-dusty-rose')).toBeVisible();
    
    // Click View Selected Items button
    const viewSelectedButton = page.locator('button:has-text("View Selected Items")');
    await expect(viewSelectedButton).toBeVisible();
    
    await viewSelectedButton.click();
    
    // Verify selected products summary appears
    await expect(page.locator(':has-text("You have selected 1 products")')).toBeVisible();
    
    // Verify checkout option is available
    await expect(page.locator('button:has-text("Proceed to Checkout")')).toBeVisible();
  });

  test('Chat messages should auto-scroll to bottom', async ({ page }) => {
    // Send multiple messages to test auto-scrolling
    const inputField = page.locator('input[placeholder*="Type your message"]');
    
    for (let i = 1; i <= 3; i++) {
      await inputField.fill(`Message ${i}`);
      await inputField.press('Enter');
      await page.waitForTimeout(1500); // Longer wait for responses
    }
    
    // Wait for all responses
    await page.waitForTimeout(2000);
    
    // Verify scroll area exists and is at bottom
    const chatArea = page.locator('div.overflow-y-auto.overflow-x-hidden');
    await expect(chatArea).toBeVisible();
    
    // Check if we can see the bottom of the chat (verify last message is visible)
    const lastMessage = page.locator('[data-component-content*="Message 3"]').last();
    await expect(lastMessage).toBeVisible();
  });

  test('Attach button should be responsive and show coming soon message', async ({ page }) => {
    // On larger screens, attach button should be visible
    const attachButton = page.locator('button:has-text("📎 Attach")');
    
    // Click attach button
    await attachButton.click();
    
    // Verify coming soon message (look for the toast notification)
    await expect(page.locator('span:has-text("Attach feature coming soon!")').first()).toBeVisible();
  });

  test('AI assistant should provide contextual responses', async ({ page }) => {
    // Test booking-related query
    const inputField = page.locator('input[placeholder*="Type your message"]');
    await inputField.fill('I want to book a consultation appointment');
    await inputField.press('Enter');
    
    await page.waitForTimeout(1500);
    
    // Should get consultation-related response
    await expect(page.locator('div:has-text("consultation")').first()).toBeVisible();
    
    // Test product-related query
    await inputField.fill('Show me wedding dresses');
    await inputField.press('Enter');
    
    await page.waitForTimeout(1500);
    
    // Should get product-related response
    await expect(page.locator('div:has-text("collection")').first()).toBeVisible();
  });
}); 