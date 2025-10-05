import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
          About Us
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            At AllStar Collection, we're passionate about delivering exceptional
            quality products that make a statement. Our commitment to excellence
            drives everything we do.
          </p>
          <p className="text-lg text-gray-700">
            Founded with a vision to provide standout collections, we carefully
            curate each item to ensure it meets our high standards of quality
            and style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
