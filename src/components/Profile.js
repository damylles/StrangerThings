import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFromAPI } from '../api';

const Profile = ({ authentication }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState('');

  const deletePost = async (myid) => {
    await fetchFromAPI({
      endpoint: 'posts',
      token: `${authentication.token}`,
      method: 'DELETE',
      id: myid,
    });
    getProfile();
  };

  const getProfile = async () => {
    const result = await fetchFromAPI({
      endpoint: 'users',
      token: `${authentication.token}`,
    });

    console.log(result);
    setProfile(result);
  };

  useEffect(() => {
    getProfile();

    if (!authentication.isLoggedIn) {
      navigate('/login');
    }
  }, [profile]);

  return (
    <>
      <div className="main">
        <h2>Profile</h2>

        <div className="inputwrapper">
          <label htmlFor="name" className="newline">
            Id: <span>{profile._id}</span>
          </label>
          <label htmlFor="name" className="newline">
            Username: <span>{profile.username}</span>
          </label>
          <label htmlFor="name" className="newline">
            Cohort: <span>{profile.cohort}</span>
          </label>
        </div>
      </div>

      <h2>My Active Posts</h2>
      {profile.posts &&
        profile.posts
          .filter((item) => {
            return item.active === true;
          })
          .map((item) => {
            return (
              <div key={item._id} className="tbox">
                <p>"{item.title}"</p>
                <p>"{item.description}"</p>
                <p>"{item.price}"</p>
                <button
                  onClick={async () => {
                    deletePost(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}

      <h2>My Deleted Posts</h2>
      {profile.posts &&
        profile.posts
          .filter((item) => {
            return item.active === false;
          })
          .map((item) => {
            return (
              <div key={item._id} className="tbox">
                <p>"{item.title}"</p>
                <p>"{item.description}"</p>
                <p>"{item.price}"</p>
                <p> POST DELETED</p>
              </div>
            );
          })}

      <h2>My Messages</h2>
      {profile.messages &&
        profile.messages.map((item) => {
          return (
            <div key={item._id} className="tbox">
              <p>"{item.content}"</p>
            </div>
          );
        })}
    </>
  );
};

export default Profile;
