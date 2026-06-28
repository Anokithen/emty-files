"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {ArrowLeft} from "lucide-react"

import {Button} from "@/components/ui/button"
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
import {Input} from "@/components/ui/input"
import {useToast} from "@/components/ui/use-toast"
import {GuestRoute} from "@/components/guest-route"

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
    password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
})

export default function LoginPage() {
    const {login} = useAuth()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
           const response = await login(data.email, data.password)
      toast.success("Logged in successfully!")
      
      // Redirect based on role
      if (response.user?.role === "admin" || response.user?.role === "lecturer") {
        router.push("/admin/dashboard")
      } else {
        router.push("/students/dashboard")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.errors?.[0] ||
        "Failed to log in. Please try again."
      toast.error(errorMsg)
    }
  }