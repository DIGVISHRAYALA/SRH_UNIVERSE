
// import React, { useEffect, useState, useRef } from 'react';
// import axios from '../utils/axiosInstance';
// import './Articles.scss';

// const API_BASE = process.env.REACT_APP_BASE_URL || 'http://10.221.67.186:5000';

// const Articles = () => {
//   const [articles, setArticles] = useState([]);
//   const [expandedIds, setExpandedIds] = useState(new Set());
//   const [showReadMore, setShowReadMore] = useState({});
//   const [splitMap, setSplitMap] = useState({});
//   const refs = useRef({});

//   // 🔍 Search states
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     axios.get('/api/articles')
//       .then(res => {
//         const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setArticles(sorted);
//       })
//       .catch(err => console.error('Error fetching articles:', err));
//   }, []);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       const newShow = {};
//       const newSplit = {};

//       articles.forEach(article => {
//         const el = refs.current[article._id];
//         const text = (article.content || '').trim();

//         if (!el) {
//           newShow[article._id] = false;
//           return;
//         }

//         const style = window.getComputedStyle(el);
//         let lineHeight = parseFloat(style.lineHeight);
//         if (Number.isNaN(lineHeight)) {
//           const fontSize = parseFloat(style.fontSize) || 16;
//           lineHeight = fontSize * 1.2;
//         }

//         const scrollH = el.scrollHeight;
//         const lines = Math.max(1, Math.round(scrollH / lineHeight));

//         newShow[article._id] = scrollH > (lineHeight * 2) + 1;

//         if (!text) {
//           newSplit[article._id] = { first: '', second: '', extraSpacing: 0 };
//           return;
//         }

//         if (lines > 2) {
//           const midChar = Math.floor(text.length / 2);
//           let splitIndex = text.indexOf(' ', midChar);
//           if (splitIndex === -1) splitIndex = text.lastIndexOf(' ', midChar);
//           if (splitIndex === -1) splitIndex = midChar;

//           const first = text.slice(0, splitIndex).trim();
//           const second = text.slice(splitIndex).trim();

//           newSplit[article._id] = { first, second, extraSpacing: 0 };
//         } else {
//           const extraSpacing = Math.max(0, Math.round((2 - lines) * lineHeight));
//           newSplit[article._id] = { first: text, second: '', extraSpacing };
//         }
//       });

//       setShowReadMore(prev => ({ ...prev, ...newShow }));
//       setSplitMap(prev => ({ ...prev, ...newSplit }));
//     }, 50);

//     return () => clearTimeout(t);
//   }, [articles, expandedIds]);

//   const toggleExpand = (id) => {
//     setExpandedIds(prev => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

//   // Highlight function
//   const highlightText = (text) => {
//     if (!searchTerm) return text;
//     const regex = new RegExp(`(${searchTerm})`, 'gi');
//     return text.split(regex).map((part, i) =>
//       regex.test(part) ? <mark key={i} className="highlight">{part}</mark> : part
//     );
//   };

//   // Filtered articles (only show relevant ones)
//   const filteredArticles = searchTerm
//     ? articles.filter(a =>
//         a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         a.content.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : articles;

//   return (
//     <div className="articles">
//       <div className="articles-header">
//         {/* <h1>Latest Articles</h1>
//          <span
//           className="search-icon"
//           onClick={() => setShowSearch(prev => !prev)}
//         >
//           🔍︎
//         </span> 
//         {showSearch && (
//           <input
//             type="text"
//             className="search-bar"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             autoFocus
//           />
//         )} */}
//         <h1>Latest Articles</h1>
// {/* <div className="search-container">
//   <span
//     className="search-icon"
//     onClick={() => setShowSearch(prev => !prev)}
//   >
//     🔍︎ 
//   </span>
//   {showSearch && (
//     <input
//       type="text"
//       className="search-bar"
//       placeholder="Search..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       autoFocus
//     />
//   )}
// </div> */}

// <div className="search-container">
//   <span
//     className="search-icon"
//     onClick={() => setShowSearch(prev => !prev)}
//   >
//     🔍︎
//   </span>
//   {(showSearch || window.innerWidth <= 600) && (
//     <input
//       type="text"
//       className="search-bar"
//       placeholder="Search..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//   )}
// </div>


//       </div>

//       {filteredArticles.length === 0 ? (
//         <p>No articles found.</p>
//       ) : (
//         filteredArticles.map(article => {
//           const isExpanded = expandedIds.has(article._id);
//           const needsToggle = showReadMore[article._id];
//           const parts = splitMap[article._id] || null;
//           const imageUrl = article.image ? `${API_BASE}${article.image}` : null;

//           return (
//             <div key={article._id} id={article._id} className="article-box">
//               <h2>{highlightText(article.title)}</h2>

//               <div className="content-wrap">
//                 <div
//                   ref={el => { refs.current[article._id] = el; }}
//                   className={`article-content ${isExpanded ? 'expanded' : 'clamped'}`}
//                   aria-expanded={isExpanded}
//                 >
//                   {parts ? (
//                     <>
//                       <span className="article-text">{highlightText(parts.first)}</span>

//                       {parts.second ? (
//                         <>
//                           {imageUrl && (
//                             <div className="article-image">
//                               <img src={imageUrl} alt={article.title} />
//                             </div>
//                           )}
//                           <span className="article-text">{highlightText(parts.second)}</span>
//                         </>
//                       ) : (
//                         <>
//                           {imageUrl && (
//                             <div style={{ height: parts.extraSpacing }} />
//                           )}
//                           {imageUrl && (
//                             <div className="article-image">
//                               <img src={imageUrl} alt={article.title} />
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <span className="article-text">{highlightText(article.content)}</span>
//                   )}
//                 </div>

