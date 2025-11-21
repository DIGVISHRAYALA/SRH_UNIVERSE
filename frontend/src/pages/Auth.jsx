// import React, { useState } from 'react';
// import axios from '../utils/axiosInstance';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import './Auth.scss';

// const toast = (message) => {
//   const el = document.createElement('div');
//   el.className = 'toast-message';
//   el.textContent = message;
//   document.body.appendChild(el);
//   setTimeout(() => el.remove(), 2000);
// };

// export default function Auth({ initialMode = 'login' }) {
//   const [mode, setMode] = useState(initialMode); // 'login' | 'register'

//   // login
//   const [usernameOrEmail, setUsernameOrEmail] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
//   const [showLoginPw, setShowLoginPw] = useState(false);

//   // register
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [regPassword, setRegPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showRegPw, setShowRegPw] = useState(false);
//   const [showConfirmPw, setShowConfirmPw] = useState(false);

//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('/api/auth/login', { usernameOrEmail, password: loginPassword });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('username', res.data.username);
//       localStorage.setItem('userId', res.data.id);
//       localStorage.setItem('user', JSON.stringify(res.data));
//       window.dispatchEvent(new Event('authChange'));
//       toast('Login successful');
//       navigate('/');
//     } catch (err) {
//       toast(err?.response?.data?.message || 'Login failed');
//     }
//   };

//   const handleRegister = async () => {
//     // if (!email.endsWith('@gmail.com')) {
//     // toast('Invalid email. Please enter a valid email');
//     // return;
//     // }
//     if (regPassword !== confirmPassword) {
//       toast('Passwords do not match');
//       return;
//     }
//     if (email.length>0&&!email.endsWith('@gmail.com')) {
//     toast('Invalid email. Please enter a valid email');
//     return;
//     }
//     try {
//       const res = await axios.post('/api/auth/register', { username, email, password: regPassword });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('username', res.data.username);
//       localStorage.setItem('userId', res.data.id);
//       localStorage.setItem('user', JSON.stringify(res.data));
//       window.dispatchEvent(new Event('authChange'));
//       toast('Successfully registered');
//       navigate('/');
//     } catch (err) {
//       toast(err?.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card" data-mode={mode}>
//         {/* LEFT: Welcome panel */}
//         <section className="welcome">
//           <div className="welcome__inner">
//             <h1 className="welcome__title">Welcome To <br/> SRH UNIVERSE </h1>
//             <p className="welcome__desc">Switch below to {mode === 'login' ? 'create your account' : 'log in to your account'}.</p>
//             {mode === 'login' ? (
//               <button className="welcome__cta" onClick={() => setMode('register')}>Go to Register ➜</button>
//             ) : (
//               <button className="welcome__cta" onClick={() => setMode('login')}>Go to Login ➜</button>
//             )}
//           </div>
//         </section>

//         {/* RIGHT: Forms rail (slides) */}
//         <section className="forms-viewport">
//           <div className="forms-rail">
//             {/* LOGIN panel */}
//             <div className="form-panel" aria-hidden={mode !== 'login'}>
//               <h2>Login</h2>
//               <p className="subtle">Only logged-in users can like or comment articles.</p>
//               <input
//                 className="input"
//                 type="text"
//                 placeholder="Username or Email"
//                 value={usernameOrEmail}
//                 onChange={(e) => setUsernameOrEmail(e.target.value)}
//               />
//               <div className="input-with-eye">
//                 <input
//                   type={showLoginPw ? 'text' : 'password'}
//                   placeholder="Password"
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                 />
//                 <span onClick={() => setShowLoginPw(!showLoginPw)}>
//                   {showLoginPw ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//               <button className="btn btn-primary" onClick={handleLogin}>Login</button>
//               <div className="subtle">
//                 New user?{' '}
//                 <button className="link" onClick={() => setMode('register')}>Go to Register</button>
//               </div>
//             </div>

//             {/* REGISTER panel */}
//             <div className="form-panel" aria-hidden={mode !== 'register'}>
//               <h2>Register</h2>
//               <p className="subtle">Register now and become a part of our community.</p>

