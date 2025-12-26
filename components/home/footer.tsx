import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-teal-800 bg-teal-900 text-slate-200">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:gap-8 lg:gap-16">
          {/* Brand section */}
          <div className="max-w-[300px]">
            <h3 className="mb-4 font-semibold text-white">About us</h3>
            <p className="text-sm leading-6 text-slate-400">
              Kamna Group of Companies is a forward-thinking and multi-diversified enterprise dedicated to transforming
              daily experiences through innovation, convenience, and quality.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Our Business</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Kamna Cafe
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Kamna Herbs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Kamna Digital
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Kamna Mart
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter section */}

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-teal-700 pt-8 text-center md:flex-row">
          <p className="m-auto text-sm text-slate-400">© {currentYear} Kamna Group . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
