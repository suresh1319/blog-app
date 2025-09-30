'use client';
import { useEffect, useState } from 'react';
import BlogCard from '@/components/BlogCard';
import Layout from '@/components/Layout';
import SearchFilter from '@/components/SearchFilter';
import Pagination from '@/components/Pagination';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  tags?: string[];
  images?: string[];
  author?: { name: string; email: string };
}

interface BlogResponse {
  blogs: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function Home() {
  const [blogData, setBlogData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const fetchBlogs = async (page = 1, searchTerm = '', tag = '') => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      limit: '6',
      ...(searchTerm && { search: searchTerm }),
      ...(tag && { tag })
    });
    
    const response = await fetch(`/api/blogs?${params}`);
    const data = await response.json();
    setBlogData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(currentPage, search, selectedTag);
  }, [currentPage, search, selectedTag]);

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setCurrentPage(1);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <Layout><div className="text-center py-8">Loading...</div></Layout>;
  if (!blogData) return <Layout><div className="text-center py-8">No blogs found</div></Layout>;

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Blog Posts</h1>
      
      <SearchFilter
        onSearch={handleSearch}
        onTagFilter={handleTagFilter}
        selectedTag={selectedTag}
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.blogs && blogData.blogs.map(blog => (
          <BlogCard
            key={blog._id}
            title={blog.title}
            slug={blog.slug}
            excerpt={blog.excerpt}
            createdAt={blog.createdAt}
            tags={blog.tags}
            images={blog.images}

          />
        ))}
      </div>
      
      {blogData.pagination && (
        <Pagination
          currentPage={blogData.pagination.page}
          totalPages={blogData.pagination.pages}
          onPageChange={handlePageChange}
        />
      )}
    </Layout>
  );
}