import React, { useState } from 'react';
import { FiSearch, FiMessageSquare, FiLogOut, FiHexagon } from 'react-icons/fi';

const navButtonStyle = {
  width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e4e6eb',
  border: 'none', marginLeft: '10px', cursor: 'pointer', display: 'inline-flex',
  justifyContent: 'center', alignItems: 'center', fontSize: '18px', color: '#050505',
  transition: 'background-color 0.2s'
};

function Navbar({ setCurrentPage }) {
  // Състояние за показване/скриване на търсачката
  const [showSearch, setShowSearch] = useState(false);
  
  // Вземаме името на логнатия потребител
  const username = localStorage.getItem('username') || 'Гост';
  const initial = username !== 'Гост' ? username[0].toUpperCase() : '?';

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setCurrentPage('login');
  };

  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '10px 20px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative'
    }}>
      
      {/* ЛЯВА ЧАСТ: Само логото */}
      <div>
        <button 
          style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0064e0', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '22px' }}
          onClick={() => setCurrentPage('home')}
          title="Начало"
        >
          <FiHexagon /> 
        </button>
      </div>

      {/* ДЯСНА ЧАСТ: Търсачка, Профил, Съобщения, Изход */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        
        {/* 1. Група Търсене (Поле + Бутон) */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
          {showSearch && (
            <input 
              type="text" 
              placeholder="Търсене..." 
              autoFocus
              style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid #ccc', outline: 'none', width: '200px', backgroundColor: '#f0f2f5', marginRight: '5px' }}
            />
          )}
          <button 
            style={{...navButtonStyle, marginLeft: 0}} 
            onClick={() => setShowSearch(!showSearch)} 
            title="Търсене"
          >
            <FiSearch />
          </button>
        </div>

        {/* 2. Бутон Профил (Аватар + Име) */}
        {/* Превърнахме индикатора в кликаем бутон, който води към страницата на профила */}
        <div 
          onClick={() => setCurrentPage('profile')}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '5px 10px', borderRadius: '20px', transition: 'background-color 0.2s', marginRight: '5px' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f2f5'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Към профила"
        >
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0064e0', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', marginRight: '8px' }}>
            {initial}
          </div>
          <span style={{ fontWeight: '600', fontSize: '14px', color: '#333' }}>{username}</span>
        </div>
        
        {/* 3. Съобщения */}
        <button style={navButtonStyle} onClick={() => setCurrentPage('messages')} title="Съобщения">
          <FiMessageSquare />
        </button>
        
        {/* 4. Изход */}
        <button 
          style={{ ...navButtonStyle, backgroundColor: 'transparent', width: 'auto', gap: '5px', padding: '0 5px' }} 
          onClick={handleLogout}
        >
          <FiLogOut />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>Изход</span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;