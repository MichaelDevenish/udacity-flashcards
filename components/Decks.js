import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default class Decks extends Component {
  render () {
    return (
      <View>
        <Text>Decks</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'Deck',
            { entryId: 'test' }
          )}>
          <Text>Test</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
