import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const SITEMAP = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Team", "Projects"],
  },
  {
    title: "Help Center",
    links: ["Contact Us", "FAQs", "Shipping", "Returns"],
  },
  {
    title: "Resources",
    links: ["Blog", "Recipes", "Nutrition Guide", "Wellness Tips"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
  },
];

const SOCIAL_LINKS = [
  { icon: <FaFacebook className="h-5 w-5" />, url: "#" },
  { icon: <FaInstagram className="h-5 w-5" />, url: "#" },
  { icon: <FaTwitter className="h-5 w-5" />, url: "#" },
  { icon: <FaGithub className="h-5 w-5" />, url: "#" },
  { icon: <FaLinkedin className="h-5 w-5" />, url: "#" },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#2e2e2e] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-4">
          {SITEMAP.map(({ title, links }, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold">Subscribe to our newsletter</h3>
              <p className="mt-2 text-sm text-gray-400">
                Get the latest updates on new products and upcoming sales
              </p>
            </div>
            <form className="mt-4 sm:flex sm:max-w-md md:mt-0">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-base text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {SOCIAL_LINKS.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span className="sr-only">{item.icon.type.name}</span>
                {item.icon}
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            &copy; {currentYear} FreshBox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}