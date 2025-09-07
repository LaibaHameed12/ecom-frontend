'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/slices/auth/authApi';
import { Loader2 } from 'lucide-react';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function RegisterForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [registerUser, { isLoading }] = useRegisterMutation();

    const onSubmit = async (data) => {
        try {
            await registerUser({
                fullName: data.name,
                email: data.email,
                password: data.password,
            }).unwrap();
            router.push(`/verify?email=${encodeURIComponent(data.email)}`);
        } catch (err) {
            console.error(err);
            alert(err?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 border border-black/10 rounded">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <div className="mb-4">
                    <label>Name</label>
                    <input
                        placeholder='john Doe'
                        {...register('name')}
                        className="w-full p-2 border border-black/20 rounded mt-1"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

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
                        placeholder='Enter Password'
                        type="password"
                        {...register('password')}
                        className="w-full p-2 border border-black/20 rounded mt-1"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button className="w-full bg-black text-white py-2 mt-4 rounded cursor-pointer flex items-center justify-center" type="submit">{
                    isLoading ? <Loader2 className=' animate-spin' /> : "Register"
                    }
                </button>

                <p className="mt-4 text-center">
                    Already have an account? <Link href="/login" className="underline">Login</Link>
                </p>
            </form>
        </div>
    );
}
