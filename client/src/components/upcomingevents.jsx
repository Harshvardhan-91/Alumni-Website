import { CalendarIcon } from "lucide-react";
import event1 from "../assets/event1.jpg";
import event2 from "../assets/event2.jpg";
import event3 from "../assets/event3.jpg";
// Sample event data with image URLs
const events = [
  {
    id: 1,
    date: "2024-06-15",
    title: "Summer Tech Conference",
    description: "Annual conference showcasing the latest in technology trends and innovations.",
    imageUrl: event1
  },
  {
    id: 2,
    date: "2024-07-01",
    title: "Community Hackathon",
    description: "24-hour coding event to solve local community challenges.",
    imageUrl: event2
  },
  {
    id: 3,
    date: "2024-07-22",
    title: "AI and Ethics Workshop",
    description: "Exploring the ethical implications of artificial intelligence in society.",
    imageUrl: event3
  }
]

export default function UpcomingEvents() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
                role="img"
                aria-label={`Image for ${event.title}`}
              />
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                  Learn more
                  <span className="sr-only"> about {event.title}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
