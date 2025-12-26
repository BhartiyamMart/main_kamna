export default function ServicesSection() {
  const services = [
    {
      title: 'Apps Mobile Application Development',
      description: 'Learn More',
      bgColor: 'from-purple-400 to-purple-500',
      image: '/mobile-app-development.png',
    },
    {
      title: 'Wieby Dashboard Designs',
      description: 'Learn More',
      bgColor: 'from-cyan-400 to-blue-400',
      image: '/dashboard-design-illustration.jpg',
    },
    {
      title: 'Frontend Development',
      description: 'Learn More',
      bgColor: 'from-blue-400 to-blue-500',
      image: '/frontend-development-illustration.jpg',
    },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white lg:text-5xl">
              Work done by us to grow
              <br />
              your revenue
            </h2>
            <p className="text-slate-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
              Get Started
            </button>
          </div>

          {/* Right side - Service cards */}
          <div className="grid gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${service.bgColor} flex h-48 flex-col justify-between p-8`}
              >
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-white">{service.title}</h3>
                  <a href="#" className="text-sm text-white/90 hover:underline">
                    {service.description} →
                  </a>
                </div>
                <div className="absolute right-0 bottom-0 h-32 w-32 opacity-20">
                  <div className="h-full w-full rounded-tl-full bg-white/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
