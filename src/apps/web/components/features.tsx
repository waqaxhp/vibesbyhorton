import { motion } from 'framer-motion'
import { Gauge, Share2, Box } from 'lucide-react'

const Features = () => {
  return (
    <div
      className="relative text-white py-20 px-4 sm:px-10 md:px-20 lg:px-32 overflow-hidden bg-[#0B0D11]"
      id="features"
    >
      {/* Gradient background from bottom to center */}
      <div className="absolute inset-0 pointer-events-none z-0"></div>

      <div className="text-center mb-16 relative z-10">
        <div className="border border-gray-800 shadow w-32 rounded-md mx-auto flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-white mb-2">
          <Box className="w-4 h-4 text-white" />
          <span>Features</span>
        </div>
        <h2 className="text-4xl font-semibold">
          Smart Features,{' '}
          <em className="italic text-gray-300">Smarter Conversations</em>
        </h2>
        <p className="text-gray-400 mt-3">
          Everything IAN does is built to make your voice interactions feel
          natural, intelligent, and intuitive.
        </p>
      </div>

      <div className="flex justify-center relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#0B0D11] rounded-2xl w-[24rem] h-[22rem] p-8 text-center shadow-lg border border-gray-800 group">
            <div className="flex justify-center mb-6 relative w-16 h-16">
              <Gauge size={150} className="text-[#151a2bc5] left-22 absolute" />
              <motion.div
                className="w-2 h-2 left-38 rounded-full absolute top-23 origin-left"
                initial={{ rotate: -30 }}
                whileHover={{ rotate: -50 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-28">
              <h3 className="text-xl font-semibold text-white mb-2">
                Real-Time Voice AI
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                IAN listens and responds instantly — no delays, just natural and
                intelligent voice conversation.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0B0D11] rounded-2xl w-[24rem] h-[22rem] p-8 text-center shadow-lg border border-gray-800 group">
            <div className="flex justify-center mb-6 h-40 items-end gap-1">
              {[40, 55, 70, 90].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-9 bg-[#151a2bc5] rounded"
                  initial={{ height: `${h}%` }}
                  whileHover={{ height: `${h + 20}%` }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2">Learns With You</h3>
            <p className="text-sm text-gray-400">
              IAN adapts to your speaking style, preferences, and needs over
              time for more personalized responses.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0B0D11] rounded-2xl w-[24rem] h-[22rem] p-8 text-center shadow-lg border border-gray-800 group">
            <div className="flex justify-center mb-6 relative">
              <motion.div whileHover={{ x: -3 }} transition={{ duration: 0.3 }}>
                <Share2 size={150} className="text-[#151a2bc5]" />
              </motion.div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiplatform Access</h3>
            <p className="text-sm text-gray-400">
              Use IAN anywhere — web, mobile, or smart devices. Seamlessly
              integrated into your life.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
