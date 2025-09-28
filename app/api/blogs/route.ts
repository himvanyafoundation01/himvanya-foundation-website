import { Blog } from "@/lib/blog/blog";
import { BlogPost } from "@/lib/blog/blogpost/blogpost";
import BlogSeed from "@/lib/blog/seed";
import { verifyToken } from "@/lib/jwt/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    const blogs = await Blog.find().select("-content");
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}



export async function PUT(request: Request) {

  await connectToDatabase();

  const body = await request.json();
  console.log(body)
  const updateBlogs = await Blog.updateOne({ $set: body })
  const updateBlogPosts = await BlogPost.updateMany(
    {},
    { $set: body.blogPosts }
  )

  console.log(updateBlogs)
  try {
    return NextResponse.json({
      message: "Blog updated successfully",
      updateBlogs,
      updateBlogPosts,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
