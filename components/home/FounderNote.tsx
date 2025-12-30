import Image from "next/image"
import { Quote } from "lucide-react"

export function FounderNote() {
  return (
    <section className="py-0 pb-20 px-6  relative overflow-hidden">
      {/* Decorative teal background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#006666]/5 -skew-x-12 translate-x-1/2 -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Founder Image */}
          <div className="md:col-span-2 relative">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl">
              {/* <Image width={1000} height={1000} src="/img_founder.jpg" alt="Founder of Kamna Group" fill className="object-cover" /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#004d4d]/40 to-transparent" />
            </div>
            {/* Quote Icon Badge */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#00B4D8] rounded-2xl flex items-center justify-center shadow-xl">
              <Quote className="text-white w-10 h-10" />
            </div>
          </div>

          
          {/* Founder Text */}
          <div className="md:col-span-3 space-y-8"> 
            <div className="space-y-2">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#00B4D8] uppercase">Leadership Insight</h2>
              <h3 className="text-xl md:text-5xl  text-slate-900 leading-tight">A note from our founder</h3>
            </div>

            <div className="space-y-4 text-lg text-slate-600 leading-relaxed italic">
              <p>
                "At Kamna Group, our journey began with a simple yet powerful vision: to create a legacy of trust and
                innovation that touches every Indian household. We believe that true growth is not just about numbers,
                but about the positive impact we leave on the communities we serve."
              </p>
              <p>
                "Our diversification into FMCG, retail, and technology is driven by a commitment to excellence and a
                deep understanding of evolving consumer needs. As we move forward, we remain dedicated to our core
                values of integrity, quality, and forward-thinking leadership."
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 inline-block">
              <p className="text-xl font-bold text-slate-900">Mr. Manish Sinha</p>
              <p className="text-[#006666] font-medium">Founder & Chairman, Kamna Group</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
