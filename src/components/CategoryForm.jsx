// src/components/CategoryForm.jsx
import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

export default function CategoryForm({ fetchCategories }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("product_categories")
      .insert([{ name: name.trim() }]);

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        alert("Category already exists!");
      } else {
        alert("Error adding category: " + error.message);
      }
      return;
    }

    setName("");
    fetchCategories();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white shadow-md rounded-md max-w-md mx-auto mt-6"
    >
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-6 py-2 text-white font-semibold rounded-md transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
}
