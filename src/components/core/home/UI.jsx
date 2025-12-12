import { atom, useAtom } from "jotai";
import { useRef } from "react";

// icons
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// photos for book
const pictures = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
];

export const pageAtom = atom(0);

// create pages using pictures
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

// add cover and back page to book
pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});


const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  const buttonsContainerRef = useRef();

  return (
      // navigation buttons 
      <div className=" pointer-events-none select-none z-50 fixed inset-0 flex justify-end flex-col">
        <div className="relative w-full pointer-events-auto flex justify-center">

          {/* scroll left button */}
          <div 
            className='md:hidden absolute left-0 top-[0.4rem] py-10 text-white text-4xl z-[100] cursor-pointer'
            onClick={() => buttonsContainerRef.current.scrollLeft -= 150}    
          >
            <FaAngleLeft/>
          </div>

          {/* page navigation buttons */}
          <div 
            ref={buttonsContainerRef}
            className="overflow-auto flex items-center gap-4 max-w-full mx-10 py-10 scroll-smooth hideScrollBar transition-all duration-200"
          >
            {[...pages].map((_, index) => (

              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border cursor-pointer 
                ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}

            <button
              className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border cursor-pointer ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
          
          {/* scroll right button */}
          <div 
            className='md:hidden absolute py-10 right-0 top-[0.4rem] text-white text-4xl cursor-pointer'
            onClick={() => buttonsContainerRef.current.scrollLeft += 150}
          >
            <FaAngleRight/>
          </div>

        </div>
      </div>
  );
};

export default UI