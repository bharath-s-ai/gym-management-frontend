import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Layout({ children }) {
  const { user, logout } = useAuth()

  const [dark, setDark] = useState(
  localStorage.getItem("theme") === "dark"
)

useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  } else {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }
}, [dark])


  return (
    <div className="min-h-screen flex bg-background">

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-border p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Fitboard Pro</h2>

        <nav className="space-y-3 text-sm">
          <Link className="block hover:text-primary" to="/dashboard">Dashboard</Link>
          <Link className="block hover:text-primary" to="/members">Members</Link>
          <Link className="block hover:text-primary" to="/payments">Payments</Link>
          <Link className="block hover:text-primary" to="/attendance">Attendance</Link>
          <Link className="block hover:text-primary" to="/messages">Messages</Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white dark:bg-zinc-900 border-b border-border p-4 flex justify-between items-center">
  <span className="text-sm">Welcome, {user?.name}</span>

  <div className="flex items-center gap-4">
    <button
      onClick={() => setDark(!dark)}
      className="text-sm px-3 py-1 border border-border rounded hover:bg-muted/20"
    >
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>

    <button
      onClick={logout}
      className="text-sm text-red-600 hover:underline"
    >
      Logout
    </button>
  </div>
</header>


        {/* Content */}
        <main className="p-6 flex-1 bg-muted/20">
          {children}
        </main>

      </div>
    </div>
  )
}
