export type Testimonial = {
  id: string
  name: string
  location: string
  avatar: string
  rating: number
  text: string
  isSample: boolean
}

// Sample testimonials — replace with real customer reviews when available.
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Grace M.",
    location: "Nairobi, Kenya",
    avatar: "GM",
    rating: 5,
    text: "Sample review — Replace with a real customer testimonial. The Kenyan Sunrise Black Tea has a wonderful rich flavor that I look forward to every morning.",
    isSample: true,
  },
  {
    id: "2",
    name: "James O.",
    location: "Kisumu, Kenya",
    avatar: "JO",
    rating: 5,
    text: "Sample review — Replace with a real customer testimonial. I love the Golden Turmeric Infusion. It is warming, soothing, and made with real natural ingredients.",
    isSample: true,
  },
  {
    id: "3",
    name: "Sarah W.",
    location: "Mombasa, Kenya",
    avatar: "SW",
    rating: 5,
    text: "Sample review — Replace with a real customer testimonial. The Serenity Green Tea is unlike anything I have had before — smooth, aromatic, and truly calming.",
    isSample: true,
  },
]
