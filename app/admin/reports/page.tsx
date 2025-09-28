"use client"

import { AdminAuthGuard } from "@/components/admin-auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Filter, TrendingUp, Users, Heart, DollarSign } from "lucide-react"

export default function AdminReportsPage() {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div>
                <h1 className="text-xl font-bold text-primary">Reports & Analytics</h1>
                <p className="text-sm text-muted-foreground">Detailed insights and reports</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-primary">₹2,45,000</p>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Donors</p>
                    <p className="text-2xl font-bold text-blue-600">156</p>
                    <p className="text-xs text-green-600">+8% from last month</p>
                  </div>
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Volunteers</p>
                    <p className="text-2xl font-bold text-green-600">42</p>
                    <p className="text-xs text-green-600">+15% from last month</p>
                  </div>
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Programs</p>
                    <p className="text-2xl font-bold text-orange-600">8</p>
                    <p className="text-xs text-muted-foreground">Active programs</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Monthly Donation Report</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">January 2024</p>
                      <p className="text-sm text-muted-foreground">45 donations</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹26,000</p>
                      <Badge variant="default">Completed</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">December 2023</p>
                      <p className="text-sm text-muted-foreground">38 donations</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹18,500</p>
                      <Badge variant="default">Completed</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">November 2023</p>
                      <p className="text-sm text-muted-foreground">42 donations</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹22,300</p>
                      <Badge variant="default">Completed</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Program Impact Report</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Education Program</p>
                      <p className="text-sm text-muted-foreground">200 schools supported</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">5,000 children</p>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Healthcare Program</p>
                      <p className="text-sm text-muted-foreground">100 health camps</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">25,000 patients</p>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Community Development</p>
                      <p className="text-sm text-muted-foreground">150 self-help groups</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">2,000 women</p>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  )
}
