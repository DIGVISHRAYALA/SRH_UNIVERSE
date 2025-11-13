
import React, { useState } from 'react';
import './AboutUs.scss';

export default function AboutUs() {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Please write a message before sending.');
      return;
    }
    const subject = encodeURIComponent('SRH Universe — Feedback / Suggestion');
    const bodyIntro = `Hi SRH Universe,\n\nI am sending this message from the SRH Universe website:\n\n`;
    const body = encodeURIComponent(bodyIntro + message + `\n\n\n`);
    window.location.href = `mailto:r.digvish@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleClear = () => setMessage('');

  return (
    <div className="about-page">
      <div className="about-card">

        {/* LEFT COLUMN */}
        <div className="left">
          <h1 className="page-heading">ABOUT SRH UNIVERSE</h1>

          <div className="about-content">
            <p>
              In 2020, I started an Instagram page with nothing more than a love for Sunrisers
              Hyderabad and a curiosity to create something of my own. I didn’t know editing,
              I didn’t know how to grow a page, but I had the excitement of trying. When the
              page reached 500 followers, it genuinely felt like a festival.
            </p>

            <p>
              Over the years, the page slowly turned into a place where people came not just to
              watch edits, but to feel connected. And somewhere in that journey, we became a
              family of 17k+. Every person who joined added a little more strength to this dream.
              But as the page grew, I noticed many people struggled to download edits without
              losing quality, missed updates, and had no space for live match discussions.
              That’s when the idea for this website became clear.
            </p>

            <p>
              I wanted to build something more permanent and meaningful — a place where downloads
              are simple, updates are easy to find, and live match conversations feel active and
              exciting. This website is a small thank-you to the community that made all of this
              possible.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right">

          <div className="suggest-title">DROP YOUR SUGGESTIONS</div>

          <div className="suggest-box">
            <textarea
              placeholder="Write your suggestions here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="actions">
              <button className="send-btn" onClick={handleSend}>Send Message</button>
              <button className="clear-btn" onClick={handleClear}>Clear</button>
            </div>
          </div>

          <div className="note">
            Your message will open in your email client so you can review and send it.
          </div>

          {/* ABOUT DEVELOPER MOVED HERE */}
          <div className="developer right-dev">
            <div className="dev-heading">ABOUT DEVELOPER</div>

            <div className="dev-inline">
              <div className="dev-name">DIGVISH RAYALA</div>
              <div className="dev-cred">B.Tech, CSE — 3rd Year, LPU</div>
              <div className="dev-extra">
                A fan-driven project built with love and dedication over 5 years.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
