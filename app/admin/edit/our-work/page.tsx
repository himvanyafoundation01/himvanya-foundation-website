"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"

export default function EditOurWork() {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: "Education for All",
      description:
        "Providing quality education and learning resources to underprivileged children in rural and urban areas.",
      impact: "15,000+ children educated",
    },
    {
      id: 2,
      title: "Healthcare Access",
      description: "Mobile health clinics and medical camps bringing healthcare services to remote communities.",
      impact: "25,000+ patients treated",
    },
    {
      id: 3,
      title: "Community Development",
      description:
        "Empowering communities through skill development, women's empowerment, and sustainable livelihood programs.",
      impact: "100+ communities transformed",
    },
  ])

  const addProgram = () => {
    const newProgram = {
      id: Date.now(),
      title: "",
      description: "",
      impact: "",
    }
    setPrograms([...programs, newProgram])
  }

  const removeProgram = (id: number) => {
    setPrograms(programs.filter((p) => p.id !== id))
  }

  const updateProgram = (id: number, field: string, value: string) => {
    setPrograms(programs.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const handleSave = () => {
    alert("Our Work content updated successfully!")
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
                <h1 className="text-xl font-bold text-primary">Edit Our Work</h1>
                <p className="text-sm text-muted-foreground">Manage programs and initiatives</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={addProgram}>
                <Plus className="w-4 h-4 mr-2" />
                Add Program
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {programs.map((program) => (
            <Card key={program.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Program {program.id}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => removeProgram(program.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Program Title</label>
                  <Input
                    value={program.title}
                    onChange={(e) => updateProgram(program.id, "title", e.target.value)}
                    placeholder="Program name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={program.description}
                    onChange={(e) => updateProgram(program.id, "description", e.target.value)}
                    placeholder="Program description"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Impact Statement</label>
                  <Input
                    value={program.impact}
                    onChange={(e) => updateProgram(program.id, "impact", e.target.value)}
                    placeholder="e.g., 15,000+ children educated"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
