import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
    currentPage = 1,
    totalPages = 10,
    onPageChange
}) {

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            if (onPageChange) {
                onPageChange(page);
            }
        }
    };

    const renderPageNumbers = () => {
        const pages = [];

        // Always show first page
        if (currentPage > 3) {
            pages.push(1);
        }

        // Show ellipsis if there's a gap
        if (currentPage > 4) {
            pages.push('...');
        }

        // Show pages around current page
        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
            pages.push(i);
        }

        // Show ellipsis if there's a gap at the end
        if (currentPage < totalPages - 3) {
            pages.push('...');
        }

        // Always show last pages if not already included
        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) {
                pages.push(totalPages - 1);
            }
            pages.push(totalPages);
        }

        // Remove duplicates while preserving order
        const uniquePages = [];
        for (const page of pages) {
            if (!uniquePages.includes(page)) {
                uniquePages.push(page);
            }
        }

        return uniquePages;
    };

    return (
        <div className="w-full flex items-center justify-between space-x-2 py-8">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${currentPage === 1
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
            >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-medium">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
                {renderPageNumbers().map((page, index) => (
                    <div key={`${page}-${index}`}>
                        {page === '...' ? (
                            <span className="px-3 py-2 text-gray-500 font-medium">...</span>
                        ) : (
                            <button
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${currentPage === page
                                        ? 'bg-gray-900 text-white shadow-sm'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${currentPage === totalPages
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 cursor-pointer text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
            >
                <span className="font-medium">Next</span>
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}