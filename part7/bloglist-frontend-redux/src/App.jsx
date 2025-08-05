import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer.js";
import { createBlog, removeBlog, updateLike } from "./reducers/blogReducer.js";
import { logIn, removeUser, setUser } from "./reducers/loginReducer.js";
import Blog from "./components/Blog.jsx";
import Notification from "./components/Notification.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import Togglable from "./components/Togglable.jsx";
import BlogForm from "./components/BlogForm.jsx";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const togglableRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => {
  //     const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  //     setBlogs(sortedBlogs);
  //   });
  // }, []);

  useEffect(() => {
    const userLogged = window.localStorage.getItem("loggedBlogUser");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      dispatch(logIn(user));
    }
  }, []);

  const handleBlogCreate = (blog) => {
    try {
      dispatch(createBlog(blog));
      togglableRef.current.toggleVisible();

      dispatch(
        setNotification(`A new Blog ${blog.title} by ${blog.author} added`, 5),
      );
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 5));
    }
  };

  const handleLike = (blog) => {
    // const newBlog = {
    //   author: blog.author,
    //   likes: blog.likes + 1,
    //   url: blog.url,
    //   title: blog.title,
    //   user: blog.user.id,
    // };

    try {
      dispatch(updateLike(blog));
      // const updatedBlog = await blogService.update(blog.id, newBlog);
      //
      // const newBlogs = blogs.map((b) =>
      //   b.id === updatedBlog.id ? updatedBlog : b
      // );
      // newBlogs.sort((a, b) => b.likes - a.likes);
      // setBlogs(newBlogs);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemove = async (blog) => {
    const confirmRemove = window.confirm(
      `Remove Blog ${blog.title} by ${blog.author}`,
    );

    if (!confirmRemove) {
      return;
    }

    try {
      // await blogService.remove(blog.id);
      // const newBlogs = blogs.filter((b) => b.id !== blog.id);
      dispatch(removeBlog(blog));
      // setBlogs(newBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(setUser({ username, password }));
      // const user = await loginService.login({ username, password });
      //
      // window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      // setUser(user);
      // blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 5));
    }
  };

  if (user === null) {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button
          type="button"
          onClick={() => dispatch(removeUser())}
        >
          logout
        </button>
      </p>
      <Togglable ref={togglableRef}>
        <BlogForm
          handleBlogCreate={handleBlogCreate}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
