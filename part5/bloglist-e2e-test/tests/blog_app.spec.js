const { test, expect, beforeEach, describe } = require("@playwright/test");
import { createBlog, loginWith } from "./helper.js";

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

    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "jane",
        username: "janee",
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
      await createBlog(page, "archlinux best distro", "sajal", "archlinux.org");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "this is a blog", "me", "example.com");

      await expect(page.getByText("this is a blog me")).toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("user can delete a blog", async ({ page }) => {
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "remove" }).click();

      await expect(page.getByText("archlinux best distro sajal")).not
        .toBeVisible();
    });

    test("only creator can see the remove btn", async ({ page }) => {
      await page.getByRole("button", { name: "logout" }).click();
      await page.goto("http://localhost:5173");
      await loginWith(page, "janee", "password");

      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByText("remove")).not.toBeVisible();
    });
  });
});
