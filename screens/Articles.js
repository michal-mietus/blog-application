import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView } from 'react-native';


export default class ArticlesScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
          title: '',
          content: '',
        }
      }

    componentDidMount(){
      this.getDataFromApiAndShow();
      console.log(this.state)
    }

    getDataFromApiAndShow(){
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
        })
        .then(response => response.json())
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

    render () {
      return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>{this.state.title}</Text>
            <Text style={styles.content}>{this.state.content}</Text>
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
