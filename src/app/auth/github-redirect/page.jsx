'use client';
import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials, updateUser } from '@/redux/slices/auth/authSlice';
import { usersApi } from '@/redux/slices/users/usersApi';

function GithubRedirect() {
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Almost there!</h1>
                <p className="text-gray-600 mb-8">We're signing you in with GitHub...</p>

                {/* Simple Circular Loader */}
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                    Please don&apos;t close this window...
                </p>
            </div>
        </div>
    );
}

export default function GithubRedirectPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GithubRedirect />
        </Suspense>
    );
}