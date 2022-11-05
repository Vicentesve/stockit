import React from "react";

const Pagination = ({
  totalRecords,
  pageLimit,
  pageNeighbours,
  onPageChanged,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalRecords / pageLimit);
  const LEFT_PAGE = "LEFT";
  const RIGHT_PAGE = "RIGHT";
  /**
   * Helper method for creating a range of numbers
   * range(1, 5) => [1, 2, 3, 4, 5]
   */
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };
  const fetchNumbers = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */

    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const goToPage = (page) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    onPageChanged(currentPage);
  };

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchNumbers();

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    goToPage(currentPage + pageNeighbours * 2 + 1);
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    goToPage(currentPage - pageNeighbours * 2 - 1);
  };

  return (
    <nav
      className="flex items-center justify-center lg:justify-between"
      aria-label="Table navigation"
    >
      <span className="hidden text-sm font-normal text-gray-500 lg:block dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {pageLimit * currentPage - pageLimit + 1}-{pageLimit * currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalRecords}
        </span>
      </span>
      <ul className="inline-flex items-center -space-x-px overflow-auto">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li onClick={handleMoveLeft} key={index}>
                <button className="paginationMiddle">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5 font-bold text-black dark:text-white"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            );

          if (page === RIGHT_PAGE) {
            return (
              <li onClick={handleMoveRight} key={index}>
                <button type="button" className="paginationMiddle">
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5 font-bold text-black dark:text-white"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            );
          }

          if (page === 1) {
            return (
              <li onClick={() => goToPage(page)} key={index}>
                <button
                  type="button"
                  className={`${
                    currentPage === page ? "currentPageLeft" : "paginationLeft"
                  }`}
                >
                  {page}
                </button>
              </li>
            );
          }

          if (page === totalPages) {
            return (
              <li onClick={() => goToPage(page)} key={index}>
                <button
                  type="button"
                  className={`${
                    currentPage === page
                      ? "currentPageRight"
                      : "paginationRight"
                  }`}
                >
                  {page}
                </button>
              </li>
            );
          }

          return (
            <li onClick={() => goToPage(page)} key={index}>
              <button
                type="button"
                className={`${
                  currentPage === page
                    ? "currentPageMiddle"
                    : "paginationMiddle"
                }`}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
