'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Generate a semi-random offer duration between 3-7 days
function getOfferDuration() {
  // Use current date to generate consistent but varying durations
  const dayOfMonth = new Date().getDate()
  const basedays = 3 + (dayOfMonth % 5) // 3-7 days
  return basedays * 24 * 60 * 60 * 1000 // Convert to milliseconds
}

export function useCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 3, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)
  
  useEffect(() => {
    const COOKIE_NAME = 'devmastery_offer_expires'
    
    // Check if we have an existing offer expiration
    let expirationTime = Cookies.get(COOKIE_NAME)
    
    if (!expirationTime || new Date(expirationTime).getTime() < Date.now()) {
      // No cookie or expired - create new offer
      const newExpiration = new Date(Date.now() + getOfferDuration())
      expirationTime = newExpiration.toISOString()
      
      // Set cookie to expire in 30 days (so we remember even after offer expires)
      Cookies.set(COOKIE_NAME, expirationTime, { expires: 30 })
    }
    
    // Calculate time remaining
    const calculateTimeLeft = () => {
      const difference = new Date(expirationTime!).getTime() - Date.now()
      
      if (difference <= 0) {
        setIsExpired(true)
        // Reset the timer with a new offer
        const newExpiration = new Date(Date.now() + getOfferDuration())
        Cookies.set(COOKIE_NAME, newExpiration.toISOString(), { expires: 30 })
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      return { days, hours, minutes, seconds }
    }
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft())
    
    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      
      // Check if just expired
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsExpired(true)
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isExpired]) // Re-run when timer expires to reset
  
  return { timeLeft, isExpired }
} 