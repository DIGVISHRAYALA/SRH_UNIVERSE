


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import './UploadForm.scss';

// const API_BASE = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
// axios.defaults.baseURL = API_BASE;

// const socket = io(API_BASE);

// const UploadForm = () => {
//   const [adminPassword, setAdminPassword] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const [videoTitle, setVideoTitle] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadedVideos, setUploadedVideos] = useState([]);

//   const [articleTitle, setArticleTitle] = useState('');
//   const [articleContent, setArticleContent] = useState('');
//   const [articleTitleTelugu, setArticleTitleTelugu] = useState('');
//   const [articleContentTelugu, setArticleContentTelugu] = useState('');
//   const [articleImage, setArticleImage] = useState(null);
//   const [articles, setArticles] = useState([]);

//   const [roomTitle, setRoomTitle] = useState('');
//   const [rooms, setRooms] = useState([]);

//   const [activeSection, setActiveSection] = useState('videos');

//   /* ---------------- Admin Login ---------------- */
//   const handleLogin = () => {
//     if (adminPassword === process.env.REACT_APP_ADMIN_PASSWORD) {
//       setIsAuthenticated(true);
//     } else {
//       alert('Incorrect password');
//     }
//   };

//   /* ---------------- Video Upload ---------------- */
// const handleVideoUpload = async () => {
//   if (!videoTitle.trim() || !videoFile) {
//     return alert('Enter both video title and file!');
//   }

//   const formData = new FormData();
//   formData.append('title', videoTitle.trim());
//   formData.append('video', videoFile);

//   try {
//     await axios.post('/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     alert('Video uploaded!');
//     setVideoTitle('');
//     setVideoFile(null);
//     fetchVideos();
//   } catch (err) {
//     console.error(err);
//     alert('Failed to upload video');
//   }
// };


//   /* ---------------- Article Upload ---------------- */
//   const handleArticleUpload = async () => {
//     if (!articleTitle || !articleContent) return alert('Title and content required!');
//     const formData = new FormData();
//     formData.append('title', articleTitle);
//     formData.append('content', articleContent);
//     formData.append('titleTelugu', articleTitleTelugu);
//     formData.append('contentTelugu', articleContentTelugu);
//     if (articleImage) formData.append('image', articleImage);

//     try {
//       await axios.post('/api/articles', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       alert('Article uploaded!');
//       setArticleTitle('');
//       setArticleContent('');
//       setArticleTitleTelugu('');
//       setArticleContentTelugu('');
//       setArticleImage(null);
//       fetchArticles();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to upload article');
//     }
//   };

//   /* ---------------- Chat Rooms ---------------- */
//   const handleCreateRoom = () => {
//     if (!roomTitle.trim()) return alert('Enter room title!');
//     socket.emit('createRoom', { title: roomTitle });
//     setRoomTitle('');
//   };

//   const handleDeleteRoom = async (roomId) => {
//     if (!window.confirm('Delete this room?')) return;
//     try {
//       await axios.delete(`/api/rooms/${roomId}`, {
//         headers: { 'x-admin-password': process.env.REACT_APP_ADMIN_PASSWORD }
//       });
//       setRooms(prev => prev.filter(r => r._id !== roomId));
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete room');
//     }
//   };

//   /* ---------------- Fetch Videos / Articles ---------------- */
//   const fetchVideos = async () => {
//     try {
//       const res = await axios.get('/videos');
//       setUploadedVideos(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchArticles = async () => {
//     try {
//       const res = await axios.get('/api/articles');
//       setArticles(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ---------------- Delete Video / Article ---------------- */
//   const handleDeleteVideo = async (id) => {
//     if (!window.confirm('Delete this video?')) return;
//     try {
//       await axios.delete(`/videos/${id}`, {
//         headers: { 'x-admin-password': process.env.REACT_APP_ADMIN_PASSWORD }
//       });
//       fetchVideos();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete video');
//     }
//   };

