import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"  // Adjust this import based on your folder structure
import { ArrowRight, Users, Trophy, Heart } from 'lucide-react'
import yourImage from "../assets/cover.jpg";

export default function HeroSection() {
  const [count, setCount] = useState(0)
  const [achievementIndex, setAchievementIndex] = useState(0)
  const achievements = [
    "Making a Global Impact",
    "Leading Innovation",
    "Changing Communities",
    "Inspiring Future Generations"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => (prevCount < 50000 ? prevCount + 123 : 50000))
    }, 20)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setAchievementIndex(prevIndex => (prevIndex + 1) % achievements.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={yourImage}
          alt="Alumni gathering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-stretch flex-grow">
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Unleash Your<br />
            <span className="text-yellow-300">Alumni Power</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            Join a network of <span className="font-bold text-yellow-300">{count.toLocaleString()}+</span> graduates
            <span className="block mt-2 relative h-8 overflow-hidden">
              {achievements.map((achievement, index) => (
                <span
                  key={index}
                  className={`absolute inset-0 transition-transform duration-500 ${index === achievementIndex ? 'translate-y-0' : 'translate-y-full'}`}
                >
                  {achievement}
                </span>
              ))}
            </span>
          </p>
          <Button size="lg" className="text-lg px-8 py-6 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-fit">
            Reconnect Now <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center items-center space-y-8">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg p-6 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 mr-4 text-yellow-300" />
              <h3 className="text-2xl font-bold">Networking Events</h3>
            </div>
            <p className="text-white/80">Connect with fellow alumni and expand your professional network through our exclusive events and platforms.</p>
          </div>

          <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg p-6 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20">
            <div className="flex items-center mb-4">
              <Trophy className="h-8 w-8 mr-4 text-yellow-300" />
              <h3 className="text-2xl font-bold">Alumni Awards</h3>
            </div>
            <p className="text-white/80">Celebrate the outstanding achievements of our graduates and their contributions to society and industry.</p>
          </div>

          <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg p-6 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 mr-4 text-yellow-300" />
              <h3 className="text-2xl font-bold">Give Back</h3>
            </div>
            <p className="text-white/80">Support current students through mentorship programs and contribute to scholarships for the next generation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
