'use client';
import { useEffect, useState } from 'react';
import {
  fetchApplications,
  updateApplicationStatus,
  deleteApplication,
} from '@/services/applications';
import { Application } from '@/types/application';
import toast from 'react-hot-toast';
import MortgageApplicationsList from '@/components/MortgageApplicationsList';

export default function HomePage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [userId, setUserId] = useState(1);

  const load = async () => setApps(await fetchApplications());

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id: number) => {
    await updateApplicationStatus(id, Number(userId), 'APPROVED');
    toast.success('Application approved');
    await load();
  };

  const handleReject = async (id: number) => {
    await updateApplicationStatus(id, Number(userId), 'REJECTED');
    toast.success('Application rejected');
    await load();
  };

  const handleDelete = async (id: number) => {
    await deleteApplication(id);
    toast.success('Application deleted');
    await load();
  };

  return (
    <MortgageApplicationsList
      apps={apps}
      onApprove={handleApprove}
      onReject={handleReject}
      onDelete={handleDelete}
    />
  );
}
