const COHORT_NAME = '2301-FTB-PT-WEB-PT';
const BASE_API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const API_ENDPOINTS = {
  posts: '/posts',
  register: '/users/register',
  login: '/users/login',
  users: '/users/me',
};

const getURL = (endpoint, id) => {
  let path = API_ENDPOINTS[endpoint];
  if (id) path += `/${id}`;

  if (!path) {
    throw new Error('Invalid API end point specified');
  }
  return BASE_API_URL + path;
};

const getOptions = (method, body, token) => ({
  method: method ? method.toUpperCase() : 'GET',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
  ...(body && { body: JSON.stringify(body) }),
});

export const fetchFromAPI = async ({ endpoint, method, body, token, id }) => {
  try {
    const result = await fetch(
      getURL(endpoint, id),
      getOptions(method, body, token)
    );
    const response = await result.json();
    if (response.error) throw response.error;

    return response?.data;
  } catch (e) {
    console.log(e);
  }
};
