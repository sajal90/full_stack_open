import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer.js";
import { createBlog, removeBlog, updateLike } from "./reducers/blogReducer.js";
import { logIn, removeUser, setUser } from "./reducers/loginReducer.js";
import BlogList from "./components/BlogList.jsx";
import Users from "./components/Users.jsx";
import User from "./components/User.jsx";
import Notification from "./components/Notification.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import Togglable from "./components/Togglable.jsx";
import Blog from "./components/Blog.jsx";
import BlogForm from "./components/BlogForm.jsx";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const togglableRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);
  const blogs = useSelector((state) => {
    return state.blogs;
  });
  const users = useSelector((state) => {
    return state.users;
  });

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
    try {
      dispatch(updateLike(blog));
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
      dispatch(removeBlog(blog));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(setUser({ username, password }));
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

  const menuStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "grey",
    padding: "10px 20px",
  };

  return (
    <div>
      <div style={menuStyle}>
        <Link to="/blogs">blogs</Link>
        <Link to="/users">users</Link>
        {user.name} logged in
        <button
          type="button"
          onClick={() => dispatch(removeUser())}
        >
          logout
        </button>
      </div>
      <h2>blog app</h2>
      <Notification />
      <div>
      </div>
      <Routes>
        <Route
          path="/users/:id"
          element={<User users={users} />}
        />
        <Route
          path="/blogs"
          element={
            <div>
              <Togglable ref={togglableRef}>
                <BlogForm
                  handleBlogCreate={handleBlogCreate}
                />
              </Togglable>
              <BlogList blogs={blogs} />
            </div>
          }
        />
        <Route
          path="/users"
          element={<Users users={users} />}
        />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              handleLike={handleLike}
              handleRemove={handleRemove}
              user={user}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
