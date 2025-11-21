// // // pages/Videos.jsx
// // import React, { useEffect, useState } from 'react';
// // import axios from '../utils/axiosInstance';
// // import './Videos.scss';

// // const API_BASE = process.env.REACT_APP_BASE_URL || 'https://srh-universe-backend-ceub.onrender.com';

// // const Videos = () => {
// //   const [videoList, setVideoList] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [showSearch, setShowSearch] = useState(false);

// //   // Fetch videos from backend
// //   const fetchVideos = async () => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/videos`);
// //       setVideoList(res.data);
// //     } catch (err) {
// //       console.error('Error fetching videos', err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchVideos();
// //   }, []);

// //   const formatDate = (dateStr) => {
// //     const date = new Date(dateStr);
// //     return date.toLocaleString();
// //   };

// //   // Filter videos by title
// //   const filteredVideos = videoList.filter((vid) =>
// //     vid.title.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   // Highlight matching search terms
// //   const highlightMatch = (text) => {
// //     if (!searchTerm) return text;
// //     const regex = new RegExp(`(${searchTerm})`, 'gi');
// //     return text.split(regex).map((part, idx) =>
// //       regex.test(part) ? (
// //         <span key={idx} className="highlight">{part}</span>
// //       ) : (
// //         part
// //       )
// //     );
// //   };

// //   // Download video using original filename
// //   const handleDownload = async (vid) => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/videos/${vid._id}/download`, { responseType: 'blob' });

// //       //const url = window.URL.createObjectURL(new Blob([res.data]));
// //         const blob = new Blob([res.data], { type: 'video/mp4' });
// //         const url = window.URL.createObjectURL(blob);



// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.setAttribute('download', vid.filename); // <-- original uploaded filename
// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();

// //       // Update download count in UI immediately
// //       setVideoList((prev) =>
// //         prev.map((v) =>
// //           v._id === vid._id
// //             ? { ...v, downloadCount: (v.downloadCount || 0) + 1 }
// //             : v
// //         )
// //       );
// //     } catch (err) {
// //       console.error('Error downloading video:', err);
// //     }
// //   };

// //   return (
// //     <div className="videos">
// //       <div className="videos-header">
// //         <h1>VIDEO EDITS</h1>
// //         <div className="search-container">
// //           {/* On desktop, show search toggle */}
// //           {window.innerWidth > 600 && (
// //             <span
// //               className="search-icon"
// //               onClick={() => setShowSearch(!showSearch)}
// //             >
// //               🔍︎
// //             </span>
// //           )}
// //           {/* Search bar visible on mobile or when toggled */}
// //           {(showSearch || window.innerWidth <= 600) && (
// //             <input
// //               type="text"
// //               className="search-bar"
// //               placeholder="Search videos..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //           )}
// //         </div>
// //       </div>

// //       <div className="video-list">
// //         {filteredVideos.map((vid) => (
// //           <div className="video-card" key={vid._id}>
// //             <h3>{highlightMatch(vid.title)}</h3>
// //             <video width="320" height="240" controls>
// //               <source src={vid.path} type="video/mp4" />
// //               Your browser does not support the video tag.
// //             </video>
// //             <button
// //               onClick={() => handleDownload(vid)}
// //               className="download-btn"
// //             >
// //               Download
// //             </button>
// //             <p>Downloads: {vid.downloadCount || 0}</p>
// //             <p>Uploaded: {formatDate(vid.uploadedAt)}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Videos;

























// import React, { useEffect, useState } from 'react';
// import axios from '../utils/axiosInstance';
// import './Videos.scss';

// const API_BASE = process.env.REACT_APP_BASE_URL || 'https://srh-universe-backend-ceub.onrender.com';

// const Videos = () => {
//   const [videoList, setVideoList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showSearch, setShowSearch] = useState(false);

//   // Toast state
//   const [toast, setToast] = useState(null);

//   const showToast = (msg) => {
//     setToast(msg);
//     setTimeout(() => setToast(null), 3000);
//   };

//   // Fetch videos from backend
//   const fetchVideos = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/videos`);
//       setVideoList(res.data);
//     } catch (err) {
//       console.error('Error fetching videos', err);
//     }
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleString();
//   };

//   // Filter videos by title
//   const filteredVideos = videoList.filter((vid) =>
//     vid.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Highlight search text
//   const highlightMatch = (text) => {
//     if (!searchTerm) return text;
//     const regex = new RegExp(`(${searchTerm})`, 'gi');
//     return text.split(regex).map((part, idx) =>
//       regex.test(part) ? <span key={idx} className="highlight">{part}</span> : part
//     );
//   };

//   // Download video + show toast after 1s
//   const handleDownload = async (vid) => {
//     try {
//       // Show toast after 1 second
//       setTimeout(() => showToast("Your download is getting started"), 1000);

