"use client"

import { ReactNode } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Permission, UserRole } from "@/types/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, AlertTriangle, User } from "lucide-react"

interface ProtectedComponentProps {
  children: ReactNode
  fallback?: ReactNode
  showFallback?: boolean
}

interface PermissionGuardProps extends ProtectedComponentProps {
  permission: Permission
  resourceOwnerId?: string
}

interface RoleGuardProps extends ProtectedComponentProps {
  role: UserRole
  exact?: boolean
}

interface MultiPermissionGuardProps extends ProtectedComponentProps {
  permissions: Permission[]
  requireAll?: boolean
}

// Component that requires a specific permission
export function PermissionGuard({ 
  children, 
  permission, 
  resourceOwnerId, 
  fallback, 
  showFallback = true 
}: PermissionGuardProps) {
  const { canPerformAction } = useAuth()

  if (canPerformAction(permission, resourceOwnerId)) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  if (showFallback) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <Lock className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Access Denied:</strong> You don't have permission to access this feature.
        </AlertDescription>
      </Alert>
    )
  }

  return null
}

// Component that requires a specific role or higher
export function RoleGuard({ 
  children, 
  role, 
  exact = false, 
  fallback, 
  showFallback = true 
}: RoleGuardProps) {
  const { user, hasRole } = useAuth()

  const hasAccess = exact 
    ? user?.role === role 
    : hasRole(role)

  if (hasAccess) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  if (showFallback) {
    return (
      <Alert className="border-orange-200 bg-orange-50">
        <Shield className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Role Required:</strong> This feature requires {role} access or higher.
        </AlertDescription>
      </Alert>
    )
  }

  return null
}

// Component that requires multiple permissions
export function MultiPermissionGuard({ 
  children, 
  permissions, 
  requireAll = false, 
  fallback, 
  showFallback = true 
}: MultiPermissionGuardProps) {
  const { hasAnyPermission, hasAllPermissions } = useAuth()

  const hasAccess = requireAll 
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions)

  if (hasAccess) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  if (showFallback) {
    return (
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Multiple Permissions Required:</strong> You need {requireAll ? 'all' : 'one'} of the required permissions.
        </AlertDescription>
      </Alert>
    )
  }

  return null
}

// Component that shows content only to authenticated users
export function AuthenticatedOnly({ 
  children, 
  fallback, 
  showFallback = true 
}: ProtectedComponentProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  if (showFallback) {
    return (
      <Alert className="border-blue-200 bg-blue-50">
        <User className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Login Required:</strong> Please log in to access this feature.
        </AlertDescription>
      </Alert>
    )
  }

  return null
}

// Component that shows content only to guests (non-authenticated users)
export function GuestOnly({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  return isAuthenticated ? null : <>{children}</>
}

// Component that shows different content based on authentication status
export function AuthToggle({ 
  authenticatedContent, 
  guestContent 
}: { 
  authenticatedContent: ReactNode
  guestContent: ReactNode 
}) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
      </div>
    )
  }

  return <>{isAuthenticated ? authenticatedContent : guestContent}</>
}

// Component that shows different content based on role
export function RoleToggle({ 
  roleContent 
}: { 
  roleContent: Record<UserRole, ReactNode>
}) {
  const { user } = useAuth()

  if (!user) {
    return <>{roleContent[UserRole.GUEST] || null}</>
  }

  return <>{roleContent[user.role] || null}</>
}

// Higher-order component for protecting entire pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermission?: Permission,
  requiredRole?: UserRole
) {
  return function ProtectedComponent(props: P) {
    const { isAuthenticated, hasPermission, hasRole, isLoading } = useAuth()

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-6 text-center">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
              <p className="text-gray-600 mb-4">
                You need to be logged in to access this page.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-4">
                You don't have permission to access this page.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (requiredRole && !hasRole(requiredRole)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Insufficient Role</h2>
              <p className="text-gray-600 mb-4">
                This page requires {requiredRole} access or higher.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return <Component {...props} />
  }
}