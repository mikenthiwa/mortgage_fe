'use client'
import { useState } from 'react'
import api from '@/lib/api'

export default function AdminPage() {
    const [appId, setAppId] = useState('')
    const [status, setStatus] = useState('APPROVED')
    const [userId, setUserId] = useState('')

    const handleUpdate = async () => {
        try {
            const res = await api.put(`/application/${appId}/status`, null, {
                params: { userId, status }
            })
            alert('Status updated')
            console.log(res.data)
        } catch (err) {
            console.error(err)
            alert('Update failed')
        }
    }
    
    

    return (
        <main className="p-4">
            <h1 className="text-xl font-bold">Admin: Update Application Status</h1>
            <div className="space-y-2 mt-4">
                <input className="border p-2 w-full" placeholder="Application ID" onChange={e => setAppId(e.target.value)} />
                <select className="border p-2 w-full" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                </select>
                <input className="border p-2 w-full" placeholder="Admin User ID" onChange={e => setUserId(e.target.value)} />
                <button className="bg-green-600 text-white p-2 rounded" onClick={handleUpdate}>Update Status</button>
            </div>
        </main>
    )
}
