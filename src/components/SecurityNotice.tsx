"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Info, Lock } from "lucide-react"

export function SecurityNotice() {
  return (
    <Alert className="border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>Gallery Management:</strong> Image upload and management features are restricted to administrators only. 
        This ensures content quality and prevents unauthorized modifications to the gallery.
      </AlertDescription>
    </Alert>
  )
}

export function AdminSecurityInfo() {
  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-semibold text-yellow-800">Admin Security Features</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Password-protected access to gallery management</li>
              <li>• 24-hour session timeout for security</li>
              <li>• Image validation and size restrictions</li>
              <li>• Audit trail for all gallery modifications</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}