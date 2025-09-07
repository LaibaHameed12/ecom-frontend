'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResendOtpMutation, useVerifyOtpMutation } from '@/redux/slices/auth/authApi';
import { Loader2 } from 'lucide-react';

const schema = yup.object().shape({
    code: yup.string().length(6, 'Verification code must be 6 digits').required('Code is required'),
});

export default function VerifyForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const [resendOtp] = useResendOtpMutation();

    const onSubmit = async (data) => {
        try {
            await verifyOtp({ email, otp: data.code }).unwrap();
            router.push('/login');
        } catch (err) {
            console.error(err);
            alert(err?.data?.message || 'Verification failed');
        }
    };

    const handleResend = async () => {
        try {
            await resendOtp({ email }).unwrap();
            alert('OTP resent');
        } catch (err) {
            console.error(err);
            alert(err?.data?.message || 'Failed to resend OTP');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 border border-black/10 rounded">
                <h2 className="text-2xl font-bold mb-6 text-center">Verify Account</h2>

                <div className="mb-4">
                    <label>Verification Code</label>
                    <input
                        {...register('code')}
                        placeholder='Enter 6 digit code'
                        className="w-full p-2 border border-black/20 rounded mt-1"
                    />
                    {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
                </div>

                <button className="w-full bg-black text-white py-2 mt-4 rounded cursor-pointer flex items-center justify-center" disabled={isLoading} type="submit">{
                    isLoading ? <Loader2 className=' animate-spin' /> : "Verify"
                }</button>

                <p className="mt-4 text-center flex items-center justify-center gap-2">
                    Didn't receive code? <button
                        type="button"
                        onClick={handleResend}
                        className="underline ml-1"
                    >
                        Resend
                    </button>
                </p>
            </form>
        </div>
    );
}
