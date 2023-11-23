"use client";

import { useState } from "react";
import Dropdown from "./dropdown";

const Form = ({ countries }) => {
  const [dataForm, setDataForm] = useState({name: "", description: "", countries: []});

  return (
    <form className=" bg-stone-500 w-10/12 mx-auto p-5 flex flex-col gap-4">
      <input type="text" />
      <input type="text" />
      <Dropdown dataForm={dataForm} setDataForm={setDataForm} countries={countries} />
      <button>Create</button>
    </form>
  );
};

export default Form;
