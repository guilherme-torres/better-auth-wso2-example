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

    const accessToken = await auth.api.getAccessToken({
        body: {
            providerId: "wso2",
            userId: session.user.id,
        }
    })
    console.log("acccess token:", accessToken)

    return (
        <div>
            <h1>Bem-vindo {session.user.name}</h1>
            <h2>dados do usuário:</h2>
            <pre>{JSON.stringify(session.user, null, 2)}</pre>
            <h2>access token:</h2>
            <pre>{accessToken.accessToken}</pre>
            <SignOutButton />
        </div>
    )
}