//   const handleDeleteArticle = async (id) => {
//     if (!window.confirm('Delete this article?')) return;
//     try {
//       await axios.delete(`/api/articles/${id}`);
//       fetchArticles();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete article');
//     }
//   };

//   /* ---------------- Socket / Load on Login ---------------- */
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchVideos();
//       fetchArticles();
//       socket.emit('getRooms');
//     }

//     socket.on('roomsUpdated', (data) => setRooms(data));
//     socket.on('roomCreated', (room) => setRooms(prev => [...prev, room]));

//     return () => {
//       socket.off('roomsUpdated');
//       socket.off('roomCreated');
//     };
//   }, [isAuthenticated]);

//   /* ---------------- Render ---------------- */
//   if (!isAuthenticated) return (
//     <div className="upload-form">
//       <h2>🔒 Admin Login</h2>
//       <input type="password" placeholder="Admin Password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );

//   return (
//     <div className="upload-form">
//       {/* Upload Sections */}
//       <h2>Upload Video</h2>
//       <input type="text" placeholder="Video Title" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} />
//       <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />
//       <button onClick={handleVideoUpload}>Upload Video</button>

//       <hr />

//       <h2>Upload Article</h2>
//       <input type="text" placeholder="Article Title" value={articleTitle} onChange={e => setArticleTitle(e.target.value)} />
//       <textarea placeholder="Article Content" value={articleContent} onChange={e => setArticleContent(e.target.value)} />
//       <input type="text" placeholder="Telugu Title" value={articleTitleTelugu} onChange={e => setArticleTitleTelugu(e.target.value)} />
//       <textarea placeholder="Telugu Content" value={articleContentTelugu} onChange={e => setArticleContentTelugu(e.target.value)} />
//       <input type="file" accept="image/*" onChange={e => setArticleImage(e.target.files[0])} />
//       <button onClick={handleArticleUpload}>Upload Article</button>

//       <hr />

//       <h2>Create Chat Room</h2>
//       <input type="text" placeholder="Room Title" value={roomTitle} onChange={e => setRoomTitle(e.target.value)} />
//       <button onClick={handleCreateRoom}>Create Room</button>

//       <hr />

//       {/* Toggle Sections */}
//       <div className="toggle-buttons">
//         <button className={activeSection === 'videos' ? 'active' : ''} onClick={() => setActiveSection('videos')}>Videos</button>
//         <button className={activeSection === 'articles' ? 'active' : ''} onClick={() => setActiveSection('articles')}>Articles</button>
//         <button className={activeSection === 'rooms' ? 'active' : ''} onClick={() => setActiveSection('rooms')}>Rooms</button>
//       </div>

//       <hr />

//       {/* Display Lists */}
//       {activeSection === 'videos' && (
//         <div>
//           <h2>Uploaded Videos</h2>
//           {uploadedVideos.map(video => (
//             <div key={video._id}>
//               <p><strong>{video.title}</strong></p>
//               <a href={`${API_BASE}/videos/${video._id}/download`} download>Download</a>
//               <p>Downloads: {video.downloadCount}</p>
//               <p>Uploaded: {new Date(video.uploadedAt).toLocaleString()}</p>
//               <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
//               <hr />
//             </div>
//           ))}
//         </div>
//       )}

//       {activeSection === 'articles' && (
//         <div>
//           <h2>Uploaded Articles</h2>
//           {articles.map(article => (
//             <div key={article._id}>
//               <h4>{article.title}</h4>
//               {article.titleTelugu && <h5>{article.titleTelugu}</h5>}
//               {article.image && <img src={`${API_BASE}${article.image}`} alt={article.title} style={{ maxWidth: '200px', display: 'block', marginBottom: '10px' }} />}
//               <p>{article.content}</p>
//               {article.contentTelugu && <p>{article.contentTelugu}</p>}
//               <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
//               <hr />
//             </div>
//           ))}
//         </div>
//       )}

