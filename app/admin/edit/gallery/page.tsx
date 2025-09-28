"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save, Upload, Trash2 } from "lucide-react"

export default function EditGallery() {
  const [galleryItems] = useState([
    {
      id: 1,
      title: "Education Program - Rural School",
      category: "Education",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Healthcare Camp - Village Clinic",
      category: "Healthcare",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Community Development - Women's Group",
      category: "Community",
      image: "/placeholder.svg?height=200&width=300",
    },
    { id: 4, title: "Skill Training Workshop", category: "Education", image: "/placeholder.svg?height=200&width=300" },
  ])

  const handleSave = () => {
    alert("Gallery updated successfully!")
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
                <h1 className="text-xl font-bold text-primary">Edit Gallery</h1>
                <p className="text-sm text-muted-foreground">Manage gallery images and media</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <div className="space-y-2">
                  <Input value={item.title} placeholder="Image title" />
                  <Input value={item.category} placeholder="Category" />
                  <Button variant="ghost" size="sm" className="w-full text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
