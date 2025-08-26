// src/components/CategoryList.jsx
import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

export default function CategoryList({ categories, fetchCategories }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    setDeletingId(id);
    const { error } = await supabase
      .from("product_categories")
      .delete()
      .eq("id", id);
    setDeletingId(null);

    if (error) {
      alert("Error deleting category: " + error.message);
      return;
    }

    fetchCategories();
  };

  return (
    <div className="max-w-md mx-auto mt-4 space-y-3">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex justify-between items-center px-4 py-2 bg-white shadow-sm rounded-md hover:shadow-md transition-shadow"
        >
          <span className="text-gray-800 font-medium">{cat.name}</span>
          <button
            onClick={() => handleDelete(cat.id)}
            disabled={deletingId === cat.id}
            className={`px-3 py-1 text-white rounded-md transition-colors ${
              deletingId === cat.id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {deletingId === cat.id ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
