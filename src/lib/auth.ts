import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        genericOAuth({
            config: [
                {
                    providerId: "wso2",
                    clientId: process.env.CLIENT_ID as string,
                    clientSecret: process.env.CLIENT_SECRET,
                    discoveryUrl: process.env.DISCOVERY_URL,
                    authorizationUrl: process.env.AUTHORIZATION_URL,
                    tokenUrl: process.env.TOKEN_URL,
                    userInfoUrl: process.env.USER_INFO_URL,
                    scopes: ["openid", "email", "profile", "roles", "scope_test"],
                    redirectURI: "http://localhost:3000/api/auth/oauth2/callback/wso2",
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
                    }
                },
            ]
        })
    ],
})