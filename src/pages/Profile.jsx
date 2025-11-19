import React from 'react';
import { currentUser } from '../data/mockData';

const Profile = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <h2>{currentUser.username}</h2>
            <p>Profile details coming soon...</p>
        </div>
    );
};

export default Profile;
