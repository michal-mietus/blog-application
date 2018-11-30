import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';


export default class MenuButton extends Component {
  constructor(props){
    // had to use constructor to catch props.navigation
    super(props);
  }

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate(this.props.navigateTo)}
        >
          <Text style={styles.text}>{this.props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    elevation: 4,
    backgroundColor: '#2196F3',
    borderRadius: 2,
    margin: 10,
  },
  text: {
    textAlign: 'center',
    padding: 8,
    color: 'white',
    fontWeight: '500',
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: '#dfdfdf',
  },
  textDisabled: {
    color: '#a1a1a1',
  },
});
