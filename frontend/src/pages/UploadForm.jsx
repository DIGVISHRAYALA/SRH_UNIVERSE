
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadForm.scss';

// Change this to your backend base URL
const API_BASE = process.env.REACT_APP_BASE_URL || 'http://10.151.94.186:5000';
axios.defaults.baseURL = API_BASE;

const UploadForm = () => {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Video states
  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  // Article states
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleImage, setArticleImage] = useState(null);
  const [articles, setArticles] = useState([]);

  // Admin login
  const handleLogin = () => {
    if (adminPassword === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  // Video upload
  const handleVideoUpload = async () => {
    if (!videoTitle || !videoFile) {
      alert('Title and file are required!');
      return;
    }

    const formData = new FormData();
    formData.append('title', videoTitle);
    formData.append('video', videoFile);

    try {
      await axios.post('/upload', formData);
      alert('Video uploaded!');
      setVideoTitle('');
      setVideoFile(null);
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert('Failed to upload video');
    }
  };

  // Article upload
  const handleArticleUpload = async () => {
    if (!articleTitle || !articleContent) {
      alert('Title and content are required!');
      return;
    }

    const formData = new FormData();
    formData.append('title', articleTitle);
    formData.append('content', articleContent);
    if (articleImage) {
      formData.append('image', articleImage);
    }

    try {
      await axios.post('/api/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Article uploaded!');
      setArticleTitle('');
      setArticleContent('');
      setArticleImage(null);
      fetchArticles();
    } catch (err) {
      console.error(err);
      alert('Failed to upload article');
    }
  };

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const res = await axios.get('/videos');
      setUploadedVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  // Fetch articles
  const fetchArticles = async () => {
    try {
      const res = await axios.get('/api/articles');
      setArticles(res.data);
    } catch (err) {
      console.error('Error fetching articles:', err);
    }
  };

  // Delete video
  const handleDeleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await axios.delete(`/videos/${id}`, {
        headers: { 'x-admin-password': process.env.REACT_APP_ADMIN_PASSWORD }
      });
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert('Failed to delete video');
    }
  };

  // Delete article
  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      await axios.delete(`/api/articles/${id}`);
      fetchArticles();
    } catch (err) {
      console.error(err);
      alert('Failed to delete article');
    }
  };

  // Load data on login
  useEffect(() => {
    if (isAuthenticated) {
      fetchVideos();
      fetchArticles();
    }
  }, [isAuthenticated]);

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="upload-form">
        <h2>🔒 Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="upload-form">
      {/* VIDEO UPLOAD */}
      <h2>Upload Video</h2>
      <input
        type="text"
        placeholder="Video Title"
        value={videoTitle}
        onChange={(e) => setVideoTitle(e.target.value)}
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
      />
      <button onClick={handleVideoUpload}>Upload Video</button>

      <hr />

      {/* ARTICLE UPLOAD */}
      <h2>Upload Article</h2>
      <input
        type="text"
        placeholder="Article Title"
        value={articleTitle}
        onChange={(e) => setArticleTitle(e.target.value)}
      />
      <textarea
        placeholder="Article Content"
        value={articleContent}
        onChange={(e) => setArticleContent(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setArticleImage(e.target.files[0])}
      />
      <button onClick={handleArticleUpload}>Upload Article</button>

      <hr />

      {/* VIDEOS LIST */}
      <h2>Uploaded Videos</h2>
      {uploadedVideos.map((video) => (
        <div key={video._id}>
          <p><strong>{video.title}</strong></p>
          <a href={`${API_BASE}/videos/${video._id}/download`} download>
            Download
          </a>
          <p>Downloads: {video.downloadCount}</p>
          <p>Uploaded: {new Date(video.uploadedAt).toLocaleString()}</p>
          <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
          <hr />
        </div>
      ))}

      <hr />

      {/* ARTICLES LIST */}
      <h2>Articles</h2>
      {articles.map((article) => (
        <div key={article._id}>
          <h4>{article.title}</h4>
          {article.image && (
            <img
              src={`${API_BASE}${article.image}`}
              alt={article.title}
              style={{ maxWidth: '200px', display: 'block', marginBottom: '10px' }}
            />
          )}
          {/* {article.image && (
        <img
          src={`${API_BASE}/uploads/${article.image}`}
          alt={article.title}
          style={{ maxWidth: '200px', display: 'block', marginBottom: '10px' }}
      />
    )} */}

          <p>{article.content}</p>
          <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default UploadForm;