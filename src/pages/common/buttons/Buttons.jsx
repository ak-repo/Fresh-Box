export const AddToCartButton = ({ onClick, isAdded = false }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        isAdded
          ? "bg-green-100 text-green-800 border border-green-200"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {isAdded ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Added
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
};

export const FavoriteButton = ({ isFavorite = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transition-colors ${
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-gray-400 hover:text-red-400"
        }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={isFavorite ? 0 : 1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};
