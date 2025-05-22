// import React from 'rea
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Pause } from 'lucide-react'

function ElevenLabs() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [email, setEmail] = useState('')
  const [tempEmail, setTempEmail] = useState('')

  const handleConnectClick = () => {
    if (email) {
      // Disconnect
      setEmail('')
      setTempEmail('')
      setIsConnecting(false)
      localStorage.removeItem('connectedEmail')
    } else if (isConnecting) {
      // Cancel connect
      setIsConnecting(false)
      setTempEmail('')
    } else {
      // Start connecting
      setIsConnecting(true)
      setTempEmail('')
    }
  }

  const handleConnectEmail = () => {
    if (tempEmail.trim() === '') return
    const trimmed = tempEmail.trim()
    setEmail(trimmed)
    localStorage.setItem('connectedEmail', trimmed)
    setIsConnecting(false)
  }

  return (
    <div>
      <div className="mb-6 grid grid-cols-12 gap-4">
        {/* Connect Card */}
        <div className="col-span-12 md:col-span-6">
          <div className="rounded-lg border border-white/10 bg-[#1a1d22] p-6 shadow">
            <div className="mb-4 flex items-center gap-2">
              <Pause/>
              <h3 className="text-lg font-semibold">Eleven Labs</h3>
            </div>

            {email && (
              <div className="mb-2 text-sm text-gray-300">
                <div className="font-semibold">John Doe</div>
                <div className="break-all">{email}</div>
              </div>
            )}

            {!email && !isConnecting && (
              <p className="mb-4 text-sm text-gray-400">
                Sync your events from your Eleven Labs directly into this
                dashboard.
              </p>
            )}

            {isConnecting && !email && (
              <div className="mb-4 flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="rounded border border-white/20 bg-[#0B0D11] p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={handleConnectEmail}
                  disabled={!tempEmail.trim()}
                  className="bg-[#0B0D11] text-white"
                >
                  Connect
                </Button>
              </div>
            )}

            <Button
              onClick={handleConnectClick}
              variant={email ? 'destructive' : undefined}
              className={email ? '' : 'bg-[#0B0D11] text-white'}
            >
              {email ? 'Disconnect' : isConnecting ? 'Cancel' : 'Connect'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElevenLabs
