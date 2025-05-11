"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PhFlag } from "@/components/ph-flag"
import Confetti from "@/components/confetti"
import { getAllCandidates, getTopMatches } from "@/lib/candidates-data"
import type { Position } from "@/lib/questionnaire-data"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [matchedCandidates, setMatchedCandidates] = useState<
    Array<{
      candidate: ReturnType<typeof getAllCandidates>[0]
      matchPercentage: number
    }>
  >([])
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const answersParam = searchParams.get("answers")
    if (answersParam) {
      try {
        const userAnswers = JSON.parse(decodeURIComponent(answersParam)) as Record<string, Position>
        const candidates = getAllCandidates()

        // Get top matches using the utility function
        const topMatches = getTopMatches(userAnswers, candidates, 12)
        setMatchedCandidates(topMatches)
      } catch (error) {
        console.error("Error parsing answers:", error)
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-0 md:px-6 relative">
      {showConfetti && <Confetti />}

      <div className="mx-auto max-w-5xl md:container px-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <PhFlag className="h-8 w-8" />
          <Link href="/" className="text-2xl font-bold text-ph-blue">
            PiliPinas <span className="text-ph-red">2025</span>
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-ph-blue mb-2">Your Candidate Matches</h1>
          <div className="h-1 w-32 bg-ph-yellow mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Based on your answers, we've identified the candidates who most closely align with your views. Here are your
            top matches:
          </p>
        </div>

        {matchedCandidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {matchedCandidates.map(({ candidate, matchPercentage }, index) => (
              <Card
                key={candidate.id}
                className="overflow-hidden border-2 border-ph-yellow shadow-lg hover:shadow-xl transition-all"
              >
                <div
                  className={`h-2 ${
                    index % 3 === 0 ? "bg-ph-red" : index % 3 === 1 ? "bg-ph-blue" : "bg-ph-yellow"
                  } w-full`}
                ></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div
                      className={`relative w-16 h-16 rounded-full overflow-hidden border-2 ${
                        index % 3 === 0 ? "border-ph-red" : index % 3 === 1 ? "border-ph-blue" : "border-ph-yellow"
                      }`}
                    >
                      <img
                        src={candidate.profileLink || "/placeholder.svg"}
                        alt={candidate.fullName}
                        className="w-full h-full object-cover"
                      />
                      {index < 3 && (
                        <div
                          className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            index === 0 ? "bg-ph-red" : index === 1 ? "bg-ph-blue" : "bg-ph-yellow text-ph-blue"
                          }`}
                        >
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <CardTitle
                        className={`text-lg ${
                          index % 3 === 0 ? "text-ph-red" : index % 3 === 1 ? "text-ph-blue" : "text-gray-800"
                        }`}
                      >
                        {candidate.lastName}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`mt-1 ${
                          index % 3 === 0
                            ? "border-ph-red text-ph-red"
                            : index % 3 === 1
                              ? "border-ph-blue text-ph-blue"
                              : "border-ph-yellow text-gray-800"
                        }`}
                      >
                        {candidate.partyList}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Match Score</span>
                      <span className="font-bold">{Math.round(matchPercentage)}%</span>
                    </div>
                    <div className="ph-progress">
                      <div className="ph-progress-bar" style={{ width: `${matchPercentage}%` }}></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{candidate.bio}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-2 border-ph-yellow text-ph-blue hover:bg-ph-yellow hover:text-ph-blue"
                  >
                    <Link href={`/candidates/${candidate.balotaNumber}`}>View Full Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-ph-yellow shadow-lg">
            <div className="w-16 h-16 border-4 border-t-ph-red border-r-ph-blue border-b-ph-yellow border-l-ph-blue rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-ph-blue font-medium">Calculating your matches...</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button
            asChild
            variant="outline"
            className="border-2 border-ph-yellow text-ph-blue hover:bg-ph-yellow hover:text-ph-blue"
          >
            <Link href="/questionnaire">Retake Questionnaire</Link>
          </Button>
          <Button asChild className="bg-ph-red hover:bg-red-700">
            <Link href="/chatbot">Chat with AI Assistant</Link>
          </Button>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg border-2 border-ph-yellow shadow-lg max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-ph-blue flex items-center justify-center text-white font-bold">
              i
            </div>
            <h2 className="text-xl font-bold text-ph-red">Understanding Your Results</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Your match percentage indicates how closely a candidate's positions align with your own based on the
            questions you answered. A higher percentage means more alignment with your views.
          </p>
          <p className="text-gray-700 mb-4">
            Remember that this tool provides a simplified view of complex political positions. We encourage you to:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
            <li>Research candidates' full platforms and policy details</li>
            <li>Consider factors beyond issue positions, such as experience and leadership</li>
            <li>Attend debates or town halls to learn more about the candidates</li>
            <li>Check candidates' voting records if they've held office before</li>
          </ul>
          <p className="text-gray-700">
            This tool is meant to be a starting point for your election research, not a definitive guide to voting.
          </p>
        </div>
      </div>
    </div>
  )
}
