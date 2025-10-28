import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message, darkMode }) => {
  return (
    <div className={`p-6 rounded-xl border-2 ${
      darkMode ? 'bg-red-900/20 border-red-500' : 'bg-red-50 border-red-300'
    }`}>
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <p className="text-lg font-semibold text-red-600">Error</p>
      </div>
      <p className={darkMode ? 'text-red-300' : 'text-red-700'}>{message}</p>
      <p className="mt-3 text-sm opacity-80">
        💡 Replace YOUR_API_KEY_HERE with your API key from gnews.io
      </p>
    </div>
  );
};

export default ErrorMessage;