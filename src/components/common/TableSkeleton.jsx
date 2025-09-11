// Generic Table Skeleton Component
export const TableSkeleton = ({ 
    title = "Loading...", 
    icon: Icon, 
    columns = [], 
    rows = 5,
    type = "table" // "table" | "grid"
}) => {
    const skeletonRows = Array.from({ length: rows }, (_, index) => index);

    if (type === "grid") {
        return (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                    {Icon && <Icon className="w-6 h-6 text-gray-400 animate-pulse" />}
                    <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {skeletonRows.map((index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden animate-pulse"
                        >
                            {/* Image skeleton */}
                            <div className="bg-gray-300 h-60 w-full"></div>
                            
                            {/* Content skeleton */}
                            <div className="p-4 space-y-3">
                                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                
                                {/* Action buttons skeleton */}
                                <div className="flex gap-2 flex-wrap pt-2">
                                    <div className="flex-1 h-8 bg-gray-300 rounded"></div>
                                    <div className="h-8 w-10 bg-gray-300 rounded"></div>
                                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            {/* Header skeleton */}
            <div className="flex items-center gap-3 mb-6">
                {Icon && <Icon className="w-6 h-6 text-gray-400 animate-pulse" />}
                <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            {columns.map((column, index) => (
                                <th key={index} className="text-left py-3 px-4">
                                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {skeletonRows.map((rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-b border-gray-100"
                            >
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="py-4 px-4">
                                        {column.type === 'user' ? (
                                            <div className="animate-pulse">
                                                <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                                                <div className="h-3 bg-gray-300 rounded w-32"></div>
                                            </div>
                                        ) : column.type === 'status' ? (
                                            <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse"></div>
                                        ) : column.type === 'actions' ? (
                                            <div className="flex items-center gap-2">
                                                {Array.from({ length: column.actionCount || 3 }, (_, i) => (
                                                    <div key={i} className="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
                                                ))}
                                            </div>
                                        ) : column.type === 'products' ? (
                                            <div className="h-4 bg-gray-300 rounded w-40 animate-pulse"></div>
                                        ) : column.type === 'price' ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                                                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                                            </div>
                                        ) : (
                                            <div className={`h-4 bg-gray-300 rounded animate-pulse ${
                                                column.width || 'w-20'
                                            }`}></div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Usage examples:

// For UsersList component
export const UsersListSkeleton = () => (
    <TableSkeleton
        title="Users Management"
        columns={[
            { type: 'user' },
            { type: 'status' },
            { type: 'status' },
            { type: 'actions', actionCount: 3 }
        ]}
        rows={6}
    />
);

// For OrdersList component  
export const OrdersListSkeleton = () => (
    <TableSkeleton
        title="Orders Management"
        columns={[
            { width: 'w-24' }, // Order ID
            { type: 'products' }, // Products
            { type: 'user' }, // Customer
            { width: 'w-20' }, // Date
            { type: 'price' }, // Amount
            { type: 'status' }, // Status
            { type: 'actions', actionCount: 1 } // Actions
        ]}
        rows={8}
    />
);

// For ProductsList component
export const ProductsListSkeleton = () => (
    <TableSkeleton
        title="Products Management"
        type="grid"
        rows={8}
    />
);