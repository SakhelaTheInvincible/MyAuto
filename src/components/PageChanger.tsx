import {firstPage, previousPage, nextPage, lastPage} from '../assets/PageButtons';

type PageChangerProps = {
    currentPage: number,
    totalPages: number,
    goToPage: (pageNumber: number) => void,
  };

function PageChanger({currentPage, totalPages, goToPage} : PageChangerProps) {
    let size = currentPage>=9998 ? 5:7;
    let size2 = size==5 ? 2 : 3;

    return (
        <div className="bg-white relative h-[40px] rounded-lg font-Noto font-semibold items-center text-[14px]  w-full flex justify-center mt-2 mb-2">
        <div className="">
          {currentPage > 1 && 
            (<button className="mr-[12px] sm:mr-[24px] text-red-400" onClick={() => goToPage(1)}> {firstPage()}</button>)
          }
          {currentPage > 1 && 
            (<button className="mr-[12px] sm:mr-[24px] text-red-400" onClick={() => goToPage(currentPage - 1)} > {previousPage()} </button> )
          }
          {totalPages <= 7 && Array.from({ length: totalPages }, (_, i) => (
            <button className={i + 1 == currentPage ? "mr-[12px] sm:mr-[24px] text-red-400" : "mr-[12px] sm:mr-[24px] text-gray-400" } key={i} onClick={() => goToPage(i + 1)} > {i + 1} </button>
          ))}
          {totalPages > 7 && currentPage <= 4 && Array.from({ length: 7 }, (_, i) => (
            <button className={i + 1 == currentPage ? "mr-[12px] sm:mr-[24px] text-red-400" : "mr-[12px] sm:mr-[24px] text-gray-400"} key={i} onClick={() => goToPage(i + 1)}> {i + 1} </button>
          ))}
          {currentPage >= totalPages - 2 && totalPages > 7 && Array.from({length:size}, (_, i) => (
            <button className={ totalPages - size + i + 1 == currentPage ? "mr-[12px] sm:mr-[24px] text-red-400" : "mr-[12px] sm:mr-[24px] text-gray-400" } key={totalPages - size + i + 1} onClick={() => goToPage(totalPages - size + i + 1)} > {totalPages - size + i + 1} </button>
          ))}

          {totalPages > 7 && currentPage < totalPages - 2 && currentPage > 4 && Array.from({ length: size }, (_, i) => (
            <button className={ currentPage - size2 + i == currentPage ? "mr-[12px] sm:mr-[24px] text-red-400" : "mr-[12px] sm:mr-[24px] text-gray-400" } key={currentPage - size2 + i} onClick={() => goToPage(currentPage - size2 + i)} > {currentPage - size2 + i} </button>
          ))}
          {totalPages>1 && currentPage < totalPages && 
            (<button className="mr-[12px] sm:mr-[24px] text-red-400" onClick={() => goToPage(currentPage + 1)}> {nextPage()}</button>)
          }

          {totalPages>1 && currentPage < totalPages && 
            (<button className="text-red-400" onClick={() => goToPage(totalPages)} > {lastPage()} </button> )
          }

        </div>
      </div>
    )
}

export default PageChanger;