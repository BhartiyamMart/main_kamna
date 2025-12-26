import { Sparkles, Palette, Code, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'Beautiful designs premade',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
      link: 'Learn More',
    },
    {
      icon: Palette,
      title: 'Coded with much care & notes',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
      link: 'Learn More',
    },
    {
      icon: Code,
      title: 'Amazing demos included',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
      link: 'Learn More',
    },
    {
      icon: Layers,
      title: 'Beautiful designs premade',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
      link: 'Learn More',
    },
  ];

  return (
    <section id="features" className="bg-slate-900 py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white lg:text-5xl">
                Build amazing websites
                <br />
                and landing pages with
                <br />
                ease using Sustainable
              </h2>
              <p className="text-slate-400">Powerful features to help you create stunning websites</p>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-300">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Easy Setup & Use</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Responsive Design</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Create new sections</span>
              </li>
            </ul>

            <Button className="bg-blue-600 text-white hover:bg-blue-700">Get Started</Button>
          </div>

          {/* Right side - Feature cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="hover:bg-slate-750 rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all"
              >
                <feature.icon className="mb-4 h-10 w-10 text-blue-500" />
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{feature.description}</p>
                <a href="#" className="text-sm text-blue-400 hover:underline">
                  {feature.link} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
