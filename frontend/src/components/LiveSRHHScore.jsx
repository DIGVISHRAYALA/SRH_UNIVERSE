// // import React, { useEffect, useState } from 'react';
// // import './LiveSRHScore.scss';
// // import axios from 'axios';

// // const API_KEY = '71b5f26c-d381-455c-8498-de654ac2b5dd';

// // function LiveSRHScore() {
// //   const [matchData, setMatchData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const fetchMatches = async () => {
// //     try {
// //       const res = await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`);
// //       const matches = res.data.data;

// //       const srhMatches = matches.filter(match =>
// //         match.teams && match.teams.some(team => team.toLowerCase().includes('sunrisers hyderabad'))
// //       );

// //       const liveMatch = srhMatches.find(match => match.matchStarted && !match.matchEnded);

// //       if (liveMatch) {
// //         setMatchData({ ...liveMatch, type: 'live' });
// //       } else {
// //         const completedMatch = srhMatches.reverse().find(match => match.matchEnded);
// //         if (completedMatch) {
// //           setMatchData({ ...completedMatch, type: 'completed' });
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error fetching SRH match data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMatches();
// //     const interval = setInterval(fetchMatches, 15000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   if (loading) return <div className="srh-score">Loading SRH score...</div>;

// //   if (!matchData) {
// //     const fallbackMatch = {
// //       type: 'manual',
// //       name: 'Sunrisers Hyderabad vs Kolkata Knight Riders',
// //       matchType: 'T20',
// //       matchNumber: 'IPL MATCH 67',
// //       status: 'SRH WON BY 60 RUNS',
// //       dateTimeGMT: '2025-05-21T14:00:00Z',
// //       srh: { team: 'SUNRISERS HYDERABAD', score: '277/3 (20 overs)' },
// //       opp: { team: 'KOLKATA KNIGHT RIDERS', score: '217/8 (20 overs)' }
// //     };
// //     setMatchData(fallbackMatch);
// //     setLoading(false);
// //     return;
// //   }

// //   return (
// //     <div className={`scorecard ${matchData.type === 'live' ? 'live' : 'recent'}`}>
// //       <div className="scorecard-header">
// //         <h2>
// //           {matchData.type === 'live'
// //             ? 'LIVE SCORECARD OF CURRENT SRH MATCH'
// //             : 'NO LIVE MATCH OF SRH AT THE MOMENT-LAST MATCH SCORECARD'}
// //         </h2>
// //       </div>

// //       {matchData.type !== 'manual' && (
// //         <div className="score-details">
// //           <p><span>Match:</span> {matchData.name}</p>
// //           <p><span>Type:</span> {matchData.matchType.toUpperCase()}</p>
// //           <p><span>Status:</span> {matchData.status}</p>
// //           <p><span>Date:</span> {new Date(matchData.dateTimeGMT).toLocaleString()}</p>
// //         </div>
// //       )}

// //       {matchData.type === 'manual' ? (
// //         <div className="unified-score">
// //           <div className="teams">
// //             <div className="inner-container">
// //               <div className="team-box">
// //                 <p className="team-name">{matchData.srh.team}</p>
// //                 <p className="team-score">{matchData.srh.score}</p>
// //               </div>

// //               <div className="match-meta">
// //                 <p className="match-number">{matchData.matchNumber}</p>
// //                 {/* <p className="match-date">{new Date(matchData.dateTimeGMT).toLocaleDateString()}</p> */}
// //                 <p className="match-date">
// //   {new Date(matchData.dateTimeGMT).toLocaleDateString('en-US', {
// //     day: 'numeric',
// //     month: 'short',
// //     year: 'numeric'
// //   })}
// // </p>

// //                 <p className="match-result">{matchData.status}</p>
// //               </div>

// //               <div className="team-box">
// //                 <p className={`team-name ${matchData.opp.team === 'KOLKATA KNIGHT RIDERS' ? 'kkr' : ''}`}>
// //   {matchData.opp.team}
// // </p>

// //                 <p className="team-score">{matchData.opp.score}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="scoreboard">
// //           {matchData.score && matchData.score.map((inning, index) => (
// //             <div className="inning" key={index}>
// //               <p className="team-name">{inning.inning}</p>
// //               <p className="team-score">{inning.runs}/{inning.wickets} ({inning.overs} ov)</p>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default LiveSRHScore;








































































// // reference screenshot (uploaded): /mnt/data/Screenshot (608).png
// import React, { useEffect, useState } from 'react';
// import './LiveSRHScore.scss';
// import axios from 'axios';

