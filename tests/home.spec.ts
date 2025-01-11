import { test, expect } from '@playwright/test';

test.describe.configure({ retries: 2 });

test.beforeEach(async ({ page }) => {
    await page.goto('https://apo-os.vercel.app/');
    const username = page.getByPlaceholder("Username");

    await username.fill("admin");
    await username.press("Enter");

    const password = page.getByPlaceholder("Password");

    await password.fill("12345");
    await password.press("Enter");
});

test.describe("Home Page", () => {
    test("should have header links", async ({ page }) => {
        await expect(page.getByRole("button", { name: "Applications" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Pinned" })).toBeVisible();
    });

    // test("should redirect to github", async ({ page }) => {
    //     const github = page.getByRole('link', { name: "GitHub" });

    //     await github.click({ button: "left" });
    //     await expect(page).toHaveURL("https://github.com/IgorDGomes");
    // });

    // test("should logout", async ({ page }) => {
    //     const button = page.locator('div').filter({ hasText: /^23:16100%$/ }).getByRole('button');

    //     await button.click({ button: "left" });
    //     await expect(page.getByText("Are you sure you want to exit?")).toBeVisible();
    //     await page.getByTestId("deleteCookies").click({ button: "left" });
    //     await expect(page).toHaveURL("https://apo-os.vercel.app/");
    // });
})

test.describe("Terminal", () => {
    test("should open the Terminal", async ({ page }) => {
        const terminal = page.locator('button').first()

        await terminal.click({ button: 'left' })
        await expect(page.getByText("Terminal")).toBeVisible();
        await expect(page.getByText("somebody@apos-desktop")).toBeVisible();
    });
})

test.describe("File Manager", () => {
    test("should open the File Manager", async ({ page }) => {
        const terminal = page.locator('button:nth-child(3)')

        await terminal.click({ button: 'left' })
        await expect(page.getByText("somebody - File Manager")).toBeVisible();
    });
})

test.describe("Browser", () => {
    test("should open the Browser", async ({ page }) => {
        const terminal = page.locator('button:nth-child(5)')

        await terminal.click({ button: 'left' })
        await expect(page.getByText("No Internet")).toBeVisible();
        await expect(page.getByText("Checking the network cables")).toBeVisible();
    });
})

test.describe("Text Editor", () => {
    test("should open the Text Editor", async ({ page }) => {
        const terminal = page.locator('button:nth-child(7)')

        await terminal.click({ button: 'left' })
        await expect(page.getByText("Code Editor")).toBeVisible();
    });
})

test.describe("Clock", () => {
    test("should open the Clock", async ({ page }) => {
        const terminal = page.locator('button:nth-child(11)')

        await terminal.click({ button: 'left' })
        await expect(page.getByText("Clock")).toBeVisible();
        await expect(page.getByText("Alarm", { exact: true })).toBeVisible();
        await expect(page.getByText("Stopwatch")).toBeVisible();
        await expect(page.getByText("Timer")).toBeVisible();
    });
})