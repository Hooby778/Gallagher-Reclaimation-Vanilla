import React from 'react';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Admin from './Admin.jsx';

const App = () => {
  const [activePage, setActivePage] = React.useState('home');
  const handlePageChange = (newPage) => {
    setActivePage(newPage);
  }
  if (activePage === 'home') {
    return (
      <Home handlePageChange={handlePageChange}/>
    )
  } else if (activePage === 'login') {
    return <Login handlePageChange={handlePageChange}/>
  } else if (activePage === 'admin') {
    return <Admin handlePageChange={handlePageChange}/>
  }
}

export default App;