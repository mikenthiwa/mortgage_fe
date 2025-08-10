export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type Application = {
  id: number;
  applicantName: string;
  amount: number;
  status: ApplicationStatus;
  applicant?: { username: string };
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  errors?: string[] | null;
};
