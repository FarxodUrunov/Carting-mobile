import LoadsFilter from "./LoadsFilter";
import AnnouncementFilter from "./AnnouncementFilter";
import { useSearchStore } from "-/search.store";
import { useTranslation } from "react-i18next";

export default function MainScreenFilter() {
  const { t } = useTranslation();
  const { tabValue } = useSearchStore();

  return tabValue === t("loads") ? <LoadsFilter /> : <AnnouncementFilter />;
}
