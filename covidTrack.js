import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Button,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import axios from "axios";

class Covid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
      case: ["state", "confirmed", "recovered", "deaths"],
      totalCase: ["Confirmed", "Recovered", "Deaths"],
      tatalCovidCase: {},
      stateName: "",
    };
  }

  componentDidMount = async () => {
    var data = "";
    var res = [];

    var config = {
      method: "get",
      url: "https://api.covid19india.org/data.json",
      headers: {},
      data: data,
    };

    let resData = await axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        let res = response.data.statewise;

        console.log("data", res);
        return res;
      })
      .catch(function (error) {
        console.log(error);
      });

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

        console.log("data", res);
        return res;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("data...dist.wise", state_district_wise);
    const maharsDst = state_district_wise["Maharashtra"];
    console.log("state wise-dist", maharsDst);

    const totalData = resData.find((val) => val.state === "Total");
    console.log(resData);
    this.setState({ cases: resData, tatalCovidCase: totalData });
  };

  _handleStateData = async (stateName) => {
    this.props.navigation.navigate("DistictWise", { stateName });
  };

  render() {
    let searchedStateName = [];
    if (this.state.stateName != "") {
      searchedStateName = this.state.cases.filter((value) =>
        value.state
          .toLocaleLowerCase()
          .includes(this.state.stateName.toLocaleLowerCase())
      );
    } else {
      searchedStateName = this.state.cases;
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 40 }}>
          <View style={styles.headerRow}>
            <View
              style={[styles.totalHeaderBox, { backgroundColor: "#ffe6e6" }]}
            >
              <Text
                style={{ color: "#ff0000", fontWeight: "bold", fontSize: 9 }}
              >
                {this.state.tatalCovidCase.confirmed}
              </Text>
            </View>
            <View
              style={[styles.totalHeaderBox, { backgroundColor: "#ccffdd" }]}
            >
              <Text
                style={{ color: "#008000", fontWeight: "bold", fontSize: 9 }}
              >
                {this.state.tatalCovidCase.recovered}
              </Text>
            </View>
            <View
              style={[styles.totalHeaderBox, { backgroundColor: "#e0ebeb" }]}
            >
              <Text
                style={{ color: "#666666", fontWeight: "bold", fontSize: 9 }}
              >
                {this.state.tatalCovidCase.deaths}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.headerRow}>
          <View style={[styles.totalHeaderBox, { backgroundColor: "#ffb3b3" }]}>
            <View style={{ fontWeight: "bold" }}>
              <Text
                style={{ color: "#ff0000", fontWeight: "bold", fontSize: 10 }}
              >
                Confirmed
              </Text>
            </View>
          </View>
          <View style={[styles.totalHeaderBox, { backgroundColor: "#80ffaa" }]}>
            <Text
              style={{ color: "#008000", fontWeight: "bold", fontSize: 10 }}
            >
              Recovered
            </Text>
          </View>
          <View style={[styles.totalHeaderBox, { backgroundColor: "#b3cccc" }]}>
            <Text
              style={{ color: "#666666", fontWeight: "bold", fontSize: 10 }}
            >
              Deaths
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Covid data based on country !
          </Text>
        </View>
        <View>
          <TextInput
            placeholder=" Enter State to Search"
            placeholderTextColor="rgba(180,177,177,1)"
            selectionColor="grey"
            style={styles.inputstyle}
            onChangeText={(text) => this.setState({ stateName: text })}
          ></TextInput>
        </View>

        <View style={{ marginVertical: 20 }}></View>
        <View style={styles.headerRow}>
          {this.state.case.map((value) => {
            return (
              <View
                style={[styles.stateheaderBox, { backgroundColor: "#e0ebeb" }]}
              >
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {value}
                </Text>
              </View>
            );
          })}
        </View>

        <FlatList
          data={searchedStateName}
          extraData={searchedStateName}
          renderItem={({ item }) => {
            if (item.state != "Total")
              return (
                <View style={styles.headerRow}>
                  <TouchableOpacity
                    onPress={() => {
                      this._handleStateData(item.state);
                    }}
                    style={styles.stateheaderBox}
                  >
                    <View style={styles.stateheaderBox}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          alignSelf: "center",
                        }}
                      >
                        {item.state}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.stateheaderBox}>
                    <Text style={styles.textstyle}>{item.confirmed}</Text>
                  </View>
                  <View style={styles.stateheaderBox}>
                    <Text style={styles.textstyle}>{item.recovered}</Text>
                  </View>
                  <View style={styles.stateheaderBox}>
                    <Text style={styles.textstyle}>{item.deaths}</Text>
                  </View>
                </View>
              );
          }}
        />

        <View style={{ marginVertical: 20 }}>
          <Button
            title="Back to home"
            onPress={() => this.props.navigation.navigate("Home")}
          />
        </View>
      </SafeAreaView>
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
  headerRow: {
    flexDirection: "row",
  },
  stateheaderBox: {
    width: width / 4 - 2,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    // padding: 20,
    backgroundColor: "#d0e1e1",
    height: 60,
  },
  textstyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  headerBox: {
    width: (width * 0.8) / 4 - 5,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  totalHeaderBox: {
    width: (width * 0.8) / 4 - 5,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  inputstyle: {
    color: "rgba(0,0,0,1)",
    height: 45,
    width: 225,
    fontSize: 15,
    backgroundColor: "#d0e1e1",
    letterSpacing: 1,
    lineHeight: 15,
    marginTop: 30,
    borderColor: "#7a42f4",
    borderRadius:6,
    padding:10
  },
});
export default Covid;
