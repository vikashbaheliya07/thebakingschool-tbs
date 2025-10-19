"use client"

import { useState, useEffect } from "react"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail} from "lucide-react"

export function EmailCaptureModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Auto show modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Basic validation for mobile number (optional)
    if (mobile && !/^\+?\d{7,15}$/.test(mobile)) {
      setMessage("❌ Please enter a valid mobile number (digits only, optional +).")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/save-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mobile: mobile || null }),
      })
      const data = await res.json()

      if (res.ok) {
        setMessage("✅ Your details have been saved successfully!")
        setEmail("")
        setMobile("")
        setTimeout(() => setIsOpen(false), 2000)
      } else {
        setMessage(data.error || "❌ Something went wrong.")
      }
    } catch {
      setMessage("❌ Failed to connect to server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Mail className="w-4 h-4" />
          Subscribe
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Stay Updated
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Enter Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Optional Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number (optional)</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+1234567890"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Message */}
              {message && (
                <Alert className={message.includes("✅") ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                  <AlertDescription className={message.includes("✅") ? "text-green-600" : "text-red-600"}>
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="flex-1 gradient-yellow-blue text-white flex items-center justify-center gap-2"
                  disabled={loading || !email.includes("@")}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </div>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Submit
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
