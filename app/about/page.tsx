"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, Plus, Trash, Target, Eye } from "lucide-react";
import UploadImage from "@/components/UploadImage";
import IconsMap from "@/components/icons/IconsMap";
import WorkCardIconSelect from "@/components/icon-select";
import { useSession } from "@/components/context/SessionContext";

// Types
interface AboutContent {
  _id?: string;
  aboutSection: { aboutHighlightText: string; aboutDescription: string };
  mainSection: { heading: string; description: string; _id?: string }[];
  storySection: {
    storyHeading: string;
    storyDescription: string;
    storyImage: string;
  };
  valuesSection: {
    valuesHeading: string;
    valuesDescription: string;
    valuesList: {
      valueHeading: string;
      valueDescription: string;
      _id?: string;
      icon: string;
    }[];
  };
}

export default function AboutPageEditor() {
  const { user } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => setIsAdmin(user?.role === "admin"), [user]);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setContent(data.aboutData));
  }, []);

  const handleSave = async () => {
    if (!isAdmin || !content) return;
    setSaving(true);
    try {
      await fetch("/api/about", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!isAdmin) return;
    setIsEditing(false);
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setContent(data.aboutData));
  };

  if (!content) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Admin Controls */}
      {isAdmin && (
        <div className="fixed top-20 right-4 z-50 flex flex-col md:flex-row gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-primary">
              Edit Page
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 flex items-center justify-center"
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex items-center"
              >
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </>
          )}
        </div>
      )}

      {/* About Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 px-4 md:py-16 text-center">
        {isEditing ? (
          <div className="max-w-xl mx-auto space-y-4">
            <Input
              value={content.aboutSection.aboutHighlightText}
              onChange={(e) =>
                setContent({
                  ...content,
                  aboutSection: {
                    ...content.aboutSection,
                    aboutHighlightText: e.target.value,
                  },
                })
              }
            />
            <Textarea
              value={content.aboutSection.aboutDescription}
              onChange={(e) =>
                setContent({
                  ...content,
                  aboutSection: {
                    ...content.aboutSection,
                    aboutDescription: e.target.value,
                  },
                })
              }
              rows={4}
            />
          </div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {content.aboutSection.aboutHighlightText}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              {content.aboutSection.aboutDescription}
            </p>
          </>
        )}
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {content.mainSection.map((item, idx) => (
            <Card
              key={item._id ?? idx}
              className="border-l-4 border-l-primary hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 sm:p-8">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={item.heading}
                      onChange={(e) => {
                        const newMain = [...content.mainSection];
                        newMain[idx].heading = e.target.value;
                        setContent({ ...content, mainSection: newMain });
                      }}
                    />
                    <Textarea
                      value={item.description}
                      onChange={(e) => {
                        const newMain = [...content.mainSection];
                        newMain[idx].description = e.target.value;
                        setContent({ ...content, mainSection: newMain });
                      }}
                      rows={3}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center mb-3">
                      {idx === 0 ? (
                        <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
                      ) : (
                        <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
                      )}
                      <h2 className="text-xl sm:text-2xl font-bold">
                        {item.heading}
                      </h2>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {item.description}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16 px-4 bg-muted/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-center">
          <div>
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={content.storySection.storyHeading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      storySection: {
                        ...content.storySection,
                        storyHeading: e.target.value,
                      },
                    })
                  }
                />
                <Textarea
                  value={content.storySection.storyDescription}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      storySection: {
                        ...content.storySection,
                        storyDescription: e.target.value,
                      },
                    })
                  }
                  rows={6}
                />
                <UploadImage
                  value={content.storySection.storyImage}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      storySection: { ...content.storySection, storyImage: e },
                    })
                  }
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  {content.storySection.storyHeading}
                </h2>
                <p className="text-muted-foreground whitespace-pre-line text-sm sm:text-base">
                  {content.storySection.storyDescription}
                </p>
              </>
            )}
          </div>
          <div>
            <img
              src={content.storySection.storyImage}
              alt="Story"
              className="rounded-lg shadow-lg w-full max-h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="text-center mb-8 md:mb-12">
          {isEditing ? (
            <div className="space-y-3 max-w-xl mx-auto">
              <Input
                value={content.valuesSection.valuesHeading}
                onChange={(e) =>
                  setContent({
                    ...content,
                    valuesSection: {
                      ...content.valuesSection,
                      valuesHeading: e.target.value,
                    },
                  })
                }
              />
              <Textarea
                value={content.valuesSection.valuesDescription}
                onChange={(e) =>
                  setContent({
                    ...content,
                    valuesSection: {
                      ...content.valuesSection,
                      valuesDescription: e.target.value,
                    },
                  })
                }
              />
            </div>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {content.valuesSection.valuesHeading}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                {content.valuesSection.valuesDescription}
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {content.valuesSection.valuesList.map((val, idx) => (
            <div key={val._id ?? idx} className="text-center">
              {isEditing ? (
                <div className="space-y-2 bg-white p-4 rounded-lg shadow-md">
                  <WorkCardIconSelect
                    value={val.icon}
                    onChange={(newIcon) => {
                      const newVals = [...content.valuesSection.valuesList];
                      newVals[idx].icon = newIcon;
                      setContent({
                        ...content,
                        valuesSection: {
                          ...content.valuesSection,
                          valuesList: newVals,
                        },
                      });
                    }}
                  />
                  <Input
                    value={val.valueHeading}
                    onChange={(e) => {
                      const newVals = [...content.valuesSection.valuesList];
                      newVals[idx].valueHeading = e.target.value;
                      setContent({
                        ...content,
                        valuesSection: {
                          ...content.valuesSection,
                          valuesList: newVals,
                        },
                      });
                    }}
                  />
                  <Textarea
                    value={val.valueDescription}
                    onChange={(e) => {
                      const newVals = [...content.valuesSection.valuesList];
                      newVals[idx].valueDescription = e.target.value;
                      setContent({
                        ...content,
                        valuesSection: {
                          ...content.valuesSection,
                          valuesList: newVals,
                        },
                      });
                    }}
                    rows={3}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => {
                      const newVals = content.valuesSection.valuesList.filter(
                        (_, i) => i !== idx
                      );
                      setContent({
                        ...content,
                        valuesSection: {
                          ...content.valuesSection,
                          valuesList: newVals,
                        },
                      });
                    }}
                  >
                    <Trash className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                    <IconsMap icon={val.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">
                    {val.valueHeading}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
                    {val.valueDescription}
                  </p>
                </div>
              )}
            </div>
          ))}

          {isEditing && (
            <div className="flex justify-center col-span-full">
              <Button
                onClick={() =>
                  setContent({
                    ...content,
                    valuesSection: {
                      ...content.valuesSection,
                      valuesList: [
                        ...content.valuesSection.valuesList,
                        {
                          valueHeading: "",
                          valueDescription: "",
                          icon: "Chef",
                        },
                      ],
                    },
                  })
                }
                className="flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Value
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
