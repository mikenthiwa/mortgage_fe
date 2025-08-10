'use client';
import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

interface Applicant {
  username?: string;
}

interface MortgageApplication {
  id: number;
  applicantName: string;
  amount: number;
  status: string;
  applicant?: Applicant;
}

interface MortgageApplicationsListProps {
  apps: MortgageApplication[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function MortgageApplicationsList({
  apps,
  onApprove,
  onReject,
  onDelete,
}: MortgageApplicationsListProps) {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };
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
              <p className='font-semibold'>
                {app.applicantName} (${app.amount})
              </p>
              <p className='text-sm text-gray-600'>Status: {app.status}</p>
              {app.applicant?.username && (
                <p className='text-sm text-gray-500'>
                  Username: {app.applicant.username}
                </p>
              )}
            </div>
            <div className='space-x-2 flex items-center'>
              <button title='Approve' onClick={() => onApprove(app.id)}>
                <FaCheckCircle className='text-green-600 text-2xl hover:scale-110 transition' />
              </button>
              <button title='Reject' onClick={() => onReject(app.id)}>
                <FaTimesCircle className='text-yellow-500 text-2xl hover:scale-110 transition' />
              </button>
              <button title='Delete' onClick={() => handleDeleteClick(app.id)}>
                <FaTrash className='text-red-500 text-2xl hover:scale-110 transition' />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => deleteId !== null && onDelete(deleteId)}
      />
    </main>
  );
}
