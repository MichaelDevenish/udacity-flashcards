import React from 'react';
import { StatusBar, View } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { black, gray, white } from './utils/colors'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import { Constants } from 'expo'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/notification'

function UdacistatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks'
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: black,
    inactiveTintColor: gray,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigaitor = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  },
  AddCard: {
    screen: AddCard
  }
}, {
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: black,
      height: 56
    }
  }
})

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdacistatusBar backgroundColor={white} barStyle='dark-content' />
          <MainNavigaitor />
        </View>
      </Provider>
    )
  }
}
