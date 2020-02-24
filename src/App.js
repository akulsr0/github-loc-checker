import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [repo, setRepo] = useState('');
  const [data, setData] = useState([]);

  return (
    <div className='mainContainer'>
      <center>
        <h1>Github Lines Of Code Checker</h1>
        <br />
        <input
          type='text'
          placeholder='Username'
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='text'
          placeholder='Repository'
          onChange={e => setRepo(e.target.value)}
        />
        <br />
        <button
          onClick={() => {
            axios
              .get(`https://api.codetabs.com/v1/loc?github=${username}/${repo}`)
              .then(res => {
                const resData = res.data;
                setData(resData);
                console.log(resData);
              })
              .catch(error => console.log(error));
          }}
        >
          SUBMIT
        </button>
      </center>

      <div className='results'>
        {data.map(e => {
          if (e.language !== 'Total') {
            return (
              <div className='langDiv'>
                <strong>{e.language}</strong>
                <br />
                <small>Files: {e.files}</small> <br />
                <small>Total Lines: {e.lines}</small> <br />
                <small>Lines Of Code: {e.linesOfCode}</small>
              </div>
            );
          } else {
            return (
              <div className='totalDiv'>
                <strong>Total</strong>
                <small>Files: {e.files}</small>
                <small>Total Lines: {e.lines}</small>
                <small>Lines Of Code: {e.linesOfCode}</small>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
