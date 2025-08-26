// src/components/ProductList.jsx
import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

export default function ProductList({ products, fetchProducts }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setDeletingId(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    setDeletingId(null);

    if (error) {
      alert("Error deleting product: " + error.message);
      return;
    }

    fetchProducts();
  };

  return (
    <div className="max-w-lg mx-auto mt-6 space-y-4">
      {products.map((p) => (
        <div
          key={p.id}
          className="flex flex-col md:flex-row justify-between items-center px-4 py-3 bg-white shadow-sm rounded-md hover:shadow-md transition-shadow"
        >
          <div className="mb-2 md:mb-0">
            <h3 className="text-gray-800 font-semibold text-lg">{p.title}</h3>
            <p className="text-gray-600">Price: ${p.price}</p>
            <p className="text-gray-600">
              Category: {p.product_categories?.name || "N/A"}
            </p>
          </div>
          <button
            onClick={() => handleDelete(p.id)}
            disabled={deletingId === p.id}
            className={`px-4 py-2 text-white rounded-md transition-colors ${
              deletingId === p.id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {deletingId === p.id ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
