import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import CustomButton from './CustomButton';

class NewDeck extends Component {
    static navigationOptions = () => {
        return {
            title: 'Add New Deck'
        };
    };

    constructor(props) {
        super(props);
        this.state = { userInput: '' };
        this.handlePress = this.handlePress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handlePress() {
        const { userInput } = this.state;
        const { navigate } = this.props.navigation;
        const deckTitle = userInput? userInput : 'Untitled';

        this.setState({ userInput: '' });
        
        saveDeckTitle(deckTitle);
        navigate('Deck', { title: deckTitle });
    }

    handleChange(userInput) {
        this.setState({ userInput });
    }

    render() {
        const { userInput } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Text style={styles.title}> What is the name of your new deck? </Text>
                <View>
                    <TextInput
                        value={userInput}
                        style={styles.input}
                        placeholder={'Name of the deck'}
                        onChangeText={(userInput) => this.handleChange(userInput)}
                    />
                    <CustomButton 
                        text='Submit'
                        onPress={this.handlePress}
                    />
                </View>
          </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-evenly',
    },
    input: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'steelblue',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
    },
    title: {
        fontSize: 36,
        color: '#708090',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default NewDeck;