"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PhFlag } from "@/components/ph-flag"
import Link from "next/link"
import { GoogleGenerativeAI } from "@google/generative-ai";
import {systemPrompt} from "@/prompts";
import markdownit from 'markdown-it'
// Define the Message type
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content:
          "Mabuhay! I'm your PiliPinas 2025 election assistant powered by Gemini AI. I can help you understand candidate positions, explain political issues, or guide you through the election process. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const md = markdownit()
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Get API response using direct Gemini API
      const response = await getGeminiResponse(messages, input)

      // Add assistant message
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Function to get response from Gemini API
  const getGeminiResponse = async (currentMessages: Message[], userInput: string) => {
    const ai = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY as string || ""
    );

    // Format the conversation history for Gemini
    const formattedMessages = currentMessages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: md.render(msg.content) }]
    }));

    // Add the new user input
    formattedMessages.push({
      role: "user",
      parts: [{ text: userInput }]
    });

    // System prompt as the first message (Gemini doesn't have a dedicated system prompt field)

    // Insert the system prompt at the beginning
    formattedMessages.unshift(systemPrompt);

    try {
      // Use the experimental model that has a free tier
      const model = ai.getGenerativeModel({
        model: "models/gemini-2.5-flash-preview-04-17",
        // generationConfig: {
        //   candidateCount: 1,
        //   stopSequences: ["x"],
        //   maxOutputTokens: 8000,
        //   temperature: 1.0,
        // },
      });


      const result = await model.generateContent({
        contents: formattedMessages,
      });

      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-8">
            <PhFlag className="h-8 w-8" />
            <Link href="/" className="text-2xl font-bold text-ph-blue">
              PiliPinas <span className="text-ph-red">2025</span>
            </Link>
          </div>

          <Card className="h-[calc(100vh-8rem)] flex flex-col border-2 border-ph-yellow shadow-lg overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-ph-blue via-ph-red to-ph-yellow w-full"></div>
            <CardHeader className="bg-white">
              <div className="flex items-center gap-3">
                <Avatar className="bg-ph-blue">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-ph-blue">
                    Election AI Assistant <span className="text-sm font-normal text-ph-red">(Powered by Gemini)</span>
                  </CardTitle>
                  <CardDescription>Ask questions about candidates, issues, or the election process</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-grow overflow-y-auto p-4 bg-blue-50">
              <div className="space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className={message.role === "assistant" ? "bg-ph-blue" : "bg-ph-red"}>
                          <AvatarFallback>{message.role === "assistant" ? "AI" : "You"}</AvatarFallback>
                        </Avatar>
                        <div
                            className={`rounded-lg px-4 py-2 ${
                                message.role === "user"
                                    ? "bg-ph-red text-white"
                                    : "bg-white border-2 border-ph-yellow text-gray-800"
                            }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="bg-ph-blue">
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-white border-2 border-ph-yellow text-gray-800">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 bg-ph-red rounded-full animate-bounce"></div>
                            <div
                                className="h-2 w-2 bg-ph-blue rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                                className="h-2 w-2 bg-ph-yellow rounded-full animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="border-t p-4 bg-white">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                    placeholder="Type your question here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-grow border-2 border-ph-yellow focus-visible:ring-ph-blue"
                />
                <Button type="submit" disabled={isLoading || !input.trim()} className="bg-ph-blue hover:bg-blue-800">
                  {isLoading ? (
                      <span className="h-4 w-4 border-2 border-blue-300 border-t-white rounded-full animate-spin"></span>
                  ) : (
                      "Send"
                  )}
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
  )
}