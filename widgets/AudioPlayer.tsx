'use client';

export default function AudioPlayer({ src }: { src: string }) {
  return (
    <div className="w-full bg-gray-100 p-1 rounded-lg shadow-md mx-auto">
      <audio
        controls
        autoPlay
        src={src}
        className="w-full"
        onLoadedData={(e) =>
          ((e.target as HTMLAudioElement).playbackRate = 1.5)
        }
      />
    </div>
  );
}
