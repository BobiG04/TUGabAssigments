import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';

function Profile({ setCurrentPage }) {
  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '0 15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#e9ecef', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#fff', marginRight: '20px' }}></div>
          <div>
            <div style={{ fontWeight: 'bold' }}>Богомил Иванов</div>
            <button style={{ padding: '5px 20px', backgroundColor: '#888', color: 'white', border: 'none', borderRadius: '4px', marginTop: '10px' }}>Редактирай</button>
          </div>
        </div>
        <PostCard content="Моят първи пост в личния ми профил." />
      </div>
    </div>
  );
}

export default Profile;