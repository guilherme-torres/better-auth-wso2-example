"use client"

import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { useState } from "react"

export function SignOutButton() {
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    redirect("/sign-in")
                }
            }
        })
    }

    return (
        <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded"
        >
            {loading ? "Saindo..." : "Sair"}
        </button>
    )
}