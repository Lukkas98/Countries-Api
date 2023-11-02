"use client"

import Link from "next/link";
import { useState } from "react";
const url = process.env.NEXT_PUBLIC_URL_FRONT;

const Paginate = () => {
  const [actualPage, setActualPage] = useState(1);
  //hardcodeo de paginas y resultados totales
  const pages = Math.ceil(250 / 15);
  const buttons = [];
  for (let i = 1; i <= pages; i++) {
    buttons.push(
      <Link
        key={i}
        className={`${
          actualPage === i ? "bg-red-400" : "bg-red-100"
        } px-2 py-1`}
        onClick={()=> setActualPage(i)}
        href={`${url}/home?p=${i}`}
      >
        {i}
      </Link>
    );
  }
  return <>{buttons}</>;
};

export default Paginate;
