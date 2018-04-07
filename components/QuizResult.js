import { black, white } from '../utils/colors'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'

QuizResult = ({correct, total, onGoBack, onRestart }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.questionText}>{correct} of {total} Correct</Text>
    </View>
    <View>
      <TouchableOpacity
        style={styles.restartBtn}
        onPress={onRestart}>
        <Text style={[{color: black}, styles.btnText]}>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={onGoBack}>
        <Text style={[{color: white}, styles.btnText]}>Back to Deck</Text>
      </TouchableOpacity>
    </View>
  </View>
)

export default QuizResult

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: 'space-around',
    paddingTop: 100,
    paddingBottom: 100
  },
  btnText: {
    fontSize: 24,
    textAlign: 'center'
  },
  questionText: {
    fontSize: 60,
    textAlign: 'center'
  },
  restartBtn: {
    backgroundColor: white,
    borderColor: black,
    borderWidth: 2,
    padding: 15,
    borderRadius: 7,
    height: 60,
    marginLeft: 100,
    marginRight: 100
  },
  backBtn: {
    backgroundColor: black,
    padding: 15,
    borderRadius: 7,
    height: 60,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20
  }
})
