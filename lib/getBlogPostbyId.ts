import { Blog } from "./blog/blog";
import { BlogPost } from "./blog/blogpost/blogpost";
import { connectToDatabase } from "./mongodb";

export default async function getBlogPostById(id: string) {
  try {
    await connectToDatabase();
    const blogPost = await BlogPost.find({
      id: id,
    });
    console.log(blogPost);
    if (!blogPost) {
      throw new Error("Blog post not found");
    }
    return blogPost;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
}
