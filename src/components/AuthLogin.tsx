"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Lock,
  LogOut,
  User,
  Eye,
  EyeOff,
  Shield,
  Settings
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { UserRole } from "@/types/auth"

export function AuthLogin() {
  const { user, isAuthenticated, login, logout, isLoading, getRoleDisplayName, getRoleColor } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setError("")

    const result = await login(credentials)

    if (result.success) {
      setCredentials({ username: '', password: '' })
      setIsOpen(false)
      setError("")
    } else {
      setError(result.error || "Login failed. Please try again.")
    }

    setLoginLoading(false)
  }

  const handleLogout = async () => {
    await logout()
    setCredentials({ username: '', password: '' })
    setError("")
  }

  const getRoleIcon = (role: UserRole) => {
    const icons = {
      [UserRole.GUEST]: User,
      [UserRole.ADMIN]: Shield
    }
    return icons[role] || User
  }

  if (isAuthenticated && user) {
    const RoleIcon = getRoleIcon(user.role)
    const roleColor = getRoleColor()

    return (
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 px-3 py-1 bg-${roleColor}-100 text-${roleColor}-800 rounded-full text-sm`}>
          <RoleIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{user.profile?.firstName || user.username}</span>
          <span className="sm:hidden">{getRoleDisplayName()}</span>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Account</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RoleIcon className="w-5 h-5" />
                Account Information
              </DialogTitle>
            </DialogHeader>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <RoleIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    {user.profile?.firstName} {user.profile?.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm">@{user.username}</p>
                  <Badge className={`mt-2 bg-${roleColor}-100 text-${roleColor}-800`}>
                    {getRoleDisplayName()}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Login:</span>
                    <span>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Permissions:</span>
                    <span>{user.permissions.length}</span>
                  </div>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Lock className="w-4 h-4" />
          Sign In
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Sign In to Baking School Admin
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enter Your Credentials</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter your username"
                    disabled={loginLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your password"
                      className="pr-10"
                      disabled={loginLoading}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loginLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-600">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                    disabled={loginLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 gradient-yellow-blue text-white"
                    disabled={loginLoading || !credentials.username.trim() || !credentials.password.trim()}
                  >
                    {loginLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Signing In...
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
