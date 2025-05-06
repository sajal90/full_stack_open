import { render } from "@testing-library/react";
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
