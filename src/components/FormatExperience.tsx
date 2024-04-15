import i18next from "i18next";
const { t } = i18next;
export function FormatExperience(id: string) {
  switch (id) {
    case "less_than_a_year":
      return t("less_than_year");
    case "from_1_to_3_years":
      return t("from_1_to_3_years");
    case "from_3_to_6_years":
      return t("from_3_to_6_years");
    case "more_than_6_years":
      return t("more_than_6_years");
    default:
      return t("invalid_experience");
  }
}
