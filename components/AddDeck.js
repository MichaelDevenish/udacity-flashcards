import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { black, gray, white } from '../utils/colors'
import { saveDeckTitle } from '../utils/storage'
import { addDeck } from '../actions'

class AddDeck extends Component {
  state = {
    text:''
  }

  addDeck = () => {
    const {
      text
    } = this.state

    if (text !== '') {
      this.setState({text: ''})

      saveDeckTitle(text).then(
        (data) => {
          this.props.addDeck(data)
          this.props.navigation.navigate(
            'Deck',
            {entryId: text}
          )
        }
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
          onPress={this.addDeck}
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

function mapDispatchToProps (dispatch) {
  return {
    addDeck: (decks) => {
      dispatch(addDeck(decks))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddDeck)
