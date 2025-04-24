import { useEffect, useState } from "react";
import Blog from "./components/Blog.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userLogged = window.localStorage.getItem("loggedBlogUser");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleBlogCreate = async (event) => {
    event.preventDefault();

    try {
      const blog = { title, author, url };
      const newBlog = await blogService.create(blog);

      setBlogs(blogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  if (user === null) {
    return (
      <div>
        <h1>log in to application</h1>
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
      <p>
        {user.name} logged in
        <button
          type="button"
          onClick={() => window.localStorage.removeItem("loggedBlogUser")}
        >
          logout
        </button>
      </p>
      <h1>create new</h1>
      <form onSubmit={handleBlogCreate}>
        <div>
          title:
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
