'use client';

export default function Pagination({ total }: { total: number }) {
  // Simple pagination display for mock data
  if (total <= 12) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {[1, 2, 3].map((page) => (
        <button key={page}
          className={`w-10 h-10 rounded-full text-sm font-medium transition ${
            page === 1 ? 'bg-off-black text-white' : 'bg-white/50 text-off-black/70 hover:bg-white/80'
          }`}>
          {page}
        </button>
      ))}
    </div>
  );
}
