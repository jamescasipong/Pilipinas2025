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
import { systemPrompt } from "@/prompts"
import ReactMarkdown from 'react-markdown'

// Define the Message type
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    // Load chat history from localStorage
    const storedMessages = localStorage.getItem("chatHistory")
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    } else {
      // Add welcome message on first visit if no history is found
      setMessages([
        {
          id: "welcome-message",
          role: "assistant",
          content: "Mabuhay! I'm your PiliPinas 2025 election assistant created by James Casipong, powered by Gemini AI. I can help you understand candidate positions, explain political issues, or guide you through the election process. Whether you're trying to make an informed vote or simply learning more about the candidates and their platforms, I’m here to assist you every step of the way!\n" +
              "\n" +
              "### To get the most accurate and helpful answers:\n" +
              "\n" +
              "1. **Be Specific with Your Questions**:\n" +
              "\n" +
              "   * Instead of asking, \"Who is the best candidate?\", you can ask, \"What are the key positions of Candidate A on education?\" This helps me provide tailored information about a candidate or issue.\n" +
              "\n" +
              "2. **Ask About Platforms, Issues, or Policies**:\n" +
              "\n" +
              "   * If you're looking to understand a particular candidate’s stance on an issue, ask for detailed explanations, such as, \"How does Candidate B propose to handle poverty reduction?\" or \"What is Candidate C's position on climate change?\"\n" +
              "\n" +
              "3. **Provide Context or Specific Concerns**:\n" +
              "\n" +
              "   * If you want to know more about how an issue affects you or your community, mention it! For example, \"What are the candidates' views on healthcare, especially in rural areas?\" or \"How do the candidates plan to address traffic problems in Metro Manila?\"\n" +
              "\n" +
              "4. **Compare Candidates**:\n" +
              "\n" +
              "   * You can ask me to compare two or more candidates on specific issues, such as, \"How do Candidate X and Candidate Y differ on economic policies?\" This will help you see their positions side-by-side.\n" +
              "\n" +
              "5. **Ask About the Election Process**:\n" +
              "\n" +
              "   * If you're unsure about the voting system, candidates' eligibility, or even how to register to vote, feel free to ask questions like, \"How do I register to vote for the 2025 elections?\" or \"What is the process for casting my vote during the election?\"\n" +
              "\n" +
              "6. **Inquire About Recent Developments**:\n" +
              "\n" +
              "   * Keep up with the latest in the election process! Ask, \"What are the latest political events leading up to the 2025 election?\" or \"Has Candidate A been involved in any recent controversies?\"\n" +
              "\n" +
              "### Example Questions:\n" +
              "\n" +
              "* **\"What is Candidate A’s stance on improving the education system in the Philippines?\"**\n" +
              "* **\"Can you provide a breakdown of the voting process for the upcoming 2025 elections?\"**\n" +
              "* **\"How do the candidates plan to address inflation and rising costs of living?\"**\n" +
              "\n" +
              "Feel free to ask about anything that will help you make an informed decision or understand the election landscape better! What would you like to dive into today?\n",
        },
      ])
    }
  }, [])

  // Scroll to the latest message
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

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    // Save the updated messages to localStorage
    localStorage.setItem("chatHistory", JSON.stringify(updatedMessages))

    try {
      // Get API response using direct Gemini API
      const response = await getGeminiResponse(updatedMessages, input)

      // Add assistant message
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
      }

      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)

      // Save the updated messages to localStorage
      localStorage.setItem("chatHistory", JSON.stringify(finalMessages))
    } catch (error) {
      console.error("Error generating response:", error)

      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
      }

      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)

      // Save the updated messages to localStorage
      localStorage.setItem("chatHistory", JSON.stringify(finalMessages))
    } finally {
      setIsLoading(false)
    }
  }

  // Function to get response from Gemini API
  const getGeminiResponse = async (currentMessages: Message[], userInput: string) => {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string || "")

    // Format the conversation history for Gemini
    const formattedMessages = currentMessages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    // Add the new user input
    formattedMessages.push({
      role: "user",
      parts: [{ text: userInput }],
    })

    // Insert the system prompt at the beginning
    formattedMessages.unshift(systemPrompt)

    try {
      // Use the experimental model that has a free tier
      const model = ai.getGenerativeModel({
        model: "gemini-2.0-flash",
      })

      const result = await model.generateContent({
        contents: formattedMessages,
      })

      const response = result.response
      return response.text()
    } catch (error) {
      console.error("Error calling Gemini API:", error)
      throw error
    }
  }

  return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-4 px-0 sm:py-8 sm:px-4 md:px-6">
        <div className="container mx-auto sm:max-w-4xl max-w-full">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-8">
            <PhFlag className="h-6 w-6 sm:h-8 sm:w-8" />
            <Link href="/" className="text-xl sm:text-2xl font-bold text-ph-blue">
              PiliPinas <span className="text-ph-red">2025</span>
            </Link>
          </div>

          <Card className="h-[calc(100vh-6rem)] sm:h-[calc(100vh-8rem)] flex flex-col border-2 border-ph-yellow shadow-lg overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-ph-blue via-ph-red to-ph-yellow w-full"></div>
            <CardHeader className="bg-white p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Avatar className="bg-ph-blue h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg sm:text-2xl text-ph-blue">
                      Election AI Assistant{" "}
                      <span className="text-xs sm:text-sm font-normal text-ph-red">(Powered by Gemini)</span>
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Ask questions about candidates, issues, or the election process. Keep in mind that this is an AI assistant, so it may not always be accurate. There may be some questions that are not supported yet. Need more data to train it :)
                    </CardDescription>
                  </div>
                </div>

                {/* "Start new conversation" Button - moved below on mobile */}
                <div className="w-full sm:w-auto mt-2 sm:mt-0">
                  <Button
                      onClick={() => {
                        setMessages([
                          {
                            id: Date.now().toString(),
                            role: "assistant",
                            content: "Mabuhay! I'm your PiliPinas 2025 election assistant created by James Casipong, powered by Gemini AI. I can help you understand candidate positions, explain political issues, or guide you through the election process. Whether you're trying to make an informed vote or simply learning more about the candidates and their platforms, I’m here to assist you every step of the way!\n" +
                                "\n" +
                                "### To get the most accurate and helpful answers:\n" +
                                "\n" +
                                "1. **Be Specific with Your Questions**:\n" +
                                "\n" +
                                "   * Instead of asking, \"Who is the best candidate?\", you can ask, \"What are the key positions of Candidate A on education?\" This helps me provide tailored information about a candidate or issue.\n" +
                                "\n" +
                                "2. **Ask About Platforms, Issues, or Policies**:\n" +
                                "\n" +
                                "   * If you're looking to understand a particular candidate’s stance on an issue, ask for detailed explanations, such as, \"How does Candidate B propose to handle poverty reduction?\" or \"What is Candidate C's position on climate change?\"\n" +
                                "\n" +
                                "3. **Provide Context or Specific Concerns**:\n" +
                                "\n" +
                                "   * If you want to know more about how an issue affects you or your community, mention it! For example, \"What are the candidates' views on healthcare, especially in rural areas?\" or \"How do the candidates plan to address traffic problems in Metro Manila?\"\n" +
                                "\n" +
                                "4. **Compare Candidates**:\n" +
                                "\n" +
                                "   * You can ask me to compare two or more candidates on specific issues, such as, \"How do Candidate X and Candidate Y differ on economic policies?\" This will help you see their positions side-by-side.\n" +
                                "\n" +
                                "5. **Ask About the Election Process**:\n" +
                                "\n" +
                                "   * If you're unsure about the voting system, candidates' eligibility, or even how to register to vote, feel free to ask questions like, \"How do I register to vote for the 2025 elections?\" or \"What is the process for casting my vote during the election?\"\n" +
                                "\n" +
                                "6. **Inquire About Recent Developments**:\n" +
                                "\n" +
                                "   * Keep up with the latest in the election process! Ask, \"What are the latest political events leading up to the 2025 election?\" or \"Has Candidate A been involved in any recent controversies?\"\n" +
                                "\n" +
                                "### Example Questions:\n" +
                                "\n" +
                                "* **\"What is Candidate A’s stance on improving the education system in the Philippines?\"**\n" +
                                "* **\"Can you provide a breakdown of the voting process for the upcoming 2025 elections?\"**\n" +
                                "* **\"How do the candidates plan to address inflation and rising costs of living?\"**\n" +
                                "\n" +
                                "Feel free to ask about anything that will help you make an informed decision or understand the election landscape better! What would you like to dive into today?\n",
                          }
                        ])
                        setInput("")
                        setIsLoading(false)
                        localStorage.removeItem("chatHistory")
                      }}
                      className="w-full sm:w-auto bg-ph-yellow hover:bg-yellow-500 text-ph-blue text-xs sm:text-sm py-1 sm:py-2"
                  >
                    Start new conversation
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-grow overflow-y-auto p-2 sm:p-4 bg-blue-50">
              <div className="space-y-3 sm:space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className={message.role === "assistant" ? "bg-ph-blue h-8 w-8 sm:h-10 sm:w-10" : "bg-ph-red h-8 w-8 sm:h-10 sm:w-10"}>
                          <AvatarFallback className="text-xs sm:text-sm">{message.role === "assistant" ? "AI" : "You"}</AvatarFallback>
                        </Avatar>
                        <div
                            className={`rounded-lg px-3 py-1 sm:px-4 sm:py-2 ${
                                message.role === "user"
                                    ? "bg-ph-red text-white"
                                    : "bg-white border-2 border-ph-yellow text-gray-800"
                            }`}
                        >
                          <ReactMarkdown
                              components={{
                                p: ({node, ...props}) => <p className="text-xs sm:text-sm whitespace-pre-wrap mb-1 sm:mb-2 last:mb-0" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                                em: ({node, ...props}) => <em className="italic" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-4 sm:pl-5 my-1 sm:my-2" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-4 sm:pl-5 my-1 sm:my-2" {...props} />,
                                li: ({node, ...props}) => <li className="mb-0 sm:mb-1 text-xs sm:text-sm" {...props} />,
                                a: ({node, ...props}) => <a className="text-blue-600 hover:underline text-xs sm:text-sm" {...props} />,
                              }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%]">
                        <Avatar className="bg-ph-blue h-8 w-8 sm:h-10 sm:w-10">
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-3 py-1 sm:px-4 sm:py-2 bg-white border-2 border-ph-yellow text-gray-800">
                          <div className="flex space-x-1 sm:space-x-2">
                            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-ph-red rounded-full animate-bounce"></div>
                            <div
                                className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-ph-blue rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                                className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-ph-yellow rounded-full animate-bounce"
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

            <CardFooter className="border-t p-2 sm:p-4 bg-white">
              <form onSubmit={handleSendMessage} className="flex w-full gap-1 sm:gap-2">
                <Input
                    placeholder="Type your question here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-grow border-2 border-ph-yellow focus-visible:ring-ph-blue text-xs sm:text-sm h-9 sm:h-10"
                />
                <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-ph-blue hover:bg-blue-800 text-xs sm:text-sm h-9 sm:h-10 px-2 sm:px-4"
                >
                  {isLoading ? (
                      <span className="h-3 w-3 sm:h-4 sm:w-4 border-2 border-blue-300 border-t-white rounded-full animate-spin"></span>
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


`Got it! So, you're focusing on the **Senate elections** for the upcoming **PiliPinas 2025**. Let's fine-tune that message to reflect this!

---

**Mabuhay! I'm your PiliPinas 2025 Senate election assistant powered by Gemini AI. I can help you understand the positions of Senate candidates, explain key political issues, or guide you through the Senate election process. Whether you want to make an informed vote or simply learn more about the candidates vying for a Senate seat, I’m here to assist you every step of the way!**

### To get the most accurate and helpful answers:

1. **Be Specific with Your Questions**:

   * Instead of asking, "Who is the best Senate candidate?", ask, "What are the main legislative priorities of Candidate A?" or "How does Candidate B plan to improve healthcare in the Philippines?"

2. **Ask About Legislative Platforms and Proposals**:

   * If you're looking to understand a candidate's stance on specific issues that affect the nation, ask something like, "What is Candidate X's position on the SOGIE bill?" or "How does Candidate Y plan to address corruption in government?"

3. **Provide Context About Your Interests**:

   * Let me know if you're particularly concerned about issues that matter to you, like education, healthcare, the environment, or job creation. For example, "What is Candidate Z’s plan for expanding access to quality education?" or "How does Candidate A propose to tackle environmental sustainability?"

4. **Compare Senate Candidates**:

   * You can ask me to compare two or more Senate candidates based on their legislative goals. For example, "How do Candidate A and Candidate B differ on their economic reform proposals?" or "What are the positions of Candidate X and Candidate Y on improving the agriculture sector?"

5. **Ask About the Election Process for Senate**:

   * If you're unsure about how Senate elections work or the registration process, feel free to ask questions like, "How does the voting system for Senate differ from the Presidential elections?" or "What is the process for casting a vote for Senate in the 2025 elections?"

6. **Stay Updated on Candidate Developments**:

   * Keep track of news and any recent changes! Ask questions like, "What are the latest updates on Candidate A’s campaign?" or "Has Candidate B faced any controversies recently?"

### Example Questions:

* **"What are the key legislative proposals of Candidate A for healthcare?"**
* **"Can you compare the platforms of Candidate B and Candidate C on education reform?"**
* **"How do the candidates plan to address corruption and strengthen government transparency?"**
* **"What is the process for voting in the Senate election in 2025?"**

Feel free to ask about anything that will help you make an informed choice or understand the Senate candidates and their platforms better! What would you like to learn more about today?

---

Let me know if you want to dive into any specific Senate candidates or issues, or if you need clarification on any of the election process details!
`


"Mabuhay! I'm your PiliPinas 2025 election assistant created by James Casipong, powered by Gemini AI. I can help you understand candidate positions, explain political issues, or guide you through the election process. Whether you're trying to make an informed vote or simply learning more about the candidates and their platforms, I’m here to assist you every step of the way!\n" +
"\n" +
"### To get the most accurate and helpful answers:\n" +
"\n" +
"1. **Be Specific with Your Questions**:\n" +
"\n" +
"   * Instead of asking, \"Who is the best candidate?\", you can ask, \"What are the key positions of Candidate A on education?\" This helps me provide tailored information about a candidate or issue.\n" +
"\n" +
"2. **Ask About Platforms, Issues, or Policies**:\n" +
"\n" +
"   * If you're looking to understand a particular candidate’s stance on an issue, ask for detailed explanations, such as, \"How does Candidate B propose to handle poverty reduction?\" or \"What is Candidate C's position on climate change?\"\n" +
"\n" +
"3. **Provide Context or Specific Concerns**:\n" +
"\n" +
"   * If you want to know more about how an issue affects you or your community, mention it! For example, \"What are the candidates' views on healthcare, especially in rural areas?\" or \"How do the candidates plan to address traffic problems in Metro Manila?\"\n" +
"\n" +
"4. **Compare Candidates**:\n" +
"\n" +
"   * You can ask me to compare two or more candidates on specific issues, such as, \"How do Candidate X and Candidate Y differ on economic policies?\" This will help you see their positions side-by-side.\n" +
"\n" +
"5. **Ask About the Election Process**:\n" +
"\n" +
"   * If you're unsure about the voting system, candidates' eligibility, or even how to register to vote, feel free to ask questions like, \"How do I register to vote for the 2025 elections?\" or \"What is the process for casting my vote during the election?\"\n" +
"\n" +
"6. **Inquire About Recent Developments**:\n" +
"\n" +
"   * Keep up with the latest in the election process! Ask, \"What are the latest political events leading up to the 2025 election?\" or \"Has Candidate A been involved in any recent controversies?\"\n" +
"\n" +
"### Example Questions:\n" +
"\n" +
"* **\"What is Candidate A’s stance on improving the education system in the Philippines?\"**\n" +
"* **\"Can you provide a breakdown of the voting process for the upcoming 2025 elections?\"**\n" +
"* **\"How do the candidates plan to address inflation and rising costs of living?\"**\n" +
"\n" +
"Feel free to ask about anything that will help you make an informed decision or understand the election landscape better! What would you like to dive into today?\n"