import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, AsyncStorage } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import t from 'tcomb-form-native';
import Spinner from 'react-native-loading-spinner-overlay';
import globalVariables from '../../global/global';
import { saveUserIdToAsyncStorage, saveTokenToAsyncStorage } from '../../global/global';


const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
});


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { error: ''}
  }

  componentDidMount() {
    this.setState({spinner: false});
  }

  handleSubmit = () => {
    this.setState({spinner: true});  // turn on spinner
    const value = this._form.getValue();
    const url = globalVariables.apiUrl + "/api/api-token-auth/";

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => this.isTokenReceived(response))
    .catch(error => console.error('Error:', error)); 
  }

  isTokenReceived(response){
    this.setState({spinner: false});  // turn off spinner 
    if ("token" in response){
      saveUserIdToAsyncStorage(response["id"]);
      saveTokenToAsyncStorage(response["token"]);
      this.resetStackAndShowHome();
    } else {
      this.setState({error: 'Loggin error. Try again.'});
    };
  };

  resetStackAndShowHome = () => {
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
   };

  render() {
    const {navigate} = this.props.navigation;
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
        <View style={{margin: 5,}}>
          <Button
            title="Login"
            onPress={this.handleSubmit}
          />
        </View>
        <View style={{margin: 5,}}>
          <Button
            title='Register'
            onPress={() => navigate('Register')}
          />
        </View>
        <Text style={styles.error}>{this.state.error}</Text>
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
    error: {
      padding: 30,
      textAlign: 'center',
      fontSize: 16,
      color: 'red',
      fontWeight: 'bold'
    },
  });
  