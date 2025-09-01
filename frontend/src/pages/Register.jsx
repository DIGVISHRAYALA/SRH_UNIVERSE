// import React, { useState } from 'react';
// import axios from '../utils/axiosInstance';
// import { useNavigate } from 'react-router-dom';
// import './Auth.scss';

// function Register() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const res = await axios.post('/api/auth/register', { username, email, password });
//       localStorage.setItem('token', res.data.token);
// localStorage.setItem('username', res.data.username);
// window.location.href = '/'; // redirect home

//       localStorage.setItem('user', JSON.stringify(res.data));
//       alert('Registration successful');
//       navigate('/');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="auth-box">
//       <h2>Register</h2>
//       <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
//       <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }

// export default Register;




// import React, { useState } from 'react';
// import axios from '../utils/axiosInstance';
// import { useNavigate } from 'react-router-dom';
// import './Auth.scss';

// function Register() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const res = await axios.post('/api/auth/register', { username, email, password });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('username', res.data.username);
//       localStorage.setItem("userId", res.data.id);
//       localStorage.setItem('user', JSON.stringify(res.data));
//         window.dispatchEvent(new Event('authChange'));
//       alert('Successfully registered ✅');
//       navigate('/');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="auth-box">
//       <h2>Register</h2>
//       <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
//       <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }

// export default Register;





import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }
    try {
      const res = await axios.post('/api/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('authChange'));
      alert('Successfully registered ✅');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed ❌');
    }
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
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

      <div className="input-with-eye">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
