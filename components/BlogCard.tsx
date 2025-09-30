import Link from 'next/link';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  tags?: string[];
  images?: string[];
}

export default function BlogCard({ title, slug, excerpt, createdAt, tags, images }: BlogCardProps) {
  return (
    <div className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {images && images.length > 0 && images[0] && (
        <img 
          src={images[0]} 
          alt={title} 
          className="w-full h-48 object-cover rounded mb-4"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
      <h2 className="text-xl font-bold mb-2">
        <Link href={`/blog/${slug}`} className="hover:text-blue-600 transition-colors">
          {title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-3">{excerpt}</p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
}