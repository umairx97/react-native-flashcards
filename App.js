import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { setLocalNotification } from './src/utils/helper';

import Quiz from './src/components/Quiz';
import Deck from './src/components/Deck';
import NewDeck from './src/components/NewDeck';
import DeckList from './src/components/DeckList';
import NewQuestion from './src/components/NewQuestion';

const RootStack = createStackNavigator(
  {
    DeckList: {
      screen: DeckList,
    },
    Deck: {
      screen: Deck,
    },
    NewDeck: {
      screen: NewDeck,
    },
    NewQuestion: {
      screen: NewQuestion,
    },
    Quiz: {
      screen: Quiz,
    }
  },
  {
    initialRouteName: 'DeckList'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});