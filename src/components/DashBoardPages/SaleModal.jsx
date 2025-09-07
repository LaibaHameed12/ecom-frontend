"use client";

import React from "react";

export const SaleModal = ({
    open,
    saleModal,
    onChange,
    onClose,
    onSave,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-4">Set Sale</h3>

                <label className="block mb-2">Discount Type</label>
                <select
                    value={saleModal.discountType}
                    onChange={(e) => onChange({ discountType: e.target.value })}
                    className="w-full border p-2 rounded mb-4"
                >
                    <option value="percent">Percent</option>
                    <option value="flat">Flat</option>
                </select>

                <label className="block mb-2">Discount Value</label>
                <input
                    type="number"
                    value={saleModal.discountValue}
                    onChange={(e) => onChange({ discountValue: e.target.value })}
                    className="w-full border p-2 rounded mb-4"
                />

                <label className="block mb-2">Starts At</label>
                <input
                    type="date"
                    value={saleModal.startsAt}
                    onChange={(e) => onChange({ startsAt: e.target.value })}
                    className="w-full border p-2 rounded mb-4"
                />

                <label className="block mb-2">Ends At</label>
                <input
                    type="date"
                    value={saleModal.endsAt}
                    onChange={(e) => onChange({ endsAt: e.target.value })}
                    className="w-full border p-2 rounded mb-4"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
