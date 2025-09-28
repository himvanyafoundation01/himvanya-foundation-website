import { model, models, Schema } from "mongoose";

export const blogPostSchema = new Schema({
  id: String,
  title: String,
  excerpt: String,
  content: String,
  author: String,
  date: String,
  category: String,
  tags: [String],
  image: String,
  featured: Boolean,
  readTime: String,
});

export const BlogPost = models.BlogPost || model("BlogPost", blogPostSchema);
