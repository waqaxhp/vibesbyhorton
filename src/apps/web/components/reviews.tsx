import { Heart } from 'lucide-react'
import SingleLineMarquee from './single-line-marquee'

const users = [
  {
    name: 'David L.',
    role: 'Operations Lead',
    image: '/website/2brzgXS5fJHHMvAH83vgl5m8KTI.avif',
    quote:
      'IAN helps me manage daily operations through simple voice commands — it’s like having a real assistant.',
  },
  {
    name: 'Emily T.',
    role: 'Founder & CEO',
    image: '/website/BgsxdPJJZ3faakDHp1W2WcB8CoM.avif',
    quote:
      'IAN feels human. The voice interaction is so smooth, I forget it’s AI. Game-changer for leadership workflows.',
  },
  {
    name: 'Samantha R.',
    role: 'Product Manager',
    image: '/website/G1bC6MQnKLl8c7ZyjwpJlVGuw.avif',
    quote:
      'I use IAN in team meetings to capture notes and action items — hands-free and lightning fast.',
  },
  {
    name: 'James K.',
    role: 'Marketing Director',
    image: '/website/mCkhYgyE0LSy9RJ4nVmmGTpAjLA.avif',
    quote:
      'IAN integrates perfectly with our CRM tools. Just speak — and it’s done.',
  },
  {
    name: 'Carlos M.',
    role: 'IT Specialist',
    image: '/website/2brzgXS5fJHHMvAH83vgl5m8KTI.avif',
    quote:
      'Privacy was my top concern. IAN’s voice security protocols gave me full confidence to implement it.',
  },
  {
    name: 'Jessica M.',
    role: 'Team Lead',
    image: '/website/BgsxdPJJZ3faakDHp1W2WcB8CoM.avif',
    quote:
      'I can assign tasks, set reminders, and manage the team — all while walking. Voice-first leadership is here.',
  },
]

export default function Reviews() {
  return (
    <section className="bg-[#0B0D11] text-white pb-4" id="reviews">
      <div className="text-center mb-12 relative flex flex-col items-center">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-white" />
          <p className="text-sm text-gray-400">REVIEWS</p>
        </div>
        <h2 className="text-4xl font-semibold mt-2">
          Trusted by <span className="italic font-light">Real Users</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Hear how IAN is transforming communication and productivity through
          voice AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12 max-w-7xl mx-auto">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-[#0B0D11] rounded-2xl p-6 border-2 border-[#2a2a2f] min-h-[200px]"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-white text-sm">{user.name}</p>
                <p className="text-gray-400 text-xs">{user.role}</p>
              </div>
            </div>
            <div className="border-t border-[#2a2a2f] rounded-full my-4"></div>
            <p className="text-gray-300 text-sm">
              <span className="font-bold">…</span> {user.quote}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-10">
        <SingleLineMarquee />
      </div>
    </section>
  )
}
