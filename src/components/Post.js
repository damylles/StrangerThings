import React from 'react';
import { useParams } from 'react-router-dom';
import CommentsForm from './CommentsForm';

const Post = ({ posts, authentication }) => {
  const params = useParams();
  const { postid } = params;
  const post = posts.find((post) => post._id == postid);

  return (
    post && (
      <>
        <div className="main">
          <h2>Post</h2>

          <div key={post._id} className="tbox-post">
            <p>"{post.title}"</p>
            <p>"{post.description}"</p>
            <p>"{post.price}"</p>
            <p>- {post.author.username && post.author.username}.</p>
          </div>
        </div>
        <CommentsForm authentication={authentication} postid={postid} />
      </>
    )
  );
};

export default Post;
