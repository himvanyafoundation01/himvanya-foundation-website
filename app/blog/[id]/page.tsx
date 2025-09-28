"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Edit2, Check } from "lucide-react";
import UploadImage from "@/components/UploadImage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useSession } from "@/components/context/SessionContext";
import { useParams } from "next/navigation";

// Seed/fallback blog post data
const fallbackBlogPost = {
  id: "1",
  title: "Transforming Rural Education: Our Digital Literacy Initiative",
  excerpt:
    "How we're bridging the digital divide in rural communities through innovative computer education programs.",
  content: `# Welcome to Digital Literacy

In today's digital age, access to technology and digital literacy skills are no longer luxuries. Our initiative brings **digital literacy programs** to rural communities.

## Highlights

- Free computer classes
- Access to laptops and internet
- Skill-building workshops

## Join Us

Contact us to get involved and make a difference!
`,
  author: "Dr. Priya Sharma",
  date: "2024-01-15",
  category: "Education",
  tags: ["Digital Literacy", "Rural Development", "Technology"],
  image:
    "/placeholder.svg?height=400&width=800&text=Digital+Literacy+Initiative",
  readTime: "5 min read",
};

export default function BlogPostPage() {
  const params = useParams();
  const { user } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogPost, setBlogPost] = useState(fallbackBlogPost);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  useEffect(() => {
    setIsAdmin(user?.role === "admin");
  }, [user]);

  // Fetch blog post from API
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        if (!params.id) return;
        const res = await fetch(`/api/blogs/${params.id}`);
        const data = await res.json();
        console.log(data);
        if (data?.blogPost[0]) setBlogPost(data?.blogPost[0]);
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        // Keep fallbackBlogPost in case of error
      }
    };
    fetchBlogPost();
  }, [params.id]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setBlogPost((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...blogPost.tags];
    newTags[index] = value;
    setBlogPost((prev) => ({ ...prev, tags: newTags }));
  };

  const handleAddTag = () =>
    setBlogPost((prev) => ({ ...prev, tags: [...prev.tags, ""] }));

  const handleRemoveTag = (index: number) =>
    setBlogPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));

  const handleImageUpload = (url: string) => handleInputChange("image", url);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch(`/api/blogs/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogPost }),
      });
      const data = await res.json();
      if (res.ok) setSaveMessage("Blog saved successfully!");
      else setSaveMessage(data.error || "Failed to save blog.");
      setIsEditing(false);
    } catch {
      setSaveMessage("Network error. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const formattedDate = new Date(blogPost.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Back Navigation */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Title + Edit */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold">{blogPost.title}</h1>
            {isAdmin && (
              <Button
                size="sm"
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? (
                  <>
                    <Check className="w-4 h-4 mr-1" /> Editing
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Author / Date / Read Time */}
          <div className="text-sm text-gray-600 flex flex-wrap gap-4">
            <span>
              By <b>{blogPost.author}</b>
            </span>
            <span>{formattedDate}</span>
            <span>{blogPost.readTime}</span>
          </div>

          {/* Editing Mode */}
          {isAdmin && isEditing ? (
            <>
              <input
                className="text-3xl md:text-4xl font-bold w-full border p-2 rounded"
                value={blogPost.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Title"
              />
              <textarea
                className="text-lg p-2 border rounded w-full"
                value={blogPost.excerpt}
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                placeholder="Excerpt"
              />
              <input
                className="p-2 border rounded w-full"
                value={blogPost.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="Category"
              />
              <input
                className="p-2 border rounded w-full"
                value={blogPost.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Author"
              />
              <input
                type="date"
                className="p-2 border rounded w-full"
                value={blogPost.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
              <input
                className="p-2 border rounded w-full"
                value={blogPost.readTime}
                onChange={(e) => handleInputChange("readTime", e.target.value)}
                placeholder="Read Time"
              />

              <div className="aspect-video relative mb-6">
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-full object-cover rounded"
                />
                <UploadImage
                  value={blogPost.image}
                  onChange={(e) => handleImageUpload(e)}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 items-center mb-4">
                {blogPost.tags.map((tag, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <input
                      className="border p-1 rounded text-sm"
                      value={tag}
                      onChange={(e) => handleTagChange(i, e.target.value)}
                      placeholder="Tag"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveTag(i)}
                    >
                      &times;
                    </Button>
                  </div>
                ))}
                <Button size="sm" onClick={handleAddTag}>
                  + Add Tag
                </Button>
              </div>

              <ReactMde
                value={blogPost.content}
                onChange={(val) => handleInputChange("content", val)}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                  Promise.resolve(converter.makeHtml(markdown))
                }
                childProps={{ writeButton: { tabIndex: -1 } }}
              />

              <div className="flex items-center gap-4 mt-4">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                {saveMessage && <span>{saveMessage}</span>}
              </div>
            </>
          ) : (
            <>
              {/* View Mode */}
              <p className="text-lg">{blogPost.excerpt}</p>
              <div className="aspect-video mb-6">
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {blogPost.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="prose max-w-full dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {blogPost.content}
                </ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
