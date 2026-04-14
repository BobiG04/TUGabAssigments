import { useState } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/LogIn';
import Register from './pages/Register';
import Messages from './pages/Messages'; // НОВО: Импортираме съобщенията

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />;
      case 'profile': return <Profile setCurrentPage={setCurrentPage} />;
      case 'login': return <Login setCurrentPage={setCurrentPage} />;
      case 'register': return <Register setCurrentPage={setCurrentPage} />;
      case 'messages': return <Messages setCurrentPage={setCurrentPage} />; // НОВО
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