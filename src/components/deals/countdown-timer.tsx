"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-accent text-accent-foreground rounded-lg p-6 mb-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Flash Sale Ends In</h2>
      </div>

      <div className="flex items-center justify-center gap-4 text-3xl font-mono font-bold">
        <div className="bg-background/20 rounded-lg px-4 py-2">
          <div>{timeLeft.hours.toString().padStart(2, "0")}</div>
          <div className="text-sm font-normal opacity-80">Hours</div>
        </div>
        <div className="text-4xl">:</div>
        <div className="bg-background/20 rounded-lg px-4 py-2">
          <div>{timeLeft.minutes.toString().padStart(2, "0")}</div>
          <div className="text-sm font-normal opacity-80">Minutes</div>
        </div>
        <div className="text-4xl">:</div>
        <div className="bg-background/20 rounded-lg px-4 py-2">
          <div>{timeLeft.seconds.toString().padStart(2, "0")}</div>
          <div className="text-sm font-normal opacity-80">Seconds</div>
        </div>
      </div>
    </div>
  )
}
