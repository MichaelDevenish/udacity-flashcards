import { AsyncStorage } from 'react-native'

export const STORAGE_KEY = 'UdaciFlashcards:cards'

export function getDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((decks) => {return JSON.parse(decks)})
}

export function getDeck (id) {
  return AsyncStorage.getItem(STORAGE_KEY)
  .then((decks) => {return JSON.parse(decks)[id]})

}

export function saveDeckTitle (title) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      let data = JSON.parse(results)
      if(!data) {
        data = {}
      }
      data[title] = {
        ...data[title],
        title: title
      }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      return data[title]
    })
}

export function addCardToDeck ( entry, key ) {
  return getDecks().then(
    (data) => {
      if(data[key].questions === undefined || data[key].questions === null) {
        data[key].questions = []
      }
      data[key].questions.push(entry)
      AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(data))
      return data[key]
    }
  )
}
