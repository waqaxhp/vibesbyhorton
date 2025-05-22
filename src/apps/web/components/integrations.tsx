import {
  Facebook,
  Instagram,
  Twitter,
  Chrome,
  Zap,
  Layers,
  ShoppingCart,
  Cloud,
  CreditCard,
  Github,
  Slack,
  Figma,
  Dribbble,
} from 'lucide-react'
import { Marquee } from '@/components/magicui/marquee'
import { cn } from '@/lib/utils'

const icons = [
  Twitter,
  Facebook,
  Instagram,
  Chrome,
  Zap,
  Layers,
  ShoppingCart,
  CreditCard,
  Cloud,
  Github,
  Slack,
  Figma,
  Dribbble,
]

const IconCard = ({ Icon }: { Icon: React.ElementType }) => {
  return (
    <div
      className={cn(
        'h-16 w-16 shrink-0 rounded-xl border flex items-center justify-center',
        'border-white/10 bg-[#181d25] text-white'
      )}
    >
      <Icon className="w-6 h-6" />
    </div>
  )
}

export default function IntegrationsMarquee() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0B0D11] text-white px-4 py-16">
      <div className="text-center max-w-4xl w-full mx-auto">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Layers className="w-4 h-4 text-white" />
          <span className="text-xs uppercase tracking-widest text-gray-400">
            Integrations
          </span>
        </div>

        <h2 className="text-4xl font-semibold mb-4">
          Integrations That Power Your{' '}
          <span className="italic font-light">Voice</span>
        </h2>
        <p className="text-gray-400 mb-10">
          IAN connects seamlessly with the tools you already use — making your
          conversations smarter and more productive.
        </p>

        <div className="relative w-full rounded-3xl shadow-xl backdrop-blur-lg bg-[#0B0D11] overflow-hidden py-8 space-y-6">
          <Marquee pauseOnHover className="[--duration:30s]">
            {[...icons, ...icons].map((Icon, i) => (
              <IconCard key={`row1-${i}`} Icon={Icon} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:25s]">
            {[...icons, ...icons].map((Icon, i) => (
              <IconCard key={`row2-${i}`} Icon={Icon} />
            ))}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:35s]">
            {[...icons, ...icons].map((Icon, i) => (
              <IconCard key={`row3-${i}`} Icon={Icon} />
            ))}
          </Marquee>

          <p className="text-gray-400 text-sm mt-4">
            "IAN integrates effortlessly with 100+ apps — so your voice does
            more, faster."
          </p>

          {/* Edge fade gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0B0D11]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0B0D11]" />
        </div>
      </div>
    </section>
  )
}
