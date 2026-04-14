import React from 'react';
import Navbar from '../components/Navbar';
import { FiTool } from 'react-icons/fi';

function Messages({ setCurrentPage }) {
  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ccc' }}>
        <FiTool style={{ fontSize: '50px', color: '#0064e0', marginBottom: '20px' }} />
        <h2>Съобщения</h2>
        <p style={{ color: 'gray', fontSize: '16px', lineHeight: '1.5' }}>
          Тази секция е в процес на разработка. <br />
          Скоро тук ще можете да чатите с вашите приятели в реално време!
        </p>
        <button 
          onClick={() => setCurrentPage('home')}
          style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#e4e6eb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Върни се в началото
        </button>
      </div>
    </div>
  );
}

export default Messages;