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






// import React, { useEffect, useState } from 'react';
// import instance from '../utils/axiosInstance';
// import './Profile.scss';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [showOld, setShowOld] = useState(false);
//   const [showNew, setShowNew] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       window.location.href = '/login'; 
//       return;
//     }
//     const fetchUser = async () => {
//       try {
//         const res = await instance.get('/api/auth/me', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchUser();
//   }, []);

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
//     <div className="profile-container">
//       <div className="profile-box">
//         <h2>USER PROFILE</h2>
//         <p><b>USERNAME:</b> {user.username}</p>
//         <p><b>EMAIL:</b> {user.email}</p>
//         <p><b>CREATED AT:</b> {new Date(user.createdAt).toLocaleString()}</p>
//         <p><b>TOTAL LIKED ARTICLES:</b> {user.likedArticlesCount}</p>
//         <p><b>TOTAL COMMENTED ARTICLES:</b> {user.commentedArticlesCount}</p>

//         <h3><b>CHANGE PASSWORD</b></h3>

//         <div className="input-with-eye">
//           <input
//             type={showOld ? "text" : "password"}
//             placeholder="Old password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//           />
//           <span onClick={() => setShowOld(!showOld)}>
//             {showOld ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <div className="input-with-eye">
//           <input
//             type={showNew ? "text" : "password"}
//             placeholder="New password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <span onClick={() => setShowNew(!showNew)}>
//             {showNew ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <button onClick={handleChangePassword}>Update Password</button>
//       </div>
//     </div>
//   );
// }







// import React, { useEffect, useState } from 'react';
// import instance from '../utils/axiosInstance';
// import './Profile.scss';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [showOld, setShowOld] = useState(false);
//   const [showNew, setShowNew] = useState(false);

//   const showToast = (message) => {
//     const toast = document.createElement('div');
//     toast.className = 'toast-message';
//     toast.textContent = message;
//     document.body.appendChild(toast);
//     setTimeout(() => {
//       toast.remove();
//     }, 2000); // 2 seconds
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       window.location.href = '/login'; 
//       return;
//     }
//     const fetchUser = async () => {
//       try {
//         const res = await instance.get('/api/auth/me', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleChangePassword = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await instance.put('/api/auth/change-password',
//         { oldPassword, newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       showToast('Password changed successfully');
//     } catch (err) {
//       showToast(err.response?.data?.message || 'Error changing password');
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="profile-container">
//       <div className="profile-box">
//         <h2>USER PROFILE</h2>
//         <p><b>USERNAME:</b> {user.username}</p>
//         <p><b>EMAIL:</b> {user.email}</p>
//         <p><b>CREATED AT:</b> {new Date(user.createdAt).toLocaleString()}</p>
//         <p><b>TOTAL LIKED ARTICLES:</b> {user.likedArticlesCount}</p>
//         <p><b>TOTAL COMMENTED ARTICLES:</b> {user.commentedArticlesCount}</p>

//         <h3><b>CHANGE PASSWORD</b></h3>

//         <div className="input-with-eye">
//           <input
//             type={showOld ? "text" : "password"}
//             placeholder="Old password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//           />
//           <span onClick={() => setShowOld(!showOld)}>
//             {showOld ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <div className="input-with-eye">
//           <input
//             type={showNew ? "text" : "password"}
//             placeholder="New password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <span onClick={() => setShowNew(!showNew)}>
//             {showNew ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <button onClick={handleChangePassword}>Update Password</button>
//       </div>
//     </div>
//   );
// }






















import React, { useEffect, useMemo, useState } from "react";
import instance from "../utils/axiosInstance";
import "./Profile.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [changing, setChanging] = useState(false);

  const showToast = (message) => {
    const t = document.createElement("div");
    t.className = "pro-toast";
    t.textContent = message;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  };

  const initials = useMemo(() => {
    if (!user?.username) return "U";
    const parts = user.username.trim().split(/\s+/);
    const head = (s) => s?.[0]?.toUpperCase() || "";
    return (head(parts[0]) + head(parts[1] || "")).slice(0, 2) || "U";
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    (async () => {
      try {
        const res = await instance.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        showToast(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChangePassword = async () => {
    if (!oldPassword.trim() || !newPassword.trim()) {
      showToast("Please fill both fields");
      return;
    }
    setChanging(true);
    try {
      const token = localStorage.getItem("token");
      await instance.put(
        "/api/auth/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOldPassword("");
      setNewPassword("");
      showToast("Password updated");
    } catch (err) {
      showToast(err.response?.data?.message || "Error changing password");
    } finally {
      setChanging(false);
    }
  };

  if (loading) {
    return (
      <div className="pro-page">
        <div className="pro-shell">
          <div className="skeleton hero" />
          <div className="skeleton row" />
          <div className="skeleton row" />
          <div className="skeleton card" />
        </div>
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="pro-page">
      <div className="pro-shell">
        {/* HEADER CARD */}
        <section className="pro-card pro-head">
          <div className="avatar" aria-hidden>
            <span>{initials}</span>
          </div>

          <div className="identity">
            <h1 className="title">{user.username}</h1>

            <p className="line"><span className="label">EMAIL:</span> {user.email}</p>
            <p className="line">
              <span className="label">JOINED:</span>{" "}
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="stats">
            <div className="stat" role="presentation">
              <div className="stat-top">TOTAL LIKED ARTICLES</div>
              <div className="stat-count">{user.likedArticlesCount ?? 0}</div>
            </div>
            <div className="stat" role="presentation">
              <div className="stat-top">TOTAL COMMENTED ARTICLES</div>
              <div className="stat-count">{user.commentedArticlesCount ?? 0}</div>
            </div>
          </div>
        </section>

        {/* PASSWORD CARD */}
        <section className="pro-card pro-sec">
          <h2 className="sec-title">Change Password</h2>

          <div className="field">
            <label>Old Password</label>
            <div className="input-eye">
              <input
                type={showOld ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                autoComplete="current-password"
              />
              <button
                type="button"
                aria-label={showOld ? "Hide old password" : "Show old password"}
                onClick={() => setShowOld((s) => !s)}
              >
                {showOld ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="field">
            <label>New Password</label>
            <div className="input-eye">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Create a new password"
                autoComplete="new-password"
              />
              <button
                type="button"
                aria-label={showNew ? "Hide new password" : "Show new password"}
                onClick={() => setShowNew((s) => !s)}
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            className={`action ${changing ? "busy" : ""}`}
            onClick={handleChangePassword}
            disabled={changing}
          >
            {changing ? "Updating…" : "Update Password"}
          </button>
        </section>
      </div>
    </div>
  );
}

