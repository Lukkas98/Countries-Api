const regexText = /^[a-zA-Z]+$/;
const seasons = ["Spring", "Summer", "Autumn", "Winter"];

const Validate = (
  idName,
  dataForm = {
    name: "",
    season: "",
    difficulty: 1,
    duration: 1,
    countries: [],
  },
  errors = {}
) => {
  const { name, countries, season, difficulty, duration } = dataForm;

  switch (idName) {
    case "name":
      if (!name.length) errors.name = "You must enter a name";
      else if (name.length > 40) errors.name = "The name is too large";
      else if (!regexText.test(name))
        errors.name = "The name must be letters only";
      else errors.name = "";
      return errors;

    case "season":
      if (!seasons.includes(season)) errors.season = "Invalid season";
      else errors.season = "";
      return errors;

    case "difficulty":
      if (difficulty > 5 || difficulty < 1)
        errors.difficulty = "Invalid difficulty";
      else errors.difficulty = "";
      return errors;

    case "duration":
      if (duration > 24 || duration < 1) errors.duration = "Invalid duration";
      else errors.duration = "";
      return errors;

    case "countries":
      if (!countries.length) errors.countries = "select at least 1 country";
      else errors.countries = "";
      return errors;

    default:
      return errors;
  }
};

export default Validate;
