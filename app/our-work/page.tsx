"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Save,
  X,
  Plus,
  Trash,
  Upload,
  CheckCircle,
  Minus,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useWork } from "@/components/work/work.provider";
import UploadImage from "@/components/UploadImage";
import { useSession } from "@/components/context/SessionContext";

export default function OurWorkPageEditor() {
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useSession();

  useEffect(() => setIsAdmin(user?.role === "admin"), [user]);

  const {
    isEditing,
    setIsEditing,
    saving,
    setSaving,
    handleSave,
    handleCancel,
    handleImageUpload,
    content,
    setContent,
    updateHero,
    addWorkCard,
    updateWorkCard,
    removeWorkCard,
    addBullet,
    updateBullet,
    removeBullet,
    updateInitiative,
    addInitiative,
    removeInitiative,
    updateCTA,
  } = useWork();
  console.log(content);
  return (
    <div className="min-h-screen">
      <Header />

      {/* Admin Controls */}
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
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={content.workHeroSection?.workHeroHeading || ""}
                onChange={(e) => updateHero("workHeroHeading", e.target.value)}
                placeholder="Hero heading"
              />
              <Textarea
                value={content.workHeroSection?.workHeroDescription || ""}
                onChange={(e) =>
                  updateHero("workHeroDescription", e.target.value)
                }
                rows={3}
                placeholder="Hero description"
              />
              <UploadImage
                value={content.workHeroSection?.workHeroImage || ""}
                onChange={(e) => handleImageUpload(e, "workHeroImage")}
              />
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4">
                {content.workHeroSection?.workHeroHeading}
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {content.workHeroSection?.workHeroDescription}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Work Main Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {(content.workMainSection ?? []).map((card, idx) => (
            <Card key={idx} className="overflow-hidden">
              <div className="aspect-video">
                {isEditing ? (
                  <>
                    <div className="w-full flex justify-end">
                      <Button
                        variant={"destructive"}
                        className="relative top-0 right-5 flex items-center"
                        onClick={() => removeWorkCard(idx)}
                      >
                        <Trash2 className="w-4 h-4 " />
                      </Button>
                    </div>
                    <UploadImage
                      value={card.workMainImage}
                      onChange={(e) =>
                        handleImageUpload(e, "workMainImage", idx)
                      }
                    />
                    {/* <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, "workMainImage", idx)
                      }
                    /> */}
                    {card.workMainImage && (
                      <img
                        src={card.workMainImage}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={card.workMainImage}
                    alt={card.workMainHeading}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <CardContent className="p-6">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={card.workMainHeading}
                      onChange={(e) =>
                        updateWorkCard(idx, {
                          workMainHeading: e.target.value,
                        })
                      }
                      placeholder="Heading"
                    />
                    <Textarea
                      value={card.workMainDescription}
                      onChange={(e) =>
                        updateWorkCard(idx, {
                          workMainDescription: e.target.value,
                        })
                      }
                      rows={3}
                      placeholder="Description"
                    />
                    {/* Bullet Points */}
                    <div className="space-y-2">
                      {card.bulletPoints?.map((point, bi) => (
                        <div key={bi} className="flex gap-2 items-center">
                          <Input
                            value={point}
                            onChange={(e) =>
                              updateBullet(idx, bi, e.target.value)
                            }
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeBullet(idx, bi)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() => addBullet(idx)}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Bullet
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-2">
                      {card.workMainHeading}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {card.workMainDescription}
                    </p>
                    <ul className="space-y-1 text-sm">
                      {card.bulletPoints?.map((point, bi) => (
                        <li key={bi} className="flex items-center">
                          <CheckCircle2 className="w-6 h-6 mr-2 text-white fill-green-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="mt-4">
                      <Link href={card.link || "/donate"}>
                        {card.buttonText}
                      </Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}

          {isEditing && (
            <Button
              onClick={addWorkCard}
              className="md:col-span-2 max-w-md mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Work Card
            </Button>
          )}
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {content.initiativeSection?.heading}
            </h2>
            <p className="text-muted-foreground">
              {content.initiativeSection?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.initiativeSection?.initiatives ?? []).map((init, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={init.heading}
                        onChange={(e) =>
                          updateInitiative(idx, { heading: e.target.value })
                        }
                        placeholder="Initiative title"
                      />
                      <Textarea
                        value={init.description}
                        onChange={(e) =>
                          updateInitiative(idx, { description: e.target.value })
                        }
                        rows={2}
                        placeholder="Initiative description"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInitiative(idx)}
                      >
                        <Trash className="w-4 h-4 mr-2" /> Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-lg mb-2">
                        {init.heading}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {init.description}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {isEditing && (
            <div className="mt-6 text-center">
              <Button onClick={addInitiative}>
                <Plus className="w-4 h-4 mr-2" /> Add Initiative
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 text-gray-900 text-center shadow-inner relative">
        {isEditing ? (
          <div className="space-y-6 mb-10 max-w-2xl mx-auto">
            <Input
              value={content.ctaSection?.ctaTitle || ""}
              onChange={(e) => updateCTA("ctaTitle", e.target.value)}
              className="text-3xl font-extrabold bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-blue-300 transition-all"
              placeholder="CTA title"
            />
            <Textarea
              value={content.ctaSection?.ctaDescription || ""}
              onChange={(e) => updateCTA("ctaDescription", e.target.value)}
              className="bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-blue-300 transition-all"
              rows={4}
              placeholder="CTA description"
            />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-extrabold mb-4">
              {content.ctaSection?.ctaTitle}
            </h2>
            <p className="text-lg text-gray-700 opacity-90">
              {content.ctaSection?.ctaDescription}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-gray-900 border border-gray-300 px-10 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
          >
            <Link href="/donate">Make a Donation</Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="bg-white text-gray-900 border border-gray-300 px-10 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
          >
            <Link href="/volunteer">Volunteer With Us</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
