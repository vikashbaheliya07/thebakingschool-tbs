"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { 
  User, 
  AuthSession, 
  AuthState, 
  LoginCredentials, 
  Permission,
  UserRole 
} from "@/types/auth"
import { authService, permissionService, roleService } from "@/utils/auth"

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
  hasPermission: (permission: Permission) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  hasAllPermissions: (permissions: Permission[]) => boolean
  hasRole: (role: UserRole) => boolean
  canPerformAction: (action: Permission, resourceOwnerId?: string) => boolean
  getRoleDisplayName: () => string
  getRoleColor: () => string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  })

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = authService.getCurrentSession()
        if (session) {
          setAuthState({
            user: session.user,
            session,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false
          }))
        }
      } catch (error) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to initialize authentication'
        }))
      }
    }

    initializeAuth()
  }, [])

  // Auto-refresh session before expiry
  useEffect(() => {
    if (!authState.session) return

    const timeUntilExpiry = new Date(authState.session.expiresAt).getTime() - Date.now()
    const refreshTime = Math.max(timeUntilExpiry - (5 * 60 * 1000), 60000) // 5 minutes before expiry, minimum 1 minute

    const refreshTimer = setTimeout(async () => {
      try {
        const newSession = await authService.refreshSession()
        if (newSession) {
          setAuthState(prev => ({
            ...prev,
            session: newSession,
            user: newSession.user
          }))
        } else {
          // Session couldn't be refreshed, logout
          await logout()
        }
      } catch (error) {
        console.error('Failed to refresh session:', error)
        await logout()
      }
    }, refreshTime)

    return () => clearTimeout(refreshTimer)
  }, [authState.session])

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const result = await authService.login(credentials)
      
      if (result.success && result.session) {
        setAuthState({
          user: result.session.user,
          session: result.session,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
        return { success: true }
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Login failed'
        }))
        return { success: false, error: result.error }
      }
    } catch (error) {
      const errorMessage = 'Login failed. Please try again.'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))
      return { success: false, error: errorMessage }
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await authService.logout()
      setAuthState({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
    } catch (error) {
      console.error('Logout error:', error)
      // Force logout even if there's an error
      setAuthState({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
    }
  }

  const refreshSession = async (): Promise<void> => {
    try {
      const newSession = await authService.refreshSession()
      if (newSession) {
        setAuthState(prev => ({
          ...prev,
          session: newSession,
          user: newSession.user
        }))
      }
    } catch (error) {
      console.error('Session refresh error:', error)
    }
  }

  // Permission checking methods
  const hasPermission = (permission: Permission): boolean => {
    return permissionService.hasPermission(authState.user, permission)
  }

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissionService.hasAnyPermission(authState.user, permissions)
  }

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissionService.hasAllPermissions(authState.user, permissions)
  }

  const hasRole = (role: UserRole): boolean => {
    return permissionService.hasRole(authState.user, role)
  }

  const canPerformAction = (action: Permission, resourceOwnerId?: string): boolean => {
    return permissionService.canPerformAction(authState.user, action, resourceOwnerId)
  }

  const getRoleDisplayName = (): string => {
    return authState.user ? roleService.getRoleDisplayName(authState.user.role) : 'Guest'
  }

  const getRoleColor = (): string => {
    return authState.user ? roleService.getRoleColor(authState.user.role) : 'gray'
  }

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshSession,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    canPerformAction,
    getRoleDisplayName,
    getRoleColor
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}