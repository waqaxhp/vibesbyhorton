import {
  // ArrowUpRight,
  ChevronDown,
  Dot,
  Facebook,
  Instagram,
  X as TwitterX,
} from 'lucide-react'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'






function Hero() {
  const scrollToNextSection = () => {
    const next = document.getElementById('next-section')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden text-white"
      id="hero"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="/website/12920702-sd_640_360_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-4 h-full">
        <div className="flex flex-col items-center text-center max-w-3xl w-full">
          <div
            className="mb-6 bg-transparent border border-[#1a1a1a] p-4 rounded-2xl shadow-inner shadow-[#0d0d0d]"
            data-aos="zoom-in"
          >
            <div className="bg-gradient-to-tr from-gray-300 to-white rounded-full p-1">
              <div className="bg-black rounded-full w-5 h-5" />
            </div>
          </div>

          <div
            className="flex justify-center items-center gap-1 text-sm text-slate-400 mb-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <Dot className="text-blue-500" size={14} />
            <span>What’s New</span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-tight text-slate-200"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Talk Smart with <span className="font-light italic">IAN</span>
          </h1>

          <p
            className="text-sm md:text-base text-slate-400 mb-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Your intelligent voice companion – ready to chat, assist, and
            simplify your world.
          </p>

          <div className="relative justify-center pb-6 text-black">
            <InteractiveHoverButton>Start Talking</InteractiveHoverButton>
          </div>

          <div className="flex justify-center items-center gap-8 mt-10 text-gray-400">
            <TwitterX className="w-6 h-6 hover:text-white cursor-pointer" />
            <div className="w-px h-6 bg-gray-600" />
            <Instagram className="w-6 h-6 hover:text-white cursor-pointer" />
            <div className="w-px h-6 bg-gray-600" />
            <Facebook className="w-6 h-6 hover:text-white cursor-pointer" />
          </div>

          {/* Scroll Icon */}
          <div
            onClick={scrollToNextSection}
            className="text-slate-500 mt-8 animate-bounce cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <ChevronDown size={24} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
