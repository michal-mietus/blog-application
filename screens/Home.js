import React, { Component } from 'react';
import { View, Button,  StyleSheet, ScrollView } from 'react-native';


export default class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Button 
            title="Articles"
            onPress={() => this.props.navigation.navigate('Articles')}
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
  