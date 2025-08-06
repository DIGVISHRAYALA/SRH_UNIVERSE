// pages/Videos.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance'; // use custom axios if set, or just axios
import './Videos.scss';

const Videos = () => {
  const [videoList, setVideoList] = useState([]);

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
    return date.toLocaleString(); // "8/2/2025, 3:30:35 PM"
  };

  return (
    <div className="videos">
      <h1>VIDEO EDITS</h1>
      <div className="video-list">
        {videoList.map((vid) => (
          <div className="video-card" key={vid._id}>
            <h3>{vid.title}</h3>

            <video width="320" height="240" controls>
              <source src={`http://localhost:5000${vid.path}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <a
              href={`http://localhost:5000${vid.path}`}
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
};

export default Videos;
