import React from "react";

const ProcessDemo: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center px-6 md:px-20 py-20 bg-gray-50 gap-16">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">See Plately in action</h2>
        <p className="text-lg text-center text-gray-600">From your basic photos to stunning social media posts</p>
      </div>
      {/* Demo Row */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Before */}
        <div className="flex flex-col items-center gap-6 max-w-xs">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-red-500">BEFORE:</span>
            <span className="text-lg font-semibold text-gray-900">Your Quick Photo Snaps</span>
          </div>
          <p className="text-gray-600 text-center text-base">Just upload one photo of your restaurant and one of your food. Plately AI takes care of the rest.</p>
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center border-2 border-gray-300">
                {/* TODO: Replace with actual image */}
                <span className="text-gray-400 text-xs">Restaurant Photo</span>
              </div>
              <span className="text-xs font-semibold text-gray-700">1</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center border-2 border-gray-300">
                {/* TODO: Replace with actual image */}
                <span className="text-gray-400 text-xs">Food Photo</span>
              </div>
              <span className="text-xs font-semibold text-gray-700">2</span>
            </div>
          </div>
        </div>
        {/* AI Divider */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-1 h-24 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full" />
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-full shadow">
            <span className="text-white font-semibold text-sm">Plately AI Transforms</span>
            <span role="img" aria-label="sparkles">✨</span>
          </div>
          <div className="w-1 h-24 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
        </div>
        {/* After */}
        <div className="flex flex-col items-center gap-6 max-w-xs">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-green-600">AFTER:</span>
            <span className="text-lg font-semibold text-gray-900">Get Scroll-Stopping Results</span>
          </div>
          <p className="text-gray-600 text-center text-base">Receive a variety of styles, perfect for Instagram, Facebook, or any social feed – all designed to make your audience hungry for more.</p>
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full h-32 bg-white rounded-2xl shadow flex flex-col items-center justify-center border-2 border-gray-200">
              {/* TODO: Replace with actual social post preview */}
              <span className="text-gray-400 text-xs">Social Post Preview</span>
            </div>
            <div className="w-full h-32 bg-white rounded-2xl shadow flex flex-col items-center justify-center border-2 border-gray-200">
              <span className="text-gray-400 text-xs">Social Post Preview</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessDemo; 