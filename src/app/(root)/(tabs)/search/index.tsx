import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoadsComponent from "./_components/LoadsComponent";
import AnnouncementsComponent from "./_components/AnnouncementsComponent";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { t } = useTranslation();
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen name={t("loads")} component={LoadsComponent} />
      <Tab.Screen
        name={t("announcements")}
        component={AnnouncementsComponent}
      />
    </Tab.Navigator>
  );
}
