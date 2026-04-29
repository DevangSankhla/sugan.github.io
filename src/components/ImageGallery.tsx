import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  videos?: string[];
  productName: string;
}

export default function ImageGallery({ images, videos = [], productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Combine images and videos for the gallery
  const allMedia = [...images, ...videos];
  const isVideo = (src: string) => src.match(/\.(mp4|webm|ogg)$/i);

  if (allMedia.length === 0) return null;

  const nextMedia = () => {
    setSelectedIndex((prev) => (prev + 1) % allMedia.length);
    setIsPlaying(false);
  };

  const prevMedia = () => {
    setSelectedIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    setIsPlaying(false);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const currentMedia = allMedia[selectedIndex];
  const currentIsVideo = isVideo(currentMedia);

  return (
    <div className="space-y-4">
      {/* Main Media Display */}
      <div className="relative aspect-square bg-sugan-bone-dark rounded-xl overflow-hidden group">
        {currentIsVideo ? (
          <>
            <video
              ref={videoRef}
              src={currentMedia}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            {/* Video Controls */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={toggleVideo}
                className="w-16 h-16 bg-sugan-ink/80 hover:bg-sugan-ink text-white rounded-full flex items-center justify-center transition-colors pointer-events-auto"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>
            </div>
            {/* Mute Toggle */}
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-sugan-ink" />
              ) : (
                <Volume2 className="w-5 h-5 text-sugan-ink" />
              )}
            </button>
          </>
        ) : (
          <>
            <img
              src={currentMedia}
              alt={`${productName} - View ${selectedIndex + 1}`}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              loading="eager"
            />
            {/* Zoom Icon */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              <ZoomIn className="w-5 h-5 text-sugan-ink" />
            </button>
          </>
        )}

        {/* Navigation Arrows (show if multiple media) */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-sugan-ink" />
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-sugan-ink" />
            </button>
          </>
        )}

        {/* Media Counter */}
        {allMedia.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-sugan-ink/80 text-sugan-bone px-3 py-1 rounded-full text-sm font-body">
            {selectedIndex + 1} / {allMedia.length}
          </div>
        )}

        {/* Video Badge */}
        {currentIsVideo && (
          <div className="absolute top-4 left-4 bg-sugan-gold text-sugan-ink px-3 py-1 rounded-full text-xs font-medium">
            VIDEO
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {allMedia.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allMedia.map((media, index) => {
            const mediaIsVideo = isVideo(media);
            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedIndex(index);
                  setIsPlaying(false);
                }}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors relative ${
                  selectedIndex === index
                    ? 'border-sugan-gold'
                    : 'border-transparent hover:border-sugan-ink/30'
                }`}
              >
                {mediaIsVideo ? (
                  <>
                    <video
                      src={media}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </>
                ) : (
                  <img
                    src={media}
                    alt={`${productName} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
