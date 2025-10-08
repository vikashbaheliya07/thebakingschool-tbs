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
  FileText,
  Crown,
  GraduationCap,
  UserCheck,
  Eye,
  Upload,
  Edit,
  Trash2
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Permission, UserRole } from "@/types/auth"
import { PermissionGuard, RoleGuard } from "@/components/RoleBasedAccess"
import { getGalleryStats } from "@/utils/galleryStorage"

export function RoleBasedDashboard() {
  const { user, hasPermission, getRoleDisplayName, getRoleColor } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  const stats = getGalleryStats()
  const roleColor = getRoleColor()

  const getRoleIcon = () => {
    const icons = {
      [UserRole.GUEST]: Users,
      [UserRole.ADMIN]: Shield
    }
    return icons[user.role] || Users
  }

  const RoleIcon = getRoleIcon()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          Dashboard
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RoleIcon className={`w-5 h-5 text-${roleColor}-600`} />
            {getRoleDisplayName()} Dashboard
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-${roleColor}-100 rounded-full`}>
                  <RoleIcon className={`w-6 h-6 text-${roleColor}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {user.profile?.firstName} {user.profile?.lastName}
                  </h3>
                  <p className="text-gray-600">@{user.username} • {user.email}</p>
                  <Badge className={`mt-1 bg-${roleColor}-100 text-${roleColor}-800`}>
                    {getRoleDisplayName()}
                  </Badge>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>Permissions: {user.permissions.length}</div>
                  <div>Last Login: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Access Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Gallery Access Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-800">Everyone</div>
                    <div className="text-sm text-blue-700">View and browse all gallery images</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-red-800">Administrator</div>
                    <div className="text-sm text-red-700">Full access to upload, edit, and manage all content</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
              <Card>
                <CardContent className="p-4 text-center">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{stats.totalImages}</div>
                  <div className="text-sm text-gray-600">Gallery Images</div>
                </CardContent>
              </Card>
            </PermissionGuard>
            
            <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
              <Card>
                <CardContent className="p-4 text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">{stats.totalViews}</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </CardContent>
              </Card>
            </PermissionGuard>
            
            <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">{stats.totalLikes}</div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                </CardContent>
              </Card>
            </PermissionGuard>
            
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{stats.totalCategories}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </CardContent>
            </Card>
          </div>

          {/* Permissions Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Your Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {user.permissions.map((permission) => (
                  <Badge key={permission} variant="secondary" className="text-xs">
                    {permission.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Available Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
                  <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                    <Upload className="w-5 h-5 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium">Upload Images</div>
                      <div className="text-sm text-gray-600">Add new images to gallery</div>
                    </div>
                  </Button>
                </PermissionGuard>
                
                <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
                  <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                    <Edit className="w-5 h-5 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">Edit All Images</div>
                      <div className="text-sm text-gray-600">Modify any gallery image</div>
                    </div>
                  </Button>
                </PermissionGuard>
                
                <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
                  <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <div className="text-left">
                      <div className="font-medium">Delete Images</div>
                      <div className="text-sm text-gray-600">Remove gallery images</div>
                    </div>
                  </Button>
                </PermissionGuard>
                
                <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
                  <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <div className="text-left">
                      <div className="font-medium">View Analytics</div>
                      <div className="text-sm text-gray-600">Access usage statistics</div>
                    </div>
                  </Button>
                </PermissionGuard>
                
                <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
                  <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <div className="text-left">
                      <div className="font-medium">Manage Users</div>
                      <div className="text-sm text-gray-600">View and edit user accounts</div>
                    </div>
                  </Button>
                </PermissionGuard>
                
                <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
                  <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium">System Settings</div>
                      <div className="text-sm text-gray-600">Configure system options</div>
                    </div>
                  </Button>
                </PermissionGuard>
              </div>
            </CardContent>
          </Card>

          {/* Role-Specific Features */}
          <RoleGuard role={UserRole.ADMIN} showFallback={false}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Instructor Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">Course Management</div>
                      <div className="text-sm text-gray-600">Create and manage courses</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium">Student Messages</div>
                      <div className="text-sm text-gray-600">Communicate with students</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </RoleGuard>

          <RoleGuard role={UserRole.ADMIN} showFallback={false}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Administrator Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                    <Users className="w-5 h-5 text-red-600" />
                    <div className="text-left">
                      <div className="font-medium">User Management</div>
                      <div className="text-sm text-gray-600">Manage all user accounts</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium">System Configuration</div>
                      <div className="text-sm text-gray-600">Configure system settings</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </RoleGuard>

          {/* Category Breakdown */}
          <PermissionGuard permission={Permission.ADMIN_ACCESS} showFallback={false}>
            <Card>
              <CardHeader>
                <CardTitle>Gallery Statistics</CardTitle>
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
          </PermissionGuard>
        </div>
      </DialogContent>
    </Dialog>
  )
}
