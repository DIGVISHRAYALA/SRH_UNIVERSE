// // pages/Articles.jsx
// import React, { useEffect, useState } from 'react';
// import axios from '../utils/axiosInstance'; // ✅ use correct instance
// import './Articles.scss';

// const Articles = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     axios.get('/api/articles')
//       .then(res => {
//         // ✅ Sort newest first
//         const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setArticles(sorted);
//       })
//       .catch(err => {
//         console.error('Error fetching articles:', err);
//       });
//   }, []);

//   return (
//     <div className="articles">
//       <h1>Latest Articles</h1>

//       {articles.length === 0 ? (
//         <p>No articles found.</p>
//       ) : (
//         articles.map((article) => (
//           <div key={article._id} className="article-box">
//             <h2>{article.title}</h2>
//             <p>{article.content}</p>
//             <p>Uploaded: {new Date(article.createdAt).toLocaleString()}</p>
//             <hr className="divider" />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Articles;


// import React, { useEffect, useState, useRef } from 'react';
// import axios from '../utils/axiosInstance';
// import './Articles.scss';

// const Articles = () => {
//   const [articles, setArticles] = useState([]);
//   const [expandedIds, setExpandedIds] = useState(new Set());
//   const [showReadMore, setShowReadMore] = useState({}); // id -> bool
//   const refs = useRef({});

//   useEffect(() => {
//     axios.get('/api/articles')
//       .then(res => {
//         const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setArticles(sorted);
//       })
//       .catch(err => console.error('Error fetching articles:', err));
//   }, []);

//   // Measure each article to see if it overflows 2 lines
//   useEffect(() => {
//     // small delay so fonts/layout are applied
//     const t = setTimeout(() => {
//       const newShow = {};
//       articles.forEach(article => {
//         const el = refs.current[article._id];
//         if (!el) {
//           newShow[article._id] = false;
//           return;
//         }

//         // compute actual line-height in pixels (fallback if 'normal')
//         const style = window.getComputedStyle(el);
//         let lineHeight = parseFloat(style.lineHeight);
//         if (Number.isNaN(lineHeight)) {
//           // fallback approximation using font-size * 1.2
//           const fontSize = parseFloat(style.fontSize) || 16;
//           lineHeight = fontSize * 1.2;
//         }

//         const twoLinesHeight = lineHeight * 2;
//         // If scrollHeight > twoLinesHeight then content is clipped
//         newShow[article._id] = el.scrollHeight > twoLinesHeight + 1; // +1 tolerance
//       });
//       setShowReadMore(prev => ({ ...prev, ...newShow }));
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

//   return (
//     <div className="articles">
//       <h1>Latest Articles</h1>

//       {articles.length === 0 ? <p>No articles found.</p> : (
//         articles.map(article => {
//           const isExpanded = expandedIds.has(article._id);
//           const needsToggle = showReadMore[article._id];
//           return (
//             <div key={article._id} id={article._id} className="article-box">
//               <h2>{article.title}</h2>

//               <div className="content-wrap">
//                 <p
//                   ref={el => { refs.current[article._id] = el; }}
//                   className={`article-content ${isExpanded ? 'expanded' : 'clamped'}`}
//                   aria-expanded={isExpanded}
//                 >
//                   {article.content}
//                 </p>

//                 {/* Read more button placed over the end of the second line when clamped */}
//                 {needsToggle && (
//                   <button
//                     className="read-toggle"
//                     onClick={() => toggleExpand(article._id)}
//                     aria-controls={article._id}
//                     aria-expanded={isExpanded}
//                   >
//                     {isExpanded ? 'Read less' : 'Read more →'}
//                   </button>
//                 )}
//               </div>

//               <p className="meta">Uploaded: {new Date(article.createdAt || article.uploadedAt).toLocaleString()}</p>
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

// //const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
// const API_BASE = process.env.REACT_APP_BASE_URL || 'http://10.250.180.187:5000';


// const Articles = () => {
//   const [articles, setArticles] = useState([]);
//   const [expandedIds, setExpandedIds] = useState(new Set());
//   const [showReadMore, setShowReadMore] = useState({});
//   const [splitMap, setSplitMap] = useState({}); // id -> { first, second, extraSpacing }
//   const refs = useRef({});

//   useEffect(() => {
//     axios.get('/api/articles')
//       .then(res => {
//         const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setArticles(sorted);
//       })
//       .catch(err => console.error('Error fetching articles:', err));
//   }, []);

//   // Measure content to determine "read more" and where to insert the image
//   useEffect(() => {
//     // small delay so fonts/layout are applied
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

//         // compute actual line-height in pixels (fallback if 'normal')
//         const style = window.getComputedStyle(el);
//         let lineHeight = parseFloat(style.lineHeight);
//         if (Number.isNaN(lineHeight)) {
//           const fontSize = parseFloat(style.fontSize) || 16;
//           lineHeight = fontSize * 1.2;
//         }

//         const scrollH = el.scrollHeight;
//         const lines = Math.max(1, Math.round(scrollH / lineHeight));

//         // read-more detection (if content visually exceeds 2 lines)
//         newShow[article._id] = scrollH > (lineHeight * 2) + 1;