// // ⚠️ Move key to env: process.env.REACT_APP_CRICAPI_KEY
// const API_KEY = process.env.REACT_APP_CRICAPI_KEY || '71b5f26c-d381-455c-8498-de654ac2b5dd';

// function parseScoreString(scoreStr = '') {
//   // If score is like "277/3 (20 overs)" -> { scoreMain: "277/3", overs: "(20 overs)" }
//   const oversMatch = scoreStr.match(/\(([^)]+)\)\s*$/);
//   if (oversMatch) {
//     const overs = `(${oversMatch[1]})`;
//     const scoreMain = scoreStr.replace(/\s*\([^)]+\)\s*$/, '').trim();
//     return { scoreMain, overs };
//   }
//   return { scoreMain: scoreStr.trim(), overs: '' };
// }

// function LiveSRHScore() {
//   const [matchData, setMatchData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [, setError] = useState(null);

//   const fallbackMatch = {
//     type: 'manual',
//     name: 'Sunrisers Hyderabad vs Kolkata Knight Riders',
//     matchType: 'T20',
//     matchNumber: 'IPL MATCH 67',
//     status: 'SRH WON BY 60 RUNS',
//     dateTimeGMT: '2025-05-21T14:00:00Z',
//     srh: { team: 'SUNRISERS HYDERABAD', score: '277/3 (20 overs)' },
//     opp: { team: 'KOLKATA KNIGHT RIDERS', score: '217/8 (20 overs)' }
//   };

//   const fetchMatches = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await axios.get(
//         `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
//       );
//       const matches = (res && res.data && res.data.data) || [];

//       if (!Array.isArray(matches) || matches.length === 0) {
//         setMatchData(null);
//         return;
//       }

//       const srhMatchers = ['sunrisers hyderabad', 'sunrisers', 'srh'];

//       const srhMatches = matches.filter((match) => {
//         if (!match || !match.teams) return false;
//         const teamsArr = Array.isArray(match.teams) ? match.teams : [];
//         return teamsArr.some((team) => {
//           if (!team) return false;
//           const tn = String(team).toLowerCase();
//           return srhMatchers.some((m) => tn.includes(m));
//         });
//       });

//       const srhMatchesCopy = [...srhMatches];

//       const liveMatch =
//         srhMatchesCopy.find((m) => m.matchStarted === true) ||
//         srhMatchesCopy.find((m) =>
//           String(m.status || '').toLowerCase().includes('live')
//         );

//       if (liveMatch) {
//         setMatchData({ ...liveMatch, type: 'live' });
//         return;
//       }

//       const completedMatch = [...srhMatchesCopy].reverse().find((m) =>
//         m.matchEnded === true || /won/i.test(m.status || '')
//       );

//       if (completedMatch) {
//         setMatchData({ ...completedMatch, type: 'completed' });
//         return;
//       }

//       setMatchData(null);
//     } catch (err) {
//       console.error('Error fetching SRH match data:', err);
//       setError('Failed to load match data');
//       setMatchData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMatches();
//     // const interval = setInterval(fetchMatches, 15000);
//     // return () => clearInterval(interval);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // --- SHOW SKELETON WHILE LOADING (profile-like skeleton) ---
//   // if (loading) {
//   //   return (
//   //     <div className="scorecard">
//   //       <div className="scorecard-header">
//   //         <div className="skeleton hero" style={{ width: '60%', margin: '0 auto 12px' }} />
//   //       </div>

//   //       <div style={{ display: 'flex', justifyContent: 'center' }}>
//   //         <div className="skeleton card" style={{ width: '92%', maxWidth: 900 }} />
//   //       </div>

//   //       {/* <div style={{ marginTop: 12, display: 'flex', gap: 12, justifyContent: 'center' }}>
//   //         <div className="skeleton row" style={{ width: 120 }} />
//   //         <div className="skeleton row" style={{ width: 120 }} />
//   //         <div className="skeleton row" style={{ width: 120 }} />
//   //       </div> */}
//   //     </div>
//   //   );
//   // }


//   // --- SHOW SKELETON WHILE LOADING (ONLY SCOREBOARD) ---
// if (loading) {
//   return (
//     <div className="scorecard">
//       <div className="scorecard-header">
//         <div className="skeleton hero" style={{ width: '60%', margin: '0 auto 12px' }} />
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <div className="skeleton card" style={{ width: '92%', maxWidth: 900 }} />
//       </div>
//     </div>
//   );
// }


//   const toShow = matchData || fallbackMatch;

