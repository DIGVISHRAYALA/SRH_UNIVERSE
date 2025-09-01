
// pages/Videos.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import './Videos.scss';

const Videos = () => {
  const [videoList, setVideoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const fetchVideos = async () => {
    try {
      const res = await axios.get('/videos');
      setVideoList(res.data);
    } catch (err) {
      console.error('Error fetching videos', err);
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

  // Highlight matching search terms
  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <span key={idx} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

//   return (
//     <div className="videos">
//       <div className="videos-header">
//         <h1>VIDEO EDITS</h1>
//         <div className="search-container">
//           <span
//             className="search-icon"
//             onClick={() => setShowSearch(!showSearch)}
//           >
//             🔍︎
//           </span>
//           {showSearch && (
//             <input
//               type="text"
//               className="search-bar"
//               placeholder="Search videos..."
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
//               <source src={`http://10.250.180.187:5000${vid.path}`} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <a
//               href={`http://10.250.180.187:5000${vid.path}`}
//               download={vid.filename}
//               className="download-btn"
//             >
//               Download
//             </a>
//             <p>Downloads: {vid.downloadCount}</p>
//             <p>Uploaded: {formatDate(vid.uploadedAt)}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

return (
  <div className="videos">
    <div className="videos-header">
      <h1>VIDEO EDITS</h1>
      <div className="search-container">
        {/* On mobile, only the search bar should be visible */}
        {window.innerWidth > 600 && (
          <span
            className="search-icon"
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍︎
          </span>
        )}
        
        {/*
          The search bar is now always visible on mobile
          or when the showSearch state is true on desktop.
        */}
        {(showSearch || window.innerWidth <= 600) && (
          <input
            type="text"
            className="search-bar"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>
    </div>

    <div className="video-list">
      {filteredVideos.map((vid) => (
        <div className="video-card" key={vid._id}>
          <h3>{highlightMatch(vid.title)}</h3>
          <video width="320" height="240" controls>
            <source src={`http://10.151.94.186:5000${vid.path}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <a
            href={`http://10.151.94.186:5000${vid.path}`}
            download={vid.filename}
            className="download-btn"
          >
            Download
          </a>
          <p>Downloads: {vid.downloadCount}</p>
          <p>Uploaded: {formatDate(vid.uploadedAt)}</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default Videos;