export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-16 h-16 relative">
        <div className="absolute top-0 w-full h-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute top-1 left-1 right-1 bottom-1 rounded-full border-4 border-r-primary border-t-transparent border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
    </div>
  );
} 