"use client"

import React, { createContext, useContext, useMemo, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface UserSession {
  id: string
  email?: string
  username?: string
  name?: string
  avatar?: string
  roles: string[]
  permissions: string[]
  metadata?: Record<string, unknown>
  isActive?: boolean
  expiresAt?: Date | string
  lastActivity?: Date | string
  sessionId?: string
}

export interface RolePermissionMap {
  [role: string]: string[]
}

export interface AccessManagerContextType {
  user: UserSession | null
  rolePermissionMap: RolePermissionMap
  hasRole: (role: string | string[]) => boolean
  hasPermission: (permission: string | string[]) => boolean
  hasAnyRole: (roles: string[]) => boolean
  hasAllRoles: (roles: string[]) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  hasAllPermissions: (permissions: string[]) => boolean
  isSessionValid: () => boolean
  getSessionTimeRemaining: () => number | null
  isSessionExpiring: (thresholdMinutes?: number) => boolean
}

const AccessManagerContext = createContext<AccessManagerContextType | null>(null)

export const useAccessManager = () => {
  const context = useContext(AccessManagerContext)
  if (!context) {
    throw new Error('useAccessManager must be used within an AccessManagerProvider')
  }
  return context
}

export const useRoleBasedAccess = useAccessManager

export interface AccessManagerProviderProps {
  children: ReactNode
  user: UserSession | null
  rolePermissionMap?: RolePermissionMap
  onUnauthorized?: () => void
}

export function AccessManagerProvider({
  children,
  user,
  rolePermissionMap = {}
}: AccessManagerProviderProps) {
  const contextValue = useMemo(() => {
    const hasRole = (role: string | string[]): boolean => {
      if (!user || !user.roles) return false
      if (Array.isArray(role)) {
        return role.some(r => user.roles.includes(r))
      }
      return user.roles.includes(role)
    }

    const hasPermission = (permission: string | string[]): boolean => {
      if (!user) return false

      const userPermissions = new Set([
        ...(user.permissions || []),
        ...user.roles.flatMap(role => rolePermissionMap[role] || [])
      ])

      if (Array.isArray(permission)) {
        return permission.some(p => userPermissions.has(p))
      }
      return userPermissions.has(permission)
    }

    const hasAnyRole = (roles: string[]): boolean => {
      if (!user || !user.roles) return false
      return roles.some(role => user.roles.includes(role))
    }

    const hasAllRoles = (roles: string[]): boolean => {
      if (!user || !user.roles) return false
      return roles.every(role => user.roles.includes(role))
    }

    const hasAnyPermission = (permissions: string[]): boolean => {
      if (!user) return false

      const userPermissions = new Set([
        ...(user.permissions || []),
        ...user.roles.flatMap(role => rolePermissionMap[role] || [])
      ])

      return permissions.some(permission => userPermissions.has(permission))
    }

    const hasAllPermissions = (permissions: string[]): boolean => {
      if (!user) return false

      const userPermissions = new Set([
        ...(user.permissions || []),
        ...user.roles.flatMap(role => rolePermissionMap[role] || [])
      ])

      return permissions.every(permission => userPermissions.has(permission))
    }

    const isSessionValid = (): boolean => {
      if (!user) return false
      if (user.isActive === false) return false

      if (user.expiresAt) {
        const expirationDate = typeof user.expiresAt === 'string'
          ? new Date(user.expiresAt)
          : user.expiresAt
        return expirationDate > new Date()
      }

      return true
    }

    const getSessionTimeRemaining = (): number | null => {
      if (!user || !user.expiresAt) return null

      const expirationDate = typeof user.expiresAt === 'string'
        ? new Date(user.expiresAt)
        : user.expiresAt

      const now = new Date()
      const timeRemaining = expirationDate.getTime() - now.getTime()

      return timeRemaining > 0 ? timeRemaining : 0
    }

    const isSessionExpiring = (thresholdMinutes: number = 5): boolean => {
      if (!user || !user.expiresAt) return false

      const expirationDate = typeof user.expiresAt === 'string'
        ? new Date(user.expiresAt)
        : user.expiresAt

      const now = new Date()
      const timeUntilExpiry = expirationDate.getTime() - now.getTime()
      const thresholdMs = thresholdMinutes * 60 * 1000

      return timeUntilExpiry > 0 && timeUntilExpiry <= thresholdMs
    }

    return {
      user,
      rolePermissionMap,
      hasRole,
      hasPermission,
      hasAnyRole,
      hasAllRoles,
      hasAnyPermission,
      hasAllPermissions,
      isSessionValid,
      getSessionTimeRemaining,
      isSessionExpiring
    }
  }, [user, rolePermissionMap])

  return (
    <AccessManagerContext.Provider value={contextValue}>
      {children}
    </AccessManagerContext.Provider>
  )
}

export interface AccessGateProps {
  children: ReactNode
  roles?: string | string[]
  permissions?: string | string[]
  requireAllRoles?: boolean
  requireAllPermissions?: boolean
  requireValidSession?: boolean
  fallback?: ReactNode
  onUnauthorized?: () => void
  mode?: 'hide' | 'disable' | 'show-fallback'
  className?: string
  disabledClassName?: string
}

export function AccessGate({
  children,
  roles,
  permissions,
  requireAllRoles = false,
  requireAllPermissions = false,
  requireValidSession = true,
  fallback = null,
  onUnauthorized,
  mode = 'hide',
  className,
  disabledClassName
}: AccessGateProps) {
  const {
    hasRole,
    hasPermission,
    hasAllRoles,
    hasAllPermissions,
    isSessionValid
  } = useAccessManager()

  const checkAccess = (): boolean => {
    if (requireValidSession && !isSessionValid()) {
      return false
    }

    let hasRequiredRoles = true
    let hasRequiredPermissions = true

    if (roles) {
      const roleArray = Array.isArray(roles) ? roles : [roles]
      hasRequiredRoles = requireAllRoles
        ? hasAllRoles(roleArray)
        : hasRole(roles)
    }

    if (permissions) {
      const permissionArray = Array.isArray(permissions) ? permissions : [permissions]
      hasRequiredPermissions = requireAllPermissions
        ? hasAllPermissions(permissionArray)
        : hasPermission(permissions)
    }

    return hasRequiredRoles && hasRequiredPermissions
  }

  const hasAccess = checkAccess()

  if (!hasAccess && onUnauthorized) {
    onUnauthorized()
  }

  if (!hasAccess) {
    switch (mode) {
      case 'hide':
        return fallback ? <>{fallback}</> : null
      case 'show-fallback':
        return fallback ? <>{fallback}</> : null
      case 'disable':
        return (
          <div className={cn(className, disabledClassName, "opacity-50 pointer-events-none cursor-not-allowed")}>
            {children}
          </div>
        )
      default:
        return null
    }
  }

  return <div className={className}>{children}</div>
}

export interface PermissionCheckProps {
  roles?: string | string[]
  permissions?: string | string[]
  requireAllRoles?: boolean
  requireAllPermissions?: boolean
  requireValidSession?: boolean
}

export function usePermissionCheck({
  roles,
  permissions,
  requireAllRoles = false,
  requireAllPermissions = false,
  requireValidSession = true
}: PermissionCheckProps = {}) {
  const {
    hasRole,
    hasPermission,
    hasAllRoles,
    hasAllPermissions,
    isSessionValid
  } = useAccessManager()

  return useMemo(() => {
    if (requireValidSession && !isSessionValid()) {
      return false
    }

    let hasRequiredRoles = true
    let hasRequiredPermissions = true

    if (roles) {
      const roleArray = Array.isArray(roles) ? roles : [roles]
      hasRequiredRoles = requireAllRoles
        ? hasAllRoles(roleArray)
        : hasRole(roles)
    }

    if (permissions) {
      const permissionArray = Array.isArray(permissions) ? permissions : [permissions]
      hasRequiredPermissions = requireAllPermissions
        ? hasAllPermissions(permissionArray)
        : hasPermission(permissions)
    }

    return hasRequiredRoles && hasRequiredPermissions
  }, [
    roles,
    permissions,
    requireAllRoles,
    requireAllPermissions,
    requireValidSession,
    hasRole,
    hasPermission,
    hasAllRoles,
    hasAllPermissions,
    isSessionValid
  ])
}

export interface ConditionalWrapperProps {
  children: ReactNode
  roles?: string | string[]
  permissions?: string | string[]
  requireAllRoles?: boolean
  requireAllPermissions?: boolean
  requireValidSession?: boolean
  wrapper: (children: ReactNode) => ReactNode
  fallbackWrapper?: (children: ReactNode) => ReactNode
}

export function ConditionalWrapper({
  children,
  roles,
  permissions,
  requireAllRoles = false,
  requireAllPermissions = false,
  requireValidSession = true,
  wrapper,
  fallbackWrapper
}: ConditionalWrapperProps) {
  const hasAccess = usePermissionCheck({
    roles,
    permissions,
    requireAllRoles,
    requireAllPermissions,
    requireValidSession
  })

  if (hasAccess) {
    return <>{wrapper(children)}</>
  }

  if (fallbackWrapper) {
    return <>{fallbackWrapper(children)}</>
  }

  return <>{children}</>
}

export interface SessionGuardProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
  onSessionExpired?: () => void
}

export function SessionGuard({
  children,
  fallback,
  redirectTo,
  onSessionExpired
}: SessionGuardProps) {
  const { user, isSessionValid } = useAccessManager()

  const sessionValid = isSessionValid()

  if (!user || !sessionValid) {
    if (onSessionExpired) {
      onSessionExpired()
    }

    if (redirectTo && typeof window !== 'undefined') {
      window.location.href = redirectTo
      return null
    }

    if (fallback) {
      return <>{fallback}</>
    }

    return null
  }

  return <>{children}</>
}

export const RoleBasedAccessProvider = AccessManagerProvider
export const RoleGate = AccessGate

export const RoleBasedAccess = {
  Provider: AccessManagerProvider,
  Gate: AccessGate,
  SessionGuard,
  ConditionalWrapper,
  useRoleBasedAccess: useAccessManager,
  usePermissionCheck
}
