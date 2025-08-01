

const GlobalErrorPage = ({ statusCode, message }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
        {/* Error icon/animation */}
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-50 mb-6">
          <svg
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Status code */}
        {statusCode && (
          <div className="text-sm font-medium text-gray-500 mb-2">
            ERROR {statusCode}
          </div>
        )}

        {/* Main message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {message || 'Something went wrong'}
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          We're sorry, but an unexpected error occurred. Please try again later.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-900 text-white rounded-lg transition-colors"
          >
            Refresh Page
          </button>
          <a
            href="/"
            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
          >
            Go to Homepage
          </a>
        </div>

        {/* Support link */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a href="mailto:support@example.com" className="text-emebg-emerald-700 hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorPage;