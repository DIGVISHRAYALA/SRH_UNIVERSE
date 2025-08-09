// import React, { useState } from 'react';
// import axios from 'axios';
// import './UploadForm.scss';

// const UploadForm = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [title, setTitle] = useState('');
//   const [uploading, setUploading] = useState(false);

//   const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD;

//   const handleAuth = () => {
//     if (password === correctPassword) {
//       setIsAuthenticated(true);
//     } else {
//       alert('Incorrect password!');
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile || !title) {
//       alert('Please select a file and enter a title');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', selectedFile);
//     formData.append('title', title);

//     setUploading(true);
//     try {
//       await axios.post('http://localhost:5000/upload', formData);
//       alert('✅ Upload successful!');
//       setTitle('');
//       setSelectedFile(null);
//     } catch (error) {
//       alert('❌ Upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="upload-auth">
//         <h2>🔐 Admin Access</h2>
//         <input
//           type="password"
//           placeholder="Enter admin password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleAuth}>Login</button>
//       </div>
//     );
//   }

//   return (
//     <div className="upload-container">
//       <h2>📤 Upload New SRH Video</h2>
//       <form onSubmit={handleUpload}>
//         <input
//           type="text"
//           placeholder="Video Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         /><br /><br />
//         <input type="file" accept="video/*" onChange={(e) => setSelectedFile(e.target.files[0])} /><br /><br />
//         <button type="submit" disabled={uploading}>
//           {uploading ? 'Uploading...' : 'Upload'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UploadForm;

// import React, { useState} from 'react';
// import axios from 'axios';
// import './UploadForm.scss';

// const UploadForm = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [title, setTitle] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [videoList, setVideoList] = useState([]);

//   // ⚠️ Keep the actual admin password on the backend; frontend uses user input
//   const handleAuth = () => {
//     if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
//       setIsAuthenticated(true);
//       fetchVideos();
//     } else {
//       alert('Incorrect password!');
//     }
//   };

//   const fetchVideos = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/videos');
//       setVideoList(res.data);
//     } catch (err) {
//       console.error('Error fetching videos', err);
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile || !title) {
//       alert('Please select a file and enter a title');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', selectedFile);
//     formData.append('title', title);

//     setUploading(true);
//     try {
//       await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'x-admin-password': password, // send admin password in header
//         },
//       });
//       alert('✅ Upload successful!');
//       setTitle('');
//       setSelectedFile(null);
//       fetchVideos(); // refresh
//     } catch (error) {
//       alert('❌ Upload failed: ' + (error.response?.data?.message || 'Server error'));
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this video?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/videos/${id}`, {
//         headers: {
//           'x-admin-password': password, // ✅ send password as header
//         },
//       });
//       alert('🗑️ Deleted successfully!');
//       fetchVideos();
//     } catch (err) {
//       alert('❌ Failed to delete: ' + (err.response?.data?.message || 'Server error'));
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="upload-auth">
//         <h2>🔐 Admin Access</h2>
//         <input
//           type="password"
//           placeholder="Enter admin password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleAuth}>Login</button>
//       </div>
//     );
//   }

//   return (
//     <div className="upload-container">
//       <h2>📤 Upload New SRH Video</h2>
//       <form onSubmit={handleUpload}>
//         <input
//           type="text"
//           placeholder="Video Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         /><br /><br />
//         <input
//           type="file"
//           accept="video/*"
//           onChange={(e) => setSelectedFile(e.target.files[0])}
//         /><br /><br />
//         <button type="submit" disabled={uploading}>
//           {uploading ? 'Uploading...' : 'Upload'}
//         </button>
//       </form>

//       <hr />

//       <h2>📁 Uploaded Videos (Admin Only)</h2>
//       <div className="video-list">
//         {videoList.map((vid) => (
//           <div className="video-card" key={vid._id}>
//             <h4>{vid.title}</h4>
//             <video width="300" height="200" controls>
//               <source src={`http://localhost:5000${vid.path}`} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <a
//               href={`http://localhost:5000${vid.path}`}
//               download={vid.filename}
//               className="download-btn"
//             >
//               ⬇ Download
//             </a>
//             <button className="delete-btn" onClick={() => handleDelete(vid._id)}>
//               🗑️ Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UploadForm;

// // // UploadForm.jsx
import React, { useState,useEffect} from 'react';
import axios from 'axios';
import './UploadForm.scss';

 //axios.defaults.baseURL = 'http://localhost:5000';
 axios.defaults.baseURL = 'http://10.250.180.187:5000';
//axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';


const UploadForm = () => {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articles, setArticles] = useState([]);

  const handleLogin = () => {
    if (adminPassword === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

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
      alert('Failed to upload video');
    }
  };

  const handleArticleUpload = async () => {
    try {
      await axios.post('/api/articles', {
        title: articleTitle,
        content: articleContent,
      });
      alert('Article uploaded!');
      setArticleTitle('');
      setArticleContent('');
      fetchArticles();
    } catch (err) {
      alert('Failed to upload article');
    }
  };

  const fetchVideos = async () => {
    const res = await axios.get('/videos');
    setUploadedVideos(res.data);
  };

  const fetchArticles = async () => {
    const res = await axios.get('/api/articles');
    setArticles(res.data);
  };

  const handleDeleteVideo = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this video?");
    if (!confirm) return;

    try {
      await axios.delete(`/videos/${id}`, {
        headers: {
          'x-admin-password': process.env.REACT_APP_ADMIN_PASSWORD
        }
      });
      fetchVideos();
    } catch (err) {
      alert('Failed to delete video');
    }
  };

  const handleDeleteArticle = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this article?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/articles/${id}`);
      fetchArticles();
    } catch (err) {
      alert('Failed to delete article');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchVideos();
      fetchArticles();
    }
  }, [isAuthenticated]);

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
      <h2>Upload Video</h2>
      <input
        type="text"
        placeholder="Video Title"
        value={videoTitle}
        onChange={(e) => setVideoTitle(e.target.value)}
      />
      <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
      <button onClick={handleVideoUpload}>Upload Video</button>

      <hr />

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
      <button onClick={handleArticleUpload}>Upload Article</button>

      <hr />

      <h2>Uploaded Videos</h2>
      {/* {uploadedVideos.map((video) => (
        <div key={video._id}>
          <p>{video.title}</p>
          <a href={`http://localhost:5000${video.path}`} download>Download</a>
          <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
        </div>
      ))} */}

      {uploadedVideos.map((video) => (
  <div key={video._id}>
    <p><strong>{video.title}</strong></p>
    {/* <a href={`http://localhost:5000/videos/${video._id}/download`} download> */}
    <a href={`http://10.250.180.187:5000/videos/${video._id}/download`} download>
      Download
    </a>
    <p>Downloads: {video.downloadCount}</p>
    <p>Uploaded: {new Date(video.uploadedAt).toLocaleString()}</p>
    <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
    <hr />
  </div>
))}

{/* {uploadedVideos.map((video) => {
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
  return (
    <div key={video._id}>
      <p><strong>{video.title}</strong></p>
      <a href={`${baseURL}/videos/${video._id}/download`} download>
        Download
      </a>
      <p>Downloads: {video.downloadCount}</p>
      <p>Uploaded: {new Date(video.uploadedAt).toLocaleString()}</p>
      <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
      <hr />
    </div>
  );
})} */}



      <hr />

      <h2>Articles</h2>
      {articles.map((article) => (
        <div key={article._id}>
          <h4>{article.title}</h4>
          <p>{article.content}</p>
          <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
          <hr />
        </div>
      ))}
      {/* {articles.map((article) => (
  <div key={article._id}>
    <h4>{article.title}</h4>
    <p>{article.content}</p>
    <p>Uploaded: {new Date(article.uploadedAt).toLocaleString()}</p>
    <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
    <hr />
  </div>
))} */}

    </div>
  );
};

export default UploadForm;





