import { LayoutDashboard, Users, Mic, Settings } from "lucide-react";

function Dashhome() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back 👋</h1>
        <p className="text-gray-600 mt-1">
          Here's a quick look at your dashboard activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          title="Total Users"
          value="1,240"
          icon={<Users className="w-6 h-6 text-blue-500" />}
        />
        <DashboardCard
          title="Voice Chats"
          value="342"
          icon={<Mic className="w-6 h-6 text-purple-500" />}
        />
        <DashboardCard
          title="System Settings"
          value="Updated"
          icon={<Settings className="w-6 h-6 text-green-500" />}
        />
        <DashboardCard
          title="Active Sessions"
          value="28"
          icon={<LayoutDashboard className="w-6 h-6 text-yellow-500" />}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-3 text-gray-600">
          <li>🔹 User John created a voice chat session.</li>
          <li>🔹 Settings were updated at 9:42 AM.</li>
          <li>🔹 3 new users joined your platform.</li>
        </ul>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default Dashhome;
