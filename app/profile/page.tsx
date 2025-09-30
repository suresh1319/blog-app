'use client';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'blog_avatars');

    const response = await fetch(`https://api.cloudinary.com/v1_1/dbwykixfc/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let avatarUrl = avatar;
    
    if (avatarFile) {
      setUploading(true);
      try {
        avatarUrl = await uploadAvatar(avatarFile);
        setAvatar(avatarUrl);
      } catch (error) {
        alert('Failed to upload avatar');
        setLoading(false);
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, bio, avatar: avatarUrl }),
      });

      if (response.ok) {
        // Refresh user data in AuthProvider
        const userResponse = await fetch('/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          // Force re-render by updating local state
          window.location.reload();
        }
        alert('Profile updated successfully');
      }
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-8">Please login to view your profile</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex items-center space-x-4 mb-4">
            {avatar && (
              <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover" />
            )}
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {avatarFile && (
              <p className="text-sm text-gray-500 mt-1">Selected: {avatarFile.name}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </Layout>
  );
}