import InputSearch from "@/components/inputsSearch/inputSearch";
import SectionCards from "@/components/sectionCards";
import Link from "next/link";

const HomePage = ({ searchParams }) => {
  const pag = searchParams.p
  return (
    <>
      <nav className="flex justify-between p-4 bg-amber-600 text-white">
        <Link
          className="px-2 py-1 bg-slate-500 font-bold rounded-lg"
          href={"/"}
        >
          Salir
        </Link>
        <Link href={"/create"} >Create Activity</Link>
        <InputSearch />
      </nav>
      <section className="flex flex-wrap justify-evenly gap-5 my-10 mx-6">
        <SectionCards pag={pag}/>
      </section>
    </>
  );
};

export default HomePage;
