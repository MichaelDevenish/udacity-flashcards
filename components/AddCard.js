import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: entryId
    }
  }


  render () {
    return (
      <View>
        <Text>AddCard</Text>
      </View>
    )
  }
}
