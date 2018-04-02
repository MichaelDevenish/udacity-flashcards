import _ from 'lodash'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import { getDecks } from '../utils/storage'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { gray, white } from '../utils/colors'


class Decks extends Component {
  componentDidMount () {
    getDecks().then((entries) => this.props.receiveDecks(entries))
  }

  renderItem = ({ item }) => {
    let questions = 0
    if(item.questions) {
      questions = item.questions.length
    }

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(
        'Deck',
        { entryId: item.title }
      )}>
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{questions} Cards</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View>
        <FlatList
          data={_.toArray(this.props.decks).reverse()}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: 2,
    padding: 60,
    borderBottomColor: gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  title: {
    textAlign: 'center',
    fontSize: 40
  },
  subtitle: {
    textAlign: 'center',
    color: gray,
    fontSize: 30
  }
})


function mapStateToProps (decks) {
  return {
    decks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    receiveDecks: (decks) => {
      dispatch(receiveDecks(decks))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks)
