import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { attendanceService } from "../services/attendanceService"

export default function Attendance() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    attendanceService.getAttendance({ page: 1, limit: 50 }).then(res => {
      setRecords(res.data.data.records || [])
      setLoading(false)
    })
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>

      <div className="bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-sm overflow-hidden">

        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading attendance...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr className="text-left">
                <th className="p-4">Member</th>
                <th className="p-4">Date</th>
                <th className="p-4">Check In</th>
                <th className="p-4">Check Out</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map(r => (
                <tr key={r._id} className="border-b border-border hover:bg-muted/20 transition">
                  <td className="p-4 font-medium">{r.memberName}</td>
                  <td className="p-4">
                    {new Date(r.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">{r.checkIn || "--"}</td>
                  <td className="p-4">{r.checkOut || "--"}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${r.status === "present"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"}`}>
                      {r.status}
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
