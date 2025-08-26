// src/components/ProductForm.jsx
import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

export default function ProductForm({ fetchProducts, categories }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !price || !categoryId) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("products").insert([
      {
        title: title.trim(),
        price: Number(price),
        products_category_id: categoryId,
      },
    ]);
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        alert("Product with this title already exists!");
      } else {
        alert("Error adding product: " + error.message);
      }
      return;
    }

    setTitle("");
    setPrice("");
    setCategoryId("");
    fetchProducts();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white shadow-md rounded-md max-w-lg mx-auto mt-6"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
        className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        className={`px-6 py-2 text-white font-semibold rounded-md transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
