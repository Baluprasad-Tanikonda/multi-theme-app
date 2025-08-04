/** @format */
import React, { useEffect, useState } from "react";
import Card from "../components/Card"; // adjust the path if needed

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg animate-pulse">
        Loading products...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.title}
          description={product.description}
          imageUrl={product.image}
          price={product.price}
          category={product.category}
          onClick={() => console.log("Clicked product ID:", product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
