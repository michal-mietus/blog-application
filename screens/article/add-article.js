import React, { Component } from 'react';
import { View, StyleSheet, Button, AsyncStorage } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import t from 'tcomb-form-native';
import { form } from 'tcomb-form-native/lib';
import globalVariables from '../../global/global';


var Form = t.form.Form;
var Article = t.struct({
  title: t.String,
  content: t.String,
});

export default class AddArticleScreen extends Component {

  addArticle(){
    let formValues = this.refs.form.getValue();

    if (formValues){
      AsyncStorage.multiGet(['userId', 'token']).then(stores => {
        let authorIdAndToken = this.getAuthorIdAndToken(stores);
        
        let headers = this.createRequestHeaders(authorIdAndToken["token"]);
        let body = this.createRequestBody(formValues, authorIdAndToken["author"]);
        let url = globalVariables.apiUrl + "/api/article/"

        fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }).then(response => {
          if (response["ok"] === true && response["status"] === 201){
            this.resetStackAndShowHome();
          }
        }).catch(error => {
          console.error(error);
        })
      })
    };
  };

  getAuthorIdAndToken(stores){
    authorIdAndToken = {}
    stores.map((result, i, store) => {
      let key = this.ifUserIdRenameToAuthorOrDontChange(store[i][0]);
      let value = store[i][1];
      authorIdAndToken[key] = value;
    })
    return authorIdAndToken;
  };

  ifUserIdRenameToAuthorOrDontChange(key){
    if (key === 'userId'){
      return 'author';
    } else {
      return key;
    };
  };

  createRequestHeaders(token){
    headers = {
      "Content-Type": "application/json",
      "Authorization": "Token " + String(authorIdAndToken["token"]),
    };

    return headers;
  };

  createRequestBody(formValues, authorId){
    title = formValues["title"];
    content = formValues["content"];
  
    body = {
      "title": title,
      "content": content,
      "author": authorId,
    };

    return body;
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
    })
  )};

  render(){
    return (
      <View>
        <Form
          ref="form"
          type={Article}
        />
        <Button
          title="Add article"
          onPress={this.addArticle.bind(this)}
        />
      </View>
    )
  };
};

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
      height: 800,
  },
});
