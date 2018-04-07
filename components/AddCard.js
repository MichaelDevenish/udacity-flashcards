import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, ToastAndroid } from 'react-native'
import {  addCardToDeck } from '../utils/storage'
import { black, white } from '../utils/colors'
import { addDeck } from '../actions'

class AddCard extends Component {
  state = {
    frontText: '',
    backText: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: `Add a card to ${entryId}`
    }
  }

  addCard = () => {
    const {
      state: {
        frontText,
        backText
      },
      props: {
        navigation: {
          state: {
            params: {
              entryId
            }
          }
        }
      }
    } = this

    if (frontText !== '' && backText !== '') {
      this.setState({frontText: '', backText: ''})

      addCardToDeck({frontText, backText}, entryId).then(
        (data) => {
          this.props.addDeck(data)
          if (Platform.OS === 'ios') {
            Alert.alert('Card added to deck')
          } else {
            ToastAndroid.show('Card added to deck', ToastAndroid.SHORT);
          }
        }
      )
    }
    else {
      Alert.alert(
        'Error',
        'You must enter all details'
      )
    }
  }

  render () {
    return (
      <View
        style={styles.container}
      >
        <TextInput
          onChangeText={(frontText) => this.setState({frontText})}
          value={this.state.frontText}
          style={styles.deckTitle}
          placeholder='Card Front'
        />
        <TextInput
          onChangeText={(backText) => this.setState({backText})}
          value={this.state.backText}
          style={styles.deckTitle}
          placeholder='Card Back'
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
    backgroundColor: white
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
    marginBottom: 50,
    fontSize: 24
  },
  submitBtnText: {
    color: white,
    fontSize: 24,
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
  false,
  mapDispatchToProps
)(AddCard)
