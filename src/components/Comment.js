import React from 'react';

const Comment = (comment) => {
  return (
    <div>
      <small>
        {comment?.users?.username ?? 'Unknown user'} at{' '}
        <time dateTime={comment.createdAt}>
          {new Date(comment.createdAt).toLocaleString()}
        </time>
      </small>
      <br />
      {comment.content}
      <hr />
    </div>
  );
};

export default Comment;
