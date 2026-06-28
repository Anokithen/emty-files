"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/providers/auth-provider"
import { GuestRoute } from "@/components/auth-guard"

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
  role: z
    .string()
    .min(1, "Role is required."),
})

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await register(data.email, data.password, data.role)
      toast.success("Account registered successfully! Please sign in.")
      router.push("/auth/login")
    } catch (error: any) {
      console.error("Registration error:", error)
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.errors?.[0] ||
        "Failed to register. Please try again."
      toast.error(errorMsg)
    }
  }