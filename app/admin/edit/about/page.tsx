"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"

export default function EditAbout() {
  const [missionStatement, setMissionStatement] = useState(
    "To empower underprivileged communities through sustainable development programs in education, healthcare, and social welfare, creating lasting positive change in society.",
  )
  const [visionStatement, setVisionStatement] = useState(
    "A world where every individual has equal opportunities to thrive and contribute to society, regardless of their background or circumstances.",
  )
  const [foundingStory, setFoundingStory] = useState(
    "Founded in 2009 with a vision to bridge the gap between privilege and need, Vanya Foundation began as a small initiative to provide educational support to children in rural communities. Over the years, we have expanded our reach and impact, touching thousands of lives across India.",
  )

  const handleSave = () => {
    alert("About page content updated successfully!")
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
                <h1 className="text-xl font-bold text-primary">Edit About Page</h1>
                <p className="text-sm text-muted-foreground">Manage about us content and mission</p>
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
          <Card>
            <CardHeader>
              <CardTitle>Mission Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={missionStatement}
                onChange={(e) => setMissionStatement(e.target.value)}
                rows={4}
                placeholder="Organization's mission statement"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vision Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={visionStatement}
                onChange={(e) => setVisionStatement(e.target.value)}
                rows={3}
                placeholder="Organization's vision statement"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Founding Story</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={foundingStory}
                onChange={(e) => setFoundingStory(e.target.value)}
                rows={5}
                placeholder="Story of how the organization was founded"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
