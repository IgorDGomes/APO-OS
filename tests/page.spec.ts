import { test, expect } from '@playwright/test';

test.describe.configure({ retries: 2 });

test.beforeEach(async ({ page }) => {
    await page.goto('https://apo-os.vercel.app/');
});

test.describe("Login Page Info", () => {
    test("should have correct page title", async ({ page }) => {

        await expect(page).toHaveTitle("APO'S");
    });
});
