import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Posts = ({ setPost, fetchPosts, posts, setPosts, authentication }) => {
  const navigate = useNavigate();
  const [localPost, setLocalPost] = useState([]);

  useEffect(() => {
    setLocalPost(posts);
  }, [posts]);

  const search = (e) => {
    setLocalPost(() => {
      return posts.filter((value) => {
        return (
          value.title.includes(e.target.value) ||
          value.description.includes(e.target.value) ||
          value.price.includes(e.target.value) ||
          value.author.username.includes(e.target.value)
        );
      });
    });
  };

  const postClickHandler = (e, item) => {
    setPost(item);
    navigate('/posts/' + item._id);
  };

  return (
    <>
      <div className="main">
        <h2>Posts</h2>
      </div>
      <div className="search-box">
        <input
          className="search-text"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            search(e);
          }}
        />
        <a href="#">
          <i className="search-btn"></i>
        </a>
      </div>

      <div className="colors-box">
        {localPost.map((item) => {
          return (
            <div
              key={item._id}
              className="tbox"
              onClick={(event) => {
                postClickHandler(event, item);
              }}
            >
              <p>"{item.title}"</p>
              <p>"{item.description}"</p>
              <p>"{item.price}"</p>
              <p>- {item.author.username && item.author.username}.</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
