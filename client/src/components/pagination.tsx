import { useEffect, useState, type MouseEvent } from "react";

const Pagination = ({ pages,onClickHandler }: { pages: number,onClickHandler:(value:number)=>void }) => {
  const [currentPages, setCurrentPages] = useState<number[]>([]);
const [selectedPage,setSelectedPage]=useState(1)
  useEffect(() => {
    if (pages <= 0) {
      setCurrentPages([]);
      return;
    }
    const initialLength = Math.min(5, pages);
    const initialPages = Array.from({ length: initialLength }, (_, i) => i + 1);
    setCurrentPages(initialPages);
  }, [pages]);

  function clickHandler(e: MouseEvent<HTMLButtonElement>) {
    const value = Number(e.currentTarget.value);
    const first = currentPages[0];
    const last = currentPages[currentPages.length - 1];
setSelectedPage(+e.currentTarget.value)
    if (last - value <= 1 && last < pages) {
      setCurrentPages(prev => {
        const newLast = prev[prev.length - 1] + 1;
        return [...prev.slice(1), newLast];
      });
    }
    else if (value - first <= 1 && first > 1) {
      setCurrentPages(prev => {
        const newFirst = prev[0] - 1;
        return [newFirst, ...prev.slice(0, -1)];
      });
    }
    onClickHandler(value)
  }

  if (pages <= 0) return null;

  const firstVisible = currentPages[0];
  const lastVisible = currentPages[currentPages.length - 1];

  return (
    <div className="flex gap-2 items-center flex-wrap">
      {/* First page + ellipsis */}
      {firstVisible > 2 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPages(prev => {
              const len = prev.length;
              return Array.from({ length: len }, (_, i) => i + 1);
            })}
            className={`w-8 h-8 bg-red-500  text-white rounded-md hover:bg-red-400
                      cursor-pointer flex items-center justify-center text-sm`}
          >
            1
          </button>
          <span className="text-gray-500 dark:text-gray-400">...</span>
        </div>
      )}

      {currentPages.map(page => (
        <button
          key={page}
          value={page}
          onClick={clickHandler}
          className={`w-8 h-8 ${selectedPage === page ? " bg-red-400":"bg-red-500"}  text-white rounded-md hover:bg-red-400
                    cursor-pointer  flex items-center justify-center text-sm
                     transition-colors`}
        >
          {page}
        </button>
      ))}

      {lastVisible < pages - 1 && (
        <div className="flex items-center gap-1">
          <span className="text-gray-500 dark:text-gray-400">...</span>
          <button
            onClick={() => {
              const len = currentPages.length;
              const start = pages - len + 1;
              const newRange = Array.from({ length: len }, (_, i) => start + i);
              setCurrentPages(newRange);
            }}
            className="w-8 h-8 bg-red-500 text-white rounded-md hover:bg-red-400
                      cursor-pointer  flex items-center justify-center text-sm"
          >
            {pages}
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;