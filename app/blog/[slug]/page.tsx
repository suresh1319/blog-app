'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';

interface Blog {
  title: string;
  content: string;
  createdAt: string;
  tags?: string[];
  images?: string[];
}

export default function BlogDetail() {
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
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-500 mb-6">{new Date(blog.createdAt).toLocaleDateString()}</p>
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {blog.images && blog.images.length > 0 && blog.images[0] && (
          <div className="mb-6">
            <img 
              src={blog.images[0]} 
              alt={blog.title} 
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
          ))}
        </div>
        
        {blog.images && blog.images.length > 1 && (
          <div className="mt-8 grid grid-cols-2 gap-4">
            {blog.images.slice(1).map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${blog.title} ${index + 2}`} 
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
          </div>
        )}
      </article>
    </Layout>
  );
}