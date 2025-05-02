import React from "react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPerPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4">
      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition
            ${currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-blue-100 text-blue-600 border border-gray-300 shadow"
            }`}
          aria-label="Previous page"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" className="inline">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17l-5-5 5-5"/>
          </svg>
        </button>
        {getPageNumbers().map((num, i) =>
          num === "..." ? (
            <span key={i} className="w-10 h-10 flex items-center justify-center text-gray-400 select-none">…</span>
          ) : (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition
                ${
                  num === currentPage
                    ? "bg-blue-500 text-white shadow"
                    : "bg-white hover:bg-blue-100 text-blue-700 border border-gray-300"
                }
              `}
              aria-current={num === currentPage ? "page" : undefined}
            >
              {num}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition
            ${currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-blue-100 text-blue-600 border border-gray-300 shadow"
            }`}
          aria-label="Next page"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" className="inline">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7l5 5-5 5"/>
          </svg>
        </button>
      </nav>
      <div className="flex items-center gap-2">
        <label htmlFor="per-page" className="text-sm text-gray-600 font-medium">Per Page:</label>
        <select
          id="per-page"
          value={itemsPerPage}
          onChange={e => onPerPageChange(Number(e.target.value))}
          className="rounded-full border px-3 py-1 bg-white shadow focus:ring-2 focus:ring-blue-400"
        >
          {[10, 20, 50].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
