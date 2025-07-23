import React from 'react';
import '../../css/Settings.css';

const Settings = () => {
  // Replace with actual data from state or props
  const userData = {
    name: 'Rendered name',
    email: 'Rendered email',
    password: 'Rendered password',
    mobile: 'Rendered mobile no'
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Login & Security</h2>

      <div className="settings-item">
        <label>Name:</label>
        <input type="text" value={userData.name} readOnly />
        <button>Edit</button>
      </div>

      <div className="settings-item">
        <label>Email:</label>
        <input type="text" value={userData.email} readOnly />
        <button>Edit</button>
      </div>

      <div className="settings-item">
        <label>Password:</label>
        <input type="text" value={userData.password} readOnly />
        <button>Edit</button>
      </div>

      <div className="settings-item">
        <label>Mobile No:</label>
        <input type="text" value={userData.mobile} readOnly />
        <button>Edit</button>
      </div>
    </div>
  );
};

export default Settings;
