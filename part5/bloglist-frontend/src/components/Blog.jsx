import { useState } from "react";

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  if (!visible) {
    return (
      <div className="blog" style={blogStyle}>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisible}>view</button>
      </div>
    );
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisible}>hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
        <button type="button" onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        {user.username === blog.user.username
          ? (
            <button type="button" onClick={() => handleRemove(blog)}>
              remove
            </button>
          )
          : ""}
      </div>
    </div>
  );
};

export default Blog;
