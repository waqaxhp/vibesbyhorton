'use client'

import { Mail, User, Headphones, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

// ✅ Schema with full typing
const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(5, 'Message should be at least 5 characters'),
})

// ✅ Infer type from schema (no 'any')
type ContactFormData = z.infer<typeof formSchema>

export default function Contact() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('Form Data:', data)
    // Add real API call here if needed
  }

  return (
    <section
      className="min-h-screen bg-[#0B0E13] text-white px-4 py-20 flex flex-col items-center justify-center"
      id="contact"
    >
      {/* Contact Top Label */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Phone className="w-4 h-4 text-white" />
        <p className="text-sm text-gray-400 uppercase tracking-wide">Contact</p>
      </div>

      <h2 className="text-4xl md:text-5xl font-semibold text-center mb-2">
        Reach Us <span className="italic text-gray-300">Anytime</span>
      </h2>
      <p className="text-gray-400 text-center text-sm md:text-base mb-12">
        Have questions or need help? We're here for you
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Left Info Section */}
        <div className="flex flex-col min-h-[520px]">
          {/* Card 1 */}
          <div className="bg-[#11141A] p-6 rounded-t-xl h-[200px] border border-[#1F232B] border-b-0 flex flex-col justify-between">
            {/* Row 1: Icon + Title */}
            <div className="flex items-center gap-4">
              <div className="bg-[#151a24] w-12 h-12 rounded-md shadow-md shadow-black/30 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Email Us</h3>
            </div>

            {/* Row 2: Paragraph with 2 lines and bigger font */}
            <p className="text-gray-400 text-base leading-snug mt-2 line-clamp-2">
              Have technical questions or product concerns? We're here to help.
            </p>

            {/* Row 3: Bold link */}
            <a
              href="mailto:AI@support.com"
              className="text-white font-bold underline text-sm mt-2"
            >
              AI@support.com
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-[#11141A] p-6 rounded-b-xl h-[200px] border border-[#151a24] flex flex-col justify-between mt-5">
            {/* Row 1:*/}
            <div className="flex items-center gap-4">
              <div className="bg-[#151a24] w-12 h-12 rounded-md shadow-md shadow-black/30 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Contact Sales
              </h3>
            </div>

            {/* Row 2:*/}
            <p className="text-gray-400 text-base leading-snug mt-2 line-clamp-2">
              Interested in custom solutions or product demos? Let’s talk.
            </p>

            {/* Row 3:*/}
            <a href="#" className="text-white font-bold underline text-sm mt-2">
              Schedule a call
            </a>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="bg-[#11141A] p-8 rounded-xl border border-[#151a24] min-h-[560px] flex flex-col justify-between">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="bg-[#151a24] w-12 h-12 rounded-md shadow-md shadow-black/30 flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base font-medium">
              We're here to help! Tell us how we can assist you.
            </h3>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#0B0E13] text-white border border-[#151a24]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#0B0E13] text-white border border-[#151a24]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subject */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#0B0E13] text-white border border-[#151a24]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-[#0B0E13] text-white border border-[#151a24]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#0B0E13] text-white font-semibold cursor-pointer mt-2 border border-[#151a24]"
              >
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
