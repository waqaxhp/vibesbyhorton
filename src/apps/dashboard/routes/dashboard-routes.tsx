import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '../layouts/dashboard-layout'
import User from '../pages/user'
import VoiceBotChat from '../pages/voicechat'
import Dashhome from '../pages/dashhome'
import LiveCall from '../pages/livecall'
import Integration from '../pages/integration'
import GoogleCalendar from '../pages/google-calendar'
import ElevenLabs from '../pages/eleven-labs'
import Settings from '../pages/settings'
import CallLogs from '../pages/call-logs'
import Profile from '../pages/profile'
import Voices from '../pages/voices'
import TextToSpeech from '../pages/text-to-speech'
import Calendar from '../pages/calendar'
import History from '../pages/history'
import Billings from '../pages/billings'

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashhome />} />
        <Route path="voice-bot-chat" element={<VoiceBotChat />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="live-call" element={<LiveCall />} />
        <Route path="call-logs" element={<CallLogs />} />
        <Route path="text-to-speech" element={<TextToSpeech />} />
        <Route path="voices" element={<Voices />} />

        <Route path="integrations" element={<Integration />} />
        <Route
          path="/integration/google-calendar"
          element={<GoogleCalendar />}
        />
        <Route path="/integration/eleven-labs" element={<ElevenLabs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<Profile />} />
        <Route path="/settings/users" element={<User />} />
        <Route path="/settings/history" element={<History />} />
        <Route path="/settings/billings" element={<Billings />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default DashboardRoutes
