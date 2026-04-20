import React, { useState } from 'react';

function Login({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      setCurrentPage('home');
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error("Грешка при вход:", err);
  }
};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '300px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Вход</h2>
        
        <form onSubmit={handleLogin}>
          <input 
            name="email" 
            type="email" 
            placeholder="Имейл" 
            required 
            onChange={handleChange} 
            style={inputStyle} 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Парола" 
            required 
            onChange={handleChange} 
            style={inputStyle} 
          />
          
          <button type="submit" style={buttonStyle}>
            Влез
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('register'); }}>
            Нямаш акаунт? Регистрация
          </a>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default Login;