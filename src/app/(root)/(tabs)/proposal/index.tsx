import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ActiveProposals from "./_components/ActiveProposals";
import WaitingProposal from "./_components/WaitingProposal";
import ArchiveProposal from "./_components/ArchiveProposal";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";

export default function ProposalTabScreen() {
  const Tab = createMaterialTopTabNavigator();
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
          letterSpacing: -0.4,
          textTransform: "capitalize",
          color: colorScheme === "dark" ? "#fff" : "#000",
        },
      }}
    >
      <Tab.Screen
        name="Active"
        component={ActiveProposals}
        options={{
          tabBarLabel: t("active"),
        }}
      />
      <Tab.Screen
        name="Waiting for"
        component={WaitingProposal}
        options={{
          tabBarLabel: t("waiting_for"),
        }}
      />
      <Tab.Screen
        name="Archive"
        component={ArchiveProposal}
        options={{
          tabBarLabel: t("archive"),
        }}
      />
    </Tab.Navigator>
  );
}
