
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#21502c] text-slate-200 min-h-[420px]">
      <div className="container mx-auto px-4 py-16 lg:px-20">

        {/* Top Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* About (Wider Section) */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-semibold text-white">About Us</h3>
            <p className="text-md leading-6 text-slate-400">
              Kamna Group is a diversified business group built to serve everyday needs while enabling future growth. 
              The Group blends innovation, ethics, and execution to build reliable businesses. 
              Kamna Mart serves communities with convenient, hyper-local retail solutions and daily essentials, 
              while Kamna Café offers welcoming spaces for premium food and beverages. Kamna Techno and Kamna Digital 
              deliver advanced IT solutions, digital transformation, branding, and growth-focused strategies for businesses of all sizes. 
            
            </p>
          </div>

          {/* Our Business */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Our Business</h3>
            <ul className="space-y-3">
              {[
                'Kamna Techno',
                'Kamna Mart',
                'Kamna Cafe',
                'Kamna Herbs',
                'Kamna Digital',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Privacy Policy', 'Blog', 'Career'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-teal-700 pt-6 text-center">
          <p className="text-sm text-slate-400">
            © {currentYear} Kamna Group of Companies. All rights reserved.
          </p>
        </div>

      </div>
    </footer>


  );
}
