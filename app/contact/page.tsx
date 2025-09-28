"use client";

import React, { useEffect, useState } from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Save, X, Edit3, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSession } from "@/components/context/SessionContext";

interface ContactPageContent {
  _id?: string;
  heroSection: { heading: string; description: string };
  contactInfo: {
    address: string[];
    phones: string[];
    emails: string[];
    officeHours: string[];
    note: string;
  };
}

export default function ContactPageEditor() {
  const { user } = useSession();
  const isAdmin = user?.role === "admin";

  const [content, setContent] = useState<ContactPageContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Contact form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch content
  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => setContent(data.contactPage))
      .catch(() => setContent(null));
  }, []);

  // Save content
  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => setContent(data.contactPage));
  };

  // Contact form handlers
  const handleFormInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setStatusMessage(result.message || "Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setStatusMessage(result.error || "Failed to submit form");
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!content) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen">
      <Header />

      {/* ✅ Admin Controls */}
      {isAdmin && (
        <div className="fixed top-18 right-4 z-50 flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="w-4 h-4 mr-2" /> Edit
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600"
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

      {/* Hero Section */}
      <section className="py-16 text-center bg-gradient-to-r from-primary/10 to-primary/5">
        {isEditing ? (
          <div className="max-w-2xl mx-auto space-y-4">
            <Input
              value={content.heroSection.heading}
              onChange={(e) =>
                setContent({
                  ...content,
                  heroSection: {
                    ...content.heroSection,
                    heading: e.target.value,
                  },
                })
              }
            />
            <Textarea
              value={content.heroSection.description}
              onChange={(e) =>
                setContent({
                  ...content,
                  heroSection: {
                    ...content.heroSection,
                    description: e.target.value,
                  },
                })
              }
            />
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4">
              {content.heroSection.heading}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {content.heroSection.description}
            </p>
          </>
        )}
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side - Contact info */}
        <div className="space-y-6">
          {(
            Object.keys(
              content.contactInfo
            ) as (keyof ContactPageContent["contactInfo"])[]
          )
            .filter((key) => key !== "note")
            .map((key) => (
              <Card key={key}>
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-semibold capitalize">{key}</h3>
                  {isEditing ? (
                    content.contactInfo[key].map((val, idx) => (
                      <Input
                        key={idx}
                        value={val}
                        onChange={(e) => {
                          const newVals = [...content.contactInfo[key]];
                          newVals[idx] = e.target.value;
                          setContent({
                            ...content,
                            contactInfo: {
                              ...content.contactInfo,
                              [key]: newVals,
                            },
                          });
                        }}
                      />
                    ))
                  ) : (
                    <p className="text-muted-foreground whitespace-pre-line">
                      {content.contactInfo[key].join("\n")}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}

          <div className="mt-6 bg-muted/40 p-4 rounded-lg">
            {isEditing ? (
              <Textarea
                value={content.contactInfo.note}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contactInfo: {
                      ...content.contactInfo,
                      note: e.target.value,
                    },
                  })
                }
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {content.contactInfo.note}
              </p>
            )}
          </div>
        </div>

        {/* Right side - Contact form */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              {submitStatus !== "idle" && (
                <Alert
                  className={`
      mb-6 px-4 py-3 rounded-lg shadow-sm border transition-colors duration-300
      ${
        submitStatus === "success"
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-50"
      }
    `}
                >
                  <div className="flex items-center gap-2">
                    {submitStatus === "success" ? (
                      <CheckCircle className="w-5 h-5 text-green-600 animate-pulse" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 animate-shake" />
                    )}
                    <AlertDescription
                      className={`
          font-medium text-sm
          ${submitStatus === "success" ? "text-green-800" : "text-red-800"}
        `}
                    >
                      {statusMessage}
                    </AlertDescription>
                  </div>
                </Alert>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormInputChange}
                    placeholder="First Name *"
                    required
                  />
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormInputChange}
                    placeholder="Last Name *"
                    required
                  />
                </div>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormInputChange}
                  placeholder="Email *"
                  required
                />
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleFormInputChange}
                  placeholder="Phone"
                />
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormInputChange}
                  placeholder="Subject *"
                  required
                />
                <Textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleFormInputChange}
                  placeholder="Your message *"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
