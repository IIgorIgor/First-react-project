import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00A099',
    accent: '#66FDD3',
  }
};

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  render () {
    return (
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    );
  }
}
