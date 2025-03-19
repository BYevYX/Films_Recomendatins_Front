'use client';

export default function AudioPlayer({ src }: { src: string }) {
  return (
    <div className="w-full bg-gray-100 p-1 rounded-lg shadow-md mx-auto">
      <audio controls autoPlay src={src} className="w-full" />
    </div>
  );
}
