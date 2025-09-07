"use client";

import CreateProductForm from "@/components/DashBoardPages/CreateProductForm";
import Header from "@/components/DashBoardPages/Header";

const CreateProductPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header/>
            <CreateProductForm/>
        </div>
    );
};

export default CreateProductPage;
