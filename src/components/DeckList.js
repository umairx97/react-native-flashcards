import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { getDecks } from "../utils/api";
import CustomButton from "./CustomButton";

class DeckList extends Component {
  static navigationOptions = () => {
    return {
      title: "Decks"
    };
  };

  constructor(props) {
    super(props);
    this.state = { decks: {} };
    this.keyExtractor = this.keyExtractor.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    getDecks().then(results => {
      this.setState({
        decks: results
      });
    });
  }

  componentDidUpdate() {
    getDecks().then(results => {
      this.setState({
        decks: results
      });
    });
  }

  keyExtractor(item) {
    return item.title;
  }

  renderItem({ item }) {
    const { title, questions } = item;
    const count = questions.length;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.deck}>
        <TouchableOpacity onPress={() => navigate("Deck", { title })}>
          <Text style={styles.title}>{title}</Text>
          <Text style={{ textAlign: "center" }}>{`${count} cards`}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { decks } = this.state;
    const dlist = Object.keys(decks).map(d => decks[d]);

    return (
      <View style={styles.container}>
        <FlatList
          data={dlist}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        <CustomButton text="Create Deck" onPress={() => navigate("NewDeck")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  deck: {
    flex: 1,
    marginBottom: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8FF",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "gray"
  },
  title: {
    fontSize: 28,
    color: "#708090",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default DeckList;
