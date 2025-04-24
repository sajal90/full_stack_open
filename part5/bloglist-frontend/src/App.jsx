import { useEffect, useState } from "react";
import Blog from "./components/Blog.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login({ username, password });

      setUser(response);
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
        <form onSubmit={handleSubmit}>
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
      <p>{user.name} logged in</p>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