//               <input
//                 className="input"
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <input
//                 className="input"
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <div className="input-with-eye">
//                 <input
//                   type={showRegPw ? 'text' : 'password'}
//                   placeholder="Password"
//                   value={regPassword}
//                   onChange={(e) => setRegPassword(e.target.value)}
//                 />
//                 <span onClick={() => setShowRegPw(!showRegPw)}>
//                   {showRegPw ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>

//               <div className="input-with-eye">
//                 <input
//                   type={showConfirmPw ? 'text' : 'password'}
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 <span onClick={() => setShowConfirmPw(!showConfirmPw)}>
//                   {showConfirmPw ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>

//               <button className="btn btn-primary" onClick={handleRegister}>Register</button>
//               <div className="subtle">
//                 Already have an account?{' '}
//                 <button className="link" onClick={() => setMode('login')}>Go to Login</button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }



































import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.scss';

const toast = (message) => {
  const el = document.createElement('div');
  el.className = 'toast-message';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2000);
};

export default function Auth({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'

  // login
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPw, setShowLoginPw] = useState(false);

  // register
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegPw, setShowRegPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', { usernameOrEmail, password: loginPassword });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('userId', res.data.id);
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('authChange'));
      // <-- updated toast message to include username
      toast(`Welcome Back ${res.data.username}!!`);
      navigate('/');
    } catch (err) {
      toast(err?.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async () => {
    // if (!email.endsWith('@gmail.com')) {
    // toast('Invalid email. Please enter a valid email');
    // return;
    // }
    if (regPassword !== confirmPassword) {
      toast('Passwords do not match');
      return;
    }
    if (email.length>0&&!email.endsWith('@gmail.com')) {
      toast('Invalid email. Please enter a valid email');
      return;
    }
    try {
      const res = await axios.post('/api/auth/register', { username, email, password: regPassword });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('userId', res.data.id);
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('authChange'));
      toast('Successfully registered');
      navigate('/');
    } catch (err) {
      toast(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" data-mode={mode}>
        {/* LEFT: Welcome panel */}
        <section className="welcome">
          <div className="welcome__inner">
            <h1 className="welcome__title">Welcome To <br/> SRH UNIVERSE </h1>
            <p className="welcome__desc">Switch below to {mode === 'login' ? 'create your account' : 'log in to your account'}.</p>
            {mode === 'login' ? (
              <button className="welcome__cta" onClick={() => setMode('register')}>Go to Register ➜</button>
            ) : (
              <button className="welcome__cta" onClick={() => setMode('login')}>Go to Login ➜</button>
            )}
          </div>
        </section>

        {/* RIGHT: Forms rail (slides) */}
        <section className="forms-viewport">
          <div className="forms-rail">
            {/* LOGIN panel */}
            <div className="form-panel" aria-hidden={mode !== 'login'}>
              <h2>Login</h2>
              <p className="subtle">Only logged-in users can like or comment articles.</p>
              <input
                className="input"
                type="text"
                placeholder="Username or Email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
              <div className="input-with-eye">
                <input
                  type={showLoginPw ? 'text' : 'password'}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <span onClick={() => setShowLoginPw(!showLoginPw)}>
                  {showLoginPw ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
              <div className="subtle">
                New user?{' '}
                <button className="link" onClick={() => setMode('register')}>Go to Register</button>
              </div>
            </div>

            {/* REGISTER panel */}
            <div className="form-panel" aria-hidden={mode !== 'register'}>
              <h2>Register</h2>
              <p className="subtle">Register now and become a part of our community.</p>

              <input
                className="input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="input-with-eye">
                <input
                  type={showRegPw ? 'text' : 'password'}
                  placeholder="Password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
                <span onClick={() => setShowRegPw(!showRegPw)}>
                  {showRegPw ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="input-with-eye">
                <input
                  type={showConfirmPw ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span onClick={() => setShowConfirmPw(!showConfirmPw)}>
                  {showConfirmPw ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button className="btn btn-primary" onClick={handleRegister}>Register</button>
              <div className="subtle">
                Already have an account?{' '}
                <button className="link" onClick={() => setMode('login')}>Go to Login</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

