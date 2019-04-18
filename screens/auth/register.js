import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, ScrollView } from 'react-native';
import MenuButton from '../../components/menu-button'
import t from 'tcomb-form-native'; // 0.6.9
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationActions, StackActions } from 'react-navigation'
import globalVariables from '../../global/global';
import { saveUserIdToAsyncStorage, saveTokenToAsyncStorage } from '../../global/global';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loginInfo: '',
      spinner: false,
      errors: [],
    };
  };

  register = () => {
    const formValues = this._form.getValue();
    if (!this.passwordsValid(formValues)){
      return true;
    };

    this.setState({spinner: true});
    const url = globalVariables.apiUrl + '/api/register/'
    const body = this.getSerializedBody(formValues);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>  res.json())
    .then(res => {
      saveUserIdToAsyncStorage(res.id);
      saveTokenToAsyncStorage(res.token);
      this.resetStackAndShowHome();
    })
    .catch(error => console.error('Error', error));
  };

  passwordsValid(formValues){
    if (formValues) {
      this.passwordsAreTheSame(formValues);
      this.passwordIsStrongEnough(formValues);
      if (this.state.errors){
        return true;
      };
    };
  };

  passwordsAreTheSame(formValues){
    if (formValues.password != formValues.passwordConfirm){
      const error = 'Passwords have to be the same!';
      this.setState({error: error});
    };
  };

  passwordIsStrongEnough(formValues){
    var strongPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!strongPasswordRegex.test(formValues.password)){
      const error = 'Password is too weak! It should contain at least 8 chars, big letter, small letter and';
      this.setState({error: error});
    };
  };

  getSerializedBody(formValues){
    return {
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
      first_name: formValues.name,
      last_name: formValues.surname,
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
    const Form = t.form.Form;
    const RegisterForm = this.getForm();
    
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Form
          type={RegisterForm}
          ref={(c) => this._form = c}
        />
        <Text style={styles.error}>
          {this.state.errors}
        </Text>
        <Button
          title="Register"
          onPress={this.register}
        />
      </View>
    );
  };

  getForm() {
    var Email = t.refinement(t.String, function(value) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    });

    Email.getValidationErrorMessage = function (value, path, context){
      return 'Provide valid email';
    };

    return t.struct({
      name: t.String,
      surname: t.String,
      email: Email,
      username: t.String,
      password: t.String,
      passwordConfirm: t.String,
    })
  };

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginBottom: 15,
  },
});
  