// import { Link } from 'react-router-dom';
// import './Navbar.scss';

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <h2 className="logo">SRH UNIVERSE</h2>
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



import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">SRH UNIVERSE</h2>
        <img src="/srh_universe_assets/srh_universe_logo_bgrmv.png" alt="SRH Logo" className="nav-logo" />
      {/* <div className="center-img">
        <img
          src="/srh_universe_assets/srh_universe_logo_bgrmv.png"
          alt="SRH Logo"
          className="logo-img"
        />
      </div> */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/articles">Articles</Link>
        {/* 🔒 No Link to /admin here! */}
      </div>
    </nav>
  );
}

export default Navbar;