import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, password, role = 'author' } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user._id.toString(), user.role);

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}