//   // Helper to safely extract score + overs for unified (fallback) type
//   const extractParts = (score, runs, wickets, overs) => {
//     // prefer explicit parts if provided (runs/wickets/overs)
//     if (runs != null) {
//       const main = `${runs}/${wickets ?? 0}`;
//       const oversText = overs ? `(${overs} overs)` : '';
//       return { scoreMain: main, overs: oversText };
//     }
//     // otherwise parse a string
//     return parseScoreString(score);
//   };

//   return (
//     <div className={`scorecard ${toShow.type === 'live' ? 'live' : (matchData ? 'recent' : 'manual')}`}>
//       <div className="scorecard-header">
//         <h2>
//           {toShow.type === 'live'
//             ? 'LIVE SCORECARD OF CURRENT SRH MATCH'
//             : matchData
//               ? 'LAST SRH MATCH - SUMMARY'
//               : 'No Ongoing SRH Match — Last Match Summary'}
//         </h2>
//       </div>

//       {matchData && matchData.name && (
//         <div className="score-details">
//           <p><span>Match:</span> {matchData.name}</p>
//           <p><span>Type:</span> {(matchData.matchType || '').toUpperCase()}</p>
//           <p><span>Status:</span> {matchData.status || 'N/A'}</p>
//           <p><span>Date:</span> {matchData.dateTimeGMT ? new Date(matchData.dateTimeGMT).toLocaleString() : 'N/A'}</p>
//         </div>
//       )}

//       {/* Unified / fallback display or completed match */}
//       {(!matchData || toShow.type === 'manual' || toShow.type === 'completed') ? (
//         <div className="unified-score">
//           <div className="teams">
//             <div className="inner-container">
//               <div className="team-box">
//                 <p className="team-name">{toShow.srh?.team || 'SUNRISERS HYDERABAD'}</p>
//                 {(() => {
//                   const { scoreMain, overs } = extractParts(toShow.srh?.score, null, null, null);
//                   return (
//                     <p className="team-score">
//                       <span className="score-main">{scoreMain}</span>
//                       {overs ? <span className="overs">{overs}</span> : null}
//                     </p>
//                   );
//                 })()}
//               </div>

//               <div className="match-meta">
//                 <p className="match-number">{toShow.matchNumber || ''}</p>
//                 <p className="match-date">
//                   {toShow.dateTimeGMT ? new Date(toShow.dateTimeGMT).toLocaleDateString('en-US', {
//                     day: 'numeric', month: 'short', year: 'numeric'
//                   }) : ''}
//                 </p>
//                 <p className="match-result">{toShow.status || ''}</p>
//               </div>

//               <div className="team-box">
//                 <p className={`team-name ${toShow.opp?.team === 'KOLKATA KNIGHT RIDERS' ? 'kkr' : ''}`}>
//                   {toShow.opp?.team || 'OPPONENT'}
//                 </p>
//                 {(() => {
//                   const { scoreMain, overs } = extractParts(toShow.opp?.score, null, null, null);
//                   return (
//                     <p className="team-score">
//                       <span className="score-main">{scoreMain}</span>
//                       {overs ? <span className="overs">{overs}</span> : null}
//                     </p>
//                   );
//                 })()}
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="scoreboard">
//           {Array.isArray(matchData.score) && matchData.score.length > 0 ? (
//             matchData.score.map((inning, index) => {
//               const { scoreMain, overs } = extractParts(null, inning.runs, inning.wickets, inning.overs);
//               return (
//                 <div className="inning" key={index}>
//                   <p className="team-name">{inning.inning || inning.team || `Innings ${index + 1}`}</p>
//                   <p className="team-score">
//                     <span className="score-main">{scoreMain}</span>
//                     {overs ? <span className="overs">{overs}</span> : null}
//                   </p>
//                 </div>
//               );
//             })
//           ) : (
//             <div style={{ color: '#fff', textAlign: 'center' }}>Live match data not available</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default LiveSRHScore;





















// import React, { useEffect, useState } from 'react';
// import './LiveSRHScore.scss';
// import axios from 'axios';

// // ⚠️ Use env key (fallback kept as you had it)
// const API_KEY =
//   process.env.REACT_APP_CRICAPI_KEY ||
//   '71b5f26c-d381-455c-8498-de654ac2b5dd';

// /* ================= SAFE PARSER ================= */
// // function parseScoreString(scoreStr) {
// //   if (typeof scoreStr !== 'string') {
// //     return { scoreMain: '', overs: '' };
// //   }

// //   const oversMatch = scoreStr.match(/\(([^)]+)\)\s*$/);

