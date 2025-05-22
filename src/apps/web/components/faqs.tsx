import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FAQsComponent() {
  return (
    <section className="relative w-full min-h-screen bg-[#0B0C0F] text-white py-20 px-4 md:px-16 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-white mb-2 border border-gray-700 px-3 py-1 rounded-md w-fit mx-auto">
          <HelpCircle className="w-4 h-4" /> FAQ's
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Frequently Asked <span className="italic font-light">Questions</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Quick answers to the most common questions about our voice AI chatbot
          platform.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side Card */}
          <div className="bg-[#0F1014] border border-[#1A1A1A] rounded-xl p-6 max-w-sm mx-auto flex flex-col justify-center items-center text-center">
            <div className="bg-[#0B0C0F] border border-gray-400 rounded-md w-10 h-10 flex items-center justify-center mb-4">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Still Have Questions?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Reach out anytime, and our team will help you get started.
            </p>
            <Button className="gap-2 cursor-pointer text-sm px-4 py-2 text-gray-300 bg-[#0F1014] shadow-md border border-gray-600">
              <ArrowUpRight className="w-4 h-4 text-white" /> Ask A Question
            </Button>
          </div>

          {/* Right Side Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-2">
            <div className="bg-[#0F1014] border border-[#1A1A1A] rounded-xl p-2">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How does your voice AI chatbot work?
                </AccordionTrigger>
                <AccordionContent>
                  Our chatbot uses advanced voice recognition and natural
                  language processing to understand and respond to your users in
                  real-time.
                </AccordionContent>
              </AccordionItem>
            </div>

            <div className="bg-[#0F1014] border border-[#1A1A1A] rounded-xl p-2">
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I customize the chatbot’s voice and personality?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can customize voice tones, accents, and personality
                  traits to match your brand identity perfectly.
                </AccordionContent>
              </AccordionItem>
            </div>

            <div className="bg-[#0F1014] border border-[#1A1A1A] rounded-xl p-2">
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Is the chatbot compatible with multiple platforms?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! Our chatbot supports integration with websites,
                  mobile apps, and popular messaging platforms.
                </AccordionContent>
              </AccordionItem>
            </div>

            <div className="bg-[#0F1014] border border-[#1A1A1A] rounded-xl p-2">
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How secure is the data collected by the chatbot?
                </AccordionTrigger>
                <AccordionContent>
                  We prioritize user privacy and data security with end-to-end
                  encryption and compliance with data protection regulations.
                </AccordionContent>
              </AccordionItem>
            </div>

            <div className="bg-[#0F1014] border border-[#1A1A1A] rounded-xl p-2">
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Can I analyze conversations and user interactions?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, our platform includes analytics tools to track user
                  interactions, conversation flow, and performance metrics.
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>
        </div>
      </div>

      {/* Gradient Bottom Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#ffffff0a] to-transparent rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
