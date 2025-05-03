import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog.jsx";
import Notification from "./components/Notification.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import Togglable from "./components/Togglable.jsx";
import BlogForm from "./components/BlogForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [noti, setNoti] = useState("");
  const [isError, setIsError] = useState(false);
  const togglableRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  }, []);

  useEffect(() => {
    const userLogged = window.localStorage.getItem("loggedBlogUser");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleBlogCreate = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);

      setBlogs(blogs.concat(newBlog));
      togglableRef.current.toggleVisible();

      setIsError(false);
      setNoti(`A new Blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setNoti("");
      }, 5000);
    } catch (error) {
      setIsError(true);
      setNoti(error.response.data.error);

      setTimeout(() => {
        setNoti("");
      }, 5000);
    }
  };

  const handleLike = async (blog) => {
    const newBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      title: blog.title,
      user: blog.user.id,
    };

    try {
      const updatedBlog = await blogService.update(blog.id, newBlog);

      const newBlogs = blogs.map((b) =>
        b.id == updatedBlog.id ? updatedBlog : b
      );
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      setIsError(true);
      setNoti(error.response.data.error);

      setTimeout(() => {
        setNoti("");
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification isError={isError} message={noti} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            password
            <input
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
      <Notification isError={isError} message={noti} />
      <p>
        {user.name} logged in
        <button
          type="button"
          onClick={() => window.localStorage.removeItem("loggedBlogUser")}
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
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      ))}
    </div>
  );
};

export default App;
