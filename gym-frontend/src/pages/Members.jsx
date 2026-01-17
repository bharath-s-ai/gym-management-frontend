import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { memberService } from "../services/memberService"

export default function Members() {
  const [members, setMembers] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMembers()
  }, [page, search])

  const loadMembers = async () => {
    setLoading(true)
    const res = await memberService.getMembers({
      page,
      limit: 10,
      search,
    })
    setMembers(res.data.data.members || [])
    setLoading(false)
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Members</h1>

      {/* Search */}
      <input
        placeholder="Search members..."
        className="mb-4 px-4 py-2 border border-border rounded-lg w-full max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white dark:bg-zinc-900 border border-border rounded-xl overflow-hidden">

        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m._id} className="border-b hover:bg-muted/20">
                  <td className="p-4">{m.name}</td>
                  <td className="p-4">{m.phone}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs
                      ${m.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          className="px-4 py-2 border rounded"
        >
          Prev
        </button>

        <span className="px-4 py-2">Page {page}</span>

        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </Layout>
  )
}
