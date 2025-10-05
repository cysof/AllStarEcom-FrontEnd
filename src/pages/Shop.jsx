import React from 'react';

const Shop = () => {
  const products = [
    { id: 1, name: 'Premium T-Shirt', price: '$29.99', image: '🛍️' },
    { id: 2, name: 'Classic Hoodie', price: '$49.99', image: '👕' },
    { id: 3, name: 'Signature Cap', price: '$24.99', image: '🧢' },
    { id: 4, name: 'Limited Edition', price: '$79.99', image: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-12">
          Our Collection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-6xl mb-4">{product.image}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-green-600 font-bold text-lg mb-4">
                {product.price}
              </p>
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
