'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import BlogForm from '@/components/BlogForm';
import { useAuth } from '@/components/AuthProvider';

export default function CreateBlog() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
  }, [user, router]);

  if (!user) {
    return <Layout><div className="text-center py-8">Please login to create posts</div></Layout>;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <BlogForm />
    </Layout>
  );
}