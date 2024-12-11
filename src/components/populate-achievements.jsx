import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSSoup from 'jssoup';

const PopulateAchievements = ({ url }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(url);
        const soup = new JSSoup(response.data);

        const achievementTitles = soup
          .findAll('a', 'title')
          .map(achievement => achievement.text);
        const achievementDescriptions = soup
          .findAll('p', 'data-bf')
          .map(description => description.text);

        if (
          achievementTitles.length === 0 ||
          achievementDescriptions.length === 0
        ) {
          throw new Error('Invalid game data or achievements not found.');
        }

        const combined = achievementTitles.map((title, index) => ({
          title,
          description: achievementDescriptions[index] || 'No description',
        }));

        setAchievements(combined);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // The request was made and the server responded with a status code
            setError(`Error: ${err.response.status} - ${err.response.statusText}`);
          } else if (err.request) {
            // The request was made but no response was received
            setError('Error: No response received from server.');
          } else {
            // Something happened in setting up the request
            setError(`Error: ${err.message}`);
          }
        } else {
          setError(`Unexpected error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [url]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Achievements</h2>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index}>
            <label>
              <input type="checkbox" />
              <strong>{achievement.title}</strong>: {achievement.description}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopulateAchievements;
