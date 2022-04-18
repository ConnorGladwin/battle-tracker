import { useState } from 'react';
import List from './components/List';
import './App.css';

function funTitle() {
  const title = 'Battle!';
  const animatedTitle = Array.from(title);
  return animatedTitle.map((i) => <p className="funTitle">{i}</p>);
}

function App() {
  return (
    <div className="container">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <div className="title">{funTitle()}</div>
      <List />
    </div>
  );
}

export default App;
