import { streamText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Create a Google Generative AI provider instance
    const gemini = google("gemini-1.5-pro")

    // Format messages for the model
    const formattedMessages = messages.map((message: any) => ({
      role: message.role,
      content: message.content,
    }))

    // Stream the response
    const result = streamText({
      model: gemini,
      messages: formattedMessages,
      system: `You are an election assistant AI for a Filipino voter preference matching website called PiliPinas 2025. 
      Your purpose is to help voters understand political issues, candidate positions, and the election process.
      You should be informative, balanced, and non-partisan in your responses.
      You can explain complex political topics in simple terms, discuss the pros and cons of different policy positions,
      and help users understand how the candidate matching system works.
      If asked about specific candidates, provide balanced information about their stated positions.
      Avoid showing political bias or telling users who they should vote for.
      If users ask questions outside the scope of elections and politics, politely redirect them to relevant topics.
      Occasionally use Filipino phrases or greetings to add local flavor to your responses.`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
