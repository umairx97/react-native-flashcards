import { AsyncStorage } from "react-native";
export const UDACICARDS_STORAGE_KEY = "NativeFlashcards:decks";

let DATA = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
};

export function setInitData() {
  AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(DATA));
  return DATA;
}

export function getDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(results =>
    results === null ? setInitData() : JSON.parse(results)
  );
}

export function getDeck(id) {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(results =>
    results === null ? setInitData()[id] : JSON.parse(results)[id]
  );
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    UDACICARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(data => {
    let decks = JSON.parse(data);
    decks[title].questions.push(card);
    AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks));
  });
}
