import { test, expect } from '@playwright/test';

test.describe.configure({ retries: 2 });

test.beforeEach(async ({ page }) => {
  await page.goto('https://apo-os.vercel.app/');
});

test.describe("Login Page", () => {

  test.beforeEach("should be allowed to login", async ({ page }) => {
    const username = page.getByPlaceholder("Username");

    await username.fill("admin");
    await username.press("Enter");

    const password = page.getByPlaceholder("Password");

    await password.fill("12345");
    await password.press("Enter");

    await expect(page).toHaveURL("https://apo-os.vercel.app/home");
  });

  test("shouldn't return to login page", async ({ page }) => {
    await page.goto("https://apo-os.vercel.app/");

    await expect(page).toHaveURL("https://apo-os.vercel.app/home");
  });
});