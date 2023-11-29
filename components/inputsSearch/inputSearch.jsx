"use client";

import { useState } from "react";
import Glass from "../iconsSvg/glass";
import axios from "axios";
import Link from "next/link";
const url = process.env.NEXT_PUBLIC_URL_FRONT;

const InputSearch = () => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = async () => {
    setCountries([]);
    setIsShowing(true);
    setIsLoading(true);
    const { data } = await axios(`${url}/api/search?name=${input}`);
    setInput("");

    for (const key in data) {
      if (data[key].country) {
        setCountries((oldCountries) => [...oldCountries, data[key]]);
      } else {
        setIsShowing(false);
        console.log(data.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {isShowing && (
        <div
          className="fixed top-0 right-0 z-40 w-full h-full bg-transparent"
          onClick={() => setIsShowing(false)}
        />
      )}
      <div className="flex gap-2 relative items-center">
        <input
          className="px-2 py-1 rounded-sm text-black"
          type="text"
          value={input}
          onChange={handleOnChange}
          onClick={() => setIsShowing((oldValue) => !oldValue)}
          placeholder="search country"
        />
        <Glass handleSearch={handleSearch} isLoading={isLoading} />
        {isShowing && (
          <div className="w-full px-2 py-1 h-fit bg-slate-200 text-black absolute top-9 z-50 max-h-[60vh] rounded-b-lg overflow-y-auto">
            {countries.map((obj) => {
              const { _id, name, image } = obj.country;
              return (
                <Link
                  key={obj._id}
                  className="w-full rounded-3xl h-fit grid gap-2 my-2 hover:bg-slate-500 hover:text-white px-3 py-4"
                  href={`/country/${_id}`}
                >
                  <span>{name}</span>
                  <img className="h-5" src={image} alt={`${name} flag`} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default InputSearch;
