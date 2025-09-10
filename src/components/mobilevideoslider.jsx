
import React, { useState } from 'react';
import { Play, ChevronRight } from 'lucide-react';
import { useQuery } from 'react-query';
import { apiConnectorGet, usequeryBoolean } from '../utils/ApiConnector';
import { domain, endpoint } from '../utils/APIRoutes';

const MobileVideoSlider = () => {
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [showMore, setShowMore] = useState(false);

  // Extended video data - 10 videos
  // const videos = [
  //   {
  //     id: 1,
  //     thumbnail: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=600&fit=crop&crop=center",
  //     videoUrl: "https://cdn.caratlane.com/media/catalog/product/U/T/UT01087-1Y0000_16_video.mp4",
  //     title: "Relaxing Moments",
  //     description: "A peaceful evening scene"
  //   },
  //   {
  //     id: 2,
  //     thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=center",
  //     videoUrl: "https://cdn.caratlane.com/media/catalog/product/J/R/JR09742-8YP900_16_video.mp4",
  //     title: "Fashion Story",
  //     description: "Modern style inspiration"
  //   },
  //   {
  //     id: 3,
  //     thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=center",
  //     videoUrl: "https://cdn.caratlane.com/media/catalog/product/S/R/SR02480-WGP900_16_video.mp4",
  //     title: "Urban Life",
  //     description: "City adventures await"
  //   },
  //   {
  //     id: 4,
  //     thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=center",
  //     videoUrl: "https://cdn.caratlane.com/media/catalog/product/U/T/UT01087-1Y0000_16_video.mp4",
  //     title: "Professional Look",
  //     description: "Business attire inspiration"
  //   },
  //   {
  //     id: 5,
  //     thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=center",
  //     videoUrl: "https://cdn.caratlane.com/media/catalog/product/J/R/JR09742-8YP900_16_video.mp4",
  //     title: "Elegant Style",
  //     description: "Sophisticated fashion"
  //   },
  //   {
  //     id: 6,
  //     thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center",
  //     videoUrl: "https://cdn.caratlane.com/media/catalog/product/S/R/SR02480-WGP900_16_video.mp4",
  //     title: "Casual Vibes",
  //     description: "Everyday comfort"
  //   },
  //   {
  //     id: 7,
  //     thumbnail: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop&crop=center",
  //     videoUrl: "https://cdn.caratlane.com/media/catalog/product/U/T/UT01087-1Y0000_16_video.mp4",
  //     title: "Glamorous Night",
  //     description: "Evening elegance"
  //   },
  //   {
  //     id: 8,
  //     thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=center",
  //     videoUrl: "https://cdn.caratlane.com/media/catalog/product/J/R/JR09742-8YP900_16_video.mp4",
  //     title: "Summer Collection",
  //     description: "Bright and breezy"
  //   },
  //   {
  //     id: 9,
  //     thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=center",
  //     videoUrl: "https://cdn.caratlane.com/media/catalog/product/S/R/SR02480-WGP900_16_video.mp4",
  //     title: "Minimalist Chic",
  //     description: "Less is more"
  //   },
  //   {
  //     id: 10,
  //     thumbnail: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=600&fit=crop&crop=center",
  //     videoUrl: "https://cdn.caratlane.com/media/catalog/product/U/T/UT01087-1Y0000_16_video.mp4",
  //     title: "Vintage Appeal",
  //     description: "Timeless beauty"
  //   }
  // ];
  const { data } = useQuery(
    ["category_user"],
    () => apiConnectorGet(endpoint.get_video),
    usequeryBoolean
  );

  const videos = data?.data?.result || [];

  // Handle video click for fullscreen
  const handleVideoClick = (video) => {
    setFullscreenVideo(video);
  };

  // Close fullscreen video
  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  // Card for mobile slider
  const MobileVideoCard = ({ video }) => (
    <div
      className="relative bg-gray-900 rounded-2xl overflow-hidden cursor-pointer aspect-[2/3]"
      onClick={() => handleVideoClick(video)}
    >
      <div className="w-full h-full">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-contain object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      {/* Play Button - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 shadow-lg">
          <Play className="w-7 h-7 text-white fill-white ml-0.5" />
        </div>
      </div>
      {/* Continue Watching Label */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <p className="text-white text-base font-medium drop-shadow-md">Continue Watching</p>
      </div>
    </div>
  );

  // Desktop card - no change needed
  const VideoCard = ({ video, className = "" }) => (
    <div
      className={`relative bg-gray-900 rounded-2xl overflow-hidden group cursor-pointer ${className}`}
      onClick={() => handleVideoClick(video)}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      {/* Play Button - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
          <Play className="w-5 h-5 text-white fill-white" />
        </div>
      </div>
      {/* Continue Watching Label */}
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-white text-sm font-medium">Continue Watching</p>
      </div>
    </div>
  );
  return (
    <>
      <div className="w-full">
        {/* Mobile View */}
        <div className="lg:hidden max-w-9xl mx-auto bg-gradient-to-br from-pink-100 to-purple-100 mb-10">
          {/* Header */}
          <div className="px-4 pt-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-medium text-gray-800">
                Personally curated for you to watch
              </h1>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Where every piece tells you a story!
            </p>
          </div>
          {/* Mobile Horizontal Slider */}
          <div className="pb-6">
            <div
              className="flex overflow-x-auto scrollbar-hide whitespace-nowrap -mx-4 px-4"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="mr-4 min-w-[160px] max-w-[160px] last:mr-0"
                >
                  <MobileVideoCard video={video} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
          <div className="max-w-7xl mx-auto px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Personally curated for you to watch
                </h1>
                <p className="text-lg text-gray-600">
                  Where every piece tells you a story!
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            </div>

            {/* Desktop Video Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {(showMore ? videos : videos.slice(0, 8)).map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  className="aspect-[3/4] hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>

            {/* See More Button */}
            {!showMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowMore(true)}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-colors duration-300 font-medium"
                >
                  See More
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {fullscreenVideo && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <video
              src={domain + fullscreenVideo.vid_url}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors text-xl font-light"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileVideoSlider;
