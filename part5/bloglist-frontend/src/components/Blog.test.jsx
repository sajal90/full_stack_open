import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog.jsx";
import { expect } from "chai";

test("blog renders title author", () => {
  const blog = {
    title: "this is a blog",
    author: "me",
    url: "https://example.com",
    likes: 37,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("this is a blog");
  expect(div).toHaveTextContent("me");
  expect(div).not.toHaveTextContent("https://example.com");
  expect(div).not.toHaveTextContent(37);
});

test("url and likes shown on click", async () => {
  const user = {
    name: "denji",
    username: "dennis",
  };
  const blog = {
    title: "this is a blog",
    author: "me",
    url: "https://example.com",
    likes: 37,
    user: {
      name: "denji",
      username: "dennis",
    },
  };

  const { container } = render(<Blog blog={blog} user={user} />);

  const div = container.querySelector(".blog");
  const clicker = userEvent.setup();
  const button = screen.getByText("view");
  await clicker.click(button);

  expect(div).toHaveTextContent("https://example.com");
  expect(div).toHaveTextContent(37);
});

test("likes is clicked twice", async () => {
  const user = {
    name: "denji",
    username: "dennis",
  };

  const blog = {
    title: "this is a blog",
    author: "me",
    url: "https://example.com",
    likes: 37,
    user: {
      name: "denji",
      username: "dennis",
    },
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} user={user} handleLike={mockHandler} />);

  const viewButton = screen.getByText("view");
  const clicker = userEvent.setup();
  await clicker.click(viewButton);

  const likeButton = screen.getByText("like");
  await clicker.click(likeButton);
  await clicker.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
