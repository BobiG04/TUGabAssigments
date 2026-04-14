import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard'; // Импортираме компонента за постове

function Profile({ setCurrentPage }) {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // Състояние за постовете на потребителя
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Взимаме данните за потребителя
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`);
      if (response.ok) setUser(await response.json());
    };

    // Взимаме публикациите и ги филтрираме
    const fetchUserPosts = async () => {
      const response = await fetch('http://localhost:5000/api/posts');
      if (response.ok) {
        const allPosts = await response.json();
        // Филтрираме само постовете, чийто автор има същия ID като логнатия потребител
        const myPosts = allPosts.filter(post => post.author && post.author._id === userId);
        setUserPosts(myPosts);
      }
    };

    if (userId) {
      fetchUser();
      fetchUserPosts();
    }
  }, [userId]);

  if (!user) return <div>Зареждане...</div>;

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '0 15px' }}>
        
        {/* Хедър на профила */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#0064e0', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', marginRight: '25px' }}>
            {user.username[0]}
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{user.username}</h2>
            <p style={{ color: 'gray', marginBottom: '15px' }}>{user.email}</p>
            <button style={{ padding: '8px 20px', backgroundColor: '#e4e6eb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Редактирай профила</button>
          </div>
        </div>

        {/* Секция с публикациите на потребителя */}
        <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', color: '#333' }}>Моите публикации</h3>
        
        {userPosts.length === 0 ? (
          <p style={{ color: 'gray', textAlign: 'center', marginTop: '20px' }}>Все още нямате свои публикации.</p>
        ) : (
          userPosts.map(post => (
            <PostCard key={post._id} post={post} />
          ))
        )}

      </div>
    </div>
  );
}

export default Profile;