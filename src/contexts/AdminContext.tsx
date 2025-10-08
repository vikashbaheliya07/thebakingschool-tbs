"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AdminContextType {
  isAdmin: boolean
  login: (password: string) => boolean
  logout: () => void
  checkAdminStatus: () => boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

// Admin credentials (in production, this would be handled by a secure backend)
const ADMIN_PASSWORD = "bakingschool2024" // Change this to your desired password
const ADMIN_SESSION_KEY = "baking-school-admin-session"

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user is already logged in on component mount
  useEffect(() => {
    const savedSession = localStorage.getItem(ADMIN_SESSION_KEY)
    if (savedSession) {
      const sessionData = JSON.parse(savedSession)
      const now = new Date().getTime()
      
      // Check if session is still valid (24 hours)
      if (sessionData.expiry > now) {
        setIsAdmin(true)
      } else {
        // Session expired, remove it
        localStorage.removeItem(ADMIN_SESSION_KEY)
      }
    }
  }, [])

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      
      // Save session with 24-hour expiry
      const sessionData = {
        isAdmin: true,
        expiry: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours
      }
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
      
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem(ADMIN_SESSION_KEY)
  }

  const checkAdminStatus = (): boolean => {
    return isAdmin
  }

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, checkAdminStatus }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}