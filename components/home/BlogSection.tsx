import Image from "next/image"
import { ArrowRight } from "lucide-react"

const BLOG_POSTS = [
  {
    title: "Innovation in the FMCG Sector",
    excerpt: "How digital transformation is reshaping the way we think about retail and consumer goods...",
    date: "Dec 24, 2025",
    image: "/img/modern-office-innovation.jpg",
  },
  {
    title: "Sustainable Business Practices",
    excerpt: "Commitment to quality doesn't just mean excellence in products, but excellence in our impact...",
    date: "Dec 20, 2025",
    image: "/img/nature-sustainability-business.jpg",
  },
  {
    title: "The Future of Digital Marts",
    excerpt: "Exploring the intersection of convenience and technology in the modern retail landscape...",
    date: "Dec 15, 2025",
    image: "/img/digital-retail-technology.jpg",
  },
]

export function BlogSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-26">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">Latest from our blog</h2>
            <p className="text-lg text-slate-600">
              Stay updated with the latest trends, news, and insights from the Kamna Group of Companies.
            </p>
          </div>
          <button className="flex items-center gap-2 text-[#006666] font-semibold hover:underline">
            View all posts <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-[#00B4D8]">{post.date}</p>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-[#006666] transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-[#006666] font-medium pt-2">
                  Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
