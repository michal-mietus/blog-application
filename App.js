import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, AsyncStorage } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
});


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loginError: ''}
  }

  saveTokenToAsyncStorage(token){
    const TOKEN = 'token';
    AsyncStorage.setItem(TOKEN, token);
  }

  isTokenReceived(response){
    console.log('Success:', JSON.stringify(response));
    if ("token" in response){
      this.setState({loginError: 'Logged!'});
      this.saveTokenToAsyncStorage(response["token"]);
    } else {
      this.setState({loginError: 'Invalid logging'});
    }
  }

  handleSubmit = () => {
    const value = this._form.getValue()
    url = "http://hostingsme.pythonanywhere.com/api/api-token-auth/"

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(value), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(
      //response => console.log('Success:', JSON.stringify(response))
      response => this.isTokenReceived(response)
    )
    .catch(error => console.error('Error:', error)); 
  }

  render() {
    return (
      <View style={styles.container}>
        <Form 
          type={User}
          ref={(c) => this._form = c}
        />
        <Button
          title="Login"
          onPress={this.handleSubmit}
        />
        <Text>{this.state.loginError}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
