import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const CenteredItem = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
`

function App() {
  // state
  const [shows, setShows] = useState([]);

  useEffect(() => {
  });

  return (
    <div className="App">
      <header className="App-header">
        <CenteredItem>
          <h1> Jazz Shows in NYC </h1>
        </CenteredItem>
        <CenteredItem>
          <ul>asdf</ul>
        </CenteredItem>
      </header>
    </div>
  );
}

export default App;
