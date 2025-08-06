import { useParams } from "react-router-dom";

const Blog = ({ blogs, handleLike, handleRemove, user }) => {
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <div>
          {blog.url}
          <div>
            likes {blog.likes}
            <button type="button" onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>
            added by {blog.user.name}
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
      </div>
    </div>
  );
};

export default Blog;
