import React, { Component } from 'react';
import { View, Button,  StyleSheet, ScrollView } from 'react-native';
import MenuButton from '../components/menu-button'


export default class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <MenuButton
            buttonText="Articles"
            navigateTo="Articles"
            // passed this.props.navigation to lower level (MenuButton)
            navigation={this.props.navigation}
          />
          <MenuButton 
            buttonText="Add article"
            navigateTo="AddArticle"
            navigation={this.props.navigation}
          />
        </ScrollView>
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
  information: {
    padding: 30,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
});
  