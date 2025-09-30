'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useAuth } from '@/components/AuthProvider';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
}

export default function UserDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchMyBlogs();
  }, [user, router]);

  const fetchMyBlogs = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/my-blogs', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setBlogs(data || []);
    setLoading(false);
  };

  const handleDelete = async (slug: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      const token = localStorage.getItem('token');
      await fetch(`/api/blogs/${slug}`, { 
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyBlogs();
    }
  };

  if (loading) return <Layout><div className="text-center py-8">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Link
          href="/dashboard/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                  <div className="text-sm text-gray-500">{blog.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    blog.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/edit/${blog.slug}`}
                    className="text-green-600 hover:text-green-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.slug)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}