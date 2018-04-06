import React, { Component } from 'react';
import { Image, Linking, TextInput } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import Config from 'react-native-config';
import { NavigationActions } from 'react-navigation';

const initialState = {
    question: '', clientError: '', serverError: ''
};

export default class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validateQuestion() {
        if(this.state.question.length < 1 || this.state.question.length > 400) {
            this.state.clientError = "Please describe in 1 to 400 characters";
            return false;
        }

        this.state.clientError = "";
        return true;
    }

    submitQuestion() {
        let responseStatus = 0;
        fetch(Config.API_URL+'/feedback/submit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "feedbackType" : "question",
                "feedbackDescription": this.state.question
            })
        })
        .then( response => {
            responseStatus = response.status
            return response.json()
        })
        .then( response => {
            if(responseStatus == 400) {
                this.setState({
                    serverError: "Invalid user details"
                })
            }
            else if(responseStatus == 200) {
                // go back to Feedback Screen and show the message there
                this.props.navigation.state.params.showFeedbackSubmitMessage(response.message);
                const backAction = NavigationActions.back({
                    key: null
                });
                this.props.navigation.dispatch(backAction);
            }
            else {
                this.setState({
                    serverError: "Some error occured. Please try again. If problem persists, " + 
                    "please let us know at support@thumbtravel.com"
                })
            }
        })
        .catch( error => {
            // TOOD log error
            this.setState({
                serverError: "Some error occured. Please try again. If problem persists, " + 
                "please let us know at support@thumbtravel.com"
            })
        })
    }

    render() {
        return (
            <Container>
                <Content>
                    <Image
                        source={require('./assets/thumb-horizontal-logo.png')}
                    />
                    <View>
                        <Text>
                            what question do you have...
                            {'\n'}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            We want to hear what you love and what you think we can do better.
                            We also want to integrate your suggestions to make our product better in the future.
                            At thumb, we promise to respond to every piece of feedback individually.
                            {'\n'}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            YOUR QUESTION
                        </Text>
                    </View>

                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Where can I see my upcoming trips?"
                        onChangeText={(question) => this.setState({ question })}
                        value={this.state.question}
                    />

                    <Button rounded success disabled={!this.validateQuestion()}
                        onPress={() => this.submitQuestion()} >
                        <Text>
                            SUBMIT
                        </Text>
                    </Button>
                    
                    <View>
                        <Text>
                            { this.state.clientError }
                        </Text>
                    </View>

                    <View>
                        <Text>
                            { this.state.serverError }
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}