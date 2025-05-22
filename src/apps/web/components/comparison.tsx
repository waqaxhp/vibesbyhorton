import { Check, X, ListChecks, LandPlot, Layers } from 'lucide-react'

const Comparison = () => {
  const AIFeatures = [
    'Real-time natural language understanding',
    'Multi-language voice recognition',
    'Seamless integration with popular messaging apps',
    'Continuous learning and improvement',
    '24/7 dedicated support and updates',
  ]

  const otherFeatures = [
    'Limited to text-based interactions',
    'Supports only a few languages',
    'Difficult to connect with third-party apps',
    'Static scripts without learning capability',
    'No dedicated customer support',
  ]

  return (
    <section className="relative bg-[#0B0D11] text-white py-20 px-4 sm:px-10 md:px-20 lg:px-32 overflow-hidden">
      {/* Background Gradient at Bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-40 bg-gradient-to-t from-[#1f2128] to-transparent opacity-30 rounded-full blur-2xl pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white mb-4 border border-gray-700 px-4 py-1 rounded-full">
          <ListChecks size={16} />
          <span>Comparison</span>
        </div>
        <h2 className="text-4xl font-semibold mb-2">
          Why <span className="italic font-light">Our Voice AI</span> Stands
          Out?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Discover how our voice AI chatbot excels compared to traditional
          chatbot platforms.
        </p>
      </div>

      {/* Labels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 text-center relative z-10">
        <div className="flex justify-center items-center gap-2 text-2xl font-bold">
          <LandPlot size={24} className="text-gray-200" />
          Voice AI
        </div>
        <div className="flex justify-center items-center gap-2 text-2xl font-bold">
          <Layers size={24} className="text-gray-200" />
          Traditional Chatbots
        </div>
      </div>

      {/* Comparison Containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* AI Container */}
        <div className="bg-gradient-to-b from-[#11131A] to-[#0B0D11] border-t border-gray-400 border-b border-gray-800 rounded-xl p-6">
          <ul className="space-y-5">
            {AIFeatures.map((feature, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-start gap-2">
                  <Check className="text-white mt-1 shrink-0" size={18} />
                  <span>{feature}</span>
                </div>
                <hr className="border-t border-gray-700 mt-3" />
              </li>
            ))}
          </ul>
        </div>

        {/* Other Container */}
        <div className="bg-gradient-to-b from-[#11131A] to-[#0B0D11] border-t border-gray-400 border-b border-gray-800 rounded-xl p-6">
          <ul className="space-y-5">
            {otherFeatures.map((feature, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-start gap-2">
                  <X className="text-gray-400 mt-1 shrink-0" size={18} />
                  <span>{feature}</span>
                </div>
                <hr className="border-t border-gray-700 mt-3" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Comparison
