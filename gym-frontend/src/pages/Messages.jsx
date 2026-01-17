import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { messageService } from "../services/messageService"

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    messageService.getMessages({ page: 1, limit: 50 }).then(res => {
      setMessages(res.data.data.messages || [])
      setLoading(false)
    })
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-sm overflow-hidden">

        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading messages...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr className="text-left">
                <th className="p-4">Recipient</th>
                <th className="p-4">Type</th>
                <th className="p-4">Message</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {messages.map(m => (
                <tr key={m._id} className="border-b border-border hover:bg-muted/20 transition">
                  <td className="p-4 font-medium">{m.recipient}</td>
                  <td className="p-4 capitalize">{m.type}</td>
                  <td className="p-4 max-w-xs truncate">{m.content}</td>
                  <td className="p-4">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${m.status === "sent"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"}`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </Layout>
  )
}
