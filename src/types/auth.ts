// Authentication and authorization types

export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin'
}

export enum Permission {
  // Basic permissions
  VIEW_CONTENT = 'view_content',
  
  // Admin permissions (full access)
  ADMIN_ACCESS = 'admin_access'
}

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  permissions: Permission[]
  createdAt: Date
  lastLogin?: Date
  isActive: boolean
  profile?: {
    firstName?: string
    lastName?: string
    avatar?: string
    bio?: string
  }
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: Date
  refreshToken?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthState {
  user: User | null
  session: AuthSession | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Role hierarchy (higher roles inherit permissions from lower roles)
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.GUEST]: 0,
  [UserRole.ADMIN]: 1
}

// Default permissions for each role
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.GUEST]: [
    Permission.VIEW_CONTENT
  ],
  
  [UserRole.ADMIN]: [
    Permission.VIEW_CONTENT,
    Permission.ADMIN_ACCESS
  ]
}