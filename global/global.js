import { AsyncStorage } from 'react-native';


const globalVariables = {
  'apiUrl': 'http://blogapp-mm.herokuapp.com',
};

export function saveUserIdToAsyncStorage(userId){
  const userIdAsyncKey = 'userId';
  AsyncStorage.setItem(userIdAsyncKey, String(userId));
};

export function saveTokenToAsyncStorage(token){
  const tokenAsyncKey = 'token';
  AsyncStorage.setItem(tokenAsyncKey, token);
};

export default globalVariables;

