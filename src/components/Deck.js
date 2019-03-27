import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getDeck } from "../utils/api";
import CustomButton from "./CustomButton";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", null)
    };
  };

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      deck: { questions: [] }
    };
  }

  componentDidMount() {
    const title = this.props.navigation.getParam("title", null);
    getDeck(title).then(result => {
      this.setState({ deck: result });
    });
  }

  componentDidUpdate() {
    this._isMounted = true;
    const title = this.props.navigation.getParam("title", null);

    getDeck(title).then(result => {
      if (this._isMounted) this.setState({ deck: result });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { deck } = this.state;
    const { title, questions } = deck;
    const count = questions.length;

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={{ textAlign: "center" }}>{`${count} cards`}</Text>
        </View>
        <View>
          <CustomButton
            text="Add Card"
            onPress={() => navigate("NewQuestion", { title })}
          />
          {count > 0 && (
            <CustomButton
              text="Start Quiz"
              onPress={() => navigate("Quiz", { title })}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "space-around"
  },
  title: {
    fontSize: 36,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  wrapper: {
    backgroundColor: "#28C1B5", 
    padding: 10
  }
});

export default Deck;
