import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [songData, setSongData] = useState<any[]>([]); // New state for fetched song data

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

      // Parse each line into an object
      const parsedData = lines.map((line, index) => {
        if (index === 0) return null; // Skip header line
        const [song_name, band, year] = line
          .split(';')
          .map((value) => value.trim());

        return { song_name, band, year };
      });

      setParsedData(parsedData.filter(Boolean)); // Filter out null values
    };

    reader.readAsText(file);
  };

  const postSongsToDatabase = async () => {
    try {
      const response = await fetch('http://localhost:3000/songs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      if (response.ok) {
        // If data was successfully posted, fetch the updated song data from the database
        fetchSongData();
      } else {
        console.error('Error posting songs:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting songs:', error);
    }
  };

  const fetchSongData = async () => {
    try {
      const response = await fetch('http://localhost:3000/songs/'); // Adjust the endpoint URL
      const data = await response.json();
      setSongData(data);
    } catch (error) {
      console.error('Error fetching song data:', error);
    }
  };

  useEffect(() => {
    fetchSongData();
  }, []); // Fetch song data when the component mounts

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={postSongsToDatabase}>Post Songs to Database</button>
      <table>
        <thead>
          <tr>
            <th>Song Name</th>
            <th>Band</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {songData.map((song, index) => (
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

// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [parsedData, setParsedData] = useState<any[]>([]);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       processCSV(file);
//     }
//   };

//   const processCSV = (file: File) => {
//     const reader = new FileReader();

//     reader.onload = (e: ProgressEvent<FileReader>) => {
//       const text = e.target?.result as string;
//       const lines = text.split('\n');

//       // Parse each line into an object
//       const parsedData = lines.map((line, index) => {
//         if (index === 0) return null; // Skip header line
//         const [song_name, band, year] = line
//           .split(';')
//           .map((value) => value.trim());

//         return { song_name, band, year };
//       });

//       setParsedData(parsedData.filter(Boolean)); // Filter out null values
//     };

//     reader.readAsText(file);
//   };

//   const postSongsToDatabase = async () => {
//     // Assuming you have an API call here to post parsedData to the endpoint song/add
//     // Make sure to handle errors and provide appropriate feedback to the user
//     try {
//       const response = await fetch('http://localhost:3000/songs/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(parsedData),
//       });
//       // Handle response, update UI accordingly
//     } catch (error) {
//       console.error('Error posting songs:', error);
//       // Handle error, show error message to user
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".csv" onChange={handleFileUpload} />
//       <button onClick={postSongsToDatabase}>Post Songs to Database</button>
//       <table>
//         <thead>
//           <tr>
//             <th>Song Name</th>
//             <th>Band</th>
//             <th>Year</th>
//           </tr>
//         </thead>
//         <tbody>
//           {parsedData.map((song, index) => (
//             <tr key={index}>
//               <td>{song.song_name}</td>
//               <td>{song.band}</td>
//               <td>{song.year}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;
