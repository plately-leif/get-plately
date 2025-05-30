import React from "react";

const RestaurantSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 py-20 bg-gray-50 gap-12">
      {/* Left: Text */}
      <div className="flex-1 flex flex-col gap-6 max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Made for restaurants. Not influencers.
        </h2>
        <p className="text-lg text-gray-600">
          Plately is the only platform built 100% for food businesses. From your menu to your feed — every feature is made with service in mind.
        </p>
      </div>
      {/* Right: Illustration */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[320px] h-[220px] md:w-[400px] md:h-[300px] lg:w-[480px] lg:h-[320px] bg-gray-200 rounded-2xl flex items-center justify-center border-2 border-gray-300">
          {/* TODO: Replace with actual illustration */}
          <span className="text-gray-400 text-lg">Restaurant Illustration</span>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection; 