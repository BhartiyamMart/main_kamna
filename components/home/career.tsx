'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from '@/lib/actions/contact.server';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); // Add ref to store form reference

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.phoneNumber || !data.subject || !data.message) {
      toast.error('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        console.log('result', result);
        formRef.current?.reset(); // Use ref instead of e.currentTarget
      } else {
        toast.error(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="px-4 py-18 lg:px-20">
      <div className="container mx-auto">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Side: Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-4xl font-bold text-slate-900">Get in Touch</h2>
              <p className="text-lg text-slate-600">
                Have questions about our businesses or looking for partnership opportunities? Reach out to us and our
                team will get back to you shortly.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex gap-4">
                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <MapPin className="text-primary h-6 w-6" />
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
                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <Mail className="text-primary h-6 w-6" />
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
                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Call Us</h4>
                  <p className="text-sm text-slate-600">+91 9266413040</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <Clock className="text-primary h-6 w-6" />
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
          </div>

          {/* Right Side: Contact Form */}
          <div className="rounded-md border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/60 md:p-12">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900" htmlFor="first-name">
                    First Name
                  </label>
                  <Input
                    id="first-name"
                    name="firstName"
                    placeholder="First Name"
                    className="border-transparent bg-slate-50 focus:bg-white"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900" htmlFor="last-name">
                    Last Name
                  </label>
                  <Input
                    id="last-name"
                    name="lastName"
                    placeholder="Last Name"
                    className="border-transparent bg-slate-50 focus:bg-white"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900" htmlFor="email">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border-transparent bg-slate-50 focus:bg-white"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900" htmlFor="mobile">
                    Mobile
                  </label>
                  <Input
                    id="mobile"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Mobile"
                    className="border-transparent bg-slate-50 focus:bg-white"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900" htmlFor="subject">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Business Inquiry"
                  className="border-transparent bg-slate-50 focus:bg-white"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900" htmlFor="message">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  className="min-h-[110px] resize-none border-transparent bg-slate-50 focus:bg-white"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-[#21502c] py-6 text-lg text-white transition-all hover:bg-[#3b864c] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
