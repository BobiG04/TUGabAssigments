import React, { useState } from 'react';

function Register({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Паролите не съвпадат!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Регистрацията е успешна! Моля, влезте в профила си.');
        setCurrentPage('login');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Грешка при връзка със сървъра.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Регистрация</h2>
        
        {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input name="firstName" placeholder="Име" required onChange={handleChange} style={inputStyle} />
          <input name="lastName" placeholder="Фамилия" required onChange={handleChange} style={inputStyle} />
          <input name="email" type="email" placeholder="Имейл" required onChange={handleChange} style={inputStyle} />
          <input name="password" type="password" placeholder="Парола" required onChange={handleChange} style={inputStyle} />
          <input name="confirmPassword" type="password" placeholder="Повтори паролата" required onChange={handleChange} style={inputStyle} />
          
          <button type="submit" style={buttonStyle}>Регистрирай се</button>
        </form>
        
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