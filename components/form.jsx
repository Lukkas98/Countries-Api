"use client";

import { useState } from "react";
import Dropdown from "./dropdown";

const Form = ({ countries }) => {
  const [dataForm, setDataForm] = useState({
    name: "",
    description: "",
    countries: [],
  });

  const handleOnChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className=" bg-stone-500 w-10/12 mx-auto p-5 flex flex-col gap-4">
      <input type="text" onChange={handleOnChange} name="name" value={dataForm.name}/>
      <input type="text" onChange={handleOnChange} name="description" value={dataForm.description}/>
      <Dropdown
        dataForm={dataForm}
        setDataForm={setDataForm}
        countries={countries}
      />
      <button>Create</button>
    </form>
  );
};

export default Form;
