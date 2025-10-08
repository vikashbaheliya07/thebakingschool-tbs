// Authentication utilities and mock data

import {
  User,
  UserRole,
  Permission,
  AuthSession,
  LoginCredentials,
  ROLE_PERMISSIONS,
  ROLE_HIERARCHY
} from '@/types/auth'

// Mock user database (in production, this would be a real database)
const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin': {
    id: '1',
    username: 'admin',
    email: 'ceo@thebakingschool.in',
    password: 'Gaurav@8153',
    role: UserRole.ADMIN,
    permissions: ROLE_PERMISSIONS[UserRole.ADMIN],
    createdAt: new Date('2025-10-08'),
    lastLogin: new Date(),
    isActive: true,
    profile: {
      firstName: 'Website',
      lastName: 'Administrator',
      bio: 'Full Website Access Administrator'
    }
  }
}

// Session storage key
const SESSION_STORAGE_KEY = 'baking-school-auth-session'

// Generate a mock JWT token (in production, use a real JWT library)
function generateToken(user: User): string {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  }
  return btoa(JSON.stringify(payload))
}

// Validate and decode token
function validateToken(token: string): { valid: boolean; payload?: unknown } {
  try {
    const payload = JSON.parse(atob(token))
    const now = Date.now()

    if (payload.exp < now) {
      return { valid: false }
    }

    return { valid: true, payload }
  } catch {
    return { valid: false }
  }
}

// Authentication functions
export const authService = {
  // Login with credentials
  async login(credentials: LoginCredentials): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const user = MOCK_USERS[credentials.username.toLowerCase()]

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    if (user.password !== credentials.password) {
      return { success: false, error: 'Invalid password' }
    }

    if (!user.isActive) {
      return { success: false, error: 'Account is deactivated' }
    }

    // Create session
    const token = generateToken(user)
    const session: AuthSession = {
      user: { ...user, password: undefined } as User,
      token,
      expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)) // 24 hours
    }

    // Update last login
    user.lastLogin = new Date()

    // Save session
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))

    return { success: true, session }
  },

  // Logout
  async logout(): Promise<void> {
    localStorage.removeItem(SESSION_STORAGE_KEY)
  },

  // Get current session
  getCurrentSession(): AuthSession | null {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY)
      if (!stored) return null

      const session: AuthSession = JSON.parse(stored)

      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        localStorage.removeItem(SESSION_STORAGE_KEY)
        return null
      }

      // Validate token
      const tokenValidation = validateToken(session.token)
      if (!tokenValidation.valid) {
        localStorage.removeItem(SESSION_STORAGE_KEY)
        return null
      }

      return session
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY)
      return null
    }
  },

  // Refresh session
  async refreshSession(): Promise<AuthSession | null> {
    const currentSession = this.getCurrentSession()
    if (!currentSession) return null

    // In a real app, you would call a refresh endpoint
    // For now, just extend the current session
    const newSession: AuthSession = {
      ...currentSession,
      expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000))
    }

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession))
    return newSession
  }
}

// Permission checking utilities
export const permissionService = {
  // Check if user has a specific permission
  hasPermission(user: User | null, permission: Permission): boolean {
    if (!user) return false
    return user.permissions.includes(permission)
  },

  // Check if user has any of the specified permissions
  hasAnyPermission(user: User | null, permissions: Permission[]): boolean {
    if (!user) return false
    return permissions.some(permission => user.permissions.includes(permission))
  },

  // Check if user has all of the specified permissions
  hasAllPermissions(user: User | null, permissions: Permission[]): boolean {
    if (!user) return false
    return permissions.every(permission => user.permissions.includes(permission))
  },

  // Check if user has a specific role or higher
  hasRole(user: User | null, role: UserRole): boolean {
    if (!user) return false
    return ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY[role]
  },

  // Check if user can perform action on resource (considering ownership)
  canPerformAction(
    user: User | null,
    action: Permission,
    resourceOwnerId?: string
  ): boolean {
    if (!user) return false

    // Check if user has the general permission
    if (this.hasPermission(user, action)) return true

    // Check ownership-based permissions (simplified for current permission set)
    if (resourceOwnerId && resourceOwnerId === user.id) {
      // For now, just check if user has admin access for any resource operations
      return this.hasPermission(user, Permission.ADMIN_ACCESS)
    }

    return false
  }
}

// Role management utilities
export const roleService = {
  // Get all available roles
  getAllRoles(): UserRole[] {
    return Object.values(UserRole)
  },

  // Get role display name
  getRoleDisplayName(role: UserRole): string {
    const displayNames = {
      [UserRole.GUEST]: 'Guest',
      [UserRole.ADMIN]: 'Administrator'
    }
    return displayNames[role]
  },

  // Get role color for UI
  getRoleColor(role: UserRole): string {
    const colors = {
      [UserRole.GUEST]: 'gray',
      [UserRole.ADMIN]: 'red'
    }
    return colors[role]
  },

  // Get permissions for a role
  getRolePermissions(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role] || []
  }
}