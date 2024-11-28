import { test, expect } from '@playwright/test';

test.describe.configure({ retries: 2 });

test.beforeEach(async ({ page }) => {
    await page.goto('https://apo-os.vercel.app/');
});

test.describe("Home Page", () => {
    test.beforeEach("should be allowed to login", async ({ page }) => {
        const username = page.getByPlaceholder("Username");

        await username.fill("admin");
        await username.press("Enter");

        const password = page.getByPlaceholder("Password");

        await password.fill("12345");
        await password.press("Enter");
    });

    test("should have header links", async ({ page }) => {
        await expect(page.getByRole("button", { name: "Applications" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Pinned" })).toBeVisible();
    });

    // test("should have side bar links", async ({ page }) => {
    //     await expect(page).toHaveURL(/.*home/);
    // });
})