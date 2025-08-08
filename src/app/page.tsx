'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api'

type Application = {
  id: number
  applicantName: string
  amount: number
  status: string
  applicant: {
    username: string
  }
}

export default function HomePage() {
  const [apps, setApps] = useState<Application[]>([])

  useEffect(() => {
    api.get('/api/mortgage/applications')
        .then(res => setApps(res.data.data || []))
        .catch(console.error)
  }, [])

  return (
      <main className="p-4">
        <h1 className="text-2xl font-bold">Mortgage Applications</h1>
        <ul className="mt-4 space-y-2">
          {apps.map(app => (
              <li key={app.id} className="border p-4 rounded shadow">
                <p><strong>Applicant:</strong> {app.applicantName}</p>
                <p><strong>Amount:</strong> {app.amount}</p>
                <p><strong>Status:</strong> {app.status}</p>
                {/*<p><strong>Username:</strong> {app.applicant.username}</p>*/}
              </li>
          ))}
        </ul>
      </main>
  )
}
