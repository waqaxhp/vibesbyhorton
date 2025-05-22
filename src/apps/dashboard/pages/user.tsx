import { useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

type UserType = {
  id: number;
  name: string;
  email: string;
  active: boolean;
};

const initialUsers: UserType[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", active: true },
  { id: 2, name: "Bob Smith", email: "bob@example.com", active: false },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", active: true },
];

export default function User() {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleAddClick = () => {
    setFormData({ name: "", email: "" });
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEditClick = (user: UserType) => {
    setFormData({ name: user.name, email: user.email });
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleToggleActive = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const handleSubmit = () => {
    if (editingUser) {
      // Update existing user
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id ? { ...user, ...formData } : user
        )
      );
    } else {
      // Add new user
      const newUser: UserType = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        active: true,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded shadow"
        >
          <Plus className="mr-2 h-5 w-5" /> Add New User
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 border-b border-gray-700">ID</th>
            <th className="p-3 border-b border-gray-700">Name</th>
            <th className="p-3 border-b border-gray-700">Email</th>
            <th className="p-3 border-b border-gray-700">Status</th>
            <th className="p-3 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-800">
              <td className="p-3 border-b border-gray-700">{user.id}</td>
              <td className="p-3 border-b border-gray-700">{user.name}</td>
              <td className="p-3 border-b border-gray-700">{user.email}</td>
              <td className="p-3 border-b border-gray-700">
                <button onClick={() => handleToggleActive(user.id)}>
                  {user.active ? (
                    <ToggleRight className="text-green-400 w-6 h-6" />
                  ) : (
                    <ToggleLeft className="text-gray-400 w-6 h-6" />
                  )}
                </button>
              </td>
              <td className="p-3 border-b border-gray-700 space-x-3">
                <button
                  onClick={() => handleEditClick(user)}
                  className="text-blue-400 hover:text-blue-600"
                  title="Edit"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-400 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? "Edit User" : "Add New User"}
            </h2>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white "
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white "
              >
                {editingUser ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
