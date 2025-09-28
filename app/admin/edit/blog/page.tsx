"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Plus, Edit, Trash2 } from "lucide-react"

export default function EditBlog() {
  const [blogPosts] = useState([
    {
      id: 1,
      title: "Transforming Education in Rural India",
      status: "Published",
      date: "2024-01-15",
      category: "Education",
    },
    { id: 2, title: "Healthcare Reaches Remote Villages", status: "Draft", date: "2024-01-10", category: "Healthcare" },
    {
      id: 3,
      title: "Women Empowerment Success Stories",
      status: "Published",
      date: "2024-01-05",
      category: "Community",
    },
    { id: 4, title: "Annual Impact Report 2023", status: "Published", date: "2023-12-31", category: "Reports" },
  ])

  const handleSave = () => {
    alert("Blog posts updated successfully!")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => (window.location.href = "/admin/dashboard")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-primary">Edit Blog Posts</h1>
                <p className="text-sm text-muted-foreground">Manage news, updates and blog content</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts & News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded hover:bg-muted/50">
                  <div className="flex-1">
                    <h3 className="font-medium">{post.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <Badge variant={post.status === "Published" ? "default" : "secondary"}>{post.status}</Badge>
                      <span>{post.category}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
