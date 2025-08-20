// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000', // your backend server
// });

// export default instance;

import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
const instance = axios.create({
  baseURL,
});


instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default instance;

