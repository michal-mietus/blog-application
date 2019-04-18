import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './screens/auth/login';
import RegisterScreen from './screens/auth/register';
import HomeScreen from './screens/home';
import ArticlesScreen from './screens/article/articles';
import AddArticleScreen from './screens/article/add-article';



const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: { screen: RegisterScreen },
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
