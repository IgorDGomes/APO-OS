import test, { expect } from "@playwright/test";

test.describe("Mobile View", () => {
  test.use({
    viewport: { height: 812, width: 375 },
  });

  test("should display the mobile restriction page", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: /a bigger screen is needed/i,
      }),
    ).toBeVisible();
  });
});