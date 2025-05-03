const BlogForm = (
  {
    handleBlogCreate,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange,
  },
) => {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleBlogCreate}>
        <div>
          title:
          <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
