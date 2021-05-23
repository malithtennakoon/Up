import React, { useState, useEffect } from "react";
import {TouchableHighlight, Text, TextInput,ScrollView, View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from "react-native-gesture-handler";

function SignInScreen({ navigation }) {

  

 const [username, setUserName] = useState('');
 const [password, setPassword] = useState('');


  const login = ()=>  
  {
    if(username===""){
      alert("Please Enter Username")
    }else if(password===""){
      alert("Please Enter Password")
    }else{
      auth().signInWithEmailAndPassword(username, password)
      .then((userCredential) => {

        var user = userCredential.user;
        console.log("Signed in")
        console.log("Authenticated successfully",user)

      })
      .catch((error) => {
        if (error.code === 'auth/network-request-failed') {
          alert("Bad internet connection!")
          console.log('Bad internet connection!')
          
        }

        if (error.code === 'auth/user-not-found') {
          alert("user not found!")
          console.log('user not found!')
          
        }

        if (error.code === 'auth/wrong-password') {
          alert("wrong password!")
          console.log('wrong password!')
        }
      });
    }
  }
  

  return (

      <View style={{flex:1,backgroundColor:'#ffffcf'}}>
        <View style={{ flex: 1, justifyContent: 'center', borderRadius:30, margin:40, alignItems: 'center', backgroundColor:'#fff176' }}>
          <Text style={{ fontSize: 80 }}>UpLift</Text>
        </View>

        <View style={{flex:1}}>
        
          <TextInput style={styles.InputStyle} placeholder={"Username"}
          textAlign='center'
          placeholderTextColor='grey'
          onChangeText={text => setUserName(text)} />


          <TextInput style={styles.InputStyle} onChangeText={(val) => console.log(val)}
            secureTextEntry={true}
            placeholder={"Password"}
            textAlign='center'
            placeholderTextColor='grey'
            onChangeText={text => setPassword(text)} />
            
          <TouchableHighlight title={'Sing In'} style={{
            backgroundColor: '#cabf45',
            borderRadius: 30,
            width: 100,
            height: 40,
            alignItems: 'center',
            alignSelf: 'center',
            margin:10,
            justifyContent: 'center'
          }}
            onPress={() => {login()}}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight:'bold' }}>Sign In</Text>
          </TouchableHighlight>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  }}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
              <Text  style={{ margin: 20, fontWeight:'bold' }}>Forget Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text  style={{ margin: 20, fontWeight:'bold' }}>Sign Up</Text>
            </TouchableOpacity>
          
          </View>


        </View>

        
      </View>

  );


}
const styles = StyleSheet.create({
  InputStyle: {
    borderRadius: 30, borderColor: 'gray', borderWidth: 2, padding: 10, margin: 10, marginRight:30, marginLeft:30, color:'black',
  },
});
export default SignInScreen;
