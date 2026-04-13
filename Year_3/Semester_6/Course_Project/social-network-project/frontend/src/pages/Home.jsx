import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';

function Home({ setCurrentPage }) {
  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '0 15px' }}>
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px' }}>
          <textarea placeholder="Какво мислиш днес?" style={{ width: '100%', height: '60px', border: 'none', resize: 'none', outline: 'none' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button style={{ padding: '5px 15px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px' }}>Публикувай</button>
          </div>
        </div>
        <PostCard content="Привет, това е тестов пост във фийда!" />
        <PostCard content="Привет, това е тестов пост във фийда!" />
        <PostCard content="Привет, това е тестов пост във фийда!" />
        <PostCard content="Привет, това е тестов пост във фийда!" />
        <PostCard content="Привет, това е тестов пост във фийда!" />
      </div>
    </div>
  );
}

export default Home;