//                 {needsToggle && (
//                   <button
//                     className="read-toggle"
//                     onClick={() => toggleExpand(article._id)}
//                   >
//                     {isExpanded ? 'Read less' : 'Read more →'}
//                   </button>
//                 )}
//               </div>

//               <p className="meta">
//                 Uploaded: {new Date(article.createdAt || article.uploadedAt).toLocaleString()}
//               </p>
//               <hr className="divider" />
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };
// export default Articles;



// import React, { useEffect, useState, useRef } from 'react';
// import axios from '../utils/axiosInstance';
// import './Articles.scss';

// const API_BASE = process.env.REACT_APP_BASE_URL || 'http://10.24.75.186:5000';

// const Articles = () => {
//   const [articles, setArticles] = useState([]);
//   const [expandedIds, setExpandedIds] = useState(new Set());
//   const [showReadMore, setShowReadMore] = useState({});
//   const [splitMap, setSplitMap] = useState({});
//   const refs = useRef({});

//   // 🔍 Search states
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = () => {
//     axios.get('/api/articles')
//       .then(res => {
//         const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setArticles(sorted);
//       })
//       .catch(err => console.error('Error fetching articles:', err));
//   };

//   useEffect(() => {
//     const t = setTimeout(() => {
//       const newShow = {};
//       const newSplit = {};

//       articles.forEach(article => {
//         const el = refs.current[article._id];
//         const text = (article.content || '').trim();

//         if (!el) {
//           newShow[article._id] = false;
//           return;
//         }

//         const style = window.getComputedStyle(el);
//         let lineHeight = parseFloat(style.lineHeight);
//         if (Number.isNaN(lineHeight)) {
//           const fontSize = parseFloat(style.fontSize) || 16;
//           lineHeight = fontSize * 1.2;
//         }

//         const scrollH = el.scrollHeight;
//         const lines = Math.max(1, Math.round(scrollH / lineHeight));

//         newShow[article._id] = scrollH > (lineHeight * 2) + 1;

//         if (!text) {
//           newSplit[article._id] = { first: '', second: '', extraSpacing: 0 };
//           return;
//         }

//         if (lines > 2) {
//           const midChar = Math.floor(text.length / 2);
//           let splitIndex = text.indexOf(' ', midChar);
//           if (splitIndex === -1) splitIndex = text.lastIndexOf(' ', midChar);
//           if (splitIndex === -1) splitIndex = midChar;

//           const first = text.slice(0, splitIndex).trim();
//           const second = text.slice(splitIndex).trim();

//           newSplit[article._id] = { first, second, extraSpacing: 0 };
//         } else {
//           const extraSpacing = Math.max(0, Math.round((2 - lines) * lineHeight));
//           newSplit[article._id] = { first: text, second: '', extraSpacing };
//         }
//       });

//       setShowReadMore(prev => ({ ...prev, ...newShow }));
//       setSplitMap(prev => ({ ...prev, ...newSplit }));
//     }, 50);

//     return () => clearTimeout(t);
//   }, [articles, expandedIds]);

//   const toggleExpand = (id) => {
//     setExpandedIds(prev => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

//   // Highlight function
//   const highlightText = (text) => {
//     if (!searchTerm) return text;
//     const regex = new RegExp(`(${searchTerm})`, 'gi');
//     return text.split(regex).map((part, i) =>
//       regex.test(part) ? <mark key={i} className="highlight">{part}</mark> : part
//     );
//   };

//   // Likes handler
//   // const handleLike = async (id) => {
//   //   try {
//   //     const res = await axios.post(`/api/articles/${id}/like`);
//   //     // setArticles(prev =>
//   //     //   prev.map(a => a._id === id ? { ...a, likes: res.data.likes } : a)
//   //     // );
//   //     setArticles(prev =>
//   //       prev.map(a => a._id === id ? { ...a, likes: res.data.likesCount } : a)
//   //     );      
//   //   } catch (err) {
//   //     console.error('Error liking article:', err);
//   //   }
//   // };


//   const handleLike = async (id) => {
//     try {
//       const res = await axios.post(`/api/articles/${id}/like`);
      
//       setArticles(prev =>
//         prev.map(a =>
//           a._id === id
//             ? {
//                 ...a,
//                 likes: res.data.likes,            // keep actual array
//                 likesCount: res.data.likesCount,  // add count
//                 liked: res.data.liked             // track if user liked
//               }
//             : a
//         )
//       );
//     } catch (err) {
//       console.error("Error liking article:", err);
//     }
//   };
  

//   // Comments handler
//   const handleComment = async (id, comment) => {
//     if (!comment.trim()) return;
//     try {
//       const res = await axios.post(`/api/articles/${id}/comment`, { text: comment });
//       setArticles(prev =>
//         prev.map(a => a._id === id ? { ...a, comments: res.data.comments } : a)
//       );
//     } catch (err) {
//       console.error('Error adding comment:', err);
//     }
//   };
  
//   const handleDeleteComment = async (articleId, commentId) => {
//     try {
//       const res = await axios.delete(`/api/articles/${articleId}/comments/${commentId}`);
//       setArticles(prev =>
//         prev.map(a =>
//           a._id === articleId ? { ...a, comments: res.data.comments } : a
//         )
//       );
//     } catch (err) {
//       console.error("Error deleting comment:", err);
//     }
//   };
  


//   // Filtered articles (only show relevant ones)
//   const filteredArticles = searchTerm
//     ? articles.filter(a =>
//         a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         a.content.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : articles;

//   return (
//     <div className="articles">
//       <div className="articles-header">
//         <h1>Latest Articles</h1>

//         <div className="search-container">
//           <span
//             className="search-icon"
//             onClick={() => setShowSearch(prev => !prev)}
//           >
//             🔍︎
//           </span>
//           {(showSearch || window.innerWidth <= 600) && (
//             <input
//               type="text"
//               className="search-bar"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           )}
//         </div>
//       </div>

//       {filteredArticles.length === 0 ? (
//         <p>No articles found.</p>
//       ) : (
//         filteredArticles.map(article => {
//           const isExpanded = expandedIds.has(article._id);
//           const needsToggle = showReadMore[article._id];
//           const parts = splitMap[article._id] || null;
//           const imageUrl = article.image ? `${API_BASE}${article.image}` : null;

//           return (
//             <div key={article._id} id={article._id} className="article-box">
//               <h2>{highlightText(article.title)}</h2>

//               <div className="content-wrap">
//                 <div
//                   ref={el => { refs.current[article._id] = el; }}
//                   className={`article-content ${isExpanded ? 'expanded' : 'clamped'}`}
//                   aria-expanded={isExpanded}
//                 >
//                   {parts ? (
//                     <>
//                       <span className="article-text">{highlightText(parts.first)}</span>
//                       {parts.second ? (
//                         <>
//                           {imageUrl && (
//                             <div className="article-image">
//                               <img src={imageUrl} alt={article.title} />
//                             </div>
//                           )}
//                           <span className="article-text">{highlightText(parts.second)}</span>
//                         </>
//                       ) : (
//                         <>
//                           {imageUrl && <div style={{ height: parts.extraSpacing }} />}
//                           {imageUrl && (
//                             <div className="article-image">
//                               <img src={imageUrl} alt={article.title} />
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <span className="article-text">{highlightText(article.content)}</span>
//                   )}
//                 </div>

//                 {needsToggle && (
//                   <button
//                     className="read-toggle"
//                     onClick={() => toggleExpand(article._id)}
//                   >
//                     {isExpanded ? 'Read less' : 'Read more →'}
//                   </button>
//                 )}
//               </div>

//               {/* Likes & Comments */}
//               {/* <div className="article-actions">
//                 <button onClick={() => handleLike(article._id)}>
//                   👍 {article.likes || 0}
//                 </button>
//               </div> */}
//               {/* <button
//   onClick={() => handleLike(article._id)}
//   className={article.liked ? "liked" : ""}
// >
//   👍 {article.likesCount || 0}
// </button>

//               <div className="comments-section">
//                 <h4>Comments</h4>
//                 <ul>
//   {(article.comments || []).map((c) => {
//     const currentUserId = localStorage.getItem("userId");
//     const commentUserId = c.user?._id?.toString?.() || c.user?.toString?.();

//     return (
//       <li key={c._id}>
//         <strong>{c.username || "Unknown"}:</strong> {c.text}
//         {commentUserId === currentUserId && (
//           <button
//             onClick={() => handleDeleteComment(article._id, c._id)}
//             className="delete-comment-btn"
//           >
//             ❌
//           </button>
//         )}
//       </li>
//     );
//   })}
// </ul>

//                 <CommentInput onSubmit={(text) => handleComment(article._id, text)} />
//               </div> */}
//               {/* ❤️ + 💬 actions */}
// <div className="article-actions">
//   {/* Like button */}
//   <div
//     className={`action-btn like ${article.liked ? "liked" : ""}`}
//     onClick={() => handleLike(article._id)}
//   >
//     <span className="heart">❤️</span>
//     <span className="count">{article.likesCount || 0}</span>
//   </div>

//   {/* Comment toggle */}
//   <div
//     className="action-btn comment"
//     onClick={() =>
//       setExpandedIds((prev) => {
//         const next = new Set(prev);
//         if (next.has(article._id)) next.delete(article._id);
//         else next.add(article._id);
//         return next;
//       })
//     }
//   >
//     <span className="comment-icon">💬</span>
//   </div>
// </div>

// {/* Comments Section (only show if toggled) */}
// {expandedIds.has(article._id) && (
//   <div className="comments-section">
//     <ul className="comments-list">
//       {(article.comments || []).map((c) => {
//         const currentUserId = localStorage.getItem("userId");
//         const commentUserId =
//           c.user?._id?.toString?.() || c.user?.toString?.();

//         return (
//           <li key={c._id}>
//             <strong>{c.username || "Unknown"}:</strong> {c.text}
//             {commentUserId === currentUserId && (
//               <button
//                 onClick={() => handleDeleteComment(article._id, c._id)}
//                 className="delete-comment-btn"
//               >
//                 ❌
//               </button>
//             )}
//           </li>
//         );
//       })}
//     </ul>

//     <CommentInput
//       onSubmit={(text) => handleComment(article._id, text)}
//     />
//   </div>
// )}


//               <p className="meta">
//                 Uploaded: {new Date(article.createdAt || article.uploadedAt).toLocaleString()}
//               </p>
//               <hr className="divider" />
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// const CommentInput = ({ onSubmit }) => {
//   const [text, setText] = useState('');
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(text);
//     setText('');
//   };
//   return (
//     <form onSubmit={handleSubmit} className="comment-form">
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Write a comment..."
//       />
//       <button type="submit">Post</button>
//     </form>
//   );
// };

// export default Articles;









// import React, { useEffect, useState, useRef } from 'react';
// import axios from '../utils/axiosInstance';
// import './Articles.scss';

// const API_BASE = process.env.REACT_APP_BASE_URL || 'http://10.24.75.186:5000';

// const Articles = () => {
//   const [articles, setArticles] = useState([]);
//   const [expandedArticleIds, setExpandedArticleIds] = useState(new Set()); // 🔹 for article text
//   const [expandedCommentIds, setExpandedCommentIds] = useState(new Set()); // 🔹 for comments
//   const [showReadMore, setShowReadMore] = useState({});
//   const [splitMap, setSplitMap] = useState({});
//   const refs = useRef({});

//   // 🔍 Search states
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = () => {
//     axios.get('/api/articles')
//       .then(res => {
//         const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setArticles(sorted);
//       })
//       .catch(err => console.error('Error fetching articles:', err));
//   };

//   useEffect(() => {
//     const t = setTimeout(() => {
//       const newShow = {};
//       const newSplit = {};

//       articles.forEach(article => {
//         const el = refs.current[article._id];
//         const text = (article.content || '').trim();

//         if (!el) {
//           newShow[article._id] = false;
//           return;
//         }

//         const style = window.getComputedStyle(el);
//         let lineHeight = parseFloat(style.lineHeight);
//         if (Number.isNaN(lineHeight)) {
//           const fontSize = parseFloat(style.fontSize) || 16;
//           lineHeight = fontSize * 1.2;
//         }

//         const scrollH = el.scrollHeight;
//         const lines = Math.max(1, Math.round(scrollH / lineHeight));

//         newShow[article._id] = scrollH > (lineHeight * 2) + 1;

//         if (!text) {
//           newSplit[article._id] = { first: '', second: '', extraSpacing: 0 };
//           return;
//         }

//         if (lines > 2) {
//           const midChar = Math.floor(text.length / 2);
//           let splitIndex = text.indexOf(' ', midChar);
//           if (splitIndex === -1) splitIndex = text.lastIndexOf(' ', midChar);
//           if (splitIndex === -1) splitIndex = midChar;

//           const first = text.slice(0, splitIndex).trim();
//           const second = text.slice(splitIndex).trim();

//           newSplit[article._id] = { first, second, extraSpacing: 0 };
//         } else {
//           const extraSpacing = Math.max(0, Math.round((2 - lines) * lineHeight));
//           newSplit[article._id] = { first: text, second: '', extraSpacing };
//         }
//       });

//       setShowReadMore(prev => ({ ...prev, ...newShow }));
//       setSplitMap(prev => ({ ...prev, ...newSplit }));
//     }, 50);

//     return () => clearTimeout(t);
//   }, [articles, expandedArticleIds]);

//   const toggleArticleExpand = (id) => {
//     setExpandedArticleIds(prev => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

//   const toggleComments = (id) => {
//     setExpandedCommentIds(prev => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

//   // Highlight function
//   const highlightText = (text) => {
//     if (!searchTerm) return text;
//     const regex = new RegExp(`(${searchTerm})`, 'gi');
//     return text.split(regex).map((part, i) =>
//       regex.test(part) ? <mark key={i} className="highlight">{part}</mark> : part
//     );
//   };

//   // Likes handler
//   const handleLike = async (id) => {
//     try {
//       const res = await axios.post(`/api/articles/${id}/like`);
//       setArticles(prev =>
//         prev.map(a =>
//           a._id === id
//             ? {
//                 ...a,
//                 likes: res.data.likes,
//                 likesCount: res.data.likesCount,
//                 liked: res.data.liked
//               }
//             : a
//         )
//       );
//     } catch (err) {
//       console.error("Error liking article:", err);
//     }
//   };

//   // Comments handler
//   const handleComment = async (id, comment) => {
//     if (!comment.trim()) return;
//     try {
//       const res = await axios.post(`/api/articles/${id}/comment`, { text: comment });
//       setArticles(prev =>
//         prev.map(a => a._id === id ? { ...a, comments: res.data.comments } : a)
//       );
//     } catch (err) {
//       console.error('Error adding comment:', err);
//     }
//   };
  
//   const handleDeleteComment = async (articleId, commentId) => {
//     try {
//       const res = await axios.delete(`/api/articles/${articleId}/comments/${commentId}`);
//       setArticles(prev =>
//         prev.map(a =>
//           a._id === articleId ? { ...a, comments: res.data.comments } : a
//         )
//       );
//     } catch (err) {
//       console.error("Error deleting comment:", err);
//     }
//   };

//   // Filtered articles (only show relevant ones)
//   const filteredArticles = searchTerm
//     ? articles.filter(a =>
//         a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         a.content.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : articles;

//   return (
//     <div className="articles">
//       <div className="articles-header">
//         <h1>Latest Articles</h1>

//         <div className="search-container">
//           <span
//             className="search-icon"
//             onClick={() => setShowSearch(prev => !prev)}
//           >
//             🔍︎
//           </span>
//           {(showSearch || window.innerWidth <= 600) && (
//             <input
//               type="text"
//               className="search-bar"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           )}
//         </div>
//       </div>

//       {filteredArticles.length === 0 ? (
//         <p>No articles found.</p>
//       ) : (
//         filteredArticles.map(article => {
//           const isExpanded = expandedArticleIds.has(article._id);
//           const showComments = expandedCommentIds.has(article._id);
//           const needsToggle = showReadMore[article._id];
//           const parts = splitMap[article._id] || null;
//           const imageUrl = article.image ? `${API_BASE}${article.image}` : null;

//           return (
//             <div key={article._id} id={article._id} className="article-box">
//               <h2>{highlightText(article.title)}</h2>

//               <div className="content-wrap">
//                 <div
//                   ref={el => { refs.current[article._id] = el; }}
//                   className={`article-content ${isExpanded ? 'expanded' : 'clamped'}`}
//                   aria-expanded={isExpanded}
//                 >
//                   {parts ? (
//                     <>
//                       <span className="article-text">{highlightText(parts.first)}</span>
//                       {parts.second ? (
//                         <>
//                           {imageUrl && (
//                             <div className="article-image">
//                               <img src={imageUrl} alt={article.title} />
//                             </div>
//                           )}
//                           <span className="article-text">{highlightText(parts.second)}</span>
//                         </>
//                       ) : (
//                         <>
//                           {imageUrl && <div style={{ height: parts.extraSpacing }} />}
//                           {imageUrl && (
//                             <div className="article-image">
//                               <img src={imageUrl} alt={article.title} />
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <span className="article-text">{highlightText(article.content)}</span>
//                   )}
//                 </div>

//                 {needsToggle && (
//                   <button
//                     className="read-toggle"
//                     onClick={() => toggleArticleExpand(article._id)}
//                   >
//                     {isExpanded ? 'Read less' : 'Read more →'}
//                   </button>
//                 )}
//               </div>

//               {/* ❤️ + 💬 actions */}
//               <div className="article-actions">
//                 {/* Like button */}
//                 <div
//                   className={`action-btn like ${article.liked ? "liked" : ""}`}
//                   onClick={() => handleLike(article._id)}
//                 >
//                   <span className="heart">❤️</span>
//                   <span className="count">{article.likesCount || 0}</span>
//                 </div>

//                 {/* Comment toggle */}
//                 <div
//                   className="action-btn comment"
//                   onClick={() => toggleComments(article._id)}
//                 >
//                   <span className="comment-icon">💬</span>
//                 </div>
//               </div>

//               {/* Comments Section (only show if toggled) */}
//               {showComments && (
//                 <div className="comments-section">
//                   <ul className="comments-list">
//                     {(article.comments || []).map((c) => {
//                       const currentUserId = localStorage.getItem("userId");
//                       const commentUserId =
//                         c.user?._id?.toString?.() || c.user?.toString?.();

//                       return (
//                         <li key={c._id}>
//                           <strong>{c.username || "Unknown"}:</strong> {c.text}
//                           {commentUserId === currentUserId && (
//                             <button
//                               onClick={() => handleDeleteComment(article._id, c._id)}
//                               className="delete-comment-btn"
//                             >
//                               ❌
//                             </button>
//                           )}
//                         </li>
//                       );
//                     })}
//                   </ul>

//                   <CommentInput
//                     onSubmit={(text) => handleComment(article._id, text)}
//                   />
//                 </div>
//               )}

//               <p className="meta">
//                 Uploaded: {new Date(article.createdAt || article.uploadedAt).toLocaleString()}
//               </p>
//               <hr className="divider" />
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// const CommentInput = ({ onSubmit }) => {
//   const [text, setText] = useState('');
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(text);
//     setText('');
//   };
//   return (
//     <form onSubmit={handleSubmit} className="comment-form">
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Write a comment..."
//       />
//       <button type="submit">Post</button>
//     </form>
//   );
// };

// export default Articles;






// import React, { useEffect, useState, useRef } from 'react';
// import axios from '../utils/axiosInstance';
// import './Articles.scss';
// import '@fortawesome/fontawesome-free/css/all.min.css';   // ✅ FontAwesome import

// const API_BASE = process.env.REACT_APP_BASE_URL || 'http://10.24.75.186:5000';

// const Articles = () => {
//   const [articles, setArticles] = useState([]);
//   const [expandedArticleIds, setExpandedArticleIds] = useState(new Set());
//   const [expandedCommentIds, setExpandedCommentIds] = useState(new Set());
//   const [showReadMore, setShowReadMore] = useState({});
//   const [splitMap, setSplitMap] = useState({});
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [toast, setToast] = useState(null);
//   const refs = useRef({});

//   // 🔍 Search states
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = () => {
//     axios.get('/api/articles')
//       .then(res => {
//         const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setArticles(sorted);
//       })
//       .catch(err => console.error('Error fetching articles:', err));
//   };

//   useEffect(() => {
//     const t = setTimeout(() => {
//       const newShow = {};
//       const newSplit = {};

//       articles.forEach(article => {
//         const el = refs.current[article._id];
//         const text = (article.content || '').trim();

//         if (!el) {
//           newShow[article._id] = false;
//           return;
//         }

//         const style = window.getComputedStyle(el);
//         let lineHeight = parseFloat(style.lineHeight);
//         if (Number.isNaN(lineHeight)) {
//           const fontSize = parseFloat(style.fontSize) || 16;
//           lineHeight = fontSize * 1.2;
//         }

//         const scrollH = el.scrollHeight;
//         const lines = Math.max(1, Math.round(scrollH / lineHeight));

//         newShow[article._id] = scrollH > (lineHeight * 2) + 1;

//         if (!text) {
//           newSplit[article._id] = { first: '', second: '', extraSpacing: 0 };
//           return;
//         }

//         if (lines > 2) {
//           const midChar = Math.floor(text.length / 2);
//           let splitIndex = text.indexOf(' ', midChar);
//           if (splitIndex === -1) splitIndex = text.lastIndexOf(' ', midChar);
//           if (splitIndex === -1) splitIndex = midChar;

//           const first = text.slice(0, splitIndex).trim();
//           const second = text.slice(splitIndex).trim();

//           newSplit[article._id] = { first, second, extraSpacing: 0 };
//         } else {
//           const extraSpacing = Math.max(0, Math.round((2 - lines) * lineHeight));
//           newSplit[article._id] = { first: text, second: '', extraSpacing };
//         }
//       });

//       setShowReadMore(prev => ({ ...prev, ...newShow }));
//       setSplitMap(prev => ({ ...prev, ...newSplit }));
//     }, 50);

//     return () => clearTimeout(t);
//   }, [articles, expandedArticleIds]);

//   const toggleArticleExpand = (id) => {
//     setExpandedArticleIds(prev => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

//   const toggleComments = (id) => {
//     setExpandedCommentIds(prev => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

//   // Highlight function
//   const highlightText = (text) => {
//     if (!searchTerm) return text;
//     const regex = new RegExp(`(${searchTerm})`, 'gi');
//     return text.split(regex).map((part, i) =>
//       regex.test(part) ? <mark key={i} className="highlight">{part}</mark> : part
//     );
//   };

//   // Likes handler
//   const handleLike = async (id) => {
//     try {
//       const res = await axios.post(`/api/articles/${id}/like`);
//       setArticles(prev =>
//         prev.map(a =>
//           a._id === id
//             ? {
//                 ...a,
//                 likes: res.data.likes,
//                 likesCount: res.data.likesCount,
//                 liked: res.data.liked
//               }
//             : a
//         )
//       );
//     } catch (err) {
//       console.error("Error liking article:", err);
//     }
//   };

//   //Comments handler
//   const handleComment = async (id, comment) => {
//     if (!comment.trim()) return;
//     try {
//       const res = await axios.post(`/api/articles/${id}/comment`, { text: comment });
//       setArticles(prev =>
//         prev.map(a => a._id === id ? { ...a, comments: res.data.comments } : a)
//       );
//     } catch (err) {
//       console.error('Error adding comment:', err);
//     }
//   };
  
//   const handleDeleteComment = async (articleId, commentId) => {
//     try {
//       const res = await axios.delete(`/api/articles/${articleId}/comments/${commentId}`);
//       setArticles(prev =>
//         prev.map(a =>
//           a._id === articleId ? { ...a, comments: res.data.comments } : a
//         )
//       );
//     } catch (err) {
//       console.error("Error deleting comment:", err);
//     }
//   };

//   // Comments handler



//   // Filtered articles
//   const filteredArticles = searchTerm
//     ? articles.filter(a =>
//         a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         a.content.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : articles;

//   return (
//     <div className="articles">
//       <div className="articles-header">
//         <h1>Latest Articles</h1>

//         <div className="search-container">
//           <span
//             className="search-icon"
//             onClick={() => setShowSearch(prev => !prev)}
//           >
//             🔍︎
//           </span>
//           {(showSearch || window.innerWidth <= 600) && (
//             <input
//               type="text"
//               className="search-bar"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           )}
//         </div>
//       </div>

//       {filteredArticles.length === 0 ? (
//         <p>No articles found.</p>
//       ) : (
//         filteredArticles.map(article => {
//           const isExpanded = expandedArticleIds.has(article._id);
//           const showComments = expandedCommentIds.has(article._id);
//           const needsToggle = showReadMore[article._id];
//           const parts = splitMap[article._id] || null;
//           const imageUrl = article.image ? `${API_BASE}${article.image}` : null;

//           return (
//             <div key={article._id} id={article._id} className="article-box">
//               <h2>{highlightText(article.title)}</h2>

//               <div className="content-wrap">
//                 <div
//                   ref={el => { refs.current[article._id] = el; }}
//                   className={`article-content ${isExpanded ? 'expanded' : 'clamped'}`}
//                   aria-expanded={isExpanded}
//                 >
//                   {parts ? (
//                     <>
//                       <span className="article-text">{highlightText(parts.first)}</span>
//                       {parts.second ? (
//                         <>
//                           {imageUrl && (
//                             <div className="article-image">
//                               <img src={imageUrl} alt={article.title} />
//                             </div>
//                           )}
//                           <span className="article-text">{highlightText(parts.second)}</span>
//                         </>
//                       ) : (
//                         <>
//                           {imageUrl && <div style={{ height: parts.extraSpacing }} />}
//                           {imageUrl && (
//                             <div className="article-image">
//                               <img src={imageUrl} alt={article.title} />
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <span className="article-text">{highlightText(article.content)}</span>
//                   )}
//                 </div>

//                 {needsToggle && (
//                   <button
//                     className="read-toggle"
//                     onClick={(e) => {
//                       e.stopPropagation(); // ✅ prevent icon clicks expanding
//                       toggleArticleExpand(article._id);
//                     }}
//                   >
//                     {isExpanded ? 'Read less' : 'Read more →'}
//                   </button>
//                 )}
//               </div>

//               {/* ❤️ + 💬 actions */}
//               <div className="article-actions">
//                 {/* Like button */}
//                 <i
//                   className={article.liked ? "fa-solid fa-heart liked" : "fa-regular fa-heart"}
//                   onClick={(e) => {
//                     e.stopPropagation(); // ⛔ stop expanding
//                     handleLike(article._id);
//                   }}
//                 ></i>
//                 <span className="count">{article.likesCount || 0}</span>

//                 {/* Comment button */}
//                 <i
//                   className="fa-regular fa-comment"
//                   onClick={(e) => {
//                     e.stopPropagation(); // ⛔ stop expanding
//                     toggleComments(article._id);
//                   }}
//                 ></i>
//               </div>

//               {/* Comments Section */}
//               {showComments && (
//                 <div className="comments-section">
//                   <ul className="comments-list">
//                     {(article.comments || []).map((c) => {
//                       const currentUserId = localStorage.getItem("userId");
//                       const commentUserId =
//                         c.user?._id?.toString?.() || c.user?.toString?.();

//                       return (
//                         // <li key={c._id}>
//                         //   <strong>{c.username || "Unknown"}:</strong> {c.text}
//                         //   {commentUserId === currentUserId && (
//                         //     <button
//                         //       onClick={() => handleDeleteComment(article._id, c._id)}
//                         //       className="delete-comment-btn"
//                         //     >
//                         //       ❌
//                         //     </button>
//                         //   )}
//                         // </li>
//                         <li
//   key={c._id}
//   onClick={() => {
//     if (commentUserId === currentUserId) {
//       setActiveCommentId(c._id);
//     }
//   }}
//   onMouseLeave={() => setActiveCommentId(null)}
//   style={{
//     position: "relative",
//     cursor: commentUserId === currentUserId ? "pointer" : "default",
//   }}
// >
//   <strong>{c.username || "Unknown"}:</strong> {c.text}

//   {activeCommentId === c._id && commentUserId === currentUserId && (
//     <span
//       className="delete-option"
//       onClick={() => handleDeleteComment(article._id, c._id)}
//     >
//       DELETE
//     </span>
//   )}
// </li>


//                       );
//                     })}
//                   </ul>

//                   <CommentInput
//                     onSubmit={(text) => handleComment(article._id, text)}
//                   />
//                 </div>
//               )}

//               <p className="meta">
//                 Uploaded: {new Date(article.createdAt || article.uploadedAt).toLocaleString()}
//               </p>
//               <hr className="divider" />
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// const CommentInput = ({ onSubmit }) => {
//   const [text, setText] = useState('');
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(text);
//     setText('');
//   };
//   return (
//     <form onSubmit={handleSubmit} className="comment-form">
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Write a comment..."
//       />
//       <button type="submit">Post</button>
//     </form>
//   );
// };

// export default Articles;











import React, { useEffect, useState, useRef } from 'react';
import axios from '../utils/axiosInstance';
import './Articles.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';   // ✅ FontAwesome import


const API_BASE = process.env.REACT_APP_BASE_URL || 'http://10.151.94.186:5000';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [expandedArticleIds, setExpandedArticleIds] = useState(new Set());
  const [expandedCommentIds, setExpandedCommentIds] = useState(new Set());
  const [showReadMore, setShowReadMore] = useState({});
  const [splitMap, setSplitMap] = useState({});
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [toast, setToast] = useState(null);
  const refs = useRef({});
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  // 🔍 Search states
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   fetchArticles();

  // }, [token, isLoggedIn]);


  useEffect(() => {
    fetchArticles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isLoggedIn]);
  

  // const fetchArticles = () => {
  //   axios.get('/api/articles')
  //     .then(res => {
  //       const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //       setArticles(sorted);
  //     })
  //     .catch(err => console.error('Error fetching articles:', err));
  // };



  // const fetchArticles = () => {
  //   const url = isLoggedIn ? "/api/articles/auth" : "/api/articles";
  //   axios
  //     .get(url, isLoggedIn ? { headers: { Authorization: `Bearer ${token}` } } : {})
  //     .then(res => {
  //       const sorted = (res.data || []).sort(
  //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //       );
  //       setArticles(sorted);
  //     })
  //     .catch(err => console.error("Error fetching articles:", err));
  // };


  const fetchArticles = () => {
    const url = isLoggedIn ? "/api/articles/auth" : "/api/articles";
    axios
      .get(url, isLoggedIn ? { headers: { Authorization: `Bearer ${token}` } } : {})
      .then(res => {
        const sorted = (res.data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setArticles(sorted);
      })
      .catch(err => console.error("Error fetching articles:", err));
  };
  
  
  // ✅ Toast helper
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      const newShow = {};
      const newSplit = {};

      articles.forEach(article => {
        const el = refs.current[article._id];
        const text = (article.content || '').trim();

        if (!el) {
          newShow[article._id] = false;
          return;
        }

        const style = window.getComputedStyle(el);
        let lineHeight = parseFloat(style.lineHeight);
        if (Number.isNaN(lineHeight)) {
          const fontSize = parseFloat(style.fontSize) || 16;
          lineHeight = fontSize * 1.2;
        }

        const scrollH = el.scrollHeight;
        const lines = Math.max(1, Math.round(scrollH / lineHeight));

        newShow[article._id] = scrollH > (lineHeight * 2) + 1;

        if (!text) {
          newSplit[article._id] = { first: '', second: '', extraSpacing: 0 };
          return;
        }

        if (lines > 2) {
          const midChar = Math.floor(text.length / 2);
          let splitIndex = text.indexOf(' ', midChar);
          if (splitIndex === -1) splitIndex = text.lastIndexOf(' ', midChar);
          if (splitIndex === -1) splitIndex = midChar;

          const first = text.slice(0, splitIndex).trim();
          const second = text.slice(splitIndex).trim();

          newSplit[article._id] = { first, second, extraSpacing: 0 };
        } else {
          const extraSpacing = Math.max(0, Math.round((2 - lines) * lineHeight));
          newSplit[article._id] = { first: text, second: '', extraSpacing };
        }
      });

      setShowReadMore(prev => ({ ...prev, ...newShow }));
      setSplitMap(prev => ({ ...prev, ...newSplit }));
    }, 50);

    return () => clearTimeout(t);
  }, [articles, expandedArticleIds]);

  const toggleArticleExpand = (id) => {
    setExpandedArticleIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleComments = (id) => {
    setExpandedCommentIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Highlight function
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i} className="highlight">{part}</mark> : part
    );
  };

  // Likes handler
  // const handleLike = async (id) => {
  //   try {
  //     const res = await axios.post(`/api/articles/${id}/like`);
  //     setArticles(prev =>
  //       prev.map(a =>
  //         a._id === id
  //           ? {
  //               ...a,
  //               likes: res.data.likes,
  //               likesCount: res.data.likesCount,
  //               liked: res.data.liked
  //             }
  //           : a
  //       )
  //     );
  //   } catch (err) {
  //     console.error("Error liking article:", err);
  //   }
  // };


  const handleLike = async (id) => {
    if (!isLoggedIn) {
      showToast("please login to get these features");
      return;
    }
    try {
      const res = await axios.post(
        `/api/articles/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setArticles(prev =>
        prev.map(a => (a._id === id ? { ...a, ...res.data } : a))
      );
    } catch (err) {
      console.error("Error liking article:", err);
    }
  };
  

  //Comments handler
  // const handleComment = async (id, comment) => {
  //   if (!comment.trim()) return;
  //   try {
  //     const res = await axios.post(`/api/articles/${id}/comment`, { text: comment });
  //     setArticles(prev =>
  //       prev.map(a => a._id === id ? { ...a, comments: res.data.comments } : a)
  //     );
  //     showToast("COMMENT POSTED SUCCESSFULLY");
  //   } catch (err) {
  //     console.error('ERROR IN ADDING COMMENT', err);
  //   }
  // };
  
  const handleDeleteComment = async (articleId, commentId) => {
    try {
      const res = await axios.delete(`/api/articles/${articleId}/comments/${commentId}`);
      setArticles(prev =>
        prev.map(a =>
          a._id === articleId ? { ...a, comments: res.data.comments } : a
        )
      );
      showToast("COMMENT DELETED SUCCESSFULLY");
    } catch (err) {
      console.error("ERROR IN DELETING COMMENT", err);
    }
  };


  const handleComment = async (id, comment) => {
    if (!isLoggedIn) {
      showToast("please login to get these features");
      return;
    }
    if (!comment.trim()) return;
    try {
      const res = await axios.post(
        `/api/articles/${id}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setArticles(prev =>
        prev.map(a => (a._id === id ? { ...a, comments: res.data.comments } : a))
      );
      showToast("COMMENT POSTED SUCCESSFULLY");
    } catch (err) {
      console.error("ERROR IN ADDING COMMENT", err);
    }
  };  

  // Filtered articles
  const filteredArticles = searchTerm
    ? articles.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : articles;

  return (
    <div className="articles">
      <div className="articles-header">
        <h1>Latest Articles</h1>

        <div className="search-container">
          <span
            className="search-icon"
            onClick={() => setShowSearch(prev => !prev)}
          >
            🔍︎
          </span>
          {(showSearch || window.innerWidth <= 600) && (
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        filteredArticles.map(article => {
          const isExpanded = expandedArticleIds.has(article._id);
          const showComments = expandedCommentIds.has(article._id);
          const needsToggle = showReadMore[article._id];
          const parts = splitMap[article._id] || null;
          const imageUrl = article.image ? `${API_BASE}${article.image}` : null;

          return (
            <div key={article._id} id={article._id} className="article-box">
              <h2>{highlightText(article.title)}</h2>

              <div className="content-wrap">
                <div
                  ref={el => { refs.current[article._id] = el; }}
                  className={`article-content ${isExpanded ? 'expanded' : 'clamped'}`}
                  aria-expanded={isExpanded}
                >
                  {parts ? (
                    <>
                      <span className="article-text">{highlightText(parts.first)}</span>
                      {parts.second ? (
                        <>
                          {imageUrl && (
                            <div className="article-image">
                              <img src={imageUrl} alt={article.title} />
                            </div>
                          )}
                          <span className="article-text">{highlightText(parts.second)}</span>
                        </>
                      ) : (
                        <>
                          {imageUrl && <div style={{ height: parts.extraSpacing }} />}
                          {imageUrl && (
                            <div className="article-image">
                              <img src={imageUrl} alt={article.title} />
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <span className="article-text">{highlightText(article.content)}</span>
                  )}
                </div>

                {needsToggle && (
                  <button
                    className="read-toggle"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      toggleArticleExpand(article._id);
                    }}
                  >
                    {isExpanded ? 'Read less' : 'Read more →'}
                  </button>
                )}
              </div>

              {/* ❤️ + 💬 actions */}
              <div className="article-actions">
                <i
                  className={article.liked ? "fa-solid fa-heart liked" : "fa-regular fa-heart"}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleLike(article._id);
                  }}
                ></i>
                <span className="count">{article.likesCount || 0}</span>

                {/* <i
                  className="fa-regular fa-comment"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    toggleComments(article._id);
                  }}
                ></i> */}
                <i
  className="fa-regular fa-comment"
  onClick={(e) => {
    e.stopPropagation(); 
    if (!isLoggedIn) {
      showToast("please login to get these features");
      return;
    }
    toggleComments(article._id);
  }}
></i>
<span className="count">{isLoggedIn ? (article.comments?.length || 0) : 0}</span>

              </div>

              {/* Comments Section */}
              {showComments && isLoggedIn && (
                <div className="comments-section">
                  <ul className="comments-list">
                    {(article.comments || []).map((c) => {
                      const currentUserId = localStorage.getItem("userId");
                      const commentUserId =
                        c.user?._id?.toString?.() || c.user?.toString?.();

                      return (
                        <li
                          key={c._id}
                          onClick={() => {
                            if (commentUserId === currentUserId) {
                              setActiveCommentId(c._id);
                            }
                          }}
                          onMouseLeave={() => setActiveCommentId(null)}
                          style={{
                            position: "relative",
                            cursor: commentUserId === currentUserId ? "pointer" : "default",
                          }}
                        >
                          <strong>{c.username || "Unknown"}:</strong> {c.text}

                          {activeCommentId === c._id && commentUserId === currentUserId && (
                            <span
                              className="delete-option"
                              onClick={() => handleDeleteComment(article._id, c._id)}
                              style={{ fontWeight: "bold", textTransform: "uppercase" }}
                            >
                              DELETE
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <CommentInput
                    onSubmit={(text) => handleComment(article._id, text)}
                  />
                </div>
              )}

              <p className="meta">
                Uploaded: {new Date(article.createdAt || article.uploadedAt).toLocaleString()}
              </p>
              <hr className="divider" />
            </div>
          );
        })
      )}

      {/* ✅ Toast Notification */}
      {toast && <div className="toast-message">{toast}</div>}
    </div>
  );
};

const CommentInput = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default Articles;







