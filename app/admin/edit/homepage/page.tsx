"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"

export default function EditHomepage() {
  const [heroTitle, setHeroTitle] = useState("Empowering Communities, Transforming Lives")
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Join Vanya Foundation in creating lasting change through education, healthcare, and community development initiatives across India.",
  )
  const [impactStats, setImpactStats] = useState({
    livesImpacted: "50,000+",
    projectsCompleted: "200+",
    volunteersActive: "1,000+",
    yearsOfService: "15+",
  })

  const handleSave = () => {
    // In a real app, this would save to your database
    alert("Homepage content updated successfully!")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => (window.location.href = "/admin/dashboard")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-primary">Edit Homepage</h1>
                <p className="text-sm text-muted-foreground">Manage homepage content and hero section</p>
              </div>
            </div>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Hero Title</label>
                <Input
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="Main headline for the homepage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                <Textarea
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="Supporting text for the hero section"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Impact Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Impact Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Lives Impacted</label>
                  <Input
                    value={impactStats.livesImpacted}
                    onChange={(e) => setImpactStats({ ...impactStats, livesImpacted: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Projects Completed</label>
                  <Input
                    value={impactStats.projectsCompleted}
                    onChange={(e) => setImpactStats({ ...impactStats, projectsCompleted: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Active Volunteers</label>
                  <Input
                    value={impactStats.volunteersActive}
                    onChange={(e) => setImpactStats({ ...impactStats, volunteersActive: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Years of Service</label>
                  <Input
                    value={impactStats.yearsOfService}
                    onChange={(e) => setImpactStats({ ...impactStats, yearsOfService: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
