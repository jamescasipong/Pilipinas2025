import { SignJWT } from "jose"
import { NextResponse } from "next/server"

// Secret key for JWT signing - in a real app, this would be an environment variable
const JWT_SECRET = new TextEncoder().encode("pilipinas2025-ballot-secret-key")

export async function POST(req: Request) {
    try {
        const { selectedCandidates } = await req.json()

        // Validate the input
        if (!selectedCandidates || !Array.isArray(selectedCandidates) || selectedCandidates.length < 12) {
            return NextResponse.json({ error: "Please select at least 12 candidates" }, { status: 400 })
        }

        // Create a JWT token with the selected candidates
        const token = await new SignJWT({ selectedCandidates })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("30d") // Token expires in 30 days
            .sign(JWT_SECRET)

        return NextResponse.json({ token })
    } catch (error) {
        console.error("Error creating ballot:", error)
        return NextResponse.json({ error: "Failed to create ballot" }, { status: 500 })
    }
}
