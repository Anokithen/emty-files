"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import {Button} from "@/components/ui/button"

interface AuthenticatedRouteProps {
  children: React.ReactNode
   allowedRoles?: string[]
} 

export function AuthenticatedRoute({ children, allowedRoles }: AuthenticatedRouteProps) {
    const { user, loading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login")
        }
    }, [user, loading, router])

    if (loading) {
  