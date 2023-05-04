import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const COHORT_NAME = '2301-ftb-pt-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts`;

const CreatePost = ({ authentication, fetchPosts }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      post: {
        title: title,
        price: price,
        description: description,
        location: location,
        willDeliver: true,
      },
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authentication.token}`,
      },
      body: JSON.stringify(requestBody),
    };

    const result = await fetch(BASE_URL, options);
    const response = await result.json();
    if (response.success) {
      fetchPosts();
      navigate('/posts');
    } else {
      const error = response.error;
      console.log(error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!authentication.isLoggedIn) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <div className="main">
        <h2>Create Post</h2>

        <form onSubmit={handleSubmit}>
          <div className="inputwrapper">
            <label htmlFor="title" className="newline">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="inputwrapper">
            <label htmlFor="location" className="newline">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Location"
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>

          <div className="inputwrapper">
            <label htmlFor="price" className="newline">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price"
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <div className="inputwrapper">
            <label htmlFor="description" className="newline">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="100"
              rows="5"
              placeholder="Description"
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>

          <input type="submit" value="Create Post" className="mybutton" />
        </form>
      </div>
    </>
  );
};

export default CreatePost;
