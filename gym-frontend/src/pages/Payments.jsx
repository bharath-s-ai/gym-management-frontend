import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { paymentService } from "../services/paymentService"

export default function Payments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    paymentService.getPayments({ page: 1, limit: 50 }).then(res => {
      setPayments(res.data.data.payments || [])
      setLoading(false)
    })
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Payments</h1>

      <div className="bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-sm overflow-hidden">

        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading payments...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr className="text-left">
                <th className="p-4">Member</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map(p => (
                <tr key={p._id} className="border-b border-border hover:bg-muted/20 transition">
                  <td className="p-4 font-medium">{p.memberName}</td>
                  <td className="p-4 font-semibold text-green-600">₹{p.amount}</td>
                  <td className="p-4 capitalize">{p.method}</td>
                  <td className="p-4">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Paid
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
