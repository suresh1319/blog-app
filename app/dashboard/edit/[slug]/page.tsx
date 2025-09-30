'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import BlogForm from '@/components/BlogForm';
import { useAuth } from '@/components/AuthProvider';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  images: string[];
  published: boolean;
  author: string;
}

export default function EditBlog({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchBlog();
  }, [user, router]);

  const fetchBlog = async () => {
    const response = await fetch(`/api/blogs/${params.slug}`);
    const data = await response.json();
    
    if (data.author !== user?.id && user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    
    setBlog(data);
    setLoading(false);
  };

  if (loading) return <Layout><div className="text-center py-8">Loading...</div></Layout>;
  if (!blog) return <Layout><div className="text-center py-8">Blog not found</div></Layout>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <BlogForm blog={blog} isEdit />
    </Layout>
  );
}