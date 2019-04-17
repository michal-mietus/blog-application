import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, AsyncStorage } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import t from 'tcomb-form-native'; // 0.6.9
import Spinner from 'react-native-loading-spinner-overlay';


const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
});


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { loginInfo: ''}
  }

  componentDidMount() {
    this.setState({spinner: false});
  }

  handleSubmit = () => {
    this.setState({spinner: true})  // turn on spinner
    const value = this._form.getValue();
    const url = "http://http://blogapp-mm.herokuapp.com/api/api-token-auth/";

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(value),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(
      response => this.isTokenReceived(response)
    )
    .catch(error => console.error('Error:', error)); 
  }

  isTokenReceived(response){
    this.setState({spinner: false})  // turn off spinner 
    console.log('Success:', JSON.stringify(response));
    if ("token" in response){
      this.setState({loginInfo: 'Logged!'});  // just info
      this.saveUserIdToAsyncStorage(response["id"]);
      this.saveTokenToAsyncStorage(response["token"]);
      this.resetStackAndShowHome();
    } else {
      this.setState({loginInfo: 'Invalid logging'});
    }
  }  

  saveUserIdToAsyncStorage(userId){
    console.log('Saving user id:', String(userId));
    const USERID = 'userId';
    AsyncStorage.setItem(USERID, String(userId)); // why saving only as string works?
  }

  saveTokenToAsyncStorage(token){
    console.log('Saving token:', String(token));
    const TOKEN = 'token';
    AsyncStorage.setItem(TOKEN, token);
  }

  resetStackAndShowHome = () => {
    // forbids going back to login screen
    this.props
      .navigation
      .dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Home',
          }),
        ],
      }))
   }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Form 
          type={User}
          ref={(c) => this._form = c}
        />
        <Button
          title="Login"
          onPress={this.handleSubmit}
        />
        <Text style={styles.information}>{this.state.loginInfo}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    container: {
      justifyContent: 'center',
      marginTop: 20,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    information: {
      padding: 30,
      textAlign: 'center',
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold'
    },
  });
  