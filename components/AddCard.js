import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { getDecks } from '../utils/storage'

export default class AddCard extends Component {
  state = {
    deck: null
  }

  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: entryId
    }
  }

  componentDidMount () {
    getDecks().then((deck) => {
      this.setState({deck: deck})
    })
  }
  render () {
    return (
      <View>
        <Text>{JSON.stringify(this.state.deck)}</Text>
      </View>
    )
  }
}
