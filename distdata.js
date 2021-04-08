import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";

class DistData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
      case: ["Distict", "confirmed", "recovered", "deaths"],
      totalCase: ["Distict", "Confirmed", "Recovered", "Deceased"],
      tatalCovidCase: {},
      distData: {},
      listOfDist: [],
      distName: "",
    };
  }

  componentDidMount = async () => {
    var data = "";
    var configStateDist = {
      method: "get",
      url: "https://api.covid19india.org/state_district_wise.json",
      header: {},
      data: data,
    };
    let state_district_wise = await axios(configStateDist)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        let res = response.data;
        return res;
      })
      .catch(function (error) {
        console.log(error);
      });
    const stateName = this.props.route.params.stateName;
    const statedst = state_district_wise[stateName]["districtData"];
    console.log(Object.keys(statedst));
    const distList = Object.keys(statedst);
    this.setState({ distData: statedst, listOfDist: distList });

    console.log("state wise-dist", statedst);
  };

  render() {
    let searcheddistName = [];
    if (this.state.distName != "") {
      searcheddistName = this.state.listOfDist.filter((value) =>
        value
          .toLocaleLowerCase()
          .includes(this.state.distName.toLocaleLowerCase())
      );
    } else {
      searcheddistName = this.state.listOfDist;
    }
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder=" Enter Distict to Search"
            placeholderTextColor="rgba(180,177,177,1)"
            selectionColor="grey"
            style={styles.inputstyle}
            onChangeText={(text) => this.setState({ distName: text })}
          ></TextInput>
        </View>
        <View style={{ flexDirection: "row" }}>
          {this.state.totalCase.map((val) => {
            return (
              <View style={styles.totalHeaderBox}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>{val}</Text>
              </View>
            );
          })}
        </View>
        {this.state.listOfDist && (
          <FlatList
            data={searcheddistName}
            renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.stateheaderBox}>
                    <Text style={{  fontSize: 13, fontWeight: "bold" }}>
                      {item}
                    </Text>
                  </View>
                  <View style={styles.headerBox}>
                    <Text style={styles.textstyle}>
                      {this.state.distData[item].confirmed}
                    </Text>
                  </View>
                  <View style={styles.headerBox}>
                    <Text style={styles.textstyle}>
                      {this.state.distData[item].recovered}
                    </Text>
                  </View>
                  <View style={styles.headerBox}>
                    <Text style={styles.textstyle}>
                      {this.state.distData[item].deceased}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}
        <View style={{ marginVertical: 20 }}>
          <Button
            title="Back to home"
            onPress={() => this.props.navigation.navigate("Home")}
          />
        </View>
      </View>
    );
  }
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 40,
  },
  headerRow: {
    flexDirection: "row",
    // borderBottom: 20,
  },
  stateheaderBox: {
    width: (width * 0.8) / 4 - 2,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#d0e1e1",
    height: 60,
  },
  headerBox: {
    width: (width * 0.8) / 4 - 2,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    //padding: 20,
  },
  totalHeaderBox: {
    width: (width * 0.8) / 4 - 2,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#d0e1e0",
    height: 60,
  },
  textstyle: {
    // flex: 1,
    fontSize: 13,
    fontWeight: "bold",
  },
  inputstyle: {
    color: "rgba(0,0,0,1)",
    height: 45,
    width: 225,
    fontSize: 15,
    backgroundColor: "#d0e1e1",
    letterSpacing: 1,
    lineHeight: 15,
    marginVertical: 30,
    borderColor: "#7a42f4",
    borderRadius: 6,
    padding:10
  },
});
export default DistData;
