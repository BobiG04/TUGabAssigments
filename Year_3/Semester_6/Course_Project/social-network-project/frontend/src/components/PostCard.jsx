import React, { useState } from 'react';
import { FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi';

function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  
  const [isLiked, setIsLiked] = useState(false);

  if (!post) return null;
  const currentUserId = localStorage.getItem('userId');

  const toggleComments = async () => {
    setShowComments(!showComments);
    if (!showComments && comments.length === 0) fetchComments();
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${post._id}/comments`);
      if (res.ok) setComments(await res.json());
    } catch (err) { console.error(err); }
  };

  const handleAddComment = async () => {
    if (!newCommentText.trim() || !currentUserId) return;
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${post._id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newCommentText, postId: post._id, userId: currentUserId })
      });
      if (res.ok) {
        setNewCommentText('');
        fetchComments();
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#0064e0', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', fontWeight: 'bold' }}>
          {post.author?.username?.[0] || '?'}
        </div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{post.author?.username || 'Неизвестен'}</div>
          <div style={{ fontSize: '11px', color: 'gray' }}>{new Date(post.createdAt).toLocaleString()}</div>
        </div>
      </div>

      <div style={{ fontSize: '15px', marginBottom: '15px', lineHeight: '1.4' }}>
        {post.content}
      </div>

      <div style={{ display: 'flex', borderTop: '1px solid #eee', paddingTop: '10px', gap: '20px' }}>
        
        <button 
          style={{ ...actionButtonStyle, color: isLiked ? '#e0245e' : 'gray' }}
          onClick={() => setIsLiked(!isLiked)}
        >
          <FiHeart fill={isLiked ? '#e0245e' : 'transparent'} /> 
          <span style={{ marginLeft: '5px' }}>Харесва ми</span>
        </button>

        <button style={actionButtonStyle} onClick={toggleComments}>
          <FiMessageCircle /> <span style={{ marginLeft: '5px' }}>Коментар</span>
        </button>
        <button style={actionButtonStyle}>
          <FiShare2 />
        </button>
      </div>

      {showComments && (
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
          {comments.map(c => (
            <div key={c._id} style={{ marginBottom: '10px', backgroundColor: '#f0f2f5', padding: '8px 12px', borderRadius: '15px', fontSize: '14px' }}>
              <strong style={{ marginRight: '5px' }}>{c.author?.username || 'Анонимен'}:</strong>
              <span>{c.text}</span>
            </div>
          ))}
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <input 
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Напиши коментар..." 
              style={{ flex: 1, padding: '8px 12px', borderRadius: '15px', border: '1px solid #ccc', outline: 'none', marginRight: '10px' }} 
            />
            <button onClick={handleAddComment} style={{ padding: '8px 15px', backgroundColor: '#0064e0', color: 'white', border: 'none', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold' }}>
              Изпрати
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const actionButtonStyle = { display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'color 0.2s' };

export default PostCard;