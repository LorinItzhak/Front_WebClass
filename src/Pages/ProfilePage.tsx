import React from 'react';

const ProfilePage: React.FC = () => {
  const handleUploadPicture = () => {
    alert('Upload a new profile picture');
  };

  const handleSaveChanges = () => {
    alert('Changes saved!');
  };

  return (
    <div
      style={{
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #d0eaff, #f7d6ff, #fff4c2)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        color: '#333',
      }}
    >
      

      {/* Profile Container */}
      <div style={{ maxWidth: '800px', margin: '30px auto', background: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
        {/* Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <label htmlFor="profile-picture">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/James_Charles_%282019%29_%28cropped%29.png/220px-James_Charles_%282019%29_%28cropped%29.png"
              alt="User"
              title="Click to upload a new picture"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
              onClick={handleUploadPicture}
            />
          </label>
          <input type="file" id="profile-picture" style={{ display: 'none' }} />
          <h1 style={{ margin: 0, fontSize: '2em', color: '#007bff' }}>James Charles</h1>
        </div>

        {/* Edit Profile */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="username" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Username</label>
            <input
              type="text"
              id="username"
              defaultValue="James Charles"
              style={{
                width: '95%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: '#f9f9f9',
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleSaveChanges}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
