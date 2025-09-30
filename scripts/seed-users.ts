import mongoose from 'mongoose';
import User from '../models/User';
import { hashPassword } from '../lib/auth';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-app';

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@blog.com',
    password: 'admin123',
    role: 'admin',
    bio: 'Platform administrator with full access to all features.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'alice123',
    role: 'user',
    bio: 'Frontend developer passionate about React and modern web technologies.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'bob123',
    role: 'user',
    bio: 'Full-stack developer with expertise in Node.js and MongoDB.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Carol Davis',
    email: 'carol@example.com',
    password: 'carol123',
    role: 'user',
    bio: 'UI/UX designer who loves creating beautiful and functional interfaces.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'David Wilson',
    email: 'david@example.com',
    password: 'david123',
    role: 'user',
    bio: 'DevOps engineer specializing in cloud infrastructure and automation.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  },
];

async function seedUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    // Clear existing users
    await User.deleteMany({});
    
    // Seed users with hashed passwords
    const usersWithHashedPasswords = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
      }))
    );
    
    await User.insertMany(usersWithHashedPasswords);
    
    console.log('Users seeded successfully');
    console.log('Sample users:');
    console.log('- admin@blog.com / admin123 (Admin)');
    console.log('- alice@example.com / alice123 (User)');
    console.log('- bob@example.com / bob123 (User)');
    console.log('- carol@example.com / carol123 (User)');
    console.log('- david@example.com / david123 (User)');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers();