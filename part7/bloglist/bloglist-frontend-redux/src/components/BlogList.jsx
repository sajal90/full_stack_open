import { useState } from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 3,
    marginBottom: 5,
    listStyleType: "none",
  };

  return (
    <div>
      <ul style={{ margin: 0, padding: 0 }}>
        {blogs.map((blog) => (
          <li key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
