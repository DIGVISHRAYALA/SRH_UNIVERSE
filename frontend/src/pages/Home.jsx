// import './Home.scss';

// function Home() {
//   return (
//     <div className="home">
//       <h1>Welcome to SRH Universe</h1>
//       <p>
//         This fan page brings you exciting SRH edits, match clips, and latest updates.
//         All video clips are edited content and belong to their respective owners (IPLT20).
//         We do not claim ownership of official media.
//       </p>
//     </div>
//   );
// }

// export default Home;

// import './Home.scss'; 

// function Home() {
//   return (
//     <div className="home">
//       <div className="home-main">
//         {/* You’ll later decide what to show here */}
//       </div>

//       <div className="home-footer">
//         <p>
//           © 2025 SRH Universe – This fan page is unofficial and not affiliated with IPL or Sunrisers Hyderabad. All media belongs to their respective copyright owners (e.g., IPLT20, BCCI).
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Home;




// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from '../utils/axiosInstance';
// import './Home.scss';
// import LiveSRHScore from '../components/LiveSRHHScore';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// function Home() {
//   const [latestArticles, setLatestArticles] = useState([]);

//   useEffect(() => {
//     axios.get('/api/articles')
//       .then((res) => {
//         if (res.data && res.data.length > 0) {
//           const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//           setLatestArticles(sorted.slice(0, 3)); // Top 3 articles
//         }
//       })
//       .catch((err) => console.error('Error fetching articles:', err));
//   }, []);

//   return (
//     <div className="home">
//       <div className="home-main">
//         {/* Future content */}
//       </div>

//       {/* 🔶 Welcome Message Section */}
//       <div className="welcome-section">
//         <div className="welcome-box">
//           <h2>Hello! Hope you're doing well.</h2>
//           <p>
//             This website is dedicated to helping you easily find and download exclusive SRH edits and updates.
//             From exciting match moments to creative edits – everything is just one click away.
//             Let’s stay connected and celebrate our passion for SRH together!
//           </p>
//           <div className="social-icons">
//             <a href="https://www.instagram.com/srh_universe?igsh=bjl3YzN5b2lkZGxk" target="_blank" rel="noopener noreferrer">
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a href="https://twitter.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer">
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a href="https://youtube.com/@srh_universe-2025?si=kntyK2jx3yfOdAaY" target="_blank" rel="noopener noreferrer">
//               <i className="fab fa-youtube"></i>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* 🔶 Trending Article Section */}
//       {latestArticles.length > 0 && (
//         <div className="trending-section">
//           <div className="trending-box">
//             <h2 className="trending-title">TRENDING ABOUT SRH</h2>
//             {latestArticles.map(article => (
//               <Link
//                 key={article._id}
//                 to={`/articles#${article._id}`}
//                 className="article-link"
//               >
//                 {article.title}
//               </Link>
//             ))}
//             <Link to="/articles" className="read-more">Read More →</Link>
//           </div>
//         </div>
//       )}
//       <LiveSRHScore />

//       {/* 🔶 Footer */}
//       <div className="home-footer">
//         <p>
//           © 2025 SRH Universe. This is a non-commercial fan-made website created out of admiration for Sunrisers Hyderabad.
//           We are not affiliated with the IPL, BCCI, or the official Sunrisers Hyderabad team.
// All media (images, videos, logos) belong to their respective copyright owners, including IPLT20 and BCCI.
// Content is used under fair use for entertainment and educational purposes.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import './Home.scss';
import LiveSRHScore from '../components/LiveSRHHScore';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    axios.get('/api/articles')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setLatestArticles(sorted.slice(0, 3)); // Top 3 articles
        }
      })
      .catch((err) => console.error('Error fetching articles:', err));
  }, []);

  return (
    <div className="home">
      <div className="home-main">
        {/* Future content */}
      </div>

      {/* 🔶 Welcome Message Section */}
      <div className="welcome-section">
        <div className="welcome-box">
          <h2>Hello! Hope you're doing well.</h2>
          <p>
            This website is dedicated to helping you easily find and download exclusive SRH edits and updates.
            From exciting match moments to creative edits – everything is just one click away.
            Let’s stay connected and celebrate our passion for SRH together!
          </p>
          <div className="social-icons">
            <a href="https://www.instagram.com/srh_universe?igsh=bjl3YzN5b2lkZGxk" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com/@srh_universe-2025?si=kntyK2jx3yfOdAaY" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* 🔶 Trending Article Section */}
      {latestArticles.length > 0 && (
        <div className="trending-section">
          <div className="trending-box">
            <h2 className="trending-title">TRENDING ABOUT SRH</h2>
            {latestArticles.map((article, index) => (
              <Link
                key={article._id}
                to={`/articles#${article._id}`}
                className="article-link"
              >
                <span className="rank">#{index + 1} </span>
                {article.title}
              </Link>
            ))}
            <Link to="/articles" className="read-more">Read More →</Link>
          </div>
        </div>
      )}

      <LiveSRHScore />

      {/* 🔶 Footer */}
      <div className="home-footer">
        <p>
          © 2025 SRH Universe. This is a non-commercial fan-made website created out of admiration for Sunrisers Hyderabad.
          We are not affiliated with the IPL, BCCI, or the official Sunrisers Hyderabad team.
          All media (images, videos, logos) belong to their respective copyright owners, including IPLT20 and BCCI.
          Content is used under fair use for entertainment and educational purposes.
        </p>
      </div>
    </div>
  );
}

export default Home;