//         // Decide where to split and how to position the image:
//         if (!text) {
//           newSplit[article._id] = { first: '', second: '', extraSpacing: 0 };
//           return;
//         }

//         if (lines > 2) {
//           // Split text roughly in half by characters, then adjust to nearest space
//           const midChar = Math.floor(text.length / 2);

//           // prefer next space after midpoint, otherwise previous space
//           let splitIndex = text.indexOf(' ', midChar);
//           if (splitIndex === -1) splitIndex = text.lastIndexOf(' ', midChar);
//           if (splitIndex === -1) splitIndex = midChar; // fallback if no spaces

//           const first = text.slice(0, splitIndex).trim();
//           const second = text.slice(splitIndex).trim();

//           newSplit[article._id] = { first, second, extraSpacing: 0 };
//         } else {
//           // For <= 2 lines: keep full text first, compute extra spacing so image appears after 2 lines
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

//   return (
//     <div className="articles">
//       <h1>Latest Articles</h1>

//       {articles.length === 0 ? (
//         <p>No articles found.</p>
//       ) : (
//         articles.map(article => {
//           const isExpanded = expandedIds.has(article._id);
//           const needsToggle = showReadMore[article._id];
//           const parts = splitMap[article._id] || null;
//           const imageUrl = article.image ? `${API_BASE}${article.image}` : null;
//           //const imageUrl = article.image ? `${API_BASE}/uploads/${article.image}` : null;

//           return (
//             <div key={article._id} id={article._id} className="article-box">
//               <h2>{article.title}</h2>

//               <div className="content-wrap">
//                 {/* We put the ref on this container so we measure the whole content before splitting */}
//                 <div
//                   ref={el => { refs.current[article._id] = el; }}
//                   className={`article-content ${isExpanded ? 'expanded' : 'clamped'}`}
//                   aria-expanded={isExpanded}
//                 >
//                   {parts ? (
//                     // If we have split info, render first part, then image, then second part (or spacer + image)
//                     <>
//                       <span className="article-text">{parts.first}</span>

//                       {parts.second ? (
//                         <>
//                           {imageUrl && (
//                             <div className="article-image" style={{ textAlign: 'center', margin: '12px 0' }}>
//                               <img
//                                 src={imageUrl}
//                                 alt={article.title}
//                                 style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
//                               />
//                             </div>
//                           )}
//                           <span className="article-text">{parts.second}</span>
//                         </>
//                       ) : (
//                         // <= 2 lines case: show image after the full content with extraSpacing
//                         <>
//                           {imageUrl && (
//                             <div
//                               style={{
//                                 height: parts.extraSpacing,
//                                 width: '1px' /* spacer height only */,
//                               }}
//                             />
//                           )}
//                           {imageUrl && (
//                             <div className="article-image" style={{ textAlign: 'center', margin: '12px 0' }}>
//                               <img
//                                 src={imageUrl}
//                                 alt={article.title}
//                                 style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
//                               />
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     // fallback (before measurement runs) — just show full content
//                     <span className="article-text">{article.content}</span>
//                   )}
//                 </div>

//                 {/* Read more / toggle */}
//                 {needsToggle && (
//                   <button
//                     className="read-toggle"
//                     onClick={() => toggleExpand(article._id)}
//                     aria-controls={article._id}
//                     aria-expanded={isExpanded}
//                     style={{ marginTop: '8px' }}
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




import React, { useEffect, useState, useRef } from 'react';
import axios from '../utils/axiosInstance';
import './Articles.scss';

const API_BASE = process.env.REACT_APP_BASE_URL || 'http://10.250.180.187:5000';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [showReadMore, setShowReadMore] = useState({});
  const [splitMap, setSplitMap] = useState({});
  const refs = useRef({});

  // 🔍 Search states
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/api/articles')
      .then(res => {
        const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setArticles(sorted);
      })
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

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
  }, [articles, expandedIds]);

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
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

  // Filtered articles (only show relevant ones)
  const filteredArticles = searchTerm
    ? articles.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : articles;

  return (
    <div className="articles">
      <div className="articles-header">
        {/* <h1>Latest Articles</h1>
         <span
          className="search-icon"
          onClick={() => setShowSearch(prev => !prev)}
        >
          🔍︎
        </span> 
        {showSearch && (
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        )} */}
        <h1>Latest Articles</h1>
{/* <div className="search-container">
  <span
    className="search-icon"
    onClick={() => setShowSearch(prev => !prev)}
  >
    🔍︎ 
  </span>
  {showSearch && (
    <input
      type="text"
      className="search-bar"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      autoFocus
    />
  )}
</div> */}

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
          const isExpanded = expandedIds.has(article._id);
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
                          {imageUrl && (
                            <div style={{ height: parts.extraSpacing }} />
                          )}
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
                    onClick={() => toggleExpand(article._id)}
                  >
                    {isExpanded ? 'Read less' : 'Read more →'}
                  </button>
                )}
              </div>

              <p className="meta">
                Uploaded: {new Date(article.createdAt || article.uploadedAt).toLocaleString()}
              </p>
              <hr className="divider" />
            </div>
          );
        })
      )}
    </div>
  );
};
export default Articles;




