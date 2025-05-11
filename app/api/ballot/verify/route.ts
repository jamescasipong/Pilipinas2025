import { jwtVerify } from "jose"
import { NextResponse } from "next/server"

// Secret key for JWT verification - in a real app, this would be an environment variable
const JWT_SECRET = new TextEncoder().encode("pilipinas2025-ballot-secret-key")

export async function POST(req: Request) {
    try {
        const { token } = await req.json()

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 })
        }

        // Verify the JWT token
        const { payload } = await jwtVerify(token, JWT_SECRET)

        // Return the selected candidates from the token
        return NextResponse.json({ selectedCandidates: payload.selectedCandidates })
    } catch (error) {
        console.error("Error verifying ballot:", error)
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }
}
