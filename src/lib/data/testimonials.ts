export type Testimonial = {
  id: string
  name: string
  location: string
  avatar: string
  rating: number
  text: string
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Grace Mwangi",
    location: "Nairobi, Kenya",
    avatar: "GM",
    rating: 5,
    text: "Tullia Tea has completely transformed my morning ritual. The Serenity Green blend is unlike anything I've had before — smooth, aromatic, and truly calming.",
  },
  {
    id: "2",
    name: "James Ochieng",
    location: "Kisumu, Kenya",
    avatar: "JO",
    rating: 5,
    text: "I discovered Tullia Tea through a friend and now I'm hooked. The quality is exceptional and knowing it's locally sourced makes it even better.",
  },
  {
    id: "3",
    name: "Sarah Wanjiku",
    location: "Mombasa, Kenya",
    avatar: "SW",
    rating: 5,
    text: "The Golden Turmeric blend is my go-to evening tea. It's warming, soothing, and I love that there are no artificial additives — just pure natural ingredients.",
  },
]
