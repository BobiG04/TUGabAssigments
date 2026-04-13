import React, { useState } from 'react';

function Register({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Регистрация</h2>
        
        <input name="firstName" placeholder="Име" onChange={handleChange} style={inputStyle} />
        <input name="lastName" placeholder="Фамилия" onChange={handleChange} style={inputStyle} />
        <input name="email" type="email" placeholder="Имейл" onChange={handleChange} style={inputStyle} />
        <input name="password" type="password" placeholder="Парола" onChange={handleChange} style={inputStyle} />
        <input name="confirmPassword" type="password" placeholder="Повтори паролата" onChange={handleChange} style={inputStyle} />
        
        <button style={buttonStyle}>Регистрирай се</button>
        
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('login'); }}>Вече имаш акаунт? Влез</a>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' };

export default Register;