import React, { useState } from 'react';
const COHORT_NAME = '2301-ftb-pt-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts/`;

const CommentsForm = ({ authentication, postid }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      message: {
        content: content,
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

    const result = await fetch(BASE_URL + `${postid}/messages`, options);
    const response = await result.json();
    if (response.success) {
      console.log(response);
      setContent('');
    } else {
      const error = response.error;
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="inputwrapper">
          <label htmlFor="content" className="newline">
            Message
          </label>
          <textarea
            name="content"
            id="content"
            cols="100"
            rows="5"
            placeholder="message"
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
        </div>

        <input type="submit" value="Send message" className="mybutton" />
      </form>
    </>
  );
};

export default CommentsForm;
