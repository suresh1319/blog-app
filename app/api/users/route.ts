import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(decoded.userId).select('-password');
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Users GET API error:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await dbConnect();
    const { name, bio, avatar } = await request.json();
    
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { name, bio, avatar },
      { new: true }
    ).select('-password');

    return NextResponse.json(user);
  } catch (error) {
    console.error('Users PUT API error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}