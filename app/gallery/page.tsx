"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Save, X, Plus, Trash } from "lucide-react";
import UploadImage from "@/components/UploadImage";
import { useSession } from "@/components/context/SessionContext";

type GalleryImage = {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  image: string;
  description: string;
  _id?: string;
};

export default function GalleryPageEditor() {
  const { user } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(user?.role === "admin");
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [galleryContent, setGalleryContent] = useState({
    GalleryHeroSection: {
      GalleryHeroHeading: "Our Gallery",
      GalleryHeroDescription:
        "Witness the impact of our work through these moments captured from our various programs and initiatives across India.",
    },
    GalleryTabs: ["All", "Education", "Healthcare", "Community"],
    GalleryImages: [
      {
        id: "1",
        title: "School Infrastructure Development",
        category: "Education",
        location: "Rural Maharashtra",
        date: "January 2024",
        image: "/placeholder.svg",
        description:
          "New classroom construction in partnership with local community",
      },
    ] as GalleryImage[],
  });

  useEffect(() => {
    const fetchGalleryContent = async () => {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGalleryContent(data.data[0]);
    };
    fetchGalleryContent();
  }, []);

  const updateHero = (field: string, value: string) => {
    setGalleryContent((prev) => ({
      ...prev,
      GalleryHeroSection: { ...prev.GalleryHeroSection, [field]: value },
    }));
  };

  const updateImage = (
    idx: number,
    field: keyof GalleryImage,
    value: string
  ) => {
    const updated = [...galleryContent.GalleryImages];
    updated[idx] = { ...updated[idx], [field]: value };
    setGalleryContent({ ...galleryContent, GalleryImages: updated });
  };

  const handleImageUpload = async (e: string, idx: number) => {
    updateImage(idx, "image", e);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryContent),
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const ImageCard = ({ image, idx }: { image: GalleryImage; idx: number }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative aspect-[4/3] overflow-hidden">
        {isEditing && isAdmin ? (
          <UploadImage
            value={image.image}
            onChange={(e) => handleImageUpload(e, idx)}
          />
        ) : (
          <img
            src={image.image}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {image.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        {isEditing && isAdmin ? (
          <div className="space-y-2">
            <Input
              value={image.title}
              onChange={(e) => updateImage(idx, "title", e.target.value)}
              placeholder="Title"
            />
            <Textarea
              value={image.description}
              onChange={(e) => updateImage(idx, "description", e.target.value)}
              placeholder="Description"
            />
            <Input
              value={image.location}
              onChange={(e) => updateImage(idx, "location", e.target.value)}
              placeholder="Location"
            />
            <Input
              value={image.date}
              onChange={(e) => updateImage(idx, "date", e.target.value)}
              placeholder="Date"
            />
            <Input
              value={image.category}
              onChange={(e) => updateImage(idx, "category", e.target.value)}
              placeholder="Category"
            />
            <Button
              onClick={() => {
                const updated = [...galleryContent.GalleryImages];
                updated.splice(idx, 1);
                setGalleryContent({
                  ...galleryContent,
                  GalleryImages: updated,
                });
              }}
              variant="destructive"
              size="sm"
            >
              <Trash className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
            <p className="text-muted-foreground text-sm mb-3">
              {image.description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{image.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{image.date}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Header />

      {/* Admin controls */}
      {isAdmin && (
        <div className="fixed top-18 right-4 z-50 flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Gallery</Button>
          ) : (
            <>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </>
          )}
        </div>
      )}

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 text-center">
        {isEditing && isAdmin ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            <Input
              value={galleryContent.GalleryHeroSection.GalleryHeroHeading}
              onChange={(e) => updateHero("GalleryHeroHeading", e.target.value)}
            />
            <Textarea
              value={galleryContent.GalleryHeroSection.GalleryHeroDescription}
              onChange={(e) =>
                updateHero("GalleryHeroDescription", e.target.value)
              }
              rows={3}
            />
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4">
              {galleryContent.GalleryHeroSection.GalleryHeroHeading}
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {galleryContent.GalleryHeroSection.GalleryHeroDescription}
            </p>
          </>
        )}
      </section>

      {/* Tabs + Gallery */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <Tabs defaultValue="All" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              {galleryContent.GalleryTabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {galleryContent.GalleryTabs.map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {galleryContent.GalleryImages.filter(
                  (img) => tab === "All" || img.category === tab
                ).map((img, idx) => (
                  <ImageCard key={img.id} image={img} idx={idx} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {isEditing && isAdmin && (
          <div className="mt-8 text-center">
            <Button
              onClick={() =>
                setGalleryContent((prev) => ({
                  ...prev,
                  GalleryImages: [
                    ...prev.GalleryImages,
                    {
                      id: Date.now().toString(),
                      title: "",
                      category: "Education",
                      location: "",
                      date: "",
                      image: "/placeholder.svg",
                      description: "",
                    },
                  ],
                }))
              }
            >
              <Plus className="w-4 h-4 mr-2" /> Add New Image
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
