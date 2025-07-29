import { useEffect, useState } from "react";

//   list={ordersList}
//               setStart={setStart}
//               start={start}
//               setEnd={setEnd}
//               end={end}
function Pagination({ list, setStart, setEnd,pageSize }) {
  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = pageSize;
  const totalItems = list.length;
  const noOfPages = Math.ceil(totalItems / PAGE_SIZE);

  useEffect(() => {
    setStart(currentPage * PAGE_SIZE);
    setEnd(currentPage * PAGE_SIZE + PAGE_SIZE);
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  return (
    <div className="flex justify-between items-center mt-6">
      <span className="text-gray-400">
        Showing 1 to {Math.min(5, totalItems || 0)} of {totalItems || 0}
      </span>
      <div className="flex space-x-2">
        <button
          disabled={currentPage <= 0}
          onClick={handlePrevious}
          className="px-3 py-1 rounded border border-gray-700"
        >
          Previous
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <p key={n} className={`${currentPage === n && "text-emerald-500"}`}>
            {n}
          </p>
        ))}

        <button
          onClick={handleNext}
          className="px-3 py-1 rounded border border-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
