

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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <span>SRH</span>
        <span> UNIVERSE</span>
      </h2>
      <img src="/srh_universe_assets/srh_universe_logo_bgrmv.png" alt="SRH Logo" className="nav-logo" />

      {/* The hamburger-menu div is on the right side */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* <div className="close-btn" onClick={toggleSidebar}>
          &times;
        </div> */}
        <Link to="/" onClick={toggleSidebar}>Home</Link>
        <Link to="/videos" onClick={toggleSidebar}>Videos</Link>
        <Link to="/articles" onClick={toggleSidebar}>Articles</Link>
      </div>
    </nav>
  );
}

export default Navbar;