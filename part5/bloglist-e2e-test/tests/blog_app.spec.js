const { test, expect, beforeEach, describe } = require("@playwright/test");
import { loginWith } from "./helper.js";

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

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "doeee", "password");
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("this is a blog");
      await page.getByTestId("author").fill("me");
      await page.getByTestId("url").fill("https://example.com");
      await page.getByRole("button", { name: "create" }).click();

      await expect(page.getByText("this is a blog me")).toBeVisible();
    });
  });
});
