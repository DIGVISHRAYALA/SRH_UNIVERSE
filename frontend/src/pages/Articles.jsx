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


import React, { useEffect, useState, useRef } from 'react';
import axios from '../utils/axiosInstance';
import './Articles.scss';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [showReadMore, setShowReadMore] = useState({}); // id -> bool
  const refs = useRef({});

  useEffect(() => {
    axios.get('/api/articles')
      .then(res => {
        const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setArticles(sorted);
      })
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  // Measure each article to see if it overflows 2 lines
  useEffect(() => {
    // small delay so fonts/layout are applied
    const t = setTimeout(() => {
      const newShow = {};
      articles.forEach(article => {
        const el = refs.current[article._id];
        if (!el) {
          newShow[article._id] = false;
          return;
        }

        // compute actual line-height in pixels (fallback if 'normal')
        const style = window.getComputedStyle(el);
        let lineHeight = parseFloat(style.lineHeight);
        if (Number.isNaN(lineHeight)) {
          // fallback approximation using font-size * 1.2
          const fontSize = parseFloat(style.fontSize) || 16;
          lineHeight = fontSize * 1.2;
        }

        const twoLinesHeight = lineHeight * 2;
        // If scrollHeight > twoLinesHeight then content is clipped
        newShow[article._id] = el.scrollHeight > twoLinesHeight + 1; // +1 tolerance
      });
      setShowReadMore(prev => ({ ...prev, ...newShow }));
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

  return (
    <div className="articles">
      <h1>Latest Articles</h1>

      {articles.length === 0 ? <p>No articles found.</p> : (
        articles.map(article => {
          const isExpanded = expandedIds.has(article._id);
          const needsToggle = showReadMore[article._id];
          return (
            <div key={article._id} id={article._id} className="article-box">
              <h2>{article.title}</h2>

              <div className="content-wrap">
                <p
                  ref={el => { refs.current[article._id] = el; }}
                  className={`article-content ${isExpanded ? 'expanded' : 'clamped'}`}
                  aria-expanded={isExpanded}
                >
                  {article.content}
                </p>

                {/* Read more button placed over the end of the second line when clamped */}
                {needsToggle && (
                  <button
                    className="read-toggle"
                    onClick={() => toggleExpand(article._id)}
                    aria-controls={article._id}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? 'Read less' : 'Read more →'}
                  </button>
                )}
              </div>

              <p className="meta">Uploaded: {new Date(article.createdAt || article.uploadedAt).toLocaleString()}</p>
              <hr className="divider" />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Articles;
