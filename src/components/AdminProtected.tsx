"use client"

import { ReactNode } from "react"
import { useAdmin } from "@/contexts/AdminContext"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Shield } from "lucide-react"
import { AdminLogin } from "@/components/AdminLogin"

interface AdminProtectedProps {
  children: ReactNode
  fallback?: ReactNode
  showLoginPrompt?: boolean
}

export function AdminProtected({ 
  children, 
  fallback,
  showLoginPrompt = true 
}: AdminProtectedProps) {
  const { isAdmin } = useAdmin()

  if (isAdmin) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  if (showLoginPrompt) {
    return (
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <div className="p-3 bg-yellow-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Admin Access Required
          </h3>
          <p className="text-gray-600 mb-4 max-w-sm">
            This feature is restricted to administrators. Please log in to access gallery management.
          </p>
          <AdminLogin />
        </CardContent>
      </Card>
    )
  }

  return null
}

// Alternative component for inline admin-only content
export function AdminOnly({ children }: { children: ReactNode }) {
  const { isAdmin } = useAdmin()
  return isAdmin ? <>{children}</> : null
}

// Component to show different content for admin vs regular users
export function AdminToggle({ 
  adminContent, 
  userContent 
}: { 
  adminContent: ReactNode
  userContent: ReactNode 
}) {
  const { isAdmin } = useAdmin()
  return <>{isAdmin ? adminContent : userContent}</>
}