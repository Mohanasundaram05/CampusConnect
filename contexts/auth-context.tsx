"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "student" | "counselor" | "admin"
  avatar?: string
  isVerified: boolean
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: SignupData) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<boolean>
  isAuthenticated: boolean
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  role: "student" | "counselor"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const userData = localStorage.getItem("userData")

        if (token && userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in real app, this would be an API call
      if (email === "admin@campusconnect.com" && password === "admin123") {
        const userData: User = {
          id: "1",
          email: "admin@campusconnect.com",
          firstName: "Admin",
          lastName: "User",
          role: "admin",
          isVerified: true,
          createdAt: new Date().toISOString(),
        }

        const token = "mock-jwt-token-admin"
        localStorage.setItem("authToken", token)
        localStorage.setItem("userData", JSON.stringify(userData))
        setUser(userData)

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        })

        return true
      } else if (email === "student@example.com" && password === "student123") {
        const userData: User = {
          id: "2",
          email: "student@example.com",
          firstName: "John",
          lastName: "Doe",
          role: "student",
          isVerified: true,
          createdAt: new Date().toISOString(),
        }

        const token = "mock-jwt-token-student"
        localStorage.setItem("authToken", token)
        localStorage.setItem("userData", JSON.stringify(userData))
        setUser(userData)

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        })

        return true
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Try admin@campusconnect.com / admin123",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock signup - in real app, this would be an API call
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        isVerified: false,
        createdAt: new Date().toISOString(),
      }

      const token = `mock-jwt-token-${newUser.id}`
      localStorage.setItem("authToken", token)
      localStorage.setItem("userData", JSON.stringify(newUser))
      setUser(newUser)

      toast({
        title: "Account Created!",
        description: "Welcome to CampusConnect. Please verify your email.",
      })

      return true
    } catch (error) {
      toast({
        title: "Signup Error",
        description: "An error occurred during signup. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setUser(null)
    router.push("/")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false

    try {
      const updatedUser = { ...user, ...data }
      localStorage.setItem("userData", JSON.stringify(updatedUser))
      setUser(updatedUser)

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })

      return true
    } catch (error) {
      toast({
        title: "Update Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
