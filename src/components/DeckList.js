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

  keyExtractor = item => {
    return item.title;
  };

  renderItem = ({ item }) => {
    const { title, questions } = item;
    const count = questions.length;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.deck}>
        <TouchableOpacity onPress={() => navigate("Deck", { title })}>
          <Text style={styles.title}>{title}</Text>
          <Text style={{ textAlign: "center" }}>{`${
            count > 1 ? `${count} cards` : `${count} card`
          }`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
    padding: 10
  },
  deck: {
    flex: 1,
    marginBottom: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28C19B",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    padding: 10
  },
  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default DeckList;
