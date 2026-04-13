import { useState } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/LogIn';
import Register from './pages/Register';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  // Условна логика за рендиране на страниците
  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />;
      case 'profile': return <Profile setCurrentPage={setCurrentPage} />;
      case 'login': return <Login setCurrentPage={setCurrentPage} />;
      case 'register': return <Register setCurrentPage={setCurrentPage} />;
      default: return <Login setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;