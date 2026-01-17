import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast.success("Welcome back 👋")
      navigate("/dashboard")
    } catch (err) {
      toast.error("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-border rounded-2xl shadow-xl p-8 space-y-6 animate-in fade-in zoom-in">

        <h1 className="text-3xl font-bold text-center">Fitboard Pro</h1>
        <p className="text-sm text-muted-foreground text-center">
          Sign in to your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-border bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <div className="text-xs text-center text-muted-foreground space-y-1">
          <p>Admin: admin@gym.com</p>
          <p>Trainer: trainer@gym.com</p>
        </div>
      </div>
    </div>
  )
}
