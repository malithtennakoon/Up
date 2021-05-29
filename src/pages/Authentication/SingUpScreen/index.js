import React, { useEffect } from 'react';
import { TouchableHighlight,Alert, Text, TextInput, View,ScrollView , StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';


function SignInScreen({ navigation  }) {

  var passwordCheck;
  const [userFirstName, setUserFirstName] = React.useState('');
  const [userFamilyName, setUserFamilyName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userPassword, setPassword] = React.useState('');
  const [userRepassword, setRePassword] = React.useState('');


  const checkPassword = () =>{
    if(userPassword.trim() == userRepassword.trim()){
      passwordCheck=true;
    }else{
      passwordCheck=false;
      Alert.alert("Wrong RePassword", "Password and Re-typed passward do not match",[
        {
          text:"OK",
          onPress: () => console.log("ok Pressed")
        }
      ])
    }
    return passwordCheck;
  }

  const checkEmptyMainFeilds = () =>{

    if (!userName.trim()){
      alert('Please Enter Your User Name');
      console.log("Please Enter Your User Name")
      return false;
    }else if(!userPassword.trim()){
      alert('Please Enter Your User Password');
      console.log("Please Enter Your User Password")
      return false;
    }else if(!userRepassword.trim()){
      alert('Please Re-type you Password');
      console.log("Please Re-type you Password")
      return false;
    }
    return true;
  }

  function userRegistration (res) {
    console.log("this function works");
    var userID=res.user.uid;
    firestore()
    .collection('Users')
    .doc(userID)
    .set({
      first_name: userFirstName,
      last_name: userFamilyName,
      email: userName,
      address: "",
      phone_number: "",
      university: "",
      faculty: "",
      department: "",
      batch: "",
      Registration_number: "",
    })
    .then(() => {
      console.log('User added! in firestore');
    });
  }

  const login = ()=>  
  {
    
    if(checkEmptyMainFeilds()){
      if(checkPassword()){

        auth()
        .createUserWithEmailAndPassword(userName, userPassword)
        .then((response) => {
          userRegistration(response);
          console.log('User account created & signed in!');

          //console.log('user: ',user)
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            alert('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            alert('The email address is badly formatted');
          }

          if (error.code === 'auth/network-request-failed') {
            console.log('Bad internet connection!');
            alert('Bad internet connection!');
          }
          console.error(error);
        });

      }
    }

  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffffcf' }}>

      <ScrollView>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',
        borderBottomRightRadius:30, borderTopRightRadius:30,
        marginRight:'60%', marginBottom:30,marginTop:30,padding:5, paddingRight:30, backgroundColor:'#fff176'}}>
          <Text style={{ fontSize: 30,fontWeight:'600',alignSelf: 'flex-end',color:'black' }}>UpLift</Text>
        </View>

        <View style={{ flex: 1}}>

          <View style={{ justifyContent: 'center', marginLeft: '10%',borderBottomLeftRadius:30,borderTopLeftRadius:30, backgroundColor:"#cbc693"  }}>
            <TextInput style={styles.InputStyle} placeholder={"First Name"}
            placeholderTextColor='grey'
            onChangeText={text => setUserFirstName(text)} />

            <TextInput style={styles.InputStyle} placeholder={"Last Name"}
            placeholderTextColor='grey'
            onChangeText={text => setUserFamilyName(text)}/>

            <TextInput style={styles.InputStyle} placeholder={"Username"}
            placeholderTextColor='grey'
            onChangeText={text => setUserName(text.trim())} />

            <TextInput style={styles.InputStyle} onChangeText={(val) => console.log(val)}
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor='grey'
              onChangeText={text => setPassword(text)}
            />
            <TextInput style={styles.InputStyle} onChangeText={(val) => console.log(val)}
            secureTextEntry={true}
            placeholder={"Re-type Password"}
            placeholderTextColor='grey'
            onChangeText={text => setRePassword(text)}
            />
          </View>
 
          <View style={{marginRight:'10%', marginTop:40,padding:10, justifyContent:'center', alignContent:'center',
                        borderBottomRightRadius:30, borderTopRightRadius:30,
                        backgroundColor:'#fff176'}}>
            <TouchableHighlight title={'Sing In'} style={{
              backgroundColor: '#cabf45',
              borderRadius: 30,
              width: 100,
              height: 40,
              alignItems: 'center',
              alignSelf: 'flex-end',
              justifyContent: 'center',
            }}
              onPress={() => {login()}}>
              <Text style={{ color: 'black', fontSize: 20 , fontWeight:'bold'}}>Sign Up</Text>
            </TouchableHighlight>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  InputStyle: {
    borderRadius: 30, borderColor: 'gray', borderWidth: 2, padding: 10, margin: 10, color:'black'
  },
});

export default SignInScreen;

