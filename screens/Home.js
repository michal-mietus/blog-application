import React, { Component } from 'react';
import { View, Text, Button,  StyleSheet, AsyncStorage, ScrollView } from 'react-native';


class Article extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.content}>{this.props.content}</Text>
      </View>
    )
  }
}


export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
    }
  }

  showResource(){
    resourceJson = this.getDataFromApi();
  }

  getDataFromApi(){
    AsyncStorage.getItem('token').then(token => {
      console.log('Async: ', token);
      
      let headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + String(token),
      }

      let url = "http://hostingsme.pythonanywhere.com/api/article/";
      fetch(url, {
        method: "GET",
        headers: headers,
      }).then(response => response.json())
      .then(response => {
        console.log('Response: ', JSON.stringify(response));
        let title = response[0]["title"];
        let content = response[0]["content"];
        this.setState({title: title});
        this.setState({content: content});
      })
      .catch(error => console.log(error))

    }).catch(error => console.log(error))

    
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Button 
            title="Articles"
            onPress={() => this.getDataFromApi()}
          />
          <Article 
            title={this.state.title}
            content={this.state.content}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
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
  