import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, FlatList } from 'react-native';
import globalVariables from '../../global/global';

export default class ArticlesScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
          articles: [],
          isLoading: true,
        }
      }

    componentDidMount(){
      this.getDataFromApiAndShow();
    }

    getDataFromApiAndShow(){
    AsyncStorage.getItem('token').then(token => {
        
        let headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + String(token),
        }

        let url = globalVariables.apiUrl + "/api/article/";
        fetch(url, {
          method: "GET",
          headers: headers,
        })
        .then(response => response.json())
        .then(response => {
          this.setState({articles: response});
          this.setState({isLoading: false})
        })
        .catch(error => console.log(error))
      }).catch(error => console.log(error))
    }

    render () {
      if (this.state.isLoading){
        return (
          <View style={styles.container}>
            <Text style={styles.container}>
              Loading
            </Text>
          </View>
        )
      }
      else {
        return (
          <View>
            <FlatList
              data={this.state.articles}
              renderItem={({item}) => (
                <View style={styles.container}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.content}>{item.content}</Text>
                </View>
                )
              }
              keyExtractor = {(item) => String(item.id)}
            />
          </View>
        )
      }
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
