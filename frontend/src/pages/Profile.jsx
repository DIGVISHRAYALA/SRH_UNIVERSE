// import React, { useEffect, useState } from 'react';
// import instance from '../utils/axiosInstance';
// import './Profile.scss';
// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   useEffect(() => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     window.location.href = '/login'; // redirect if not logged in
//     return;
//   }

//   const fetchUser = async () => {
//     try {
//       const res = await instance.get('/api/auth/me', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUser(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   fetchUser();
// }, []);


//   const handleChangePassword = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await instance.put('/api/auth/change-password',
//         { oldPassword, newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert('Password changed successfully');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Error changing password');
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="profile-box">
//       <h2>User Profile</h2>
//       <p><b>Username:</b> {user.username}</p>
//       <p><b>Email:</b> {user.email}</p>
//       <p><b>Created At:</b> {new Date(user.createdAt).toLocaleString()}</p>
//       <p><b>Total Liked Articles:</b> {user.likedArticlesCount}</p>
//       <p><b>Total Commented Articles:</b> {user.commentedArticlesCount}</p>
//       <h3>Change Password</h3>
//       <input type="password" placeholder="Old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
//       <input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//       <button onClick={handleChangePassword}>Update Password</button>
//     </div>
//   );
// }






import React, { useEffect, useState } from 'react';
import instance from '../utils/axiosInstance';
import './Profile.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'; 
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await instance.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      await instance.put('/api/auth/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Password changed successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Error changing password');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>USER PROFILE</h2>
        <p><b>USERNAME:</b> {user.username}</p>
        <p><b>EMAIL:</b> {user.email}</p>
        <p><b>CREATED AT:</b> {new Date(user.createdAt).toLocaleString()}</p>
        <p><b>TOTAL LIKED ARTICLES:</b> {user.likedArticlesCount}</p>
        <p><b>TOTAL COMMENTED ARTICLES:</b> {user.commentedArticlesCount}</p>

        <h3><b>CHANGE PASSWORD</b></h3>

        <div className="input-with-eye">
          <input
            type={showOld ? "text" : "password"}
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <span onClick={() => setShowOld(!showOld)}>
            {showOld ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="input-with-eye">
          <input
            type={showNew ? "text" : "password"}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span onClick={() => setShowNew(!showNew)}>
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button onClick={handleChangePassword}>Update Password</button>
      </div>
    </div>
  );
}
