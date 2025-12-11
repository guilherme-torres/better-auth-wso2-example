import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/sign-in")
    }

    return (
        <div>
            <h1>Bem-vindo {session.user.name}</h1>
            <h2>dados do usuário:</h2>
            <pre>{JSON.stringify(session.user, null, 2)}</pre>
            <SignOutButton />
        </div>
    )
}