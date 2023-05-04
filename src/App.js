import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Posts from './components/Posts';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Profile from './components/Profile';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import { fetchFromAPI } from './api';

function usePersistedState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function App() {
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);

  const [authentication, setAuthentication] = usePersistedState(
    {},
    'authentication'
  );

  useEffect(() => {
    fetchPosts();
  }, [authentication]);

  const fetchPosts = async () => {
    const result = await fetchFromAPI({
      endpoint: 'posts',
    });

    if (result) {
      setPosts(result.posts);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              authentication={authentication}
              setAuthentication={setAuthentication}
            />
          }
        >
          <Route index element={<Home />} />
          <Route
            path="posts"
            element={
              <Posts
                setPost={setPost}
                fetchPosts={fetchPosts}
                posts={posts}
                setPosts={setPosts}
                authentication={authentication}
              />
            }
          />

          <Route
            path="posts/:postid"
            element={<Post posts={posts} authentication={authentication} />}
          />
          <Route
            path="createaccount"
            element={
              <CreateAccount
                authentication={authentication}
                setAuthentication={setAuthentication}
              />
            }
          />
          <Route
            path="login"
            element={
              <Login
                authentication={authentication}
                setAuthentication={setAuthentication}
              />
            }
          />
          <Route
            path="profile"
            element={<Profile authentication={authentication} />}
          />
          <Route path="post" element={<Post post={post} />} />

          <Route
            path="createpost"
            element={
              <CreatePost
                authentication={authentication}
                fetchPosts={fetchPosts}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
