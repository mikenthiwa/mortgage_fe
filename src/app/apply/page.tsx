'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createApplication } from '@/services/applications';
import toast from 'react-hot-toast';

const schema = z.object({
  applicantName: z.string().min(2, 'Name must be at least 2 characters'),
  amount: z.coerce
    .number()
    .refine((v) => !Number.isNaN(v), 'Amount is required')
    .positive('Amount must be greater than 0'),
});

type FormData = z.infer<typeof schema>;

export default function ApplyPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
      useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await createApplication({
      applicantName: data.applicantName,
      amount: data.amount,
    });
    toast.success('Application submitted');
    reset();
  };

  const inputClass = (hasError?: boolean) =>
    `border p-2 w-full rounded ${hasError ? 'border-red-500' : 'border-gray-300'}`;

  return (
    <main className='p-4 max-w-xl'>
      <h1 className='text-xl font-bold'>Apply for Mortgage</h1>
      <form
        className='space-y-4 mt-4'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <label className='block text-sm mb-1'>Applicant Name</label>
          <input
            className={inputClass(!!errors.applicantName)}
            placeholder='e.g. Jane Doe'
            {...register('applicantName')}
          />
          {errors.applicantName && (
            <p className='text-red-600 text-sm mt-1'>
              {errors.applicantName.message}
            </p>
          )}
        </div>

        <div>
          <label className='block text-sm mb-1'>Amount</label>
          <input
            className={inputClass(!!errors.amount)}
            type='number'
            step='0.01'
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className='text-red-600 text-sm mt-1'>{errors.amount.message}</p>
          )}
        </div>

        <button
          className='bg-blue-600 text-white p-2 rounded disabled:opacity-60'
          disabled={isSubmitting}
          type='submit'
        >
          {isSubmitting ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </main>
  );
}