// //   if (oversMatch) {
// //     const overs = `(${oversMatch[1]})`;
// //     const scoreMain = scoreStr.replace(/\s*\([^)]+\)\s*$/, '').trim();
// //     return { scoreMain, overs };
// //   }

// //   return { scoreMain: scoreStr.trim(), overs: '' };
// // }




// function parseScoreString(scoreStr) {
//   const safeScore = String(scoreStr || '');

//   const oversMatch = safeScore.match(/\(([^)]+)\)\s*$/);

//   if (oversMatch) {
//     return {
//       scoreMain: safeScore.replace(/\s*\([^)]+\)\s*$/, '').trim(),
//       overs: `(${oversMatch[1]})`
//     };
//   }

//   return {
//     scoreMain: safeScore.trim(),
//     overs: ''
//   };
// }


// function LiveSRHHScore() {
//   const [matchData, setMatchData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [, setError] = useState(null);

//   /* ================= FALLBACK ================= */
//   const fallbackMatch = {
//     type: 'manual',
//     name: 'Sunrisers Hyderabad vs Kolkata Knight Riders',
//     matchType: 'T20',
//     matchNumber: 'IPL MATCH 67',
//     status: 'SRH WON BY 60 RUNS',
//     dateTimeGMT: '2025-05-21T14:00:00Z',
//     srh: { team: 'SUNRISERS HYDERABAD', score: '277/3 (20 overs)' },
//     opp: { team: 'KOLKATA KNIGHT RIDERS', score: '217/8 (20 overs)' }
//   };

//   /* ================= FETCH ================= */
//   const fetchMatches = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await axios.get(
//         `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
//       );

//       const matches = Array.isArray(res?.data?.data) ? res.data.data : [];

//       if (matches.length === 0) {
//         setMatchData(null);
//         return;
//       }

//       const srhMatchers = ['sunrisers hyderabad', 'sunrisers', 'srh'];

//       const srhMatches = matches.filter(match => {
//         const teams = Array.isArray(match?.teams) ? match.teams : [];
//         return teams.some(team =>
//           srhMatchers.some(m =>
//             String(team || '').toLowerCase().includes(m)
//           )
//         );
//       });

//       const liveMatch =
//         srhMatches.find(m => m.matchStarted === true) ||
//         srhMatches.find(m =>
//           String(m.status || '').toLowerCase().includes('live')
//         );

//       if (liveMatch) {
//         setMatchData({ ...liveMatch, type: 'live' });
//         return;
//       }

//       const completedMatch = [...srhMatches]
//         .reverse()
//         .find(m => m.matchEnded === true || /won/i.test(m.status || ''));

//       if (completedMatch) {
//         setMatchData({ ...completedMatch, type: 'completed' });
//         return;
//       }

//       setMatchData(null);
//     } catch (err) {
//       console.error('Error fetching SRH match data:', err);
//       setError('Failed to load match data');
//       setMatchData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMatches();
//     // const interval = setInterval(fetchMatches, 15000);
//     // return () => clearInterval(interval);
//   }, []);

//   /* ================= LOADING SKELETON ================= */
//   if (loading) {
//     return (
//       <div className="scorecard">
//         <div className="scorecard-header">
//           <div className="skeleton hero" style={{ width: '60%', margin: '0 auto 12px' }} />
//         </div>

//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <div className="skeleton card" style={{ width: '92%', maxWidth: 900 }} />
//         </div>
//       </div>
//     );
//   }

//   const toShow = matchData || fallbackMatch;

//   /* ================= SAFE EXTRACTOR ================= */
//   const extractParts = (score, runs, wickets, overs) => {
//     if (typeof runs === 'number') {
//       return {
//         scoreMain: `${runs}/${typeof wickets === 'number' ? wickets : 0}`,
//         overs: overs ? `(${overs} overs)` : ''
//       };
//     }
//     return parseScoreString(score);
//   };

//   return (
//     <div className={`scorecard ${toShow.type}`}>
//       <div className="scorecard-header">
//         <h2>
//           {toShow.type === 'live'
//             ? 'LIVE SCORECARD OF CURRENT SRH MATCH'
//             : matchData
//             ? 'LAST SRH MATCH - SUMMARY'
//             : 'No Ongoing SRH Match — Last Match Summary'}
//         </h2>
//       </div>

//       {matchData?.name && (
//         <div className="score-details">
//           <p><span>Match:</span> {matchData.name}</p>
//           <p><span>Type:</span> {(matchData.matchType || '').toUpperCase()}</p>
//           <p><span>Status:</span> {matchData.status || 'N/A'}</p>
//           <p>
//             <span>Date:</span>{' '}
//             {matchData.dateTimeGMT
//               ? new Date(matchData.dateTimeGMT).toLocaleString()
//               : 'N/A'}
//           </p>
//         </div>
//       )}

