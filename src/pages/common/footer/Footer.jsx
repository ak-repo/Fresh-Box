import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const SITEMAP = [
  {
    title: "Company",
    links: ["About Us", "Our Team"],
  },
  {
    title: "Help Center",
    links: ["Contact Us", "FAQs", "Shipping", "Returns"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
  },
];

const SOCIAL_LINKS = [
  { icon: <FaFacebook />, url: "#" },
  { icon: <FaInstagram />, url: "#" },
  { icon: <FaTwitter />, url: "#" },
  { icon: <FaGithub />, url: "#" },
  { icon: <FaLinkedin />, url: "#" },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#2e2e2e] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {SITEMAP.map(({ title, links }, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-xs text-gray-400 hover:text-white transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter Column */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h3>
            <p className="text-xs text-gray-400">
              Get updates on new products and sales
            </p>
            <form className="mt-2 flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded border border-gray-700 bg-gray-800 px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="rounded bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 border-t border-gray-800 pt-6 flex flex-col-reverse items-center justify-between md:flex-row">
          <p className="mt-4 text-xs text-gray-500 md:mt-0">
            &copy; {currentYear} FreshBox. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {SOCIAL_LINKS.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="text-gray-400 hover:text-white transition-colors duration-150"
              >
                <span className="sr-only">{item.icon.type.name}</span>
                <span className="h-4 w-4">{item.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}