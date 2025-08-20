
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




