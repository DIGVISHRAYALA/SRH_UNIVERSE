

// import { Link } from 'react-router-dom';
// import './Navbar.scss';

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <h2 className="logo">
//         <span>    SRH</span>
//         <span> UNIVERSE</span>
//       </h2>
//         <img src="/srh_universe_assets/srh_universe_logo_bgrmv.png" alt="SRH Logo" className="nav-logo" />
//       {/* <div className="center-img">
//         <img
//           src="/srh_universe_assets/srh_universe_logo_bgrmv.png"
//           alt="SRH Logo"
//           className="logo-img"
//         />
//       </div> */}
//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/videos">Videos</Link>
//         <Link to="/articles">Articles</Link>
//         {/* 🔒 No Link to /admin here! */}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;





// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.scss';

// function Navbar() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [username, setUsername] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     setUsername(null);
//     navigate('/'); // redirect to home
//   };

//   return (
//     <nav className="navbar">
//       <h2 className="logo">
//         <span>SRH</span>
//         <span> UNIVERSE</span>
//       </h2>
//       <img
//         src="/srh_universe_assets/srh_universe_logo_bgrmv.png"
//         alt="SRH Logo"
//         className="nav-logo"
//       />

//       {/* Hamburger Menu */}
//       <div className="hamburger-menu" onClick={toggleSidebar}>
//         <div className="bar"></div>
//         <div className="bar"></div>
//         <div className="bar"></div>
//       </div>

//       <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
//         <Link to="/" onClick={toggleSidebar}>
//           Home
//         </Link>
//         <Link to="/videos" onClick={toggleSidebar}>
//           Videos
//         </Link>
//         <Link to="/articles" onClick={toggleSidebar}>
//           Articles
//         </Link>

//         {!username ? (
//           <>
//             <Link to="/login" onClick={toggleSidebar}>
//               Login
//             </Link>
//             <Link to="/register" onClick={toggleSidebar}>
//               Signup
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link to="/profile" onClick={toggleSidebar}>
//               {username}
//             </Link>
//             <button
//               onClick={() => {
//                 handleLogout();
//                 toggleSidebar();
//               }}
//               className="logout-btn"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;





import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    setUsername(storedUsername);
  }

  // 👇 listen for custom event
  const handleAuthChange = () => {
    const updatedUsername = localStorage.getItem('username');
    setUsername(updatedUsername);
  };

  window.addEventListener('authChange', handleAuthChange);

  return () => {
    window.removeEventListener('authChange', handleAuthChange);
  };
}, []);



  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    setUsername(null);
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <span>SRH</span>
        <span> UNIVERSE</span>
      </h2>
      <img
        src="/srh_universe_assets/srh_universe_logo_bgrmv.png"
        alt="SRH Logo"
        className="nav-logo"
      />

      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleSidebar}>Home</Link>
        <Link to="/videos" onClick={toggleSidebar}>Videos</Link>
        <Link to="/articles" onClick={toggleSidebar}>Articles</Link>

        {!username ? (
          <>
            <Link to="/login" onClick={toggleSidebar}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/profile" onClick={toggleSidebar}>{username}</Link>
            <button
              onClick={() => {
                handleLogout();
                toggleSidebar();
              }}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
