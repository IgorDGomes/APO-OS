import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe("Login Page Info", () => {
    test("should have correct page title", async ({ page }) => {

        await expect(page).toHaveTitle("APO'S");
    });
});
