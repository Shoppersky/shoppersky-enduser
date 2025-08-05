"use client"

import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Zap, Clock } from "lucide-react"
import { useState, useEffect } from "react"

export default function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
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
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white space-y-6">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />
            <Badge className="bg-yellow-400 text-black font-bold text-lg px-4 py-2">FLASH SALE</Badge>
            <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold">
            UP TO <span className="text-yellow-300">70% OFF</span>
          </h2>

          <p className="text-xl md:text-2xl text-pink-100">Limited time offer on selected items!</p>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 my-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
              <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
              <div className="text-sm uppercase">Hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
              <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
              <div className="text-sm uppercase">Minutes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
              <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
              <div className="text-sm uppercase">Seconds</div>
            </div>
          </div>

          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 text-lg">
            <Clock className="w-5 h-5 mr-2" />
            Shop Flash Sale
          </Button>
        </div>
      </div>
    </div>
  )
}
