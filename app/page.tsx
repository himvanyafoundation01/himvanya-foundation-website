"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, Plus, Trash, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useHome } from "@/components/home/home.provider";
import IconsMap from "@/components/icons/IconsMap";
import WorkCardIconSelect from "@/components/icon-select";
import Image from "next/image";
import UploadImage from "@/components/UploadImage";
import { useSession } from "@/components/context/SessionContext";

export default function HomePageEditor() {
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useSession();
  useEffect(() => {
    setIsAdmin(user?.role == "admin");
  }, [user?.id]);
  const {
    isEditing,
    setIsEditing,
    addBullet,
    updateBullet,
    removeBullet,
    addWorkCard,
    updateWorkCard,
    removeWorkCard,
    updateHero,
    updateCTA,
    saving,
    content,
    setContent,
    handleImageUpload,
    handleCancel,
    handleSave,
  } = useHome();

  return (
    <div className="min-h-screen">
      <Header />

      {isAdmin && (
        <div className="fixed top-18 right-4 z-50 flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-primary">
              Edit Page
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />{" "}
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </>
          )}
        </div>
      )}
      <section className="w-screen relative flex justify-center items-center bg-gray-100">
        {isEditing ? (
          <UploadImage
            value={content.topImage}
            onChange={(value) => setContent({ ...content, topImage: value })}

          />
        ) : (
          <Image
            src={content.topImage}
            alt="topimage"
            className="object-contain w-full h-auto"
            width={1920} // your image width
            height={1080} // your image height
          />
        )}
      </section>


      {/* Hero */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {isEditing ? (
                <div className="space-y-4 mb-6">
                  <Input
                    value={content.heroSection?.heroTitle || ""}
                    onChange={(e) => updateHero("heroTitle", e.target.value)}
                    placeholder="Hero title"
                  />
                  <Input
                    value={content.heroSection?.heroTitleHighlight || ""}
                    onChange={(e) =>
                      updateHero("heroTitleHighlight", e.target.value)
                    }
                    placeholder="Hero title highlight"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    placeholder="Hero image"
                  />
                </div>
              ) : (
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                  {content.heroSection?.heroTitle}
                  <span className="text-primary">
                    {" "}
                    {content.heroSection?.heroTitleHighlight}
                  </span>
                </h1>
              )}

              {isEditing ? (
                <Textarea
                  value={content.heroSection?.heroDescription || ""}
                  onChange={(e) =>
                    updateHero("heroDescription", e.target.value)
                  }
                  rows={3}
                  placeholder="Hero description"
                  className="mb-4"
                />
              ) : (
                <p className="text-lg text-muted-foreground mb-8 text-pretty">
                  {content.heroSection?.heroDescription}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Link href="/donate">Donate Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/our-work">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              {isEditing ? (
                content.heroSection?.heroImage ? (
                  <img
                    src={content.heroSection.heroImage}
                    alt="hero"
                    className="rounded-lg shadow-lg w-full"
                  />
                ) : (
                  <div className="rounded-lg shadow-lg w-full h-64 bg-muted flex items-center justify-center">
                    No image set
                  </div>
                )
              ) : (
                <img
                  src={
                    content.heroSection?.heroImage || "/placeholder-y30g8.png"
                  }
                  alt="Community"
                  className="rounded-lg shadow-lg w-full"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Work Editor */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  value={content.workSection?.ourWorkTitle || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      workSection: {
                        ...(content.workSection ?? {}),
                        ourWorkTitle: e.target.value,
                      },
                    })
                  }
                  placeholder="Our work title"
                />
                <Textarea
                  value={content.workSection?.ourWorkDescription || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      workSection: {
                        ...(content.workSection ?? {}),
                        ourWorkDescription: e.target.value,
                      },
                    })
                  }
                  rows={2}
                  placeholder="Our work description"
                />
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {content.workSection?.ourWorkTitle}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {content.workSection?.ourWorkDescription}
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.workSection?.workCard ?? []).map((card, idx) => (
              <Card
                key={card._id ?? idx}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <Input
                          value={card.WorkcardTitle}
                          onChange={(e) =>
                            updateWorkCard(idx, {
                              WorkcardTitle: e.target.value,
                            })
                          }
                        />
                        <button
                          onClick={() => removeWorkCard(idx)}
                          className="ml-2 text-sm text-red-600"
                          title="Remove card"
                        >
                          <Trash />
                        </button>
                      </div>

                      <WorkCardIconSelect
                        value={card.icon}
                        onChange={(value) =>
                          updateWorkCard(idx, { icon: value })
                        }
                      />

                      <Textarea
                        value={card.WorkcardDescription}
                        onChange={(e) =>
                          updateWorkCard(idx, {
                            WorkcardDescription: e.target.value,
                          })
                        }
                        rows={3}
                      />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold">
                            Bullet points
                          </h4>
                          <button
                            onClick={() => addBullet(idx)}
                            title="Add bullet"
                          >
                            <Plus />
                          </button>
                        </div>
                        {(card.workCardbulletPoints?.points ?? []).map(
                          (p, bi) => (
                            <div key={bi} className="flex items-center gap-2">
                              <Input
                                value={p}
                                onChange={(e) =>
                                  updateBullet(idx, bi, e.target.value)
                                }
                              />
                              <button
                                onClick={() => removeBullet(idx, bi)}
                                className="text-red-600"
                              >
                                <Trash />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <IconsMap
                          icon={card.icon}
                          className="w-6 h-6 text-primary"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {card.WorkcardTitle}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {card.WorkcardDescription}
                      </p>
                      <ul className="space-y-2 text-sm">
                        {(card.workCardbulletPoints?.points ?? []).map(
                          (point, i) => (
                            <li key={i} className="flex items-center">
                              <CheckCircle2 className="w-6 h-6 text-white mr-2 fill-green-500" />
                              {point}
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}

            {isEditing && (
              <div className="md:col-span-3">
                <Button onClick={addWorkCard} className="w-full">
                  <Plus className="w-4 h-4 mr-2" /> Add Work Card
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative py-16 mb-10 text-black overflow-hidden">
        {/* Frozen effect background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md pointer-events-none -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {isEditing ? (
            <div className="space-y-4 mb-8">
              <Input
                value={content.ctaSection?.ctaTitle || ""}
                onChange={(e) => updateCTA("ctaTitle", e.target.value)}
                className="text-center text-2xl font-bold bg-white/10 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-md shadow-sm backdrop-blur-sm transition duration-300 focus:bg-white/20 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                placeholder="CTA title"
              />
              <Textarea
                value={content.ctaSection?.ctaDescription || ""}
                onChange={(e) => updateCTA("ctaDescription", e.target.value)}
                className="text-center bg-white/10 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-md shadow-sm backdrop-blur-sm transition duration-300 focus:bg-white/20 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                rows={3}
                placeholder="CTA description"
              />
            </div>
          ) : (
            <>
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-wide drop-shadow-md">
                {content.ctaSection?.ctaTitle}
              </h2>
              <p className="text-lg sm:text-xl opacity-90 mb-8 text-gray-800 drop-shadow-sm">
                {content.ctaSection?.ctaDescription}
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white/20 border border-gray-300 text-gray-900 backdrop-blur-sm hover:bg-white/40 hover:text-primary transition-all duration-300 shadow-lg"
            >
              <Link href="/donate">Make a Donation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-400 text-gray-900 bg-white/10 backdrop-blur-sm hover:bg-white/30 hover:text-primary transition-all duration-300 shadow-md"
            >
              <Link href="/volunteer">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
