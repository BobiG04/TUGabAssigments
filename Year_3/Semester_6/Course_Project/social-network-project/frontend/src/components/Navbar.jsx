import React from 'react';
// Импортираме конкретните икони, които ни трябват
import { FiSearch, FiUser, FiMessageSquare, FiLogOut, FiHexagon } from 'react-icons/fi'; 

// Леко обновен стил, за да центрираме иконите перфектно в кръгчетата
const navButtonStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#e4e6eb', // Малко по-приятно сиво (като във Facebook)
  border: 'none',
  marginLeft: '10px',
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px', // Това контролира размера на иконата
  color: '#050505',
  transition: 'background-color 0.2s'
};

function Navbar({ setCurrentPage }) {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px 20px', 
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e0e0e0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      {/* Лого - сложихме примерна икона за лого */}
      <button 
        style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          backgroundColor: '#0064e0', color: 'white', border: 'none', 
          cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center',
          fontSize: '22px'
        }}
        onClick={() => setCurrentPage('home')}
        title="Начало"
      >
        <FiHexagon /> 
      </button>

      {/* Десни бутони с икони */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button style={navButtonStyle} onClick={() => alert('Търсене')} title="Търсене">
          <FiSearch />
        </button>
        
        <button style={navButtonStyle} onClick={() => setCurrentPage('profile')} title="Профил">
          <FiUser />
        </button>
        
        <button style={navButtonStyle} onClick={() => alert('Съобщения')} title="Съобщения">
          <FiMessageSquare />
        </button>
        
        {/* Бутон за изход (с текст и икона) */}
        <button 
          style={{
            ...navButtonStyle, 
            backgroundColor: 'transparent', 
            width: 'auto', 
            marginLeft: '15px',
            gap: '8px', // Разстояние между иконата и текста
            padding: '0 10px',
            borderRadius: '6px'
          }} 
          onClick={() => setCurrentPage('login')}
        >
          <FiLogOut />
          <span style={{ fontSize: '15px', fontWeight: '500' }}>Изход</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;