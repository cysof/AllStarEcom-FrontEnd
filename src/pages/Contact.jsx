import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
          Contact Us
        </h1>
        <div className="max-w-md mx-auto bg-green-50 p-8 rounded-lg">
          <form className="space-y-4">
            <div>
              <label className="block text-green-800 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:border-green-600"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-green-800 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:border-green-600"
                placeholder="Your email"
              />
            </div>
            <div>
              <label className="block text-green-800 mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:border-green-600"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
