import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getDeck } from '../utils/api';
import CustomButton from './CustomButton';
import { clearLocalNotification, setLocalNotification } from '../utils/helper';

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('title', null)} Quiz`,
        };
    };

    constructor(props) {
        super(props);
        this.state = { 
            questions: [],
            current: 0,
            numCorrect: 0,
            numIncorrect: 0,
            showQuestion: true,
            quizFinished: false,
        };

        this.toggleCard = this.toggleCard.bind(this);
        this.restartQuiz = this.restartQuiz.bind(this);
        this.answerQuestion = this.answerQuestion.bind(this);
    }

    componentDidMount() {
        const title = this.props.navigation.getParam('title', null);
        getDeck(title).then((result) => {
            this.setState({ questions: result.questions })
        });
    }

    restartQuiz() {
        this.setState({ 
            current: 0,
            numCorrect: 0,
            numIncorrect: 0,
            showQuestion: true,
            quizFinished: false,
        });
    }
    
    toggleCard() {
        this.setState({
            showQuestion: !this.state.showQuestion,
        })
    }

    answerQuestion(userAnswer) {
        const { current, questions, numCorrect, numIncorrect } = this.state;
        if (userAnswer === "correct") {
            this.setState({
                showQuestion: true,
                numCorrect: numCorrect + 1
            });
        } else {
            this.setState({
                showQuestion: true,
                numIncorrect: numIncorrect + 1
            });
        }

        if (current === questions.length - 1) {
            this.setState({ quizFinished: true });
            clearLocalNotification();
            setLocalNotification();
        } else {
            this.setState({ current: current + 1 });
        }
    }
    
    render() {
        const {
            questions,
            current,
            numCorrect,
            numIncorrect,
            showQuestion,
            quizFinished, 
        } = this.state;

        const { navigate } = this.props.navigation;
        const title = this.props.navigation.getParam('title', null);

        if (questions.length <= 0) {
            return <Text> Loading... </Text>
        } else {
            return (
                <View style={styles.container}>
                    { quizFinished
                        ? <View>
                            <Text style={styles.title}> Quiz Finished </Text>
                            <Text style={[styles.text, {textAlign:'center'}]}> 
                                {`You got ${numCorrect} correct and ${numIncorrect} wrong`} 
                            </Text>
                            
                            <TouchableOpacity onPress={this.restartQuiz}>
                                <Text style={styles.touchableText}>Restart the Quiz</Text>
                            </TouchableOpacity>

                            <CustomButton 
                                text='Back to Deck'
                                onPress={() => navigate('Deck', { title })}
                            />
                          </View>
                        : <View>
                            <Text style={styles.text}>
                                {`Question ${current + 1} of ${questions.length}`}
                            </Text>
                            <View>
                                <Text style={styles.title}>
                                {showQuestion 
                                    ? questions[current].question
                                    : questions[current].answer}
                                </Text>
                                
                                <TouchableOpacity onPress={this.toggleCard}>
                                    <Text style={styles.touchableText}>
                                        {showQuestion ? 'Show Answer' : 'Show Question'}
                                    </Text>
                                </TouchableOpacity>
                            </View>


                            <View>
                                <Text style={styles.text}>Your answer is:</Text>
                                <CustomButton 
                                    text='Correct'
                                    style={{backgroundColor: 'green'}}
                                    onPress={() => this.answerQuestion('correct')}
                                />
                                <CustomButton 
                                    text='Wrong'
                                    style={{backgroundColor: 'red'}}
                                    onPress={() => this.answerQuestion('wrong')}
                                />
                            </View>
                          </View> }
                </View> )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 34,
        marginTop: 20,
        marginBottom: 20,
        color: '#708090',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        fontSize: 18,
    },
    touchableText: {
        fontSize: 24,
        marginTop: 10,
        marginBottom: 10,
        color: 'steelblue',
        textAlign: 'center'
    }
});

export default Quiz;