import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"
import dean from "../assets/dean.jpg";

export default function DeanMessage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/5 relative">
            <img
              src={dean}
              alt="Dean's portrait"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-2xl font-bold">Dr. Binod Kumar Kannaujia</h2>
              <p className="text-sm opacity-75">Director, NIT Jalandhar</p>
            </div>
          </div>
          <CardContent className="md:w-3/5 p-6 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10">
            <QuoteIcon className="w-12 h-12 text-primary/20 mb-4" />
            <div className="space-y-4">
              <p className="text-lg font-medium">Dear Esteemed Alumni,</p>
              <p>
                It is with great pleasure and a sense of pride that I reach out to you from the heart of our
                beloved alma mater. As we navigate through these dynamic times, the unwavering strength and
                support of our alumni community have become our guiding light.
              </p>
              <p>
                From the bottom of my heart, thank you for being such a vital, vibrant part of our community.
                Together, hand in hand, we will continue to build upon the legacy of excellence that defines
                our university and illuminates the path for future generations.
              </p>
              <div className="pt-4">
                <p className="font-semibold">With warmest regards and deepest gratitude,</p>
                {/* <img
                  src="/placeholder.svg?height=60&width=200"
                  alt="Dr. Jane Doe's signature"
                  className="mt-2 h-12 w-auto"
                /> */}
                <p className="mt-2 font-semibold">Dr. Binod Kumar Kannaujia</p>
                <p className="text-sm text-muted-foreground">Director, NIT Jalandhar</p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}