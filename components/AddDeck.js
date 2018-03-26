import React, { Component } from 'react'
import { Text, View, Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { black, gray, white } from '../utils/colors'
import { saveDeckTitle } from '../utils/storage'

export default class AddDeck extends Component {
  constructor (props) {
    super(props)

    this.state={
      text:''
    }
  }

  addCard = () => {
    const {
      text
    } = this.state

    //todo check if card already exists
    if (text !== '') {
      this.setState({text: ''})

      saveDeckTitle(text).then(
        () =>
          this.props.navigation.navigate(
            'AddCard',
            {entryId: text}
          )
      )


    }
    else {
      Alert.alert(
        'Error',
        'You must enter a deck name'
      )
    }
  }

  render () {
    return (
      <View
        style={styles.container}
      >
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          style={styles.deckTitle}
          placeholder='Deck Title'
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={this.addCard}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: 'space-around',
    paddingTop: 100,
    paddingBottom: 100
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  submitBtn: {
    backgroundColor: black,
    padding: 15,
    borderRadius: 7,
    height: 60,
    marginLeft: 150,
    marginRight: 150
  },
  deckTitle: {
    borderColor: black,
    borderWidth: 2,
    borderRadius: 14,
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 24
  },
  submitBtnText: {
    color: white,
    fontSize: 24,
    textAlign: 'center'
  },
  title: {
    color: gray,
    fontSize: 60,
    textAlign: 'center'
  }
})