/**
 * 
 * import React, { useEffect } from 'react';
import { TouchableHighlight,Alert, Text, TextInput, View,ScrollView , StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


function SignInScreen({ navigation  }) {

  var passwordCheck;


  const [userFirstName, setUserFirstName] = React.useState('');
  const [userFamilyName, setUserFamilyName] = React.useState('');
  const [userAddress, setUserAddress] = React.useState('');
  const [userPhoneNumber, setUserPhoneNumber] = React.useState('');
  const [userUniversityName, setUserUniversityName] = React.useState('');
  const [userFacultyName, setUserFacultyName] = React.useState('');
  const [userDepartmentName, setUserDepartmentName] = React.useState('');
  const [userUniBatch, setUserUniBatch] = React.useState('');
  const [userRegistrationNumber, setUserRegistrationNumber] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userPassword, setPassword] = React.useState('');
  const [userRepassword, setRePassword] = React.useState('');


  const checkPassword = () =>{
    if(userPassword.trim() == userRepassword.trim()){
      passwordCheck=true;
    }else{
      passwordCheck=false;
      Alert.alert("Wrong RePassword", "Password and Re-typed passward do not match",[
        {
          text:"OK",
          onPress: () => console.log("ok Pressed")
        }
      ])
    }
    return passwordCheck;
  }

  const checkEmptyMainFeilds = () =>{

    if (!userName.trim()){
      alert('Please Enter Your User Name');
      console.log("Please Enter Your User Name")
      return false;
    }else if(!userPassword.trim()){
      alert('Please Enter Your User Password');
      console.log("Please Enter Your User Password")
      return false;
    }else if(!userRepassword.trim()){
      alert('Please Re-type you Password');
      console.log("Please Re-type you Password")
      return false;
    }
    return true;
  }

  function userRegistration (res) {
    console.log("this function works");
    var userID=res.user.uid;
      database()
      .ref('/Users/'+userID)
      .set({
        first_name: userFirstName,
        last_name: userFamilyName,
        email: userName,
        address: userAddress,
        phone_number: userPhoneNumber,
        university: userUniversityName,
        faculty: userFacultyName,
        department: userDepartmentName,
        batch: userUniBatch,
        Registration_number: userRegistrationNumber,
      })
      .then(() => console.log('User is registered in firebase'));
  }

  const login = ()=>  
  {
    
    if(checkEmptyMainFeilds()){
      if(checkPassword()){

        auth()
        .createUserWithEmailAndPassword(userName, userPassword)
        .then((response) => {
          userRegistration(response);
          console.log('User account created & signed in!');

          //console.log('user: ',user)
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            alert('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            alert('The email address is badly formatted');
          }

          if (error.code === 'auth/network-request-failed') {
            console.log('Bad internet connection!');
            alert('Bad internet connection!');
          }
          console.error(error);
        });

      }
    }

  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffffcf' }}>

      <ScrollView>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',
        borderBottomRightRadius:30, borderTopRightRadius:30,
        marginRight:'60%', marginBottom:30,marginTop:30,padding:5, paddingRight:30, backgroundColor:'#fff176'}}>
          <Text style={{ fontSize: 30,fontWeight:'600',alignSelf: 'flex-end',color:'black' }}>UpLift</Text>
        </View>

        <View style={{ flex: 1}}>

          <View style={{ justifyContent: 'center', marginLeft: '10%',borderBottomLeftRadius:30,borderTopLeftRadius:30, backgroundColor:"#cbc693"  }}>
            <TextInput style={styles.InputStyle} placeholder={"First Name"}
            placeholderTextColor='grey'
            onChangeText={text => setUserFirstName(text)} />

            <TextInput style={styles.InputStyle} placeholder={"Last Name"}
            placeholderTextColor='grey'
            onChangeText={text => setUserFamilyName(text)}/>

            <TextInput style={styles.InputStyle} placeholder={"Username"}
            placeholderTextColor='grey'
            onChangeText={text => setUserName(text.trim())} />

            <TextInput style={styles.InputStyle} onChangeText={(val) => console.log(val)}
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor='grey'
              onChangeText={text => setPassword(text)}
            />
            <TextInput style={styles.InputStyle} onChangeText={(val) => console.log(val)}
            secureTextEntry={true}
            placeholder={"Re-type Password"}
            placeholderTextColor='grey'
            onChangeText={text => setRePassword(text)}
            />
          </View>
 
          <View style={{marginRight:'10%', marginTop:40,padding:10, justifyContent:'center', alignContent:'center',
                        borderBottomRightRadius:30, borderTopRightRadius:30,
                        backgroundColor:'#fff176'}}>
            <TouchableHighlight title={'Sing In'} style={{
              backgroundColor: '#cabf45',
              borderRadius: 30,
              width: 100,
              height: 40,
              alignItems: 'center',
              alignSelf: 'flex-end',
              justifyContent: 'center',
            }}
              onPress={() => {login()}}>
              <Text style={{ color: 'black', fontSize: 20 , fontWeight:'bold'}}>Sign Up</Text>
            </TouchableHighlight>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  InputStyle: {
    borderRadius: 30, borderColor: 'gray', borderWidth: 2, padding: 10, margin: 10, color:'black'
  },
});

export default SignInScreen;
 */