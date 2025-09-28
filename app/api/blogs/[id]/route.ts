import { BlogPost } from "@/lib/blog/blogpost/blogpost";
import getBlogPostById from "@/lib/getBlogPostbyId";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log(id);
  const blogPost = await getBlogPostById(id);
  return NextResponse.json({
    message: "Blog post fetched successfully",
    blogPost,
  });
}





export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await request.json();
  console.log("Request body:", body);

  try {
    const blogPost = await BlogPost.findOneAndUpdate(
      { id: id },       // using your schema's 'id' field
      { $set: body },
      { new: true }     // return updated doc
    );

    if (!blogPost) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    console.log("Updated blog post:", blogPost);
    return NextResponse.json({
      message: "Blog post updated successfully",
      blogPost,
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ message: "Error updating blog post" }, { status: 500 });
  }
}


