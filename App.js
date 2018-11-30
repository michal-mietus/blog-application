import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './screens/home'
import LoginScreen from './screens/login'
import ArticlesScreen from './screens/articles'
import AddArticleScreen from './screens/add-article'



const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    Articles: ArticlesScreen,
    AddArticle: AddArticleScreen,
  },
  {
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component{
  render() {
    return <AppContainer/>;
  }
}
