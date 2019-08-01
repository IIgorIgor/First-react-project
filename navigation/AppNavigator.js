import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import ToDoScreen from '../screens/ToDoScreen';

const AppNavigator = createStackNavigator(
    {
        LoginScreen: LoginScreen,
        ToDoScreen: ToDoScreen,
    },
    {
        initialRounteName: 'LoginScreen',
    }
);

export default AppNavigator;