import { Instagram, Facebook, X } from 'lucide-react'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'

export default function ReachOutAnytime() {
  return (
    <div className="min-h-[80vh] bg-[#0B0E13] flex items-center justify-center text-white px-4 relative overflow-hidden">
      <div className="text-center max-w-2xl relative z-10">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-px w-8 bg-gray-600" />
          <p className="text-sm text-gray-400 uppercase tracking-wide">
            Reach out anytime
          </p>
          <div className="h-px w-8 bg-gray-600" />
        </div>

        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Achieve More Than Ever <br />
          Before with <span className="italic text-gray-300">AI</span>
        </h1>

        <p className="mt-4 text-sm md:text-base text-gray-400">
          Unlock endless possibilities with AI
        </p>

        <div className="mt-6">
          <InteractiveHoverButton className="text-black text-center justify-center">
            Get Started
          </InteractiveHoverButton>
        </div>

        <div className="flex justify-center items-center gap-10 mt-10 text-gray-400">
          <X className="w-7 h-7 hover:text-white cursor-pointer" />
          <div className="w-px h-6 bg-gray-600" />
          <Instagram className="w-7 h-7 hover:text-white cursor-pointer" />
          <div className="w-px h-6 bg-gray-600" />
          <Facebook className="w-7 h-7 hover:text-white cursor-pointer" />
        </div>

        <p className="mt-6 text-sm text-white underline cursor-pointer">
          AI@support.com
        </p>
      </div>
    </div>
  )
}
