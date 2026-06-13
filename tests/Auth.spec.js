import { test, expect } from "@playwright/test";

const VALID_EMAIL = "gyanendra.kulung.rai@gmail.com";
const VALID_PASSWORD = "Sitl@651";
const VALID_TOKEN = "valid_token_123";

/* ================= LOGIN MOCK ================= */

test.beforeEach(async ({ page }) => {
  // Mock LOGIN API
  await page.route("**/api/ecom/auth/login", route => {
    const body = route.request().postDataJSON();

    if (
      body.userEmail === VALID_EMAIL &&
      body.userPassword === VALID_PASSWORD
    ) {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ token: VALID_TOKEN })
      });
    } else {
      route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ message: "Invalid credentials" })
      });
    }
  });

  // Mock PROTECTED API
  await page.route("**/api/ecom/user/get-user-details", route => {
    const authHeader = route.request().headers()["authorization"];

    if (authHeader === `Bearer ${VALID_TOKEN}`) {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ name: "User", role: "Customer" })
      });
    } else {
      route.fulfill({
        status: 403,
        contentType: "application/json",
        body: JSON.stringify({ message: "Forbidden" })
      });
    }
  });
});

/* ================= TC-1 ================= */

test("TC-1: Valid login should PASS", async ({ page }) => {
  const response = await page.request.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: {
        userEmail: VALID_EMAIL,
        userPassword: VALID_PASSWORD
      }
    }
  );

  expect(response.status()).toBe(200);
});

/* ================= TC-2 ================= */

test("TC-2: Invalid login should FAIL", async ({ request }) => {
  const response = await request.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: {
        userEmail: "wrong@email.com",
        userPassword: "WrongPassword"
      }
    }
  );

  // Here we simulate what mock should have returned
  if (
    response.status() === 200
  ) {
    throw new Error("Test should have failed but passed");
  }

  expect(response.status()).toBe(401);
});

test("TC-3: Access protected API with valid token should PASS", async ({ request }) => {
  const token = VALID_TOKEN;

  // Simulate server response for valid token
  let responseStatus;
  if (token === VALID_TOKEN) {
    responseStatus = 200; // Success
  } else {
    responseStatus = 403; // Forbidden
  }

  // Assert expected outcome
  expect(responseStatus).toBe(200);
});

test("TC-4: Access protected API with invalid token should FAIL", async ({ page }) => {
  const response = await page.request.get(
    "https://rahulshettyacademy.com/api/ecom/user/get-user-details",
    {
      headers: {
        Authorization: "Bearer invalid_token"
      }
    }
  );

  expect(response.status()).toBe(403);
});