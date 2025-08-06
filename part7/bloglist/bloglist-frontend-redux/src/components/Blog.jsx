import { useParams } from "react-router-dom";
import { useState } from "react";
import blogService from "../services/blogs.js";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../reducers/blogReducer.js";

const Blog = ({ blogs, handleLike, handleRemove, user }) => {
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  const handleSumbit = (event) => {
    event.preventDefault();

    dispatch(addComment(id, { comment: event.target.comment.value }));
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

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
          <h2>comments</h2>
          <form onSubmit={handleSumbit}>
            <input
              name="comment"
              value={comment}
              onChange={handleCommentChange}
            />
            <button type="sumbit">add comment</button>
          </form>
          <ul>
            {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;
