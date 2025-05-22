import { motion } from 'framer-motion'
import {
  Rocket,
  ShieldCheck,
  Sparkles,
  Code,
  CloudLightning,
  CheckCircle,
} from 'lucide-react'

const cards = [
  {
    title: 'Natural Voice Conversations',
    description:
      'Speak freely and naturally — IAN understands and responds like a real human in real time.',
    icons: [
      <Rocket key="1" className="w-12 h-12" />,
      <Sparkles key="2" className="w-12 h-12" />,
    ],
  },
  {
    title: 'Instant Responses',
    description:
      'No delays, no confusion. IAN processes your voice instantly and delivers accurate answers, fast.',
    icons: [
      <CloudLightning key="1" className="w-12 h-12" />,
      <Code key="2" className="w-12 h-12" />,
    ],
  },
  {
    title: 'Secure Voice AI',
    description:
      'Your conversations stay private. Built with enterprise-grade security and encrypted voice data.',
    icons: [
      <ShieldCheck key="1" className="w-12 h-12" />,
      <CheckCircle key="2" className="w-12 h-12" />,
    ],
  },
  {
    title: 'Learns & Adapts to You',
    description:
      'IAN gets smarter with every interaction — adapting to your preferences and communication style.',
    icons: [
      <Sparkles key="1" className="w-12 h-12" />,
      <Code key="2" className="w-12 h-12" />,
    ],
  },
  {
    title: 'Works Everywhere',
    description:
      'Use IAN on web, mobile, and smart devices. Voice AI that fits into your daily routine.',
    icons: [
      <CheckCircle key="1" className="w-12 h-12" />,
      <Rocket key="2" className="w-12 h-12" />,
    ],
  },
  {
    title: 'Easy Integrations',
    description:
      'Plug IAN into your favorite tools and workflows — for teams, individuals, or businesses.',
    icons: [
      <Code key="1" className="w-12 h-12" />,
      <CloudLightning key="2" className="w-12 h-12" />,
    ],
  },
]

const Benefit = () => {
  return (
    <div className="bg-[#0B0D11] text-white py-20 px-0.5 sm:px-10 md:px-20 lg:px-32">
      <div className="text-center mb-16 relative z-10">
        <div className="border border-gray-800 shadow w-32 rounded-md mx-auto flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-white mb-2">
          <Sparkles className="w-4 h-4 text-white" />
          <span>Benefits</span>
        </div>
        <h2 className="text-4xl font-semibold">
          Why Choose{' '}
          <em className="italic font-medium text-neutral-400">IAN?</em>
        </h2>
        <p className="text-gray-400 mt-3">
          The AI voice assistant that listens, learns, and elevates your daily
          conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative rounded-2xl p-[2px] bg-gradient-to-br from-gray-600 to-indigo-900`}
          >
            <div className="bg-[#0B0D11] rounded-2xl p-6 h-72 flex flex-col justify-between text-center">
              <div
                className={`rounded-xl p-3 mb-4 border border-gray-800 border-b-transparent`}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 50 }}
                  className={`border border-gray-400 shadow-lg bg-[#151a2bc5] rounded-lg w-30 h-20 mx-auto flex items-center justify-center gap-2 mb-4 mt-15 text-white/40 hover:text-white`}
                >
                  {card.icons.map((Icon, i) => (
                    <div key={i}>{Icon}</div>
                  ))}
                </motion.div>

                <div>
                  <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-400 px-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Benefit
