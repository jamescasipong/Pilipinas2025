"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PhFlag } from "@/components/ph-flag"
import Link from "next/link"
import { questions } from "@/lib/questionnaire-data"
import type { Position } from "@/lib/questionnaire-data"

export default function QuestionnairePage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Position>>({})
  const [currentAnswer, setCurrentAnswer] = useState<Position | "">("")

  const currentQuestion = questions[currentQuestionIndex]
  const progress = (currentQuestionIndex / questions.length) * 100

  const handleNext = () => {
    if (currentAnswer) {
      // Save the current answer
      setAnswers({
        ...answers,
        [currentQuestion.id]: currentAnswer,
      })

      // Move to the next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setCurrentAnswer("")
      } else {
        // All questions answered, navigate to results
        router.push(
          `/results?answers=${encodeURIComponent(
            JSON.stringify({
              ...answers,
              [currentQuestion.id]: currentAnswer,
            }),
          )}`,
        )
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setCurrentAnswer(answers[questions[currentQuestionIndex - 1].id] || "")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-0 md:px-6">
      <div className="container mx-auto sm:max-w-3xl max-w-full">
        <div className="flex items-center justify-center gap-3 mb-8">
          <PhFlag className="h-8 w-8" />
          <Link href="/" className="text-2xl font-bold text-ph-blue">
            PiliPinas <span className="text-ph-red">2025</span>
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-ph-blue mb-2">Candidate Matching Questionnaire</h1>
          <div className="h-1 w-32 bg-ph-yellow mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-700">Answer the following questions to find candidates who match your values.</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="ph-progress">
            <div className="ph-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <Card className="mb-8 border-2 border-ph-yellow shadow-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-ph-blue via-ph-red to-ph-yellow w-full"></div>
          <CardHeader className="bg-white">
            <CardTitle className="text-xl text-ph-blue">{currentQuestion.question}</CardTitle>
            <CardDescription>Piliin ang iyong posisyon sa isyung ito</CardDescription>
          </CardHeader>
          <CardContent className="bg-white pt-4">
            <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer as any} className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-2 border-2 p-3 rounded-md transition-all ${
                    currentAnswer === option.value
                      ? option.value === "Pabor"
                        ? "border-green-500 bg-green-50"
                        : option.value === "Di Pabor"
                          ? "border-red-500 bg-red-50"
                          : "border-ph-yellow bg-yellow-50"
                      : "border-gray-200 hover:border-ph-yellow hover:bg-blue-50"
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-grow cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between bg-white">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="border-2 border-ph-yellow text-ph-blue hover:bg-ph-yellow hover:text-ph-blue"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!currentAnswer}
              className={`${currentQuestionIndex < questions.length - 1 ? "bg-ph-blue hover:bg-blue-800" : "bg-ph-red hover:bg-red-700"}`}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "See Results"}
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center text-gray-600 bg-white p-4 rounded-lg border-2 border-ph-yellow">
          <p>Your answers will be used to match you with candidates who share similar views.</p>
          <p>We don't store your personal data or share your responses.</p>
        </div>
      </div>
    </div>
  )
}
