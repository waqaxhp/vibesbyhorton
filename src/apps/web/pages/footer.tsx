import {
  LandPlot,
  Instagram,
  Linkedin,
  Youtube,
  // Skype,
  Music2,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0B0D11] text-gray-400 border-t border-[#1a1a1a]">
      {/* Top: Logo + Nav Links + Socials */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left Section: Logo + Links */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LandPlot size={20} className="text-white" />
              <h2 className="text-white text-xl italic font-medium">
                Vibes by Horton
              </h2>
            </div>

            {/* Navigation Links */}

            <div className="flex flex-wrap gap-6 text-sm">
              <button
                onClick={() =>
                  document
                    .getElementById('features')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="hover:text-white"
              >
                Features
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById('process')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="hover:text-white"
              >
                Process
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById('pricing')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="hover:text-white"
              >
                Pricing
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById('updates')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="hover:text-white"
              >
                Updates
              </button>
            </div>
          </div>

          {/* Right Section: Social Icons */}
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Music2 size={18} /> {/* Used as TikTok placeholder */}
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Youtube size={18} />
            </a>
            {/* <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Skype size={18} />
            </a> */}
          </div>
        </div>
      </div>

      {/* Bottom: Copyright + Tags */}
      <div className="border-t border-[#1a1a1a] text-sm py-4 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-300">
            © {new Date().getFullYear()} IAN. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">
              Made by{' '}
              <a href="https://www.huboweb.com/" target="_blank">
                <span className="hover:text-white cursor-pointer text-decoration-none font-bold">
                  HuboWeb Technologies (Private) Limited.
                </span>
              </a>
            </span>

            {/* <span className="text-gray-300">
              Built in{' '}
              <span className="hover:text-white cursor-pointer">Framer</span>
            </span> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
