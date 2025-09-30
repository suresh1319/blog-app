import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    await dbConnect();
    const { role } = await request.json();
    
    const user = await User.findByIdAndUpdate(
      params.id,
      { role },
      { new: true }
    ).select('-password');

    return NextResponse.json(user);
  } catch (error) {
    console.error('Admin update user API error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}