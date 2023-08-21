import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await fetch('http://localhost:3000/songs');
        const text = await response.text();
        console.log('Response:', text);
        const data = JSON.parse(text);
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    }

    fetchSongs();
  }, []);

  return (
    <div>
      <h1>Songs</h1>
      <table>
        <thead>
          <tr>
            <th>Song Name</th>
            <th>Band</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.song_name}</td>
              <td>{song.band}</td>
              <td>{song.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
