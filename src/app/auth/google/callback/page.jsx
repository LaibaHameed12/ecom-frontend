'use client';
import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials, updateUser } from '@/redux/slices/auth/authSlice';
import { usersApi } from '@/redux/slices/users/usersApi';

function GoogleRedirect() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = searchParams.get('token');
        const refreshToken = searchParams.get('refresh');

        async function handleLogin() {
            if (!accessToken) {
                router.push('/login');
                return;
            }
            // Store tokens
            dispatch(setCredentials({ accessToken, refreshToken }));

            try {
                // Fetch profile using the tokens
                const result = await dispatch(usersApi.endpoints.getProfile.initiate()).unwrap();
                dispatch(updateUser(result)); // save user in Redux + localStorage
                router.push('/');
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                router.push('/login');
            }
        }

        handleLogin();
    }, [searchParams, router, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Almost there!</h1>
                <p className="text-gray-600 mb-8">We're signing you in securely...</p>

                {/* Simple Circular Loader */}
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                    Please don't close this window...
                </p>
            </div>
        </div>
    );
}

export default function GoogleRedirectPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GoogleRedirect />
        </Suspense>
    );
}