'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogFormProps {
  initialData?: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    tags: string[];
    images: string[];
    published: boolean;
  };
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    tags: initialData?.tags?.join(', ') || '',
    images: initialData?.images?.join(', ') || '',
    published: initialData?.published ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: isEdit ? prev.slug : generateSlug(title)
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        
        const data = await response.json();
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const currentImages = formData.images ? formData.images.split(',').map(img => img.trim()).filter(Boolean) : [];
      const allImages = [...currentImages, ...uploadedUrls].join(', ');
      
      setFormData(prev => ({ ...prev, images: allImages }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      images: formData.images.split(',').map(img => img.trim()).filter(Boolean),
    };

    console.log('Submitting blog data:', blogData);
    console.log('Images array:', blogData.images);

    try {
      const url = isEdit ? `/api/blogs/${initialData?.slug}` : '/api/blogs';
      const method = isEdit ? 'PUT' : 'POST';
      
      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        console.error('Failed to save blog:', await response.text());
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Slug</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Excerpt</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={15}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="react, nextjs, javascript"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Images</label>
        <div className="space-y-2">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          {uploading && <p className="text-blue-600 text-sm">Uploading images...</p>}
          <input
            type="text"
            value={formData.images}
            onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Or enter URLs: https://example.com/image1.jpg, https://example.com/image2.jpg"
          />
          {formData.images && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {formData.images.split(',').map((img, index) => {
                const trimmedImg = img.trim();
                return trimmedImg ? (
                  <img
                    key={index}
                    src={trimmedImg}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
          className="mr-2"
        />
        <label htmlFor="published" className="text-sm font-medium">Published</label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading || uploading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading images...' : loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')} Blog
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}