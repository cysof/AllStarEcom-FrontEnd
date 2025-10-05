import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-green-800 mb-6">
          Welcome to AllStar Collection
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Discover premium quality products that stand out from the crowd
        </p>
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Home;
