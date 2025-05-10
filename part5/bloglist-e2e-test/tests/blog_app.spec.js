const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "john doe",
        username: "doeee",
        password: "password",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(
      page.getByText(
        "log in to application",
      ),
    ).toBeVisible();
  });

  describe("Login", () => {
    test("successful login", async ({ page }) => {
      await page.getByTestId("username").fill("doeee");
      await page.getByTestId("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("blogs")).toBeVisible();
    });

    test("unsuccessful login", async ({ page }) => {
      await page.getByTestId("username").fill("doeee");
      await page.getByTestId("password").fill("wrong password");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("incorrect username or password"))
        .toBeVisible();
    });
  });
});
