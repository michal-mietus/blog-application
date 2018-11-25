import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  email: t.maybe(t.String),
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

export default class App extends Component {

  handleSubmit = () => {
    const value = this._form.getValue();

    url = "http://hostingsme.pythonanywhere.com/api/api-token-auth/"

    const data = {
      username: value["username"],
      password: value["password"]
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref={(c) => this._form = c}
          type={User} 
        />
        <Button
          title="Sign up!"
          onPress={this.handleSubmit}
        />
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
