import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EstoniaVsSwitzerlandScore.scss';

const matchId = '30f49c68-8b24-4bd3-8f15-9eaa9fb12900';
const API_KEY = '71b5f26c-d381-455c-8498-de654ac2b5dd';

const EstoniaVsSwitzerlandScore = () => {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const res = await axios.get(`https://api.cricapi.com/v1/match_info`, {
          params: {
            apikey: API_KEY,
            id: matchId
          }
        });
        setMatchData(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching match data:', err);
        setLoading(false);
      }
    };

    fetchMatchData();
  }, []);

  if (loading) return <div className="score-container">Loading...</div>;
  if (!matchData) return <div className="score-container">Match data unavailable.</div>;

  const { teams, teamInfo, venue, date, matchType, status, score } = matchData;

  return (
    <div className="score-container">
      <h2 className="match-title">{teams[0]} vs {teams[1]}</h2>
      <div className="team-logos">
        <img src={teamInfo[0]?.img} alt={teams[0]} />
        <span>vs</span>
        <img src={teamInfo[1]?.img} alt={teams[1]} />
      </div>

      <div className="score-box">
        {score?.map((inning, index) => (
          <div key={index} className="inning">
            <strong>{inning.inning}:</strong> {inning.r}/{inning.w} ({inning.o} ov)
          </div>
        ))}
      </div>

      <div className="details">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Match Type:</strong> {matchType.toUpperCase()}</p>
        <p><strong>Venue:</strong> {venue}</p>
        <p><strong>Date:</strong> {date}</p>
      </div>
    </div>
  );
};

export default EstoniaVsSwitzerlandScore;
