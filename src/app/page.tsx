'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';

type Application = {
  id: number;
  applicantName: string;
  amount: number;
  status: string;
  applicant: {
    username: string;
  };
};

const adminUserId = 1; // Replace with actual admin user ID
export default function HomePage() {
  const [apps, setApps] = useState<Application[]>([]);

  const fetchApps = async () => {
    try {
      const res = await api.get('/api/mortgage/applications');
      setApps(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch applications', err);
    }
  };

  const updateStatus = async (
    appId: number,
    status: 'APPROVED' | 'REJECTED'
  ) => {
    try {
      await api.put(`/api/mortgage/application/${appId}/status`, null, {
        params: { status, userId: adminUserId },
      });
      fetchApps(); // refresh list
    } catch (err) {
      alert('Failed to update status');
      console.error(err);
    }
  };

  const deleteApplication = async (appId: number) => {
    if (!window.confirm('Are you sure you want to delete this application?'))
      return;
    try {
      await api.delete(`api/mortgage/application/${appId}`, {
        params: { userId: adminUserId },
      });
      fetchApps();
    } catch (err) {
      console.error(err);
      alert('Failed to delete application');
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Mortgage Applications</h1>
      <ul className='space-y-3'>
        {apps.map((app) => (
          <li
            key={app.id}
            className='border p-4 rounded shadow flex justify-between items-center'
          >
            <div>
              <p>
                <strong>{app.applicantName}</strong> (${app.amount})
              </p>
              <p className='text-sm text-gray-600'>Status: {app.status}</p>
            </div>
            <div className='space-x-2'>
              <button
                onClick={() => updateStatus(app.id, 'APPROVED')}
                title='Approve'
              >
                <FaCheckCircle className='text-green-600 text-2xl hover:scale-110 transition' />
              </button>
              <button
                onClick={() => updateStatus(app.id, 'REJECTED')}
                title='Reject'
              >
                <FaTimesCircle className='text-red-600 text-2xl hover:scale-110 transition' />
              </button>
              <button onClick={() => deleteApplication(app.id)} title='Delete'>
                <FaTrash className='text-red-500 text-2xl hover:scale-110 transition' />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
