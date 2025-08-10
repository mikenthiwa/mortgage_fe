import api from '@/lib/api';
import {
  ApiResponse,
  Application,
  ApplicationStatus,
} from '@/types/application';
import toast from 'react-hot-toast';

export async function fetchApplications(): Promise<Application[]> {
  try {
    const res = await api.get<ApiResponse<Application[]>>(
      '/api/mortgage/applications'
    );
    return res.data.data ?? [];
  } catch (error) {
    toast.error('Failed to fetch applications');
    throw error;
  }
}

export async function createApplication(body: {
  applicantName: string;
  amount: number;
}) {
  try {
    const mockUserId = 2;
    const res = await api.post<ApiResponse<Application>>(
      `api/mortgage/user/${mockUserId}/application`,
      body
    );
    return res.data.data!;
  } catch (error) {
    toast.error('Failed to create application');
    throw error;
  }
}

export async function updateApplicationStatus(
  appId: number,
  userId: number,
  status: ApplicationStatus
) {
  try {
    const res = await api.put<ApiResponse<Application>>(
      `/api/mortgage/application/${appId}/status`,
      null,
      { params: { userId, status } }
    );
    return res.data.data!;
  } catch (error) {
    toast.error('Failed to update application status');
    throw error;
  }
}

export async function deleteApplication(appId: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(
      `/api/mortgage/application/${appId}`,
      { params: { userId: 1 } }
    );
    return res.data.message;
  } catch (e) {
    toast.error('Failed to delete application');
    throw e;
  }
}
