"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AccessManagerProvider,
  AccessGate,
  SessionGuard,
  ConditionalWrapper,
  UserSession,
  RolePermissionMap
} from '@/r/new-york/access-manager/access-manager'
import { User, Shield, Eye, EyeOff, Settings, Crown, Users, Lock } from 'lucide-react'

const mockUsers: UserSession[] = [
  {
    id: '1',
    email: 'admin@example.com',
    username: 'admin',
    roles: ['admin', 'user'],
    permissions: ['read', 'write', 'delete', 'manage_users'],
    isActive: true,
    expiresAt: new Date(Date.now() + 86400000)
  },
  {
    id: '2',
    email: 'editor@example.com',
    username: 'editor',
    roles: ['editor', 'user'],
    permissions: ['read', 'write'],
    isActive: true,
    expiresAt: new Date(Date.now() + 86400000)
  },
  {
    id: '3',
    email: 'viewer@example.com',
    username: 'viewer',
    roles: ['viewer'],
    permissions: ['read'],
    isActive: true,
    expiresAt: new Date(Date.now() + 86400000)
  },
  {
    id: '4',
    email: 'expired@example.com',
    username: 'expired_user',
    roles: ['user'],
    permissions: ['read'],
    isActive: true,
    expiresAt: new Date(Date.now() - 86400000)
  },
  {
    id: '5',
    email: 'inactive@example.com',
    username: 'inactive_user',
    roles: ['user'],
    permissions: ['read'],
    isActive: false,
    expiresAt: new Date(Date.now() + 86400000)
  }
]

const rolePermissionMap: RolePermissionMap = {
  admin: ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
  editor: ['read', 'write', 'edit_content'],
  viewer: ['read'],
  user: ['read', 'profile_edit']
}

export default function AccessManagerPreview() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(mockUsers[0])

  const DemoComponent = ({ title, description, children }: {
    title: string
    description: string
    children: React.ReactNode
  }) => (
    <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  )

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <AccessManagerProvider
        user={currentUser}
        rolePermissionMap={rolePermissionMap}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              Access Guard Demo
            </CardTitle>
            <CardDescription>
              Interactive role-based access control demonstration
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Current User</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {mockUsers.map((user) => (
                    <Button
                      key={user.id}
                      variant={currentUser?.id === user.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentUser(user)}
                      className="h-8"
                    >
                      <User className="h-3 w-3 mr-1" />
                      {user.username}
                    </Button>
                  ))}
                  <Button
                    variant={currentUser === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentUser(null)}
                    className="h-8"
                  >
                    <EyeOff className="h-3 w-3 mr-1" />
                    No User
                  </Button>
                </div>

                {currentUser && (
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{currentUser.username}</span>
                      <Badge variant={currentUser.isActive ? "default" : "destructive"} className="text-xs">
                        {currentUser.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Roles:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {currentUser.roles.map(role => (
                            <Badge key={role} variant="secondary" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Session:</span>
                        <Badge
                          variant={new Date(currentUser.expiresAt!) > new Date() ? "default" : "destructive"}
                          className="text-xs ml-2"
                        >
                          {new Date(currentUser.expiresAt!) > new Date() ? "Valid" : "Expired"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Role Access</TabsTrigger>
                  <TabsTrigger value="advanced">Permissions</TabsTrigger>
                  <TabsTrigger value="session">Session</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-6">
                  <DemoComponent
                    title="Role-Based Visibility"
                    description="Buttons shown based on user roles"
                  >
                    <div className="flex flex-wrap gap-2">
                      <AccessGate roles="admin">
                        <Button size="sm" className="gap-1">
                          <Crown className="h-3 w-3" />
                          Admin Panel
                        </Button>
                      </AccessGate>

                      <AccessGate roles={["admin", "editor"]}>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Settings className="h-3 w-3" />
                          Edit Content
                        </Button>
                      </AccessGate>

                      <AccessGate roles="viewer">
                        <Button size="sm" variant="secondary" className="gap-1">
                          <Eye className="h-3 w-3" />
                          View Only
                        </Button>
                      </AccessGate>

                      <AccessGate
                        roles="guest"
                        fallback={
                          <div className="px-3 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                            Access Denied
                          </div>
                        }
                        mode="show-fallback"
                      >
                        <Button size="sm">Guest Content</Button>
                      </AccessGate>
                    </div>
                  </DemoComponent>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 mt-6">
                  <DemoComponent
                    title="Permission-Based Controls"
                    description="Actions controlled by specific permissions"
                  >
                    <div className="flex flex-wrap gap-2">
                      <AccessGate permissions="manage_users">
                        <Button size="sm" className="gap-1">
                          <Users className="h-3 w-3" />
                          Manage Users
                        </Button>
                      </AccessGate>

                      <AccessGate permissions="delete">
                        <Button size="sm" variant="destructive">
                          Delete Items
                        </Button>
                      </AccessGate>

                      <AccessGate
                        permissions="write"
                        mode="disable"
                      >
                        <Button size="sm" variant="outline">
                          Create Content
                        </Button>
                      </AccessGate>
                    </div>
                  </DemoComponent>

                  <DemoComponent
                    title="Multiple Requirements"
                    description="Require multiple roles or permissions"
                  >
                    <div className="space-y-3">
                      <AccessGate
                        roles={["admin", "user"]}
                        requireAllRoles={true}
                        fallback={
                          <div className="text-sm text-muted-foreground p-2 rounded bg-muted/50">
                            Requires Admin AND User roles
                          </div>
                        }
                        mode="show-fallback"
                      >
                        <Button size="sm">Super Admin Action</Button>
                      </AccessGate>

                      <ConditionalWrapper
                        roles="admin"
                        wrapper={(children) => (
                          <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="text-xs">Admin View</Badge>
                            </div>
                            {children}
                          </div>
                        )}
                        fallbackWrapper={(children) => (
                          <div className="p-3 border-l-4 border-muted bg-muted/50 rounded">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">Standard View</Badge>
                            </div>
                            {children}
                          </div>
                        )}
                      >
                        <p className="text-sm">Content with role-based styling</p>
                      </ConditionalWrapper>
                    </div>
                  </DemoComponent>
                </TabsContent>

                <TabsContent value="session" className="space-y-4 mt-6">
                  <DemoComponent
                    title="Session Protection"
                    description="Content requiring valid sessions"
                  >
                    <div className="space-y-3">
                      <SessionGuard
                        fallback={
                          <div className="flex items-center gap-2 p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                            <Lock className="h-4 w-4 text-destructive" />
                            <span className="text-sm text-destructive">Please log in to access</span>
                          </div>
                        }
                      >
                        <div className="flex items-center gap-2 p-3 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                          <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-green-700 dark:text-green-300">Protected content visible</span>
                        </div>
                      </SessionGuard>

                      <AccessGate
                        roles="user"
                        requireValidSession={true}
                        fallback={
                          <Badge variant="destructive" className="text-xs">
                            Invalid session
                          </Badge>
                        }
                        mode="show-fallback"
                      >
                        <Button size="sm">Session-Protected Action</Button>
                      </AccessGate>
                    </div>
                  </DemoComponent>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </AccessManagerProvider>
    </div>
  )
}
