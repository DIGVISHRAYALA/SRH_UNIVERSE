// pages/Videos.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import './Videos.scss';

const API_BASE = process.env.REACT_APP_BASE_URL || 'https://srh-universe-backend-ceub.onrender.com';

const Videos = () => {
  const [videoList, setVideoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Fetch videos from backend
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_BASE}/videos`);
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

  // Download video using original filename
  const handleDownload = async (vid) => {
    try {
      const res = await axios.get(`${API_BASE}/videos/${vid._id}/download`, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', vid.filename); // <-- original uploaded filename
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Update download count in UI immediately
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

  return (
    <div className="videos">
      <div className="videos-header">
        <h1>VIDEO EDITS</h1>
        <div className="search-container">
          {/* On desktop, show search toggle */}
          {window.innerWidth > 600 && (
            <span
              className="search-icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              🔍︎
            </span>
          )}
          {/* Search bar visible on mobile or when toggled */}
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
              <source src={`${API_BASE}${vid.path}`} type="video/mp4" />
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
      </div>
    </div>
  );
};

export default Videos;
