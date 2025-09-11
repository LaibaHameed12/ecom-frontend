'use client';

import {
    Users,
    Shield,
    ShieldCheck,
    Lock,
    Unlock,
    Trash2,
    Table,
} from 'lucide-react';
import {
    useGetUsersQuery,
    useUpdateUserRolesMutation,
    useUpdateUserStatusMutation,
    useDeleteUserMutation,
} from '@/redux/slices/users/usersApi';
import { TableSkeleton } from '../common/TableSkeleton';

export const UsersList = ({ canDelete, canUpdateRoles, canBlock }) => {
    const { data: users = [], isLoading, isError } = useGetUsersQuery();
    const [updateUserRoles] = useUpdateUserRolesMutation();
    const [updateUserStatus] = useUpdateUserStatusMutation();
    const [deleteUser] = useDeleteUserMutation();

    const toggleRole = async (user) => {
        const hasAdmin = user.roles.includes('admin');
        const newRoles = hasAdmin ? ['user'] : ['admin'];
        try {
            await updateUserRoles({ id: user.id || user._id, roles: newRoles }).unwrap();
        } catch (err) {
            console.error('Failed to update roles:', err);
        }
    };

    const toggleStatus = async (user) => {
        try {
            await updateUserStatus({
                id: user.id || user._id,
                isActive: !user.isActive,
            }).unwrap();
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const handleDelete = async (user) => {
        try {
            await deleteUser(user.id || user._id).unwrap();
        } catch (err) {
            console.error('Failed to delete user:', err);
        }
    };

    if (isLoading) return (
        <TableSkeleton
            title="Users Management"
            icon={Users}
            columns={[
                { type: 'user' },
                { type: 'status' },
                { type: 'status' },
                { type: 'actions', actionCount: 3 }
            ]}
            rows={6}
        />
    );
    if (isError) return <p className="text-red-500">Failed to load users</p>;

    // ✅ Filter out superadmins completely
    const filteredUsers = users.filter(
        (u) => !u.roles.map((r) => r.toLowerCase()).includes('superadmin')
    );

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Users Management</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => {
                            const hasAdmin = user.roles.includes('admin');
                            const roleLabel = hasAdmin ? 'Admin' : 'User';
                            const statusLabel = user.isActive ? 'Active' : 'Blocked';

                            return (
                                <tr
                                    key={user._id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4 px-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{user.fullName}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${hasAdmin ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {hasAdmin ? (
                                                <ShieldCheck className="w-3 h-3" />
                                            ) : (
                                                <Shield className="w-3 h-3" />
                                            )}
                                            {roleLabel}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${user.isActive
                                                ? 'bg-white border border-gray-200 text-gray-700'
                                                : 'bg-gray-900 text-white'
                                                }`}
                                        >
                                            {user.isActive ? (
                                                <Unlock className="w-3 h-3" />
                                            ) : (
                                                <Lock className="w-3 h-3" />
                                            )}
                                            {statusLabel}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            {canUpdateRoles && (
                                                <button
                                                    onClick={() => toggleRole(user)}
                                                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                                                    title={hasAdmin ? 'Demote to User' : 'Promote to Admin'}
                                                >
                                                    <Shield className="w-4 h-4 text-gray-600" />
                                                </button>
                                            )}
                                            {canBlock && (
                                                <button
                                                    onClick={() => toggleStatus(user)}
                                                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                                                    title={user.isActive ? 'Block User' : 'Unblock User'}
                                                >
                                                    {user.isActive ? (
                                                        <Lock className="w-4 h-4 text-gray-600" />
                                                    ) : (
                                                        <Unlock className="w-4 h-4 text-gray-600" />
                                                    )}
                                                </button>
                                            )}
                                            {canDelete && (
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-4 h-4 text-gray-600" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
