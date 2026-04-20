import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';

function Home({ setCurrentPage }) {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  const userId = localStorage.getItem('userId'); 

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Грешка при зареждане на постовете:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePublish = async () => {
  const currentUserId = localStorage.getItem('userId'); 
  if (!newPostContent.trim() || !currentUserId) {
    alert("Трябва да сте влезли в профила си, за да публикувате!");
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: newPostContent,
        author: currentUserId
      })
    });

    if (response.ok) {
      setNewPostContent('');
      fetchPosts();
    }
  } catch (error) {
    console.error('Грешка при публикуване:', error);
  }
};

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '0 15px' }}>
        
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px' }}>
          <textarea 
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Какво мислиш днес?" 
            style={{ width: '100%', height: '60px', border: 'none', resize: 'none', outline: 'none' }} 
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button 
              onClick={handlePublish}
              style={{ padding: '5px 15px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Публикувай
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Все още няма публикации. Напиши първата!</p>
        ) : (
          posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))
        )}
        
      </div>
    </div>
  );
}

export default Home;