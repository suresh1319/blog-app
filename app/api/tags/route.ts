import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await dbConnect();
    const tags = await Blog.distinct('tags', { published: true });
    return NextResponse.json(tags.filter(tag => tag));
  } catch (error) {
    console.error('Tags API error:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}