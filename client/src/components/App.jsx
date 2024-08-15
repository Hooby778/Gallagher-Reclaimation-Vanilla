import React from 'react';
import Home from './Home.jsx';

const App = () => {


  const [activePage, setActivePage] = React.useState('home');
  const [activeEmployee, setActiveEmployee] = React.useState(null);
  if (activePage === 'home') {
    return (
      <Home />
    )
  }
}

export default App;