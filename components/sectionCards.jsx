import { Suspense } from "react";
import Cards from "./cards";
import Paginate from "./paginate";

const SectionCards = ({ pag }) => {
  return (
    <div className="w-full grid justify-items-center">
      <div className="flex gap-3">
        <Paginate pag={pag} />
      </div>
      <Suspense fallback={<Loading/>}>
        <Cards pag={pag} />
      </Suspense>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="text-center my-5">
      <span className="font-bold text-xl">LOADING...</span>
      <div className="flex flex-wrap justify-center gap-5 mt-7">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            className="h-[200px] w-[200px] border p-3 border-black text-center"
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionCards;
