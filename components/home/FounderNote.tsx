import Image from 'next/image';
import { Quote } from 'lucide-react';

export function FounderNote() {
  return (
    <section className="relative overflow-hidden px-6 py-0 pb-20">
      {/* Decorative teal background accent */}
      <div className="absolute top-0 right-0 -z-10 h-full w-1/3 translate-x-1/2 -skew-x-12 bg-[#006666]/5" />

      <div className="container mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-5">
          {/* Founder Image */}
          <div className="relative md:col-span-2">
            <div className="relative mt-20 aspect-[4/5] overflow-hidden rounded-md shadow-xl">
              <Image
                className="rounded-md object-cover"
                src="/img/manish_sinha.webp"
                alt="About Kamna Group"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004d4d]/40 to-transparent" />
            </div>
            {/* Quote Icon Badge */}
            <div className="absolute -right-6 -bottom-6 flex h-20 w-20 items-center justify-center rounded-md bg-[#00B4D8] shadow-xl">
              <Quote className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Founder Text */}
          <div className="space-y-8 md:col-span-3">
            <div className="space-y-2">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#00B4D8] uppercase">Leadership Insight</h2>
              <h3 className="text-xl leading-tight text-slate-900 md:text-5xl">A note from our founder</h3>
            </div>

            <div className="space-y-4 text-lg leading-relaxed text-slate-600 italic">
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

            <div className="inline-block border-t border-slate-200 pt-4">
              <p className="text-xl font-bold text-slate-900">Mr. Manish Sinha</p>
              <p className="font-medium text-[#006666]">Founder & Chairman, Kamna Group</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
