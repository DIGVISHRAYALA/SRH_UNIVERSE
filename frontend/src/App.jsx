// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Videos from './pages/Videos';
// import UploadForm from './pages/UploadForm'; // for secret route
// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* Shown on every page */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/videos" element={<Videos />} />
//         <Route path="/admin" element={<UploadForm />} /> {/* No link shown in navbar */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Videos from './pages/Videos';
import UploadForm from './pages/UploadForm';
import Navbar from './components/Navbar';
import './App.scss';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/admin" element={<UploadForm />} />
          <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;