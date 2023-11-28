const validatorActivity = (name, season, countries, difficulty, duration) => {

  if (!name.length) return "You must enter a name";
  else if (name.length > 40) return "The name is too large";
  else if (!regexText.test(name)) return "The name must be letters only";

  if (!season.length) return "Invalid season";

  if (difficulty > 5 || difficulty < 1) return "Invalid difficulty";

  if (duration > 24 || duration < 1) return "Invalid duration";

  if (!countries.length) return "select at least 1 country";

  return true
};

export default validatorActivity;
