'use client';
import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials, updateUser } from '@/redux/slices/auth/authSlice';
import { usersApi } from '@/redux/slices/users/usersApi';

function DiscordRedirect() {
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

            // Save tokens in Redux + localStorage
            dispatch(setCredentials({ accessToken, refreshToken }));

            try {
                // Fetch the logged-in user profile
                const result = await dispatch(
                    usersApi.endpoints.getProfile.initiate()
                ).unwrap();

                dispatch(updateUser(result));
                router.push('/');
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                router.push('/login');
            }
        }

        handleLogin();
    }, [searchParams, router, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Connecting your Discord...
                </h1>
                <p className="text-gray-600 mb-8">
                    Please wait while we sign you in.
                </p>

                {/* Loader */}
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                    Do not close this window.
                </p>
            </div>
        </div>
    );
}

export default function DiscordRedirectPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DiscordRedirect />
        </Suspense>
    );
}