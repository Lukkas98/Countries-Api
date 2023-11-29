import axios from "axios";
import Image from "next/image";
import Link from "next/link";
const url = process.env.URL_FRONT;

const Cards = async ({ pag }) => {
  let data = {};
  data = (await axios(`${url}/api/countries?p=${pag}`)).data;

  return (
    <div className="flex flex-wrap justify-around gap-5 my-10">
      {data?.map((country, i) => (
        <Link
          //devuelvo la "p" para no perder la refenrencia del paginado
          href={`/country/${country._id}?p=${pag}`}
          className=" h-fit w-[200px] border p-3 border-black text-center flex flex-col gap-4"
          key={i}
        >
          <h6>{country.name}</h6>
          <div className="w-full h-[100px] relative z-20">
            <Image
              className="z-10"
              src={country.image}
              fill={true}
              alt={`${country.name} flag`}
              sizes="100%"
            />
          </div>
          <span>population: {country.population}</span>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
