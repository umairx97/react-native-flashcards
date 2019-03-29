import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { addCardToDeck } from "../utils/api";
import CustomButton from "./CustomButton";

class NewQuestion extends Component {
  static navigationOptions = () => {
    return {
      title: "Add New Card"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: ""
    };
  }

  handleChange = (userInput, type) => {
    if (type === "question") this.setState({ question: userInput });
    else if (type === "answer") this.setState({ answer: userInput });
  };

  handlePress = () => {
    const { question, answer } = this.state;

    if (!question && !answer) return alert("enter the question and answer");

    const { navigate } = this.props.navigation;
    const title = this.props.navigation.getParam("title");

    const card = { question, answer };
    addCardToDeck(title, card);

    this.setState({ question: "", answer: "" });
    navigate("Deck", { title });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}> Question </Text>
        <View>
          <TextInput
            value={question}
            style={styles.input}
            placeholder={"Add a new question"}
            onChangeText={userInput => this.handleChange(userInput, "question")}
          />
        </View>
        <Text style={styles.title}> Answer </Text>
        <View>
          <TextInput
            value={answer}
            style={styles.input}
            placeholder={"Type the answer"}
            onChangeText={userInput => this.handleChange(userInput, "answer")}
          />
        </View>
        <CustomButton text="Create Card" onPress={this.handlePress} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-around",
  },
  input: {
    fontSize: 24,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "steelblue",
    padding: 8
  },
  title: {
    fontSize: 36,
    color: "#708090",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default NewQuestion;
