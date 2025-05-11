export type Position = "Pabor" | "Di Pabor" | "Wala"

export type Question = {
  id: string
  question: string
  options: Array<{ value: Position; label: string }>
}

// Define the 13 specific questions
export const questions: Question[] = [
  {
    id: "abortion",
    question: "In favor of abortion",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "death-penalty",
    question: "In favor of death penalty",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "same-sex-unions",
    question: "In favor of same-sex unions",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "divorce",
    question: "In favor of legalizing divorce",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "impeach-duterte",
    question: "In favor of impeaching Vice-president Sara Duterte",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "defend-ph-sea",
    question: "In favor of defending the West Philippine Sea against China",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "icc-cooperation",
    question: "In favor of cooperating with the International Criminal Court",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "sexuality-education",
    question: "In favor of mandatory comprehensive sexuality education",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "rotc",
    question: "In favor of mandatory Reserve Officers Training Corps",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "mining",
    question: "In favor of promoting mining in the Philippines",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "sogie-bill",
    question: "In favor of passing the Sexual Orientation, Gender Identity and Expression (SOGIE) Equality Bill",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "charter-change",
    question: "In favor of charter change",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
  {
    id: "political-dynasties",
    question: "In favor of political dynasties",
    options: [
      { value: "Pabor", label: "Pabor" },
      { value: "Di Pabor", label: "Di Pabor" },
      { value: "Wala", label: "Wala" },
    ],
  },
]

// Generate random positions for candidates
export function generateRandomPositions(): Record<string, Position> {
  const positions: Record<string, Position> = {}
  const positionValues: Position[] = ["Pabor", "Di Pabor", "Wala"]

  questions.forEach((question) => {
    positions[question.id] = positionValues[Math.floor(Math.random() * 3)]
  })

  return positions
}

// Calculate match percentage between user answers and candidate positions
export function calculateMatchPercentage(
  userAnswers: Record<string, Position>,
  candidatePositions: Record<string, Position>,
): number {
  let totalPoints = 0
  let maxPossiblePoints = 0

  // Compare each answer
  Object.keys(userAnswers).forEach((questionId) => {
    const userValue = userAnswers[questionId]
    const candidateValue = candidatePositions[questionId]

    // Award points for matching positions
    if (userValue === candidateValue) {
      totalPoints += 2
    } else if (userValue === "Wala" || candidateValue === "Wala") {
      totalPoints += 1 // Partial match if either has no position
    }

    maxPossiblePoints += 2
  })

  // Calculate match percentage
  return (totalPoints / maxPossiblePoints) * 100
}
