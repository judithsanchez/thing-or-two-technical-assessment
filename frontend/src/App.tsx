import React, { useState } from 'react';
import './App.css';

function App() {
  const [parsedData, setParsedData] = useState<any[]>([]); // State to hold parsed CSV data

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file

    if (file) {
      processCSV(file);
    }
  };

  const processCSV = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result as string;
      const lines = text.split('\n'); // Split text into lines

      const parsedData = lines.map((line) => {
        const [song_name, band, year] = line.split(','); // Split line into values
        return { song_name, band, year };
      });

      // Remove the header row
      parsedData.shift();

      // Update state with the parsed data
      setParsedData(parsedData);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            <th>Song Name</th>
            <th>Band</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {parsedData.map((song, index) => (
            <tr key={index}>
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
