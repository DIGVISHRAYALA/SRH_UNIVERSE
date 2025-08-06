import React, { useEffect, useState } from 'react';
import './LiveSRHScore.scss';
import axios from 'axios';

const API_KEY = '71b5f26c-d381-455c-8498-de654ac2b5dd';

function LiveSRHScore() {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    try {
      const res = await axios.get(`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`);
      const matches = res.data.data;

      const srhMatches = matches.filter(match =>
        match.teams && match.teams.some(team => team.toLowerCase().includes('sunrisers hyderabad'))
      );

      const liveMatch = srhMatches.find(match => match.matchStarted && !match.matchEnded);

      if (liveMatch) {
        setMatchData({ ...liveMatch, type: 'live' });
      } else {
        const completedMatch = srhMatches.reverse().find(match => match.matchEnded);
        if (completedMatch) {
          setMatchData({ ...completedMatch, type: 'completed' });
        }
      }
    } catch (error) {
      console.error('Error fetching SRH match data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="srh-score">Loading SRH score...</div>;

  if (!matchData) {
    const fallbackMatch = {
      type: 'manual',
      name: 'Sunrisers Hyderabad vs Kolkata Knight Riders',
      matchType: 'T20',
      matchNumber: 'IPL MATCH 67',
      status: 'SRH WON BY 60 RUNS',
      dateTimeGMT: '2025-05-21T14:00:00Z',
      srh: { team: 'SUNRISERS HYDERABAD', score: '277/3 (20 overs)' },
      opp: { team: 'KOLKATA KNIGHT RIDERS', score: '217/8 (20 overs)' }
    };
    setMatchData(fallbackMatch);
    setLoading(false);
    return;
  }

  return (
    <div className={`scorecard ${matchData.type === 'live' ? 'live' : 'recent'}`}>
      <div className="scorecard-header">
        <h2>
          {matchData.type === 'live'
            ? 'LIVE SCORECARD OF CURRENT SRH MATCH'
            : 'NO LIVE MATCH OF SRH AT THE MOMENT-LAST MATCH SCORECARD'}
        </h2>
      </div>

      {matchData.type !== 'manual' && (
        <div className="score-details">
          <p><span>Match:</span> {matchData.name}</p>
          <p><span>Type:</span> {matchData.matchType.toUpperCase()}</p>
          <p><span>Status:</span> {matchData.status}</p>
          <p><span>Date:</span> {new Date(matchData.dateTimeGMT).toLocaleString()}</p>
        </div>
      )}

      {matchData.type === 'manual' ? (
        <div className="unified-score">
          <div className="teams">
            <div className="inner-container">
              <div className="team-box">
                <p className="team-name">{matchData.srh.team}</p>
                <p className="team-score">{matchData.srh.score}</p>
              </div>

              <div className="match-meta">
                <p className="match-number">{matchData.matchNumber}</p>
                {/* <p className="match-date">{new Date(matchData.dateTimeGMT).toLocaleDateString()}</p> */}
                <p className="match-date">
  {new Date(matchData.dateTimeGMT).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })}
</p>

                <p className="match-result">{matchData.status}</p>
              </div>

              <div className="team-box">
                <p className={`team-name ${matchData.opp.team === 'KOLKATA KNIGHT RIDERS' ? 'kkr' : ''}`}>
  {matchData.opp.team}
</p>

                <p className="team-score">{matchData.opp.score}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="scoreboard">
          {matchData.score && matchData.score.map((inning, index) => (
            <div className="inning" key={index}>
              <p className="team-name">{inning.inning}</p>
              <p className="team-score">{inning.runs}/{inning.wickets} ({inning.overs} ov)</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LiveSRHScore;


