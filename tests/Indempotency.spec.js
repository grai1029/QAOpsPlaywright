import { test, expect } from "@playwright/test";

test.skip("PUT API should be idempotent", async ({ request }) => {
  const url = "https://jsonplaceholder.typicode.com/posts/1";

  const payload = {
    id: 1,
    title: "Automation Testing",
    body: "Idempotency check",
    userId: 1
  };

  const res1 = await request.put(url, { data: payload });
  expect(res1.status()).toBe(200);
  const body1 = await res1.json();

  const res2 = await request.put(url, { data: payload });
  expect(res2.status()).toBe(200);
  const body2 = await res2.json();

  expect(body1.title).toBe(body2.title);
  expect(body1.body).toBe(body2.body);
});

test.skip("PATCH API should be idempotent for updated fields", async ({ request }) => {
  const url = "https://reqres.in/api/users/2";

  const payload = {
    job: "Senior QA Engineer"
  };

  const response1 = await request.patch(url, { data: payload });
  expect(response1.status()).toBe(200);
  const body1 = await response1.json();

  const response2 = await request.patch(url, { data: payload });
  expect(response2.status()).toBe(200);
  const body2 = await response2.json();

  // Idempotency check: business field remains same
  expect(body1.job).toBe(body2.job);

  // Informational check (not idempotent)
  expect(body1.updatedAt).not.toBe(body2.updatedAt);
});