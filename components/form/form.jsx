"use client";

import { useEffect, useState } from "react";
import Dropdown from "./dropdownCountries";
import Validate from "./validate";
import SeasonsPicker from "./seasonsPicker";

const Form = ({ countries }) => {
  const obj = {
    name: "",
    season: "",
    difficulty: 1,
    duration: 1,
    countries: [],
  };
  const [dataForm, setDataForm] = useState(obj);
  const [errors, setErrors] = useState(obj);
  const [name, setName] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setErrors((prevErrors) => ({ ...prevErrors, ...Validate(name, dataForm) }))
  }, [dataForm, name]);

  useEffect(() => {
    const requiredFields = ['name', 'season', 'difficulty', 'duration', 'countries'];
  
    const isValid = requiredFields.every((field) => {
      if (field === 'countries') {
        return Array.isArray(dataForm[field]) && dataForm[field].length > 0;
      } else {
        return dataForm[field] !== "";
      }
    });
  
    setIsCompleted(isValid);
  }, [errors, dataForm]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setName(name)
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      
    } catch (error) {
      
    }

  }

  return (
    <form className=" bg-stone-500 w-10/12 mx-auto p-5 flex flex-col gap-4">
      <input
        className={`px-2 py-1 ${errors.name ? "border border-red-800" : ""}`}
        type="text"
        onChange={handleOnChange}
        name="name"
        value={dataForm.name}
        placeholder="Activity name"
      />
      {errors.name && <span className="text-sm text-red-700" >{errors.name}</span>}
      <label htmlFor="difficulty">
        Select difficulty: {dataForm.difficulty}
      </label>
      <input
        type="range"
        name="difficulty"
        value={dataForm.difficulty}
        onChange={handleOnChange}
        min={1}
        max={5}
      />
      <label htmlFor="duration">Select duration (hours)</label>
      <input
        type="number"
        name="duration"
        value={dataForm.duration}
        onChange={handleOnChange}
        max="24"
        className="w-full p-2 border rounded"
      />
      <SeasonsPicker setDataForm={setDataForm} />
      <Dropdown setDataForm={setDataForm} countries={countries} />
      {isCompleted ? (
        <button onClick={handleSubmit}>Create Activity</button>
      ) : (
        <button disabled>Please complete the form</button>
      )}
    </form>
  );
};

export default Form;
