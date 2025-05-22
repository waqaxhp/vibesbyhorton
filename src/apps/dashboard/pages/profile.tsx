import { useState } from 'react'
import { User, Mail, Phone, Lock, Eye, EyeOff, Camera } from 'lucide-react'

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  // Hardcoded user details
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+44 123 456 7890',
  }

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result
        if (typeof result === 'string') {
          setImage(result)
        }
      }
      reader.onerror = () => {
        console.error('Error reading image file.')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-[#0B0D11] text-white p-6 rounded-md max-w-3xl mx-auto space-y-6">
      {/* Profile Picture */}
      <div className="relative w-fit">
        <img
          src={image || 'https://via.placeholder.com/80'}
          alt="avatar"
          className="w-20 h-20 rounded-full border-2 border-gray-600 object-cover"
        />
        <input
          id="profileUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor="profileUpload"
          className="absolute bottom-0 right-0 bg-gray-800 p-1.5 rounded-full cursor-pointer hover:bg-gray-700"
          title="Change Profile Image"
        >
          <Camera size={16} />
        </label>
      </div>

      {/* User Details (Read-only) */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">
          User Details
        </h2>

        <div className="flex items-center gap-3">
          <User size={18} />
          <p className=" text-white">
            {user.name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Mail size={18} />
          <p className=" text-white ">
            {user.email}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} />
          <p className=" text-white ">
            {user.phone}
          </p>
        </div>
      </div>

      {/* Password Section */}
      <div className="space-y-4 mt-6">
        <h2
          onClick={() => setShowPasswordFields(!showPasswordFields)}
          className="text-lg font-semibold border-b border-gray-700 pb-2 cursor-pointer select-none hover:text-blue-400 transition"
        >
          {showPasswordFields ? 'Hide Password Fields' : 'Change Password'}
        </h2>

        {showPasswordFields && (
          <>
            <div className="flex items-center gap-3 relative">
              <Lock size={18} />
              <input
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-2 rounded w-full"
                placeholder="Old Password"
                type={showPassword ? 'text' : 'password'}
              />
              <button
                type="button"
                className="absolute right-4 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Lock size={18} />
              <input
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-2 rounded w-full"
                placeholder="New Password"
                type="password"
              />
            </div>

            <div className="flex items-center gap-3">
              <Lock size={18} />
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-2 rounded w-full"
                placeholder="Confirm Password"
                type="password"
              />
            </div>

            <button className="mt-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white">
              Update Password
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
