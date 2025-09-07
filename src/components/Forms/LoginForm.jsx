'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/redux/slices/auth/authApi';
import { Loader2 } from 'lucide-react';
import { setCredentials } from '@/redux/slices/auth/authSlice';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [login, { isLoading }] = useLoginMutation();

    // inside LoginForm component, replace onSubmit implementation

    const onSubmit = async (data) => {
        try {
            const res = await login(data).unwrap(); // res: { accessToken, refreshToken, user }
            dispatch(setCredentials(res));

            const roles = (res.user?.roles || []).map((r) => String(r).toLowerCase());
            if (roles.includes('admin') || roles.includes('superadmin')) {
                router.push('/dashboard');
            } else {
                router.push('/');
            }
        } catch (err) {
            console.error(err);
            alert(err?.data?.message || 'Login failed');
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 border border-black/10 rounded">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label>Email</label>
                    <input
                        placeholder='johnDoe@example.com'
                        {...register('email')}
                        className="w-full p-2 border border-black/20 rounded mt-1"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label>Password</label>
                    <input
                        placeholder='your password'
                        type="password"
                        {...register('password')}
                        className="w-full p-2 border border-black/20 rounded mt-1"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button className="w-full bg-black text-white py-2 mt-4 rounded cursor-pointer flex items-center justify-center" disabled={isLoading} type="submit">{
                    isLoading ? <Loader2 className=' animate-spin' /> : "Login"
                }</button>

                <p className="mt-4 text-center">
                    Don't have an account? <Link href="/register" className="underline">Register</Link>
                </p>
            </form>
        </div>
    );
}
