"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Arrow from "./iconsSvg/arrow";

const Dropdown = ({ dataForm, setDataForm, countries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [options, setOptions] = useState(countries);
  const uniqueCountries = new Set();

  const handleOptionClick = (option) => {
    setSelectedCountries((oldValue) => [
      ...oldValue,
      { id: option._id, name: option.name },
    ]);
    setIsOpen(false);
  };
  console.log(selectedCountries);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //   useEffect(() => {
  //     const filteredOptions = countries.filter(
  //       (country) => !selectedCountries
  //     );
  //     setOptions(filteredOptions);
  //   }, [selectedCountries]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isOpen} // Cambia el valor de aria-expanded
            onClick={toggleDropdown}
          >
            Please select one or more countries
            <Arrow />
          </button>
        </span>
        <div className="flex gap-2">
          {selectedCountries?.map((country) => {
            if (!uniqueCountries.has(country.id)) {
              uniqueCountries.add(country.id)
              return <span key={country.id}>{country.name}</span>;
            }
            return null;
          })}
        </div>
      </div>

      {isOpen && (
        <PanelOfCountries
          options={options}
          handleOptionClick={handleOptionClick}
        />
      )}
    </div>
  );
};
export default Dropdown;

function PanelOfCountries({ options, handleOptionClick }) {
  return (
    <div
      className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="py-1" role="none">
        {options.map((option) => (
          <div
            key={option._id}
            className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            role="menuitem"
            onClick={() => handleOptionClick(option)}
          >
            <Image
              src={option.image}
              height={40}
              width={58}
              alt={option.name}
            />

            <span>{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
