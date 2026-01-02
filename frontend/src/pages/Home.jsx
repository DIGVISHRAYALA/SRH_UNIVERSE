
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
//             {/* This website is dedicated to helping you easily find and download exclusive SRH edits and updates.
//             From exciting match moments to creative edits – everything is just one click away.
//             Let’s stay connected and celebrate our passion for SRH together! */}
//             This website is dedicated to helping you easily find and download exclusive SRH edits
//              and updates. From exciting match moments to creative edits – everything is just one 
//              click away. Along with this, you can also explore articles related to SRH, and join
//               live game talk with other users regarding matches and more. Let’s stay connected and
//                celebrate our passion for SRH together!
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
//             {latestArticles.map((article, index) => (
//               <Link
//                 key={article._id}
//                 to={`/articles#${article._id}`}
//                 className="article-link"
//               >
//                 <span className="rank">#{index + 1} </span>
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
//           All media (images, videos, logos) belong to their respective copyright owners, including IPLT20 and BCCI.
//           Content is used under fair use for entertainment and educational purposes.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Home;












import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import './Home.scss';
import LiveSRHScore from '../components/LiveSRHHScore';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef(true);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 5000); // 2 seconds
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   const startTime = Date.now();

  //   // 🔔 Show toast ONLY if loading > 5 seconds
  //   const toastTimer = setTimeout(() => {
  //     showToast("Firing up the updates… hang tight!");
  //   }, 5000);

  //   axios.get('/api/articles')
  //     .then((res) => {
  //       if (res.data && res.data.length > 0) {
  //         const sorted = res.data.sort(
  //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //         );
  //         setLatestArticles(sorted.slice(0, 3));
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching articles:', err);
  //     })
  //     .finally(() => {
  //       clearTimeout(toastTimer); // cancel toast if API responds early

  //       // ensure skeleton shows at least 400ms
  //       const elapsed = Date.now() - startTime;
  //       const delay = Math.max(400 - elapsed, 0);

  //       setTimeout(() => setIsLoading(false), delay);
  //     });
  // }, []);



//   useEffect(() => {
//   setIsLoading(true);
//   const startTime = Date.now();

//   // 🔔 Toast 1 after 5 seconds
//   const toastTimer1 = setTimeout(() => {
//     showToast("Firing up the updates… hang tight!");
//   }, 5000);

//   // 🔔 Toast 2 after 10 seconds (5s after first)
//   const toastTimer2 = setTimeout(() => {
//     showToast("Almost there… getting things ready!");
//   }, 10000);

//   axios.get('/api/articles')
//     .then((res) => {
//       if (res.data && res.data.length > 0) {
//         const sorted = res.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setLatestArticles(sorted.slice(0, 3));
//       }
//     })
//     .catch((err) => {
//       console.error('Error fetching articles:', err);
//     })
//     .finally(() => {
//       // ❌ cancel both toasts if API finishes
//       clearTimeout(toastTimer1);
//       clearTimeout(toastTimer2);

//       setToast(null); // hide toast immediately

//       const elapsed = Date.now() - startTime;
//       const delay = Math.max(400 - elapsed, 0);
//       setTimeout(() => setIsLoading(false), delay);
//     });
// }, []);


  useEffect(() => {
  setIsLoading(true);
  loadingRef.current = true;

  const startTime = Date.now();

  const toastTimer1 = setTimeout(() => {
    if (loadingRef.current) {
      setToast("Firing up the updates… hang tight!");
    }
  }, 5000);

  const toastTimer2 = setTimeout(() => {
    if (loadingRef.current) {
      setToast("Almost there… getting things ready!");
    }
  }, 10000);

  axios.get('/api/articles')
    .then((res) => {
      if (res.data && res.data.length > 0) {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestArticles(sorted.slice(0, 3));
      }
    })
    .catch((err) => {
      console.error('Error fetching articles:', err);
    })
    .finally(() => {
      loadingRef.current = false;

      clearTimeout(toastTimer1);
      clearTimeout(toastTimer2);

      const elapsed = Date.now() - startTime;
      const delay = Math.max(400 - elapsed, 0);

      setTimeout(() => {
        setToast(null);
        setIsLoading(false);
      }, delay);
    });

  return () => {
    loadingRef.current = false;
    clearTimeout(toastTimer1);
    clearTimeout(toastTimer2);
  };
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
            This website is dedicated to helping you easily find and download exclusive SRH edits
            and updates. From exciting match moments to creative edits – everything is just one
            click away. Along with this, you can also explore articles related to SRH, and join
            live game talk with other users regarding matches and more. Let’s stay connected and
            celebrate our passion for SRH together!
          </p>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/srh_universe?igsh=bjl3YzN5b2lkZGxk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://youtube.com/@srh_universe-2025?si=kntyK2jx3yfOdAaY"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* 🔶 Trending Article Section */}

      {/* ===== SKELETON WHILE LOADING ===== */}
      {isLoading && (
        <div className="trending-section">
          <div className="trending-box">
            

            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line"></div>

            <div className="skeleton skeleton-readmore"></div>
          </div>
        </div>
      )}

      {/* ===== REAL CONTENT ===== */}
      {!isLoading && latestArticles.length > 0 && (
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

            <Link to="/articles" className="read-more">
              Read More →
            </Link>
          </div>
        </div>
      )}

      {/* ===== EMPTY STATE ===== */}
      {!isLoading && latestArticles.length === 0 && (
        <div className="trending-section">
          <div className="trending-box">
            <h2 className="trending-title">TRENDING ABOUT SRH</h2>
            <p style={{ color: '#bbb', textAlign: 'center' }}>
              No trending articles right now
            </p>
          </div>
        </div>
      )}

      <LiveSRHScore />

      {/* 🔶 Footer */}
      <div className="home-footer">
        <p>
          © 2025 SRH Universe. This is a non-commercial fan-made website created out of admiration
          for Sunrisers Hyderabad. We are not affiliated with the IPL, BCCI, or the official
          Sunrisers Hyderabad team. All media (images, videos, logos) belong to their respective
          copyright owners, including IPLT20 and BCCI. Content is used under fair use for
          entertainment and educational purposes.
        </p>
      </div>

      {/* 🔔 TOAST MESSAGE */}
      {toast && <div className="toast-message">{toast}</div>}
    </div>
  );
}

export default Home;
