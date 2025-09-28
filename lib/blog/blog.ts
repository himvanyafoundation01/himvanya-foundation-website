import { model, models, Schema } from "mongoose";
import { BlogPost, blogPostSchema } from "./blogpost/blogpost";

const blogSchema = new Schema({
  blogHeroSection: {
    blogHeroHeading: String,
    blogHeroDescription: String,
  },
  blogCategories: [{ type: String, required: true }],
  blogPosts: [blogPostSchema],
});

export const Blog = models.Blog || model("Blog", blogSchema);
