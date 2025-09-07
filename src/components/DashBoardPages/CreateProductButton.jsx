"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateProductButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/dashboard/create-product");
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-8 right-8 flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl bg-gray-900 hover:bg-gray-800 text-white cursor-pointer"
        >
            <Plus className="w-5 h-5" />
            Create New Product
        </button>
    );
};

export default CreateProductButton;
