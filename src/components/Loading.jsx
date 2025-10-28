import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <p className="text-lg font-medium text-gray-600">Loading news...</p>
    </div>
  );
};

export default Loading;