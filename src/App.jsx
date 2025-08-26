// src/App.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase/supabaseClient";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setUser(data.session?.user ?? null));
    supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null)
    );
    fetchProducts();
    fetchCategories();
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("id, title, price, product_categories(name)");
    setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("product_categories").select("*");
    setCategories(data);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome!</h1>
        <button
          onClick={signInWithGoogle}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user.email}
          </h1>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Categories
          </h2>
          <CategoryForm fetchCategories={fetchCategories} />
          <CategoryList
            categories={categories}
            fetchCategories={fetchCategories}
          />
        </section>

        {/* Products */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Products</h2>
          <ProductForm categories={categories} fetchProducts={fetchProducts} />
          <ProductList products={products} fetchProducts={fetchProducts} />
        </section>
      </div>
    </div>
  );
}

export default App;
