import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { black, gray, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/notification'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: entryId
    }
  }

  render () {
    const entryId = this.props.navigation.state.params.entryId
    const entry = this.props.decks[entryId]
    let questions = 0
    if(entry.questions) {
      questions = entry.questions.length
    }

    return (
      <View
        style={styles.container}
      >
        <View>
          <Text style={styles.title}>{entryId}</Text>
          <Text style={styles.subtitle}>{questions} Cards</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { entryId:  entryId }
            )}>
            <Text style={[{color: black}, styles.btnText]}>Add Card</Text>
          </TouchableOpacity>
          { entry.questions && <TouchableOpacity
            style={styles.startBtn}
            onPress={() => this.props.navigation.navigate(
                'Quiz',
                { data: entry }
              )}>
            <Text style={[{color: white}, styles.btnText]}>Start Quiz</Text>
          </TouchableOpacity>}
        </View>
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)(Deck)

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
  addBtn: {
    backgroundColor: white,
    borderColor: black,
    borderWidth: 2,
    padding: 15,
    borderRadius: 7,
    height: 60,
    marginLeft: 100,
    marginRight: 100
  },
  startBtn: {
    backgroundColor: black,
    padding: 15,
    borderRadius: 7,
    height: 60,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20
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
  btnText: {
    fontSize: 24,
    textAlign: 'center'
  },
  title: {
    fontSize: 60,
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center',
    color: gray,
    fontSize: 30
  }
})
