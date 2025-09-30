# Suresh_WebDev_Assignment - Blog Platform

A fully functional, dynamic blog platform built with Next.js 15, MongoDB, and TypeScript. This project demonstrates modern web development practices with server-side rendering, database integration, authentication, and responsive design.

## Project Overview

This blog platform provides a complete content management system with both public and admin interfaces. Users can browse, search, and filter blog posts, while authenticated users can create, edit, and manage their own content. The application features a clean, responsive design and implements modern web development best practices.

### Key Features

- **Public Blog Interface**: Homepage with paginated blog listings, individual post pages, search and filter functionality
- **User Authentication**: Registration, login, and role-based access control
- **Content Management**: Create, edit, delete blog posts with rich content support
- **Admin Dashboard**: User management and content oversight
- **Image Upload**: Cloudinary integration for image management
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **SEO Optimized**: Server-side rendering with Next.js for better search engine visibility

## Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **File Upload**: Cloudinary
- **Styling**: Tailwind CSS
- **Development**: ESLint, TypeScript

## Dependencies

### Production Dependencies
```json
{
  "next": "15.5.4",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "mongoose": "^8.0.0",
  "cloudinary": "^1.41.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3"
}
```

### Development Dependencies
```json
{
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@tailwindcss/postcss": "^4",
  "tailwindcss": "^4",
  "eslint": "^9",
  "eslint-config-next": "15.5.4",
  "@eslint/eslintrc": "^3",
  "tsx": "^4.0.0",
  "@types/jsonwebtoken": "^9.0.0",
  "@types/bcryptjs": "^2.4.0"
}
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account for image uploads

### 1. Clone and Install
```bash
git clone https://github.com/suresh1319/blog-app.git
cd blog-app
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app

# Cloudinary Configuration (for image uploads)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# JWT Secret (change in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Database Setup
The application includes a seeding script to populate the database with sample data:

```bash
npm run seed
```

This creates:
- 3 sample users (1 admin, 2 regular users)
- 10 sample blog posts with various topics
- Proper user-post relationships

### 4. Run the Application
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **User Dashboard**: http://localhost:3000/dashboard

## Default User Accounts

After running the seed script, you can log in with these accounts:

- **Admin**: admin@blog.com / admin123
- **User 1**: test@test1.com / test123
- **User 2**: test2@test.com / test123

## Project Structure

```
blog-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── blogs/                # Blog CRUD operations
│   │   ├── users/                # User management
│   │   └── upload/               # File upload handling
│   ├── admin/                    # Admin interface pages
│   ├── dashboard/                # User dashboard pages
│   ├── blog/[slug]/              # Individual blog post pages
│   └── (auth)/                   # Authentication pages
├── components/                   # Reusable React components
│   ├── AuthProvider.tsx          # Authentication context
│   ├── BlogCard.tsx              # Blog post card component
│   ├── BlogForm.tsx              # Blog creation/editing form
│   ├── Layout.tsx                # Main layout wrapper
│   ├── Pagination.tsx            # Pagination component
│   └── SearchFilter.tsx          # Search and filter component
├── lib/                          # Utility functions
│   ├── auth.ts                   # Authentication helpers
│   └── dbConnect.ts              # Database connection
├── models/                       # Mongoose schemas
│   ├── Blog.ts                   # Blog post model
│   └── User.ts                   # User model
├── scripts/                      # Database seeding scripts
└── public/                       # Static assets
```

## API Endpoints

### Public Endpoints
- `GET /api/blogs` - Get paginated blog posts (supports search, tags, pagination)
- `GET /api/blogs/[slug]` - Get single blog post
- `GET /api/tags` - Get all available tags
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected Endpoints (Require Authentication)
- `POST /api/blogs` - Create new blog post
- `PUT /api/blogs/[slug]` - Update blog post (author/admin only)
- `DELETE /api/blogs/[slug]` - Delete blog post (author/admin only)
- `GET /api/my-blogs` - Get current user's blog posts
- `POST /api/upload` - Upload images to Cloudinary

### Admin Endpoints
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/[id]` - Update user role (admin only)

## Database Schema

### User Model
```typescript
{
  name: String (required)
  email: String (required, unique)
  password: String (required, hashed)
  role: String (enum: ['user', 'admin'], default: 'user')
  bio: String (optional)
  avatar: String (optional)
  createdAt: Date (default: Date.now)
}
```

### Blog Model
```typescript
{
  title: String (required)
  slug: String (required, unique)
  content: String (required)
  excerpt: String (required)
  tags: [String]
  images: [String]
  published: Boolean (default: true)
  author: ObjectId (ref: 'User')
  createdAt: Date (default: Date.now)
  updatedAt: Date (default: Date.now)
}
```

## Features Implemented

### Core Functionality
- ✅ User registration and authentication
- ✅ Role-based access control (user/admin)
- ✅ Blog post CRUD operations
- ✅ Image upload and management
- ✅ Search and filtering
- ✅ Pagination
- ✅ Responsive design

### Advanced Features
- ✅ Server-side rendering with Next.js
- ✅ Database indexing for search optimization
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ File upload to Cloudinary
- ✅ TypeScript for type safety
- ✅ ESLint for code quality

## Deployment

The application is configured for deployment on Vercel:

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

**Live Demo**: [Your Vercel URL]

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with sample data
```

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- Role-based access control
- Secure environment variable handling

## Performance Optimizations

- Server-side rendering for better SEO
- Database indexing for search queries
- Image optimization with Cloudinary
- Pagination to limit data transfer
- Efficient MongoDB queries

## Author

**Suresh** - Web Development Assignment
- GitHub: [suresh1319](https://github.com/suresh1319)
- Project Repository: [blog-app](https://github.com/suresh1319/blog-app)

## License

This project is created for educational purposes as part of a web development assignment.

---

*This README.md file provides comprehensive documentation for the blog platform project, including setup instructions, feature descriptions, and technical specifications.*