"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  Image as ImageIcon, 
  Users, 
  BarChart3, 
  Shield,
  Calendar,
  MessageSquare,
  FileText
} from "lucide-react"
import { useAdmin } from "@/contexts/AdminContext"
import { getGalleryStats } from "@/utils/galleryStorage"

export function AdminDashboard() {
  const { isAdmin } = useAdmin()
  const [isOpen, setIsOpen] = useState(false)

  if (!isAdmin) return null

  const stats = getGalleryStats()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          Dashboard
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-yellow-600" />
            Admin Dashboard
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{stats.totalImages}</div>
                <div className="text-sm text-gray-600">Total Images</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{stats.totalViews}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{stats.totalLikes}</div>
                <div className="text-sm text-gray-600">Total Likes</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{stats.totalCategories}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Gallery Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {stats.categoryCounts.map((category) => (
                  <div key={category.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{category.category}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                  <ImageIcon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Manage Gallery</div>
                    <div className="text-sm text-gray-600">Upload, edit, or delete images</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                  <Users className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">View Bookings</div>
                    <div className="text-sm text-gray-600">Check course registrations</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                  <MessageSquare className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Contact Messages</div>
                    <div className="text-sm text-gray-600">Review student inquiries</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                  <Calendar className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Course Schedule</div>
                    <div className="text-sm text-gray-600">Manage class schedules</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Info */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Status:</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Login:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Storage Used:</span>
                  <span>{Math.round(JSON.stringify(stats).length / 1024)} KB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}