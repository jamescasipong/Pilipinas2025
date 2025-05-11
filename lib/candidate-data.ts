// This file contains the candidate data and matching logic

export type Position = "strongly-agree" | "agree" | "neutral" | "disagree" | "strongly-disagree"

export type Candidate = {
  id: number
  name: string
  party: string
  image: string
  positions: Record<string, Position>
  bio: string
}

// Value mapping for scoring
export const valueMap: Record<Position, number> = {
  "strongly-agree": 2,
  agree: 1,
  neutral: 0,
  disagree: -1,
  "strongly-disagree": -2,
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
    const userValue = valueMap[userAnswers[questionId]]
    const candidateValue = valueMap[candidatePositions[questionId]]

    // Calculate the difference (0 = perfect match, 4 = complete opposite)
    const difference = Math.abs(userValue - candidateValue)
    const questionMaxDifference = 4 // max possible difference between strongly agree and strongly disagree

    // Convert to points (4 = perfect match, 0 = complete opposite)
    const questionPoints = questionMaxDifference - difference
    totalPoints += questionPoints
    maxPossiblePoints += questionMaxDifference
  })

  // Calculate match percentage
  return (totalPoints / maxPossiblePoints) * 100
}

// Get top matching candidates
export function getTopMatches(
  userAnswers: Record<string, Position>,
  candidates: Candidate[],
  limit = 12,
): Array<{ candidate: Candidate; matchPercentage: number }> {
  const candidatesWithScores = candidates.map((candidate) => {
    const matchPercentage = calculateMatchPercentage(userAnswers, candidate.positions)
    return { candidate, matchPercentage }
  })

  // Sort by match percentage (highest first) and take top matches
  return candidatesWithScores.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, limit)
}
