import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [songData, setSongData] = useState<any[]>([]);

  const fetchSongData = async () => {
    try {
      const response = await fetch('http://localhost:3000/songs/');
      // const response = await fetch('/songs/');

      const data = await response.json();
      setSongData(data);
    } catch (error) {
      console.error('Error fetching song data:', error);
    }
  };

  useEffect(() => {
    fetchSongData();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processCSV(file);
    }
  };

  const processCSV = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const parsedData = parseCSVLines(lines);
      setParsedData(parsedData);
    };

    reader.readAsText(file);
  };

  const parseCSVLines = (lines: string[]): any[] => {
    return lines
      .map((line, index) => {
        if (index === 0) return null;
        const [song_name, band, year] = line
          .split(';')
          .map((value) => value.trim().toLowerCase());

        return { song_name, band, year };
      })
      .filter(Boolean);
  };

  const postSongsToDatabase = async () => {
    try {
      const response = await fetch('http://localhost:3000/songs/add', {
        // const response = await fetch('/songs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      if (response.ok) {
        fetchSongData();
      } else {
        console.error('Error posting songs:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting songs:', error);
    }
  };

  return (
    <div className="app">
      <input
        className="app__file-input"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <button className="app__post-button" onClick={postSongsToDatabase}>
        Send
      </button>
      <table className="app__song-table">
        <thead className="app__table-head">
          <tr className="app__table-row">
            <th className="app__table-header">Song Name</th>
            <th className="app__table-header">Band</th>
            <th className="app__table-header">Year</th>
          </tr>
        </thead>
        <tbody className="app__table-body">
          {songData
            .slice()
            .sort((a, b) => a.band.localeCompare(b.band))
            .map((song, index) => (
              <tr className="app__table-row" key={index}>
                <td className="app__table-cell">{song.song_name}</td>
                <td className="app__table-cell">{song.band}</td>
                <td className="app__table-cell">{song.year}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
