import React from 'react';

function PostCard({ content }) {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: '15px', 
      marginBottom: '20px',
      backgroundColor: '#fff'
    }}>
      {/* Хедър на поста (Снимка и Име) */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#eee', marginRight: '10px' }}></div>
        <div style={{ fontWeight: 'bold' }}>Потребителско Име</div>
      </div>

      {/* Съдържание на поста */}
      <div style={{ minHeight: '80px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        {content}
      </div>

      {/* Бутони под поста */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{ width: '20px', height: '20px', borderRadius: '50%', border: 'none', backgroundColor: '#ddd' }} />
        <button style={{ width: '20px', height: '20px', borderRadius: '50%', border: 'none', backgroundColor: '#ddd' }} />
      </div>
    </div>
  );
}

export default PostCard;