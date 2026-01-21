import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className=" py-18 px-4 lg:px-20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side: Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h2>
              <p className="text-lg text-slate-600">
                Have questions about our businesses or looking for partnership opportunities? Reach out to us and our
                team will get back to you shortly.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Our Location</h4>
                  <p className="text-sm text-slate-600">
                     1st Floor, B 121 Block-B Sector 2, Noida
                    <br />
                     Uttar Pradesh – 201301, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Us</h4>
                  <p className="text-sm text-slate-600">
                    info@kamnagroup.org
                    <br />
                    careers@kamnagroup.org
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Call Us</h4>
                  <p className="text-sm text-slate-600">
                    +91 9266413040
                    
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Working Hours</h4>
                  <p className="text-sm text-slate-600">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Sat: 10:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-md shadow-xl shadow-slate-200/60 border border-slate-100">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900" htmlFor="first-name">
                    First Name
                  </label>
                  <Input id="first-name" placeholder="First Name" className="bg-slate-50 border-transparent focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900" htmlFor="last-name">
                    Last Name
                  </label>
                  <Input id="last-name" placeholder="Last Name" className="bg-slate-50 border-transparent focus:bg-white" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900" htmlFor="Email">
                   Email
                  </label>
                  <Input id="first-name" placeholder="Email" className="bg-slate-50 border-transparent focus:bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900" htmlFor="Mobile">
                   Mobile
                  </label>
                  <Input id="last-name" placeholder="Mobile" className="bg-slate-50 border-transparent focus:bg-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900" htmlFor="subject">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Business Inquiry"
                  className="bg-slate-50 border-transparent focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900" htmlFor="message">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="min-h-[110px] bg-slate-50 border-transparent focus:bg-white resize-none"
                />
              </div>

              <Button className="w-full bg-[#21502c] hover:bg-[#3b864c] text-white py-6 text-lg rounded-md transition-all hover:shadow-lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
