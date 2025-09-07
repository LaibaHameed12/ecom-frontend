'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { isLoggedIn, getUser } from '@/redux/slices/auth/authSlice';

/**
 * Props:
 * - authRequired (boolean) default true: whether the route requires authentication
 * - allowedRoles (array | null) default null: e.g. ['admin','superadmin'] to restrict access
 *
 * Usage examples:
 * <ProtectedRoute authRequired={true} allowedRoles={['admin','superadmin']}>...</ProtectedRoute>
 * <ProtectedRoute authRequired={false}> // public but redirect logged-in users away (to / or /dashboard)
 */
export default function ProtectedRoute({ children, authRequired = true, allowedRoles = null }) {
    const router = useRouter();
    const loggedIn = useSelector(isLoggedIn);
    const user = useSelector(getUser);
    const [checked, setChecked] = useState(false);

    // normalize roles to lowercase array
    const roles = (user?.roles || []).map((r) => String(r).toLowerCase());

    useEffect(() => {
        // Not authenticated but this page requires auth -> send to login
        if (authRequired && !loggedIn) {
            router.replace('/login');
            return;
        }

        // Public page (authRequired=false) but user is already logged in -> redirect them
        if (!authRequired && loggedIn) {
            if (roles.includes('admin') || roles.includes('superadmin')) {
                router.replace('/dashboard');
            } else {
                router.replace('/');
            }
            return;
        }

        // Auth required and user logged in, and we have role restrictions
        if (authRequired && loggedIn && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
            const allowedLower = allowedRoles.map((r) => String(r).toLowerCase());
            const hasAccess = allowedLower.some((role) => roles.includes(role));
            if (!hasAccess) {
                // you can change target to a custom /unauthorized page if you have one
                router.replace('/');
                return;
            }
        }

        // All checks passed — allow render
        setChecked(true);
    }, [authRequired, allowedRoles, loggedIn, router, roles]);

    // Render nothing until redirect/check is complete
    if (!checked) return null;

    return <>{children}</>;
}
