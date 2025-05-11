"use client"

import { useEffect, useState } from "react"
import type { JSX } from "react"

export default function Confetti() {
  const [confetti, setConfetti] = useState<JSX.Element[]>([])

  useEffect(() => {
    const colors = ["#ce1126", "#0038a8", "#fcd116"] // Philippines flag colors
    const confettiCount = 100
    const newConfetti = []

    for (let i = 0; i < confettiCount; i++) {
      const left = Math.random() * 100
      const animationDuration = 3 + Math.random() * 2
      const animationDelay = Math.random() * 3
      const size = 5 + Math.random() * 10
      const color = colors[Math.floor(Math.random() * colors.length)]
      const rotation = Math.random() * 360

      newConfetti.push(
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${left}%`,
            top: "-20px",
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            transform: `rotate(${rotation}deg)`,
            animation: `confetti-fall ${animationDuration}s linear ${animationDelay}s infinite`,
            zIndex: 50,
          }}
        />,
      )
    }

    setConfetti(newConfetti)

    // Clean up animation after 5 seconds
    const timer = setTimeout(() => {
      setConfetti([])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return <div className="fixed inset-0 pointer-events-none overflow-hidden">{confetti}</div>
}
