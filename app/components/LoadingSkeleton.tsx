'use client';

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white/30 rounded-3xl overflow-hidden animate-pulse">
          <div className="aspect-[3/4] bg-gray-200/50" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200/50 rounded-full w-3/4" />
            <div className="h-3 bg-gray-200/50 rounded-full w-1/2" />
            <div className="h-5 bg-gray-200/50 rounded-full w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
