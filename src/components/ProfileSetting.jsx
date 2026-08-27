import React, { useState } from 'react';
import { Camera, Mail, Lock, CheckCircle, User } from 'lucide-react';
import InputField from './InputField';
import Sidebar from './SideBar';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

// --- Settings Component ---

const ProfileSetting = () => {
    const [name, setName] = useState('');
    const [selectedimage, setSelectedImage] = useState(null);

    const [generalData, setGeneralData] = useState({
    fullName: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });


    const { authUser, isUpdatingProfile, updateProfile, isGeneralUpdating, generalUpdate, passwordUpdate } = useAuthStore();


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImage(base64Image)
            await updateProfile({ profilePic: base64Image });
        }
    };


    const handleSaveChanges = (e) => {
        e.preventDefault();
        generalUpdate(generalData)
        
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }
        passwordUpdate(passwordData);
        
    };

    

    return (
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div className="settings-card">
                <form onSubmit={handleSaveChanges}>
                    <div className="avatar-card">
                        <img
                            src={selectedimage || authUser?.profilePic || '/avatar.png'}
                            alt="Profile"
                            className="avatar-card__image"
                        />
                        <div>
                            <h3 className="settings-card__title">
                                <Camera size={18} />
                                Profile Picture
                            </h3>
                            <p className="auth-copy">JPG or PNG allowed. Max size 5MB.</p>
                            <label className="avatar-uploader" htmlFor="avatar-upload">
                                <Camera size={16} />
                                Change Photo
                                <input type="file" id="avatar-upload" className="sr-only" accept="image/*" onChange={handleImageUpload} disabled={isUpdatingProfile} />
                            </label>
                        </div>
                    </div>

                    <div className="summary-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                        <InputField
                            label="Full Name"
                            value={generalData.fullName}
                            onChange={(e) => setGeneralData({ ...generalData, fullName: e.target.value })}
                            placeholder="Enter your full name"
                            icon={User}
                        />

                        <InputField
                            label="Email Address"
                            type="email"
                            value={generalData.email}
                            onChange={(e) => setGeneralData({ ...generalData, email: e.target.value })}
                            placeholder="Enter your email"
                            icon={Mail}
                        />
                    </div>

                    <div className="toolbar" style={{ justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                        <button onClick={handleSaveChanges} type="submit" className="btn btn--primary">
                            <CheckCircle size={16} />
                            Save General Changes
                        </button>
                    </div>
                </form>
            </div>

            <div className="settings-card">
                <h2 className="settings-card__title">
                    <Lock size={18} />
                    <span>Security & Password</span>
                </h2>
                <form onSubmit={handlePasswordChange}>
                    <div className="summary-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                        <InputField
                            label="Current Password"
                            type="password"
                            value={passwordData.oldPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                            placeholder="••••••••"
                            icon={Lock}
                        />

                        <div></div>

                        <InputField
                            label="New Password"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            placeholder="Enter new password"
                            icon={Lock}
                        />

                        <InputField
                            label="Confirm New Password"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            placeholder="Confirm new password"
                            icon={Lock}
                        />
                    </div>

                    <div className="toolbar" style={{ justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                        <button type="submit" className="btn btn--primary">
                            <CheckCircle size={16} />
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default ProfileSetting;