//       {activeSection === 'rooms' && (
//         <div>
//           <h2>Chat Rooms</h2>
//           {rooms.map(r => (
//             <div key={r._id} className="room-item">
//               <span>{r.title}</span>
//               <button onClick={() => handleDeleteRoom(r._id)} className="delete-room">Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadForm;

































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './UploadForm.scss';

const API_BASE = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_BASE;

const socket = io(API_BASE);

const UploadForm = () => {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [videoTitle, setVideoTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleTitleTelugu, setArticleTitleTelugu] = useState('');
  const [articleContentTelugu, setArticleContentTelugu] = useState('');
  const [articleImage, setArticleImage] = useState(null);
  const [articles, setArticles] = useState([]);

  //const [roomTitle, setRoomTitle] = useState('');
  const [rooms, setRooms] = useState([]);

  const [activeSection, setActiveSection] = useState('videos');

  /* ---------------- Admin Login ---------------- */
  const handleLogin = () => {
    if (adminPassword === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  /* ---------------- Video Upload ---------------- */
  const handleVideoUpload = async () => {
    if (!videoTitle || !videoFile) return alert('Title and file are required!');
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

  /* ---------------- Article Upload ---------------- */
  const handleArticleUpload = async () => {
    if (!articleTitle || !articleContent) return alert('Title and content required!');
    const formData = new FormData();
    formData.append('title', articleTitle);
    formData.append('content', articleContent);
    formData.append('titleTelugu', articleTitleTelugu);
    formData.append('contentTelugu', articleContentTelugu);
    if (articleImage) formData.append('image', articleImage);

    try {
      await axios.post('/api/articles', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Article uploaded!');
      setArticleTitle('');
      setArticleContent('');
      setArticleTitleTelugu('');
      setArticleContentTelugu('');
      setArticleImage(null);
      fetchArticles();
    } catch (err) {
      console.error(err);
      alert('Failed to upload article');
    }
  };

  /* ---------------- Chat Rooms ---------------- */
  // const handleCreateRoom = () => {
  //   if (!roomTitle.trim()) return alert('Enter room title!');
  //   socket.emit('createRoom', { title: roomTitle });
  //   setRoomTitle('');
  // };
  const [team1, setTeam1] = useState('');
const [team2, setTeam2] = useState('');

const handleCreateRoom = () => {
  if (!team1.trim() || !team2.trim()) return alert('Enter both team names!');
  socket.emit('createRoom', { title: `${team1} VS ${team2}`, team1, team2 });
  setTeam1('');
  setTeam2('');
};


  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Delete this room?')) return;
    try {
      await axios.delete(`/api/rooms/${roomId}`, {
        headers: { 'x-admin-password': process.env.REACT_APP_ADMIN_PASSWORD }
      });
      setRooms(prev => prev.filter(r => r._id !== roomId));
    } catch (err) {
      console.error(err);
      alert('Failed to delete room');
    }
  };

  /* ---------------- Fetch Videos / Articles ---------------- */
  const fetchVideos = async () => {
    try {
      const res = await axios.get('/videos');
      setUploadedVideos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await axios.get('/api/articles');
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- Delete Video / Article ---------------- */
  const handleDeleteVideo = async (id) => {
    if (!window.confirm('Delete this video?')) return;
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

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await axios.delete(`/api/articles/${id}`);
      fetchArticles();
    } catch (err) {
      console.error(err);
      alert('Failed to delete article');
    }
  };

  /* ---------------- Socket / Load on Login ---------------- */
  useEffect(() => {
    if (isAuthenticated) {
      fetchVideos();
      fetchArticles();
      socket.emit('getRooms');
    }

    socket.on('roomsUpdated', (data) => setRooms(data));
    socket.on('roomCreated', (room) => setRooms(prev => [...prev, room]));

    return () => {
      socket.off('roomsUpdated');
      socket.off('roomCreated');
    };
  }, [isAuthenticated]);

  /* ---------------- Render ---------------- */
  if (!isAuthenticated) return (
    <div className="upload-form">
      <h2>🔒 Admin Login</h2>
      <input type="password" placeholder="Admin Password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );

  return (
    <div className="upload-form">
      {/* Upload Sections */}
      <h2>Upload Video</h2>
      <input type="text" placeholder="Video Title" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} />
      <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />
      <button onClick={handleVideoUpload}>Upload Video</button>

      <hr />

      <h2>Upload Article</h2>
      <input type="text" placeholder="Article Title" value={articleTitle} onChange={e => setArticleTitle(e.target.value)} />
      <textarea placeholder="Article Content" value={articleContent} onChange={e => setArticleContent(e.target.value)} />
      <input type="text" placeholder="Telugu Title" value={articleTitleTelugu} onChange={e => setArticleTitleTelugu(e.target.value)} />
      <textarea placeholder="Telugu Content" value={articleContentTelugu} onChange={e => setArticleContentTelugu(e.target.value)} />
      <input type="file" accept="image/*" onChange={e => setArticleImage(e.target.files[0])} />
      <button onClick={handleArticleUpload}>Upload Article</button>

      <hr />

      {/* <h2>Create Chat Room</h2>
      <input type="text" placeholder="Room Title" value={roomTitle} onChange={e => setRoomTitle(e.target.value)} />
      <button onClick={handleCreateRoom}>Create Room</button> */}
      <h2>Create Chat Room</h2>
<input
  type="text"
  placeholder="Team 1 Name"
  value={team1}
  onChange={e => setTeam1(e.target.value)}
/>
<input
  type="text"
  placeholder="Team 2 Name"
  value={team2}
  onChange={e => setTeam2(e.target.value)}
/>
<button onClick={handleCreateRoom}>Create Room</button>

      

      <hr />

      {/* Toggle Sections */}
      <div className="toggle-buttons">
        <button className={activeSection === 'videos' ? 'active' : ''} onClick={() => setActiveSection('videos')}>Videos</button>
        <button className={activeSection === 'articles' ? 'active' : ''} onClick={() => setActiveSection('articles')}>Articles</button>
        <button className={activeSection === 'rooms' ? 'active' : ''} onClick={() => setActiveSection('rooms')}>Rooms</button>
      </div>

      <hr />

      {/* Display Lists */}
      {activeSection === 'videos' && (
        <div>
          <h2>Uploaded Videos</h2>
          {uploadedVideos.map(video => (
            <div key={video._id}>
              <p><strong>{video.title}</strong></p>
              <a href={`${API_BASE}/videos/${video._id}/download`} download>Download</a>
              <p>Downloads: {video.downloadCount}</p>
              <p>Uploaded: {new Date(video.uploadedAt).toLocaleString()}</p>
              <button onClick={() => handleDeleteVideo(video._id)}>Delete</button>
              <hr />
            </div>
          ))}
        </div>
      )}

      {activeSection === 'articles' && (
        <div>
          <h2>Uploaded Articles</h2>
          {articles.map(article => (
            <div key={article._id}>
              <h4>{article.title}</h4>
              {article.titleTelugu && <h5>{article.titleTelugu}</h5>}
              {article.image && <img src={`${API_BASE}${article.image}`} alt={article.title} style={{ maxWidth: '200px', display: 'block', marginBottom: '10px' }} />}
              <p>{article.content}</p>
              {article.contentTelugu && <p>{article.contentTelugu}</p>}
              <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
              <hr />
            </div>
          ))}
        </div>
      )}

      {activeSection === 'rooms' && (
        <div>
          <h2>Chat Rooms</h2>
          {rooms.map(r => (
            <div key={r._id} className="room-item">
              <span>{r.title}</span>
              <button onClick={() => handleDeleteRoom(r._id)} className="delete-room">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