//       const res = await axios.get(`${API_BASE}/videos/${vid._id}/download`, {
//         responseType: 'blob'
//       });

//       const blob = new Blob([res.data], { type: 'video/mp4' });
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', vid.filename);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       // Increase download count immediately
//       setVideoList((prev) =>
//         prev.map((v) =>
//           v._id === vid._id
//             ? { ...v, downloadCount: (v.downloadCount || 0) + 1 }
//             : v
//         )
//       );
//     } catch (err) {
//       console.error('Error downloading video:', err);
//     }
//   };

//   // Detect mobile
//   const isMobile = window.innerWidth <= 768;

//   return (
//     <div className="videos">
//       <div className="videos-header">
//         <h1>VIDEO EDITS</h1>

//         <div className="search-container">

//           {/* Desktop: show icon */}
//           {!isMobile && (
//             <span
//               className="search-icon"
//               onClick={() => setShowSearch(!showSearch)}
//             >
//               🔍︎
//             </span>
//           )}

//           {/* Mobile: always visible | Desktop: only when toggled */}
//           {(isMobile || showSearch) && (
//             <input
//               type="text"
//               className="search-bar"
//               placeholder="search here"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           )}
//         </div>
//       </div>

//       <div className="video-list">
//         {filteredVideos.map((vid) => (
//           <div className="video-card" key={vid._id}>
//             <h3>{highlightMatch(vid.title)}</h3>

//             <video width="320" height="240" controls>
//               <source src={vid.path} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>

//             <button
//               onClick={() => handleDownload(vid)}
//               className="download-btn"
//             >
//               Download
//             </button>

//             <p>Downloads: {vid.downloadCount || 0}</p>
//             <p>Uploaded: {formatDate(vid.uploadedAt)}</p>
//           </div>
//         ))}
//       </div>

//       {/* Toast UI */}
//       {toast && <div className="toast-message">{toast}</div>}
//     </div>
//   );
// };

// export default Videos;





















































import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import './Videos.scss';

const API_BASE = process.env.REACT_APP_BASE_URL || 'https://srh-universe-backend-ceub.onrender.com';

const Videos = () => {
  const [videoList, setVideoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Loading state for skeletons
  const [isLoading, setIsLoading] = useState(true);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch videos from backend
  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/videos`);
      setVideoList(res.data || []);
    } catch (err) {
      console.error('Error fetching videos', err);
      setVideoList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  // Filter videos by title
  const filteredVideos = videoList.filter((vid) =>
    vid.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Highlight search text
  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? <span key={idx} className="highlight">{part}</span> : part
    );
  };

  // Download video + show toast after 1s
  const handleDownload = async (vid) => {
    try {
      // Show toast after 1 second
      setTimeout(() => showToast("Your download is getting started"), 1000);

      const res = await axios.get(`${API_BASE}/videos/${vid._id}/download`, {
        responseType: 'blob'
      });

      const blob = new Blob([res.data], { type: 'video/mp4' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', vid.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Increase download count immediately
      setVideoList((prev) =>
        prev.map((v) =>
          v._id === vid._id
            ? { ...v, downloadCount: (v.downloadCount || 0) + 1 }
            : v
        )
      );
    } catch (err) {
      console.error('Error downloading video:', err);
    }
  };

  // Detect mobile
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="videos">
      <div className="videos-header">
        <h1>VIDEO EDITS</h1>

        <div className="search-container">
          {!isMobile && (
            <span
              className="search-icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              🔍︎
            </span>
          )}

          {(isMobile || showSearch) && (
            <input
              type="text"
              className="search-bar"
              placeholder="search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="video-list">
        {/* Show skeletons only while initial loading */}
        {isLoading && (
          <div className="skeleton-row" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div className="video-card skeleton" key={`skeleton-${i}`}>
                <div className="skeleton-title" />
                <div className="skeleton-thumb" />
                <div className="skeleton-btn" />
                <div className="skeleton-meta">
                  <div className="skeleton-line short" />
                  <div className="skeleton-line long" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Render real videos when loading finished */}
        {!isLoading && filteredVideos.length > 0 && filteredVideos.map((vid) => (
          <div className="video-card" key={vid._id}>
            <h3>{highlightMatch(vid.title)}</h3>

            <video width="320" height="240" controls>
              <source src={vid.path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <button
              onClick={() => handleDownload(vid)}
              className="download-btn"
            >
              Download
            </button>

            <p>Downloads: {vid.downloadCount || 0}</p>
            <p>Uploaded: {formatDate(vid.uploadedAt)}</p>
          </div>
        ))}

        {/* After loading: no results */}
        {!isLoading && filteredVideos.length === 0 && (
          <div className="no-videos">No videos found.</div>
        )}
      </div>

      {/* Toast UI */}
      {toast && <div className="toast-message">{toast}</div>}
    </div>
  );
};

export default Videos;


