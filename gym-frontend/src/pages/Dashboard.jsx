import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { dashboardService } from "../services/dashboardService"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [revenue, setRevenue] = useState([])
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    dashboardService.getStats().then(res => {
      setStats(res.data.data.summary)
    })

    dashboardService.getRevenueChart(6).then(res => {
      setRevenue(res.data.data || [])
    })

    dashboardService.getAttendanceChart(7).then(res => {
      setAttendance(res.data.data || [])
    })
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Total Members" value={stats?.totalMembers || 0} />
        <Card title="Active Members" value={stats?.activeMembers || 0} />
        <Card title="Expiring Soon" value={stats?.expiringSoon || 0} />
        <Card title="Monthly Revenue" value={`₹${stats?.monthlyRevenue || 0}`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <ChartBox title="Revenue (Last 6 Months)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox title="Attendance (Last 7 Days)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendance}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

      </div>
    </Layout>
  )
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-border rounded-xl p-6 shadow-sm">
      <p className="text-sm text-muted-foreground mb-2">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  )
}

function ChartBox({ title, children }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-border rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  )
}
