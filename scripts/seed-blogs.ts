import mongoose from 'mongoose';
import Blog from '../models/Blog';
import User from '../models/User';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-app';

const sampleBlogs = [
  {
    title: 'Getting Started with Next.js 15',
    slug: 'getting-started-nextjs-15',
    content: 'Next.js 15 brings exciting new features including improved performance, better developer experience, and enhanced routing capabilities. In this comprehensive guide, we\'ll explore the key features and how to get started with your first Next.js 15 application.',
    excerpt: 'Discover the new features and improvements in Next.js 15, the latest version of the popular React framework.',
    tags: ['nextjs', 'react', 'javascript', 'web-development'],
    images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'MongoDB Atlas: Cloud Database Solutions',
    slug: 'mongodb-atlas-cloud-database',
    content: 'MongoDB Atlas provides a fully managed cloud database service that makes it easy to deploy, operate, and scale MongoDB deployments. Learn how to set up your first cluster and connect your applications.',
    excerpt: 'A complete guide to using MongoDB Atlas for your cloud database needs.',
    tags: ['mongodb', 'database', 'cloud', 'atlas'],
    images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'TypeScript Best Practices for 2024',
    slug: 'typescript-best-practices-2024',
    content: 'TypeScript continues to evolve with new features and improvements. This article covers the latest best practices, advanced types, and patterns that will make your TypeScript code more robust and maintainable.',
    excerpt: 'Learn the latest TypeScript best practices and advanced patterns for writing better code.',
    tags: ['typescript', 'javascript', 'programming', 'best-practices'],
    images: ['https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'Building Responsive UIs with Tailwind CSS',
    slug: 'responsive-ui-tailwind-css',
    content: 'Tailwind CSS makes it easy to build responsive, mobile-first user interfaces. This tutorial covers responsive design principles, breakpoints, and advanced Tailwind techniques.',
    excerpt: 'Master responsive design with Tailwind CSS utility classes and mobile-first approach.',
    tags: ['tailwind', 'css', 'responsive', 'ui-design'],
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'React Hooks Deep Dive',
    slug: 'react-hooks-deep-dive',
    content: 'React Hooks revolutionized how we write React components. This deep dive explores useState, useEffect, custom hooks, and advanced patterns for building modern React applications.',
    excerpt: 'Master React Hooks with practical examples and advanced patterns.',
    tags: ['react', 'hooks', 'javascript', 'frontend'],
    images: ['https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'Docker for Web Developers',
    slug: 'docker-for-web-developers',
    content: 'Docker simplifies application deployment and development environments. Learn how to containerize your web applications, create Docker images, and manage multi-container applications.',
    excerpt: 'A practical guide to using Docker for web development and deployment.',
    tags: ['docker', 'devops', 'containers', 'deployment'],
    images: ['https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'GraphQL vs REST: API Comparison',
    slug: 'graphql-vs-rest-api-comparison',
    content: 'GraphQL and REST are both popular API architectures. This comparison helps you understand when to use each approach, their pros and cons, and implementation considerations.',
    excerpt: 'Compare GraphQL and REST APIs to make informed architectural decisions.',
    tags: ['graphql', 'rest', 'api', 'backend'],
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'Modern CSS Grid Layout Techniques',
    slug: 'modern-css-grid-layout',
    content: 'CSS Grid provides powerful layout capabilities for modern web design. Learn advanced grid techniques, responsive layouts, and practical examples for real-world projects.',
    excerpt: 'Master CSS Grid with advanced techniques and responsive design patterns.',
    tags: ['css', 'grid', 'layout', 'responsive'],
    images: ['https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'JavaScript Performance Optimization',
    slug: 'javascript-performance-optimization',
    content: 'Optimize your JavaScript applications for better performance. This guide covers memory management, code splitting, lazy loading, and profiling techniques.',
    excerpt: 'Learn essential JavaScript performance optimization techniques and best practices.',
    tags: ['javascript', 'performance', 'optimization', 'web-development'],
    images: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'Vue.js 3 Composition API Guide',
    slug: 'vuejs-3-composition-api-guide',
    content: 'Vue.js 3 introduced the Composition API, providing a new way to organize and reuse component logic. This guide covers the fundamentals and advanced patterns.',
    excerpt: 'Learn Vue.js 3 Composition API with practical examples and best practices.',
    tags: ['vuejs', 'composition-api', 'javascript', 'frontend'],
    images: ['https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'Node.js Microservices Architecture',
    slug: 'nodejs-microservices-architecture',
    content: 'Microservices architecture allows you to build scalable, maintainable applications. Learn how to design and implement microservices using Node.js.',
    excerpt: 'Build scalable applications with Node.js microservices architecture.',
    tags: ['nodejs', 'microservices', 'architecture', 'backend'],
    images: ['https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop'],
    published: true,
  },
  {
    title: 'AWS Lambda Serverless Functions',
    slug: 'aws-lambda-serverless-functions',
    content: 'AWS Lambda enables you to run code without managing servers. This guide covers Lambda basics, deployment strategies, and best practices for serverless applications.',
    excerpt: 'Master AWS Lambda for building serverless applications.',
    tags: ['aws', 'lambda', 'serverless', 'cloud'],
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop'],
    published: true,
  },
];

async function seedBlogs() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    // Clear existing blogs
    await Blog.deleteMany({});
    
    // Get all users
    const users = await User.find({});
    if (users.length === 0) {
      console.error('No users found. Please run seed-users first.');
      process.exit(1);
    }
    
    // Distribute blogs among users
    const blogsWithAuthors = sampleBlogs.map((blog, index) => ({
      ...blog,
      author: users[index % users.length]._id,
    }));
    
    await Blog.insertMany(blogsWithAuthors);
    
    console.log('Blogs seeded successfully');
    console.log(`${sampleBlogs.length} blogs distributed among ${users.length} users`);
    
    // Show distribution
    for (const user of users) {
      const userBlogs = blogsWithAuthors.filter(blog => 
        blog.author.toString() === user._id.toString()
      );
      console.log(`- ${user.email}: ${userBlogs.length} blogs`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding blogs:', error);
    process.exit(1);
  }
}

seedBlogs();