import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { clearLocalNotification, setLocalNotification } from '../utils/notification'
import { black, green, red, white } from '../utils/colors'
import QuizResult from './QuizResult'

export default class Quiz extends Component {
  state = {
    quizIndex: 0,
    correct: 0,
    incorrect: 0,
    front: true
  }

  render () {
    const data = this.props.navigation.state.params.data
    if(this.state.quizIndex < data.questions.length) {
    return (
      <View style={{backgroundColor:white, flex:1}}>
        <Text style={{fontSize: 24, padding: 10}}>{this.state.quizIndex + 1} / {data.questions.length}</Text>
        <View style={styles.container}>
          <View>
            <Text style={styles.questionText}>
              {this.state.front
                ? data.questions[this.state.quizIndex].frontText
                : data.questions[this.state.quizIndex].backText
              }
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({front: !this.state.front})
              }}>
              <Text style={[styles.flipperText, {color: red}]}>{this.state.front ? 'Answer' : 'Question'}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.correctBtn}
              onPress={() => {
                this.setState({
                  correct: this.state.correct + 1,
                  quizIndex: this.state.quizIndex + 1,
                  front: true
                })
              }}>
              <Text style={[{color: white}, styles.btnText]}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.incorrectBtn}
              onPress={() => {this.setState({
                incorrect: this.state.incorrect + 1,
                quizIndex: this.state.quizIndex + 1,
                front: true
              })
              }}>
              <Text style={[{color: white}, styles.btnText]}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}

    clearLocalNotification()
      .then(setLocalNotification)
    return (
      <QuizResult
        correct={this.state.correct}
        total={data.questions.length}
        onGoBack={() => this.props.navigation.goBack()}
        onRestart={() => {this.setState({
          incorrect: 0,
          correct: 0,
          quizIndex: 0,
          front: true
        })}}
      />
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
  correctBtn: {
    backgroundColor: green,
    padding: 15,
    borderRadius: 7,
    height: 60,
    marginLeft: 100,
    marginRight: 100
  },
  incorrectBtn: {
    backgroundColor: red,
    padding: 15,
    borderRadius: 7,
    height: 60,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20
  },
  btnText: {
    fontSize: 24,
    textAlign: 'center'
  },
  questionText: {
    fontSize: 60,
    textAlign: 'center'
  },
  flipperText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
