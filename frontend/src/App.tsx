import React, { useState } from 'react';
import './App.css';

function App() {
  // State to hold the parsed data from CSV
  const [parsedData, setParsedData] = useState<any[]>([]);

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processCSV(file);
    }
  };

  // Function to process the uploaded CSV file
  const processCSV = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');

      // Parse each line into an object
      const parsedData = lines.map((line) => {
        const [song_name, band, year] = line
          .split(';')
          .map((value) => value.trim());

        return { song_name, band, year };
      });

      parsedData.shift(); // Remove header line

      setParsedData(parsedData); // Update state with parsed data
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
