import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = React.useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetch("./data/data.json")
      .then((response) => response.json())
      .then((json) => {
        setData(json[0].movies);
      });
  });

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = data.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(data)
    }
  }
  return (
    <div>
      <input
        placeholder='Search for a movie...'
        onChange={(e) => searchItems(e.target.value)}
      />
      <table class="table-styled">
        <thead>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {searchInput.length > 1 ? (
            filteredResults.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.year}</td>
                  <td>{item.rating}</td>
                </tr>
              );
            })
          ) : (
            data.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.year}</td>
                  <td>{item.rating}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
