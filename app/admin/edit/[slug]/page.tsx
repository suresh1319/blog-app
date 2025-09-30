'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import BlogForm from '@/components/BlogForm';

interface Blog {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  images: string[];
  published: boolean;
}

export default function EditBlog() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) return <Layout><div className="text-center py-8">Loading...</div></Layout>;
  if (!blog) return <Layout><div className="text-center py-8">Blog not found</div></Layout>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      <BlogForm initialData={blog} isEdit={true} />
    </Layout>
  );
}