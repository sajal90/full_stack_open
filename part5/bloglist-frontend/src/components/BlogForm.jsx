import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ handleBlogCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (event) => {
    event.preventDefault();
    handleBlogCreate({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="blog-form">
      <h1>create new</h1>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            data-testid="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleBlogCreate: PropTypes.func.isRequired,
};

export default BlogForm;
