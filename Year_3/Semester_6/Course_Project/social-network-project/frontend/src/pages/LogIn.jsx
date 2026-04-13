import react, { useState } from 'react';

function LogIn({ setCurrentPage }) {
    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '300px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Вход</h2>
                <input type="text" placeholder="Имейл или Потребител" style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="password" placeholder="Парола" style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <button
                    onClick={() => setCurrentPage('home')}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Влез
                </button>
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('register'); }}>Нямаш акаунт? Регистрация</a>
                </div>
            </div>
        </div>

    );
}

export default LogIn;