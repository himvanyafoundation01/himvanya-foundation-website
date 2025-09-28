"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Edit2, Check, Trash2 } from "lucide-react";
import UploadImage from "@/components/UploadImage";
import { useSession } from "@/components/context/SessionContext";
import { useParams } from "next/navigation";

// Replace with actual blog object data from API or JSON
const initialBlogPosts = [
  {
    id: "47ea8e0e-e9a5-493f-8a6f-50345a608579",
    title: "Transforming Rural Education: Our Digital Literacy Initiative",
    excerpt:
      "How we're bridging the digital divide in rural communities through innovative computer education programs.",
    author: "Dr. Priya Sharma",
    date: "January 15, 2024",
    category: "Education",
    tags: ["Digital Literacy", "Rural Development", "Technology"],
    image:
      "https://cdn.sanity.io/images/p0xg32n9/production/2cad5d65bb7690bad5dcd4a041cf2fef46361678-600x400.svg",
    featured: true,
    readTime: "5 min read",
    content: "", // optional
  },
];

export default function BlogPage() {
  const { user } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const params = useParams();

  useEffect(() => {
    setIsAdmin(user?.role === "admin");
  }, [user]);

  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const toggleEdit = (id: string) => {
    setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (data?.[0].blogPosts) setBlogPosts(data[0].blogPosts);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    fetchBlogPosts();
  }, []);

  const handleInputChange = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    setBlogPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, [field]: value } : post))
    );
  };

  const handleTagChange = (id: string, index: number, value: string) => {
    setBlogPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const newTags = [...post.tags];
          newTags[index] = value;
          return { ...post, tags: newTags };
        }
        return post;
      })
    );
  };

  const handleAddTag = (id: string) => {
    setBlogPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, tags: [...post.tags, ""] } : post
      )
    );
  };

  const handleRemoveTag = (id: string, index: number) => {
    setBlogPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const newTags = post.tags.filter((_, i) => i !== index);
          return { ...post, tags: newTags };
        }
        return post;
      })
    );
  };

  const handleDeleteBlog = (id: string) => {
    if (!isAdmin) return;
    setBlogPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleImageUpload = (id: string, imageUrl: string) => {
    handleInputChange(id, "image", imageUrl);
  };

  const handleAddBlog = () => {
    if (!isAdmin) return;
    const newBlog = {
      id: crypto.randomUUID(),
      title: "",
      excerpt: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      tags: [],
      image: "/placeholder.svg",
      featured: false,
      readTime: "0 min read",
      content: "",
    };
    setBlogPosts((prev) => [newBlog, ...prev]);
  };

  const handleSaveAll = async () => {
    if (!isAdmin) return;
    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch(`/api/blogs`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogPosts }),
      });
      const result = await response.json();
      if (response.ok) setSaveMessage("Blogs saved successfully!");
      else setSaveMessage(result.error || "Failed to save blogs.");
    } catch {
      setSaveMessage("Network error. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const latestPosts = blogPosts.filter((post) => !post.featured);

  const renderTags = (post: any, isEditing: boolean) => (
    <div className="flex flex-wrap gap-2">
      {post.tags.map((tag: string, i: number) =>
        isEditing ? (
          <div key={i} className="flex items-center gap-1">
            <Input
              value={tag}
              onChange={(e) => handleTagChange(post.id, i, e.target.value)}
              placeholder="Tag"
              className="w-24 text-xs"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleRemoveTag(post.id, i)}
            >
              ×
            </Button>
          </div>
        ) : (
          <Badge key={i} variant="secondary" className="cursor-default">
            {tag}
          </Badge>
        )
      )}
      {isEditing && isAdmin && (
        <Button size="sm" onClick={() => handleAddTag(post.id)}>
          + Tag
        </Button>
      )}
    </div>
  );

  const renderBlogCard = (post: any) => {
    const isEditing = !!editMode[post.id];

    return (
      <Card
        key={post.id}
        className="group hover:shadow-lg transition-shadow duration-200 rounded-xl overflow-hidden"
      >
        <div className="relative aspect-video">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {isEditing && isAdmin && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <UploadImage
                value={post.image}
                onChange={(e) => handleImageUpload(post.id, e)}
              />
            </div>
          )}
        </div>
        <CardContent className="p-6 space-y-3">
          <div className="flex justify-between items-center gap-2">
            <h3 className="font-bold text-lg flex-1">
              {isEditing && isAdmin ? (
                <Input
                  value={post.title}
                  onChange={(e) =>
                    handleInputChange(post.id, "title", e.target.value)
                  }
                />
              ) : (
                post.title
              )}
            </h3>
            {isAdmin && (
              <>
                <Button
                  size="sm"
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => toggleEdit(post.id)}
                >
                  {isEditing ? (
                    <>
                      <Check className="w-4 h-4 mr-1" /> Done
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-1" /> Edit
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteBlog(post.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </>
            )}
          </div>

          {isEditing && isAdmin ? (
            <>
              <Input
                value={post.excerpt}
                onChange={(e) =>
                  handleInputChange(post.id, "excerpt", e.target.value)
                }
                placeholder="Excerpt"
              />
              <div className="flex gap-2 flex-wrap">
                <Input
                  value={post.category}
                  onChange={(e) =>
                    handleInputChange(post.id, "category", e.target.value)
                  }
                  placeholder="Category"
                  className="w-32"
                />
                <Input
                  value={post.author}
                  onChange={(e) =>
                    handleInputChange(post.id, "author", e.target.value)
                  }
                  placeholder="Author"
                  className="w-32"
                />
                <Input
                  type="date"
                  value={post.date}
                  onChange={(e) =>
                    handleInputChange(post.id, "date", e.target.value)
                  }
                  className="w-36"
                />
                <Input
                  value={post.readTime}
                  onChange={(e) =>
                    handleInputChange(post.id, "readTime", e.target.value)
                  }
                  placeholder="Read Time"
                  className="w-28"
                />
              </div>
              {renderTags(post, true)}
              <div className="flex items-center gap-2">
                <Input
                  className="h-4 w-4"
                  type="checkbox"
                  checked={post.featured}
                  onChange={(e) =>
                    handleInputChange(post.id, "featured", e.target.checked)
                  }
                />
                <span>Featured</span>
              </div>
            </>
          ) : (
            <>
              <p>{post.excerpt}</p>
              <div className="flex gap-2 flex-wrap">
                {renderTags(post, false)}
              </div>
            </>
          )}

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" /> {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {post.date} • {post.readTime}
            </div>
            <Link
              href={`/blog/${post.id}`}
              className="text-primary flex items-center gap-1"
            >
              Read <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="py-16 text-center bg-gradient-to-r from-primary/10 to-primary/5">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Stories</h1>
        {isAdmin && (
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Button
              onClick={handleAddBlog}
              className="bg-primary text-white hover:bg-primary/90"
            >
              + Add New Blog
            </Button>
            <Button
              onClick={handleSaveAll}
              disabled={isSaving}
              className=" text-white hover:bg-primary/90"
            >
              {isSaving ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        )}
        {saveMessage && (
          <p className="mt-2 text-sm text-green-700">{saveMessage}</p>
        )}
      </section>

      {featuredPosts.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map(renderBlogCard)}
          </div>
        </section>
      )}

      <section className="py-16 bg-muted/30 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map(renderBlogCard)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
