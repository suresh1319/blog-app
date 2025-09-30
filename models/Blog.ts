import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  tags: [{ type: String }],
  images: [{ type: String }],
  published: { type: Boolean, default: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);