'use client';

export default function LoadingGears() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative w-32 h-32">
        {/* Large Gear */}
        <div className="absolute inset-0 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white">
            <path
              fill="currentColor"
              d="M50,10 L55,20 L65,18 L60,28 L70,30 L63,38 L72,43 L63,50 L72,57 L63,62 L70,70 L60,72 L65,82 L55,80 L50,90 L45,80 L35,82 L40,72 L30,70 L37,62 L28,57 L37,50 L28,43 L37,38 L30,30 L40,28 L35,18 L45,20 Z"
            />
            <circle cx="50" cy="50" r="15" fill="#3b82f6" />
          </svg>
        </div>
        
        {/* Small Gear */}
        <div className="absolute top-12 -right-8 w-16 h-16 animate-spin-reverse">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-200">
            <path
              fill="currentColor"
              d="M50,15 L53,25 L63,23 L58,33 L68,35 L61,43 L70,48 L61,53 L68,61 L58,63 L63,73 L53,71 L50,81 L47,71 L37,73 L42,63 L32,61 L39,53 L30,48 L39,43 L32,35 L42,33 L37,23 L47,25 Z"
            />
            <circle cx="50" cy="50" r="12" fill="#3b82f6" />
          </svg>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-white text-xl font-semibold animate-pulse">Loading Weather Data...</p>
      </div>
      
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
      `}</style>
    </div>
  );
}