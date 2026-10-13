import test, { expect } from "@playwright/test";

test.describe("GET /api/ping", () => {
  test("returns 200 and a pong message", async ({request}) => {
    const response = await request.get("/api/ping");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain(
      "application/json",
    );

    await expect(response).toBeOK();
    await expect(response).toBeOK();

    const body = await response.json();

    expect(body).toEqual({
      message: "Pong",
    });
  });
  
  test("rejects unsupported methods", async ({ request }) => {
    const response = await request.post("/api/ping");

    expect(response.status()).toBe(405);
  });
});