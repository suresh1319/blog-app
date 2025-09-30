import mongoose from 'mongoose';
import Blog from '../models/Blog';
import User from '../models/User';
import { hashPassword } from '../lib/auth';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-app';

const sampleBlogs = [
  {
    title: 'Getting Started with Next.js',
    slug: 'getting-started-nextjs',
    content: 'Next.js is a powerful React framework that makes building web applications easier. It provides features like server-side rendering, static site generation, and API routes out of the box.\n\nWith Next.js, you can create fast, SEO-friendly applications with minimal configuration. The framework handles routing automatically based on your file structure, making development intuitive and efficient.\n\nWhether you\'re building a simple blog or a complex e-commerce platform, Next.js provides the tools and optimizations you need to create exceptional user experiences.',
    excerpt: 'Learn the basics of Next.js and how to get started with your first project.',
    tags: ['nextjs', 'react', 'javascript', 'web-development'],
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop'
    ],
    published: true,
  },
  {
    title: 'Understanding MongoDB',
    slug: 'understanding-mongodb',
    content: 'MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. Unlike traditional relational databases, MongoDB doesn\'t require a predefined schema, making it perfect for applications with evolving data requirements.\n\nThe document-based structure allows for complex nested data and arrays, which can significantly simplify your application logic. MongoDB also provides powerful querying capabilities and built-in replication for high availability.\n\nWhether you\'re building a content management system, an e-commerce platform, or a real-time analytics dashboard, MongoDB\'s flexibility and scalability make it an excellent choice.',
    excerpt: 'Explore the fundamentals of MongoDB and how it differs from traditional databases.',
    tags: ['mongodb', 'database', 'nosql', 'backend'],
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop'
    ],
    published: true,
  },
  {
    title: 'Building APIs with Node.js',
    slug: 'building-apis-nodejs',
    content: 'Node.js provides an excellent platform for building scalable APIs. Its event-driven, non-blocking I/O model makes it particularly well-suited for data-intensive real-time applications.\n\nWith frameworks like Express.js, you can quickly create RESTful APIs with minimal boilerplate code. Node.js also has a vast ecosystem of packages available through npm, allowing you to add functionality without reinventing the wheel.\n\nFrom authentication and validation to database integration and testing, Node.js provides all the tools you need to build robust, production-ready APIs.',
    excerpt: 'Learn how to create robust APIs using Node.js and Express.',
    tags: ['nodejs', 'api', 'express', 'backend', 'javascript'],
    images: [
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop'
    ],
    published: true,
  },
  {
    title: 'Modern CSS Techniques',
    slug: 'modern-css-techniques',
    content: 'CSS has evolved significantly over the years, introducing powerful features like Grid, Flexbox, and CSS Variables. These modern techniques allow developers to create complex layouts with cleaner, more maintainable code.\n\nCSS Grid revolutionizes how we approach layout design, providing a two-dimensional system that can handle both rows and columns simultaneously. Combined with Flexbox for one-dimensional layouts, you have all the tools needed for responsive design.\n\nCSS Variables (Custom Properties) bring dynamic styling capabilities, allowing you to create themes and maintain consistency across your application with ease.',
    excerpt: 'Discover the latest CSS features and how they can improve your web development workflow.',
    tags: ['css', 'frontend', 'web-design', 'responsive'],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&h=400&fit=crop'
    ],
    published: true,
  },
  {
    title: 'TypeScript Best Practices',
    slug: 'typescript-best-practices',
    content: 'TypeScript adds static type checking to JavaScript, helping catch errors at compile time rather than runtime. This leads to more robust applications and better developer experience.\n\nSome key best practices include using strict mode, leveraging union types for flexibility, and creating custom type guards for runtime type checking. Interface segregation and proper generic usage can make your code more maintainable and reusable.\n\nBy following these practices, you can harness the full power of TypeScript while maintaining clean, readable code that scales with your project.',
    excerpt: 'Essential TypeScript practices for writing better, more maintainable code.',
    tags: ['typescript', 'javascript', 'programming', 'best-practices'],
    images: [
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop'
    ],
    published: true,
  },
  {
    title: 'React Hooks Deep Dive',
    slug: 'react-hooks-deep-dive',
    content: 'React Hooks revolutionized how we write React components by allowing us to use state and lifecycle features in functional components. This deep dive explores useState, useEffect, and custom hooks.\n\nHooks provide a more direct API to the React concepts you already know. They allow you to reuse stateful logic between components without changing your component hierarchy.\n\nCustom hooks are particularly powerful, enabling you to extract component logic into reusable functions that can be shared across your application.',
    excerpt: 'Master React Hooks with practical examples and advanced patterns.',
    tags: ['react', 'hooks', 'javascript', 'frontend'],
    images: [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop'
    ],
    published: true,
  },
  {
    title: 'Docker for Developers',
    slug: 'docker-for-developers',
    content: 'Docker simplifies application deployment by packaging applications and their dependencies into lightweight containers. This guide covers Docker basics, containerization strategies, and best practices.\n\nContainers ensure consistency across development, testing, and production environments. With Docker Compose, you can define and run multi-container applications with ease.\n\nLearn how to create efficient Dockerfiles, manage container networks, and implement CI/CD pipelines with Docker.',
    excerpt: 'A practical guide to using Docker for development and deployment.',
    tags: ['docker', 'devops', 'containers', 'deployment'],
    images: [
      'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop'
    ],
    published: true,
  },
  {
    title: 'GraphQL vs REST APIs',
    slug: 'graphql-vs-rest-apis',
    content: 'GraphQL and REST are both popular approaches to API design, each with their own strengths and use cases. This comparison helps you understand when to use each approach.\n\nREST APIs are simple, cacheable, and widely understood, making them great for straightforward CRUD operations. GraphQL offers more flexibility with its query language and single endpoint approach.\n\nConsider factors like team expertise, caching requirements, and client needs when choosing between GraphQL and REST for your next project.',
    excerpt: 'Compare GraphQL and REST APIs to make informed architectural decisions.',
    tags: ['graphql', 'rest', 'api', 'backend'],
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
    ],
    published: true,
  },
  {
    title: 'CSS Grid Layout Mastery',
    slug: 'css-grid-layout-mastery',
    content: 'CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease. This comprehensive guide covers grid fundamentals and advanced techniques.\n\nGrid provides precise control over both rows and columns, making it perfect for creating magazine-style layouts, dashboards, and complex UI components.\n\nLearn about grid areas, auto-placement, and how to combine Grid with Flexbox for maximum layout flexibility.',
    excerpt: 'Master CSS Grid with advanced techniques and responsive design patterns.',
    tags: ['css', 'grid', 'layout', 'responsive'],
    images: [
      'https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop'
    ],
    published: true,
  },
  {
    title: 'JavaScript Performance Tips',
    slug: 'javascript-performance-tips',
    content: 'Optimizing JavaScript performance is crucial for creating fast, responsive web applications. This guide covers essential techniques for improving your code\'s efficiency.\n\nLearn about memory management, avoiding memory leaks, and optimizing loops and DOM manipulations. Code splitting and lazy loading can significantly improve initial load times.\n\nProfiling tools and performance monitoring help identify bottlenecks and measure the impact of your optimizations.',
    excerpt: 'Essential JavaScript performance optimization techniques and best practices.',
    tags: ['javascript', 'performance', 'optimization', 'web-development'],
    images: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop'
    ],
    published: true,
  },
];

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@blog.com',
    password: 'admin123',
    role: 'admin',
    bio: 'Platform administrator with full access to all features.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Test User 1',
    email: 'test@test1.com',
    password: 'test123',
    role: 'user',
    bio: 'First test user for development and testing purposes.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Test User 2',
    email: 'test2@test.com',
    password: 'test123',
    role: 'user',
    bio: 'Second test user for development and testing purposes.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    // Clear existing data
    await Blog.deleteMany({});
    await User.deleteMany({});
    
    // Seed users with hashed passwords
    const usersWithHashedPasswords = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
      }))
    );
    
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    const testUser1 = createdUsers.find(user => user.email === 'test@test1.com');
    const testUser2 = createdUsers.find(user => user.email === 'test2@test.com');
    const adminUser = createdUsers.find(user => user.email === 'admin@blog.com');
    
    // Distribute 10 blogs among all users: 4 to admin, 3 to test user 1, 3 to test user 2
    const blogsWithAuthors = sampleBlogs.map((blog, index) => {
      let author;
      if (index < 4) {
        author = adminUser?._id;
      } else if (index < 7) {
        author = testUser1?._id;
      } else {
        author = testUser2?._id;
      }
      return { ...blog, author };
    });
    
    await Blog.insertMany(blogsWithAuthors);
    
    console.log('Database seeded successfully');
    console.log('Sample users:');
    console.log('- admin@blog.com / admin123 (Admin) - has 4 blog posts');
    console.log('- test@test1.com / test123 (User) - has 3 blog posts');
    console.log('- test2@test.com / test123 (User) - has 3 blog posts');
    console.log('Total: 10 blog posts distributed among all users');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();