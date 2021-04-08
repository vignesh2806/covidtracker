import React from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DistData from "./distdata.js"
import Covid from "./covidTrack";
import Login from "./login";


const Stack = createStackNavigator();

class App extends React.Component {
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Login} />
          <Stack.Screen name="Covid Details" component={Covid} />
          <Stack.Screen name="DistictWise" component={DistData} />
        </Stack.Navigator>
      </NavigationContainer>
      // <View>
      //   <Covid />
      // </View>
    );
  }
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
export default App;
