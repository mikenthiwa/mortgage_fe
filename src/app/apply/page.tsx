'use client'
import { useState } from 'react'
import api from '@/lib/api'

const mockUserId = 2 // Replace with actual user ID logic if needed
export default function ApplyPage() {
    const [form, setForm] = useState({ applicantName: '', amount: '', userId: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await api.post(`api/mortgage/user/${mockUserId}/application`, {
                applicantName: form.applicantName,
                amount: parseFloat(form.amount),
            })
            alert('Application submitted')
            console.log(res.data)
        } catch (err) {
            console.error(err)
            alert('Error submitting application')
        }
    }

    return (
        <main className="p-4">
            <h1 className="text-xl font-bold">Apply for Mortgage</h1>
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                <input
                    className="border p-2 w-full"
                    placeholder="Applicant Name"
                    value={form.applicantName}
                    onChange={e => setForm({ ...form, applicantName: e.target.value })}
                />
                <input
                    className="border p-2 w-full"
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={e => setForm({ ...form, amount: e.target.value })}
                />
                
                <button className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
        </main>
    )
}
