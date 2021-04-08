import React from "react";
import { ActivityIndicator, Modal, Dimensions, Button } from "react-native";
import {
  StyleSheet,
  Platform,
  NetInfo,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBZleSCPVNGv4vdNbsmbowK_5dveckEd_o",
  authDomain: "covidtracker-d94ad.firebaseapp.com",
  projectId: "covidtracker-d94ad",
  storageBucket: "covidtracker-d94ad.appspot.com",
  messagingSenderId: "445396869448",
  appId: "1:445396869448:web:b67526e0ec7ad93979137d",
  measurementId: "G-ZMZHB1Y6LK",
};  
// if (!firebase.apps.length) {
//   firebase.initializeApp({ firebaseConfig });
// } else {
//   firebase.app(firebaseConfig); // if already initialized, use that one
// }
firebase.default.initializeApp(firebaseConfig);
  

const { height } = Dimensions.get("window");

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null,
      role: "",
      value: "",
      islogged: false,
      login_info: "",
      logged: false,
      on_line: "",
      user_loggedin: "",

    };
  }

  
    componentDidMount () {
    firebase.database().ref('Users').once('value', (data) => {
            var result = data.val();
           console.log(result);
            
        })
    
    };

 

  //login validation
  handleLogin = () => {
    const { email, password } = this.state;
    if (this.state.email === "" || this.state.password === "") {
      alert("Please fill all fields");
    } else {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
        alert("Successfully signed In")
        this.setState({logged:true})
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.log("That email address is already in use!");
            
            this.props.navigation.navigate("Covid Details");
          }

          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          }

          console.error(error);
        });
  };

}

  //render DOM
  render() {
    return (
      
            <View style={styles.container}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>Corona Tracker</Text>
             

              <View style={styles.loginView}>
                {this.state.islogged == true ? (
                  <View style={styles.rect}>
                    <View style={styles.iconRow}>
                      <Text style={styles.loremIpsum}>
                        The login is invalid.
                      </Text>
                    </View>
                  </View>
                ) : null}
                {this.state.logged == true ? (
                  <View style={styles.rect_login}>
                    <View style={styles.iconRow}>
                      <Text style={styles.loremIpsum}>Login successful</Text>
                    </View>
                  </View>
                ) : null}
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#141B41"
                    onChangeText={(text) => this.setState({ email: text })}
                  />  
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#141B41"
                    onChangeText={(text) => this.setState({ password: text })}
                  />
                </View>

                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={this.handleLogin}
                >
                  <Text style={styles.loginText}>
                    SIGNUP
                  </Text>
                </TouchableOpacity>
                
              </View>
              
            </View>
       
     
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    alignItems: "center",
    justifyContent: "center",
  },

  loginView: {
    backgroundColor: "#FDFEFE",
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 25,
    borderRadius: 10,
  },
//   login_info: {
//     marginBottom: 8,
//     marginRight: 10,
//     marginLeft: 10,
//     width: 150,
//     height: 30,
//     color: "#2c3e50",
//     paddingLeft: 20,
//     paddingTop: 8,
//   },
  inputView: {
    width: "80%",
    backgroundColor: "#EFEFEF",
    height: 42,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderRadius: 4,
    shadowColor: "#2c3e50",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
  },
  inputText: {
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#041F1E",
    height: 50,
   
  },
//   input: {
//     width: "85%",
//     margin: 10,
//     padding: 15,
//     fontSize: 16,
//     borderColor: "#d3d3d3",
//     borderBottomWidth: 1,
//     textAlign: "center",
//   },
  
  loginBtn: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#2d98da",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 50,
    shadowColor: "#2c3e50",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 7,
  },
  loginText: {
    color: "white",
    fontWeight: "400",
    fontSize:13
  },

//   image: {
//     height: 200,
//     width: 200,
//     margin: 20,
//   },
  rect: {
    width: 280,
    height: 35,
    backgroundColor: "rgba(230,97,97,1)",
    borderRadius: 7,
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  rect_login: {
    width: 280,
    height: 35,
    backgroundColor: "#079992",
    borderRadius: 7,
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  loremIpsum: {
    color: "rgba(255,255,255,1)",
    height: 29,
    width: 191,
    fontSize: 16,
    marginLeft: 14,
    marginTop: 4,
  },
  iconRow: {
    height: 39,
    flexDirection: "row",
    flex: 1,
    marginRight: 89,
    marginLeft: 5,
    marginTop: 6,
  },
});
