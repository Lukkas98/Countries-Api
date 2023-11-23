"use client"

import Link from "next/link";
import { useState } from "react";
const url = process.env.NEXT_PUBLIC_URL_FRONT;

const Paginate = ({pag = 1}) => {
  const [actualPage, setActualPage] = useState(parseInt(pag));
  //hardcodeo de paginas y resultados totales
  const pages = Math.ceil(250 / 15);
  const buttons = [];

  for (let i = 1; i <= pages; i++) {
    buttons.push(
      <Link
        key={i}
        className={`${
          actualPage === i ? "bg-orange-700 text-white" : "bg-orange-300"
        } px-2 py-1 rounded-md`}
        onClick={()=> setActualPage(i)}
        href={`${url}/home?p=${i}`}
      >
        {i}
      </Link>
    );
  }
  return <div className="flex flex-wrap gap-3 justify-center">{buttons}</div>;
};

export default Paginate;
