'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User2 } from 'lucide-react'

type CardType = {
  id: number
  name: string
  designation: string
  content: React.ReactNode
}

export const SuccessStories: React.FC = () => {
  return (
    <div className="h-[48rem] flex items-center justify-center w-full bg-[#121212]">
      <CardStack items={CARDS} />
    </div>
  )
}

interface CardStackProps {
  items: CardType[]
  offset?: number
  scaleFactor?: number
}

const CardStack: React.FC<CardStackProps> = ({
  items,
  offset = 12,
  scaleFactor = 0.06,
}) => {
  const [cards, setCards] = useState<CardType[]>(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]
        newArray.unshift(newArray.pop()!)
        return newArray
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="w-full bg-[#0B0D11] text-white py-20 px-4 overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-sm uppercase text-muted-foreground mb-2">
          <User2 className="h-4 w-4" />
          <span>Customer Success</span>
        </div>
        <h2 className="text-4xl font-bold">
          Real Customer <span className="italic font-light">Results</span>
        </h2>
        <p className="text-muted-foreground mt-3">
          How top brands used Landio AI to unlock growth.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative w-[90vw] max-w-4xl h-[32rem]">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="absolute w-full rounded-2xl p-1"
              style={{ transformOrigin: 'top center' }}
              animate={{
                top: index * -offset,
                scale: 1 - index * scaleFactor,
                zIndex: cards.length - index,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              aria-hidden={index !== 0}
            >
              {card.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Data + JSX content combined in one for cards
const cardData = [
  {
    id: 1,
    title: "Sophia's Retail Breakthrough",
    description:
      'Sophia, the marketing lead at Trendify, used AI-driven analytics to dive deep into customer behavior. The insights led to a 40% increase in engagement and a 30% rise in repeat purchases.',
    retention: '40%',
    profits: '50%',
    image:
      'https://framerusercontent.com/images/GuFZFCQnRSOpKJkAPlCkaRUGIjc.png?scale-down-to=1024',
  },
  {
    id: 2,
    title: "Raj's Operational Overhaul",
    description:
      'Raj, an operations manager at FastFleet, optimized logistics using our insights. Delivery time was reduced by 35% and fleet efficiency improved by 45%.',
    retention: '35%',
    profits: '45%',
    image:
      'https://framerusercontent.com/images/46yWpjkwWiKJojGTr2NKnNPtJ1c.jpg?scale-down-to=1024',
  },
  {
    id: 3,
    title: "Lena's Customer Winback",
    description:
      'Lena revived churned customers with hyper-personalized campaigns, resulting in a 25% return rate and a 60% increase in average order value.',
    retention: '25%',
    profits: '30%',
    image:
      'https://framerusercontent.com/images/TXdiLXbrEnofSFENzswfxpdKpc.png?scale-down-to=1024',
  },
]

const CARDS: CardType[] = cardData.map((card) => ({
  id: card.id,
  name: card.title,
  designation: 'Customer Story',
  content: (
    <article className="bg-[#0B0D11] border border-[#2b2b2b] shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 w-full">
      <header className="flex items-center gap-2 px-6 pt-4">
        <User2 className="w-4 h-4 text-muted-foreground text-gray-400" />
        <span className="text-sm text-muted-foreground text-gray-400">
          Customer Story
        </span>
      </header>
      <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-2 text-white">
            {card.title}
          </h3>
          <p className="text-gray-400 text-base h-20 mb-6">
            {card.description}
          </p>
          <div className="flex gap-4">
            <div className="bg-[#0B0D11] rounded-xl px-6 py-4 text-center border border-[#2c2c2c]">
              <p className="text-2xl font-bold text-white">{card.retention}</p>
              <p className="text-sm text-gray-400">gain in retention</p>
            </div>
            <div className="bg-[#0B0D11] rounded-xl px-6 py-4 text-center border border-[#2c2c2c]">
              <p className="text-2xl font-bold text-white">{card.profits}</p>
              <p className="text-sm text-gray-400">surge in profits</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <img
            src={card.image}
            alt={`Image for ${card.title}`}
            className="rounded-xl border border-[#1f1f1f] shadow-lg object-cover w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  ),
}))
