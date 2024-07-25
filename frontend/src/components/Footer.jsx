import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-gray-600 pb-2">
              Featured Blogs
            </h3>
            <p className="hover:text-gray-400 cursor-pointer">Blog Post 1</p>
            <p className="hover:text-gray-400 cursor-pointer">Blog Post 2</p>
            <p className="hover:text-gray-400 cursor-pointer">Blog Post 3</p>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-gray-600 pb-2">
              Most Viewed
            </h3>
            <p className="hover:text-gray-400 cursor-pointer">Blog Post 1</p>
            <p className="hover:text-gray-400 cursor-pointer">Blog Post 2</p>
            <p className="hover:text-gray-400 cursor-pointer">Blog Post 3</p>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold border-b-2 border-gray-600 pb-2">
              Readers Choice
            </h3>
            <p className="hover:text-gray-400 cursor-pointer">Blog Post 1</p>
            <p className="hover:text-gray-400 cursor-pointer">Blog Post 2</p>
            <p className="hover:text-gray-400 cursor-pointer">Blog Post 3</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Blog Page. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