//       {/* ================= FALLBACK / COMPLETED ================= */}
//       {toShow.type !== 'live' ? (
//         <div className="unified-score">
//           <div className="teams">
//             <div className="inner-container">

//               {/* SRH */}
//               <div className="team-box">
//                 <p className="team-name">{toShow.srh?.team || 'SUNRISERS HYDERABAD'}</p>
//                 {(() => {
//                   const { scoreMain, overs } = extractParts(toShow.srh?.score || '');
//                   return (
//                     <p className="team-score">
//                       <span className="score-main">{scoreMain}</span>
//                       {overs && <span className="overs">{overs}</span>}
//                     </p>
//                   );
//                 })()}
//               </div>

//               <div className="match-meta">
//                 <p className="match-number">{toShow.matchNumber || ''}</p>
//                 <p className="match-date">
//                   {toShow.dateTimeGMT
//                     ? new Date(toShow.dateTimeGMT).toLocaleDateString('en-US', {
//                         day: 'numeric',
//                         month: 'short',
//                         year: 'numeric'
//                       })
//                     : ''}
//                 </p>
//                 <p className="match-result">{toShow.status || ''}</p>
//               </div>

//               {/* OPP */}
//               <div className="team-box">
//                 <p className="team-name">{toShow.opp?.team || 'OPPONENT'}</p>
//                 {(() => {
//                   const { scoreMain, overs } = extractParts(toShow.opp?.score || '');

//                   return (
//                     <p className="team-score">
//                       <span className="score-main">{scoreMain}</span>
//                       {overs && <span className="overs">{overs}</span>}
//                     </p>
//                   );
//                 })()}
//               </div>

//             </div>
//           </div>
//         </div>
//       ) : (
//         /* ================= LIVE SCOREBOARD ================= */
//         <div className="scoreboard">
//           {(matchData?.score || []).length > 0 ? (
//             (matchData.score || []).map((inning, index) => {
//               const { scoreMain, overs } = extractParts(
//                 null,
//                 inning?.runs,
//                 inning?.wickets,
//                 inning?.overs
//               );

//               return (
//                 <div className="inning" key={index}>
//                   <p className="team-name">
//                     {inning?.inning || inning?.team || `Innings ${index + 1}`}
//                   </p>
//                   <p className="team-score">
//                     <span className="score-main">{scoreMain}</span>
//                     {overs && <span className="overs">{overs}</span>}
//                   </p>
//                 </div>
//               );
//             })
//           ) : (
//             <div style={{ color: '#fff', textAlign: 'center' }}>
//               Live match data not available
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default LiveSRHHScore;




















import React from "react";
import "./LiveSRHScore.scss";



const LiveSRHHScore = () => {
  // 🔥 MANUAL SCORECARD DATA (edit only this object)
  const match = {
    matchNumber: "IPL MATCH 67",
    date: "May 21, 2025",
    venue: "Hyderabad",
    status: "SRH WON BY 60 RUNS",

    teams: {
      srh: {
        name: "SUNRISERS HYDERABAD",
        score: "277/3",
        overs: "20 Overs"
      },
      kkr: {
        name: "KOLKATA KNIGHT RIDERS",
        score: "217/8",
        overs: "20 Overs"
      }
    }
  };

  return (
    <div className="scorecard-wrapper">
      <h2 className="scorecard-title">
        NO LIVE MATCH OF SRH AT THE MOMENT – LAST MATCH SCORECARD
      </h2>

      <div className="scorecard">

        {/* ===== MATCH META ===== */}
        <div className="match-meta">
          <p className="match-number">{match.matchNumber}</p>
          <p className="match-date">{match.date}</p>
          <p className="match-result">{match.status}</p>
        </div>

        {/* ===== SCORE ROW ===== */}
        <div className="teams-row">

          {/* SRH */}
          <div className="team-card srh">
            <p className="team-name">{match.teams.srh.name}</p>
            <p className="team-score">
              <span className="runs">{match.teams.srh.score}</span>
              <span className="overs">({match.teams.srh.overs})</span>
            </p>
          </div>

          <div className="vs">VS</div>

          {/* KKR */}
          <div className="team-card kkr">
            <p className="team-name">{match.teams.kkr.name}</p>
            <p className="team-score">
              <span className="runs">{match.teams.kkr.score}</span>
              <span className="overs">({match.teams.kkr.overs})</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LiveSRHHScore;


