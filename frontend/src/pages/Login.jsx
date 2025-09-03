// import React, { useState } from 'react';
// import axios from '../utils/axiosInstance';
// import { useNavigate } from 'react-router-dom';
// import './Auth.scss';

// function Login() {
//   const [usernameOrEmail, setUsernameOrEmail] = useState('');
//   const [password, setPassword] = useState('');
//   useNavigate();

//   const handleLogin = async () => {
//     try {
//       // ✅ send usernameOrEmail
//       const res = await axios.post('/api/auth/login', { usernameOrEmail, password });

//       // ✅ store token + username
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('username', res.data.username);
//       localStorage.setItem('user', JSON.stringify(res.data));

//       alert('Login successful');
//       window.location.href = '/'; // redirect home
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="auth-box">
//       <h2>Login</h2>
//       {/* ✅ user can now enter either username or email */}
//       <input
//         type="text"
//         placeholder="Username or Email"
//         value={usernameOrEmail}
//         onChange={e => setUsernameOrEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;



// import React, { useState } from 'react';
// import axios from '../utils/axiosInstance';
// import { Link, useNavigate } from 'react-router-dom';
// import './Auth.scss';

// function Login() {
//   const [usernameOrEmail, setUsernameOrEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('/api/auth/login', { usernameOrEmail, password });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('username', res.data.username);
//       localStorage.setItem('userId', res.data.id);
//       localStorage.setItem('user', JSON.stringify(res.data));
//       window.dispatchEvent(new Event('authChange'));
//       alert('Login successful');
//       navigate('/');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="auth-box">
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username or Email"
//         value={usernameOrEmail}
//         onChange={e => setUsernameOrEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>

//       {/* Register link */}
//       <p style={{ marginTop: '10px' }}>
//         New user? <Link to="/register">Click here to register</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;






// import React, { useState } from 'react';
// import axios from '../utils/axiosInstance';
// import { Link, useNavigate } from 'react-router-dom';
// import './Auth.scss';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';



// function Login() {
//   const [usernameOrEmail, setUsernameOrEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('/api/auth/login', { usernameOrEmail, password });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('username', res.data.username);
//       localStorage.setItem('userId', res.data.id);
//       localStorage.setItem('user', JSON.stringify(res.data));
//       window.dispatchEvent(new Event('authChange'));
//       alert('Login successful ✅');
//       navigate('/');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed ❌');
//     }
//   };

//   return (
//     <div className="auth-box">
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username or Email"
//         value={usernameOrEmail}
//         onChange={e => setUsernameOrEmail(e.target.value)}
//       />

//       <div className="input-with-eye">
//         <input
//           type={showPassword ? "text" : "password"}
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//         />
//         <span onClick={() => setShowPassword(!showPassword)}>
//           {showPassword ? <FaEyeSlash /> : <FaEye />}
//         </span>
//       </div>

//       <button onClick={handleLogin}>Login</button>

//       <p style={{ marginTop: '10px' }}>
//         New user? <Link to="/register">Click here to register</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;





import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000); // 2 seconds
}


function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', { usernameOrEmail, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('userId', res.data.id);
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('authChange'));
      // alert('Login successful ✅');
      // navigate('/');
      showToast('Login successful');
navigate('/');

    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username or Email"
        value={usernameOrEmail}
        onChange={e => setUsernameOrEmail(e.target.value)}
      />

      <div className="input-with-eye">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: '10px' }}>
        New user? <Link to="/register">Click here to register</Link>
      </p>
    </div>
  );
}

export default Login;
