"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Users, Package, ShoppingCart } from "lucide-react";
import Header from "./Header";
import NavigationTabs from "./NavigationTabs";
import { UsersList } from "./UsersList";
import { ProductsList } from "./ProductsList";
import { OrdersList } from "./OrdersList";
import { getUser } from "@/redux/slices/auth/authSlice";
import CreateProductButton from "./CreateProductButton";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");
    const user = useSelector(getUser);

    const roles = (user?.roles || []).map((r) => r.toLowerCase());
    const isAdmin = roles.includes("admin");
    const isSuper = roles.includes("superadmin");

    const tabs = [
        { id: "users", label: "Users", icon: Users },
        { id: "products", label: "Products", icon: Package },
        { id: "orders", label: "Orders", icon: ShoppingCart },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <NavigationTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === "users" && (
                    <UsersList
                        canDelete={isSuper}
                        canUpdateRoles={isSuper}
                        canBlock={isAdmin || isSuper}
                    />
                )}
                {activeTab === "products" && (
                    <ProductsList canDelete={isSuper} canCreate={isAdmin || isSuper} />
                )}

                {activeTab === "orders" && <OrdersList />}
            </main>

            <CreateProductButton/>
        </div>
    );
};

export default AdminDashboard;
