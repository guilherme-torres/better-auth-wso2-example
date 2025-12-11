"use client"

import { authClient } from "@/lib/auth-client"
import { useState } from "react"

export function SignInButton() {
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        await authClient.signIn.oauth2({
            providerId: "wso2",
            callbackURL: "/dashboard",
        }, {
            onSuccess: () => {
                console.log("Redirecionando...")
            },
            onError: (ctx) => {
                alert(ctx.error.message)
                setLoading(false)
            }
        })
    }

    return (
        <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
        >
            {loading ? "Redirecionando..." : "Entrar com WSO2"}
        </button>
    )
}