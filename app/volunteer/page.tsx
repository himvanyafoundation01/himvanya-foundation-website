"use client";
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Users,
  Heart,
  Clock,
  MapPin,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";

export default function VolunteerPage() {
  const [formData, setFormData] = useState<any>({
    areasOfInterest: [],
    termsAccepted: false,
    backgroundCheckConsent: false,
    updatesSubscribed: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleCheckbox = (id: string, checked: boolean) => {
    if (
      [
        "education",
        "healthcare",
        "community",
        "events",
        "fundraising",
        "admin",
      ].includes(id)
    ) {
      setFormData((prev: any) => {
        const updated = checked
          ? [...prev.areasOfInterest, id]
          : prev.areasOfInterest.filter((i: string) => i !== id);
        return { ...prev, areasOfInterest: updated };
      });
    } else {
      setFormData((prev: any) => ({ ...prev, [id]: checked }));
    }
  };

  const handleRadio = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error("You must accept the terms and conditions");
      return;
    }
    formData.id = uuidv4();
    setLoading(true);
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
      toast.success("Volunteer application submitted successfully 🎉");
      setFormData({
        areasOfInterest: [],
        termsAccepted: false,
        backgroundCheckConsent: false,
        updatesSubscribed: true,
      });
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Volunteer With Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your time and skills can create lasting change. Join our community
            of dedicated volunteers today.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Volunteer Opportunities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from various ways to contribute your time and expertise
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Education Volunteer</h3>
                <p className="text-muted-foreground">
                  Teach children, conduct workshops, or help with educational
                  activities in our partner schools.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Teaching assistance</li>
                  <li>• Computer literacy training</li>
                  <li>• Creative workshops</li>
                  <li>• Mentoring programs</li>
                </ul>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>4-6 hours/week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Healthcare Volunteer</h3>
                <p className="text-muted-foreground">
                  Support our health camps, awareness programs, and community
                  health initiatives.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Health camp assistance</li>
                  <li>• Health awareness campaigns</li>
                  <li>• First aid training</li>
                  <li>• Medical record keeping</li>
                </ul>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>6-8 hours/month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Community Outreach</h3>
                <p className="text-muted-foreground">
                  Help organize events, conduct surveys, and engage with
                  communities directly.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Event organization</li>
                  <li>• Community surveys</li>
                  <li>• Awareness campaigns</li>
                  <li>• Fundraising events</li>
                </ul>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Flexible timing</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="shadow-inner hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Volunteer Registration
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Fill out this form to join our volunteer community
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Areas of Interest */}
                <div className="space-y-3">
                  <Label className="font-medium">Areas of Interest</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "education",
                      "healthcare",
                      "community",
                      "events",
                      "fundraising",
                      "admin",
                    ].map((i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Checkbox
                          id={i}
                          checked={formData.areasOfInterest.includes(i)}
                          onCheckedChange={(c) => handleCheckbox(i, Boolean(c))}
                        />
                        <Label htmlFor={i} className="capitalize">
                          {i}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <Label className="font-medium">Availability</Label>
                  <RadioGroup
                    value={formData.availability || ""}
                    onValueChange={(v) => handleRadio("availability", v)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekdays" id="weekdays" />
                      <Label htmlFor="weekdays">Weekdays</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekends" id="weekends" />
                      <Label htmlFor="weekends">Weekends</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flexible" id="flexible" />
                      <Label htmlFor="flexible">Flexible</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Time Commitment */}
                <div className="space-y-3">
                  <Label className="font-medium">Time Commitment</Label>
                  <RadioGroup
                    value={formData.timeCommitment || ""}
                    onValueChange={(v) => handleRadio("timeCommitment", v)}
                    className="space-y-2"
                  >
                    {["1-2", "2-4", "4-8", "8+"].map((t) => (
                      <div key={t} className="flex items-center space-x-2">
                        <RadioGroupItem value={t} id={t} />
                        <Label htmlFor={t}>{t} hrs/week</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Skills / Experience / Motivation */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Textarea
                      id="skills"
                      value={formData.skills || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="motivation">Motivation</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="emergencyName">
                      Emergency Contact Name
                    </Label>
                    <Input
                      id="emergencyName"
                      value={formData.emergencyContact?.name || ""}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          emergencyContact: {
                            ...prev.emergencyContact,
                            name: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                    <Input
                      id="emergencyPhone"
                      value={formData.emergencyContact?.phone || ""}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          emergencyContact: {
                            ...prev.emergencyContact,
                            phone: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                      id="relationship"
                      value={formData.emergencyContact?.relationship || ""}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          emergencyContact: {
                            ...prev.emergencyContact,
                            relationship: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={(c) =>
                        handleCheckbox("termsAccepted", Boolean(c))
                      }
                    />
                    <Label htmlFor="termsAccepted" className="text-sm">
                      I agree to the terms and conditions
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="backgroundCheckConsent"
                      checked={formData.backgroundCheckConsent}
                      onCheckedChange={(c) =>
                        handleCheckbox("backgroundCheckConsent", Boolean(c))
                      }
                    />
                    <Label htmlFor="backgroundCheckConsent" className="text-sm">
                      I consent to background verification
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="updatesSubscribed"
                      checked={formData.updatesSubscribed}
                      onCheckedChange={(c) =>
                        handleCheckbox("updatesSubscribed", Boolean(c))
                      }
                    />
                    <Label htmlFor="updatesSubscribed" className="text-sm">
                      Subscribe to updates
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-lg"
                >
                  {loading ? "Submitting..." : "Submit Volunteer Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Volunteer With Us?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join a community of passionate individuals making a real
              difference
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Make a Difference</h3>
              <p className="text-muted-foreground text-sm">
                Create direct, measurable impact in the lives of those who need
                it most.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Build Community</h3>
              <p className="text-muted-foreground text-sm">
                Connect with like-minded individuals and build lasting
                friendships.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Learn & Grow</h3>
              <p className="text-muted-foreground text-sm">
                Develop new skills and gain valuable experience in social work.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Local Impact</h3>
              <p className="text-muted-foreground text-sm">
                Work directly with communities and see the results of your
                efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
