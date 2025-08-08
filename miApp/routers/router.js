import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native-paper";
import { Platform } from "react-native";
import { UserContext } from "../contexts/userContext";

import Login from "../views/login";
import Register from "../views/register";
import Dashboard from "../views/dashboard";
import TabNavigator from "../views/tabNavigator";
import Profile from "../views/profile";
import CreateReport from "../views/createReport";
import AllReports from "../views/allReports";
import ReportDetail from "../views/reportDetail";
import MyReports from "../views/myReports";


const Stack = createNativeStackNavigator();

export default function Router() {
  const { usuario, cargando } = useContext(UserContext);

  if (cargando) return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  return (
<NavigationContainer>
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!usuario ? (
      <>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </>
    ) : (
      <>
        <Stack.Screen name="Main" component={Platform.OS === "web" ? Dashboard : TabNavigator} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
        <Stack.Screen name="CreateReport" component={CreateReport} />
        <Stack.Screen name="AllReports" component={AllReports} />
        <Stack.Screen name="ReportDetail" component={ReportDetail} />
        <Stack.Screen name="MyReports" component={MyReports} />
      </>
    )}
  </Stack.Navigator>
</NavigationContainer>
  );
}