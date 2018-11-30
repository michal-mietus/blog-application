import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class AddArticleScreen extends Component {
  render() {
    return (
      <View>
        <Text>Hi, Add art im changed</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
      padding: 30,
      textAlign: 'center',
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold'
  },
  content: {
      textAlign: 'center',
  },
});
