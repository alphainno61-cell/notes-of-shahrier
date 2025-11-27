import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Play, Maximize } from "lucide-react";

const NextArrow = ({ onClick }) => (
  <Button
    variant="outline"
    size="icon"
    className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-gray-100 text-slate-950 rounded-full shadow-lg z-10"
    onClick={onClick}
  >
    <ChevronRight size={24} />
  </Button>
);

const PrevArrow = ({ onClick }) => (
  <Button
    variant="outline"
    size="icon"
    className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-gray-100 text-slate-950 rounded-full shadow-lg z-10"
    onClick={onClick}
  >
    <ChevronLeft size={24} />
  </Button>
);

const ShortVideos = ({ videos = [], settings }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

  // Default videos if none provided
  const defaultVideos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=640&h=360&fit=crop&crop=center",
      video_url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      title: "Quick Tech Tip: Docker Basics"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=640&h=360&fit=crop&crop=center",
      video_url: "https://www.youtube.com/watch?v=6Iu45VZGQDk",
      title: "React Best Practices"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=360&fit=crop&crop=center",
      video_url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      title: "Tech Tip: Version Control"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&h=360&fit=crop&crop=center",
      video_url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      title: "Building Scalable Apps"
    },
  ];

  const displayVideos = videos.length > 0 ? videos : defaultVideos;

  const handlePlayVideo = (id) => {
    setActiveVideo(id);
  };

  const handleFullscreen = (video) => {
    setFullscreenVideo(video);
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('embed')) return url;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    return url;
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, displayVideos.length),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, displayVideos.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#2E5AFF] py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <h1 className="text-white text-5xl font-semibold mb-12">
          {settings?.short_videos_title || "Short Videos"}
        </h1>

        {displayVideos.length > 0 && (
          <Slider {...sliderSettings}>
            {displayVideos.map((video) => (
              <div key={video.id} className="relative w-64 p-4">
                {activeVideo === video.id ? (
                  <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={getEmbedUrl(video.video_url)}
                      title={video.title || `YouTube video player for video ${video.id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleFullscreen(video)}
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden group cursor-pointer" onClick={() => handlePlayVideo(video.id)}>
                    <img
                      src={video.thumbnail || "/assets/videos/video_thumbline.png"}
                      alt={video.title || `Thumbnail for video ${video.id}`}
                      className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="w-16 h-16 rounded-full bg-[#2E5AFF] hover:bg-[#1E4AFF] shadow-lg"
                      >
                        <Play className="w-8 h-8 text-white" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Title and Description below the video */}
                <div className="mt-4 text-white">
                  <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                    {video.title || "Untitled Video"}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-gray-200 line-clamp-2 opacity-80">
                      {video.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>

      <Dialog open={!!fullscreenVideo} onOpenChange={() => setFullscreenVideo(null)}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-black border-gray-800">
          <div className="aspect-video w-full">
            {fullscreenVideo && (
              fullscreenVideo.video_url && fullscreenVideo.video_url.startsWith('/storage/') ? (
                <video
                  src={fullscreenVideo.video_url}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(fullscreenVideo.video_url)}
                  title={fullscreenVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div >
  );
};

export default ShortVideos;
