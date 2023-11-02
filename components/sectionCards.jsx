import { Suspense } from "react";
import Cards from "./cards";
import Paginate from "./paginate";

const SectionCards = ({ pag }) => {
  return (
    <div className="w-full grid justify-items-center">
      <div className="flex gap-3">
        <Paginate />
      </div>
      <Cards pag={pag} />
    </div>
  );
};

export default SectionCards;
