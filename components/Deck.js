import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default class Deck extends Component {
  render () {
    return (
      <View>
        <Text>Deck</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            { entryId: 'test' }
          )}>
          <Text>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            { entryId: 'test' }
          )}>
          <Text>Test2</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
