import { useState } from "react";
const Blog = ({ blog }) => {
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
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisible}>view</button>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button type="button" onClick={toggleVisible}>hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
        <button type="button">like</button>
      </div>
      <div>
        {blog.author}
      </div>
    </div>
  );
};

export default Blog;

