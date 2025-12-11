import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { genericOAuth } from "better-auth/plugins"
import { db } from "./database"
import * as schema from "../../auth-schema"


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema,
    }),
    plugins: [
        genericOAuth({
            config: [
                {
                    providerId: "wso2",
                    clientId: process.env.CLIENT_ID!,
                    clientSecret: process.env.CLIENT_SECRET,
                    discoveryUrl: process.env.DISCOVERY_URL,
                    authorizationUrl: process.env.AUTHORIZATION_URL,
                    tokenUrl: process.env.TOKEN_URL,
                    userInfoUrl: process.env.USER_INFO_URL,
                    scopes: ["openid", "email", "profile", "roles", "scope_test"],
                    redirectURI: process.env.REDIRECT_URL,
                    getToken: async ({ code, redirectURI }) => {
                        const bodyParams = new URLSearchParams({
                            client_id: process.env.CLIENT_ID!,
                            client_secret: process.env.CLIENT_SECRET!,
                            code: code,
                            redirect_uri: redirectURI,
                            grant_type: "authorization_code",
                        })
                        const response = await fetch(
                            process.env.TOKEN_URL!,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                                body: bodyParams.toString(),
                            }
                        )
                        const data = await response.json()
                        console.log("resposta token:", data)
                        return {
                            accessToken: data.access_token,
                            scopes: data.scope?.split(" ") ?? [],
                            idToken: data.id_token,
                            tokenType: data.token_type,
                            accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
                            raw: data,
                        };
                    },
                    mapProfileToUser: async (profile) => {
                        console.log("dados do wso2:", profile)
                        return {
                            email: profile.email,
                            name: `${profile.given_name} ${profile.family_name}`,
                            image: profile.image,
                            id: profile.id,
                            emailVerified: profile.emailVerified,
                            createdAt: undefined,
                            updatedAt: undefined,
                        }
                    },
                },
            ]
        })
    ],
})