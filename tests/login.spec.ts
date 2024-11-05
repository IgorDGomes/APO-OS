import { test, expect } from '@playwright/test';

test.describe.configure({ retries: 2 });

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
});

test.describe("Login Page", () => {

  test.beforeEach("should be allowed to login", async ({ page }) => {
    const username = page.getByPlaceholder("Username");

    await username.fill("admin");
    await username.press("Enter");

    const password = page.getByPlaceholder("Password");

    await password.fill("12345");
    await password.press("Enter");

    await expect(page).toHaveURL("http://127.0.0.1:3000/home");
  });

  test("shouldn't return to login page", async ({ page }) => {
    await page.goto("http://127.0.0.1:3000/");

    await expect(page).toHaveURL("http://127.0.0.1:3000/home");
  });
});