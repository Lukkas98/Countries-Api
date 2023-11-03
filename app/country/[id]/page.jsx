import axios from "axios";
import Image from "next/image";
import Link from "next/link";
const url = process.env.URL_FRONT;

const CountryDetail = async ({ params, searchParams }) => {
  const { id } = params;
  const { p } = searchParams;
  let data = {};
  data = (await axios(`${url}/api/countries/${id}`)).data;

  const {
    name,
    population,
    image,
    continents,
    capital,
    subregion,
    area,
    region,
    activities,
  } = data[0].country;

  const ActivitiesName = data.slice(1)

  return (
    <section className="flex flex-col gap-3 items-center">
      <Link href={`/home?p=${p}`} >Volver</Link>
      <h2>{name}</h2>
      <Image src={image} width={200} height={200} alt={`${name} flag`} />
      <p>population: {population}</p>
      <p>continent: {continents[0]}</p>
      <p>subregion: {subregion}</p>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <p>region: {region}</p>
      <div>
        <p>Activities: </p>
        {ActivitiesName.map((activity) => (
          <p key={activity._id}>{activity.name}</p>
        ))}
      </div>
    </section>
  );
};

export default CountryDetail;
