"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  User,
  Link2,
  AlertTriangle,
  Key,
} from "lucide-react";

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("My Workspace");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your workspace and LinkedIn connections</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Configure your workspace settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Workspace Name</label>
            <Input value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Timezone</label>
            <Input value="America/New_York (UTC-5)" disabled />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-blue-600" /> LinkedIn Connections
          </CardTitle>
          <CardDescription>Connect your LinkedIn profile and company pages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Personal Profile</p>
                  <p className="text-xs text-gray-500">Connect your LinkedIn personal profile</p>
                </div>
              </div>
              <Button variant="outline">
                <Link2 className="h-4 w-4" /> Connect
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <Building2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Company Page</p>
                  <p className="text-xs text-gray-500">Connect a LinkedIn company page you manage</p>
                </div>
              </div>
              <Button variant="outline">
                <Link2 className="h-4 w-4" /> Connect
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-sm font-medium">No LinkedIn accounts connected</p>
            </div>
            <p className="mt-1 text-xs text-yellow-700">
              Connect your LinkedIn account to start creating and publishing content. You&apos;ll need to authorize via LinkedIn OAuth.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-gray-600" /> API Configuration
          </CardTitle>
          <CardDescription>Configure API keys for AI content generation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">OpenAI API Key</label>
            <Input type="password" placeholder="sk-..." />
            <p className="mt-1 text-xs text-gray-500">Required for AI content generation</p>
          </div>
          <Button>Save API Key</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Current Plan</p>
              <p className="text-xs text-gray-500">Free tier — single user</p>
            </div>
            <Badge variant="info">Free</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
