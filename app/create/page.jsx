import Form from "@/components/form/form";
import axios from "axios";
import Link from "next/link";

const CreateActivity = async () => {
  const data = await (
    await axios(`${process.env.URL_FRONT}/api/countries?p=all`)
  ).data;

  return (
    <section>
      <Link
        href={"/home"}
        className="px-2 py-1 bg-slate-500 font-bold rounded-lg"
      >
        Volver
      </Link>
      <Form countries={data} />
    </section>
  );
};

export default CreateActivity;
