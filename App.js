import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./HomeScreen";
import FavoritosScreen from "./FavoritosScreen";
import MisRecetasScreen from "./MisRecetasScreen";
import DetallesRecetaScreen from "./DetallesRecetaScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TopBar() {
  return (
    <View style={styles.topBar}>
      <Text style={styles.topBarText}>Konrad Foodie</Text>
    </View>
  );
}

function RecetasStack({ favoritos, setFavoritos }) {
  return (
    <Stack.Navigator screenOptions={{ header: () => <TopBar /> }}>
      <Stack.Screen name="Home">
        {({ navigation }) => <HomeScreen navigation={navigation} favoritos={favoritos} setFavoritos={setFavoritos} />}
      </Stack.Screen>
      <Stack.Screen name="DetallesReceta" component={DetallesRecetaScreen} options={{ title: "Detalles de la Receta" }} />
    </Stack.Navigator>
  );
}

function FavoritosStack({ favoritos, setFavoritos }) {
  return (
    <Stack.Navigator screenOptions={{ header: () => <TopBar /> }}>
      <Stack.Screen name="FavoritosScreen">
        {({ navigation }) => <FavoritosScreen navigation={navigation} favoritos={favoritos} setFavoritos={setFavoritos} />}
      </Stack.Screen>
      <Stack.Screen name="DetallesReceta" component={DetallesRecetaScreen} options={{ title: "Detalles de la Receta" }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [favoritos, setFavoritos] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Inicio") {
              iconName = "home"; 
            } else if (route.name === "Favoritos") {
              iconName = "star"; 
            } else if (route.name === "Mis Recetas") {
              iconName = "book"; 
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#ff85a2",
          tabBarInactiveTintColor: "#d5d7dd",
          tabBarStyle: { backgroundColor: "#fff", paddingBottom: 10, height: 65, borderTopWidth: 0 },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold", paddingBottom: 5 },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Inicio">
          {() => <RecetasStack favoritos={favoritos} setFavoritos={setFavoritos} />}
        </Tab.Screen>
        <Tab.Screen name="Favoritos">
          {() => <FavoritosStack favoritos={favoritos} setFavoritos={setFavoritos} />}
        </Tab.Screen>
        <Tab.Screen name="Mis Recetas" component={MisRecetasScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#ff85a2",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  topBarText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});
