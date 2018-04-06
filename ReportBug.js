import React, { Component } from 'react';
import { Image, Linking, TextInput } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import Config from 'react-native-config';
import { NavigationActions } from 'react-navigation';

const initialState = {
    bugDescription: '', error: ''
};

export default class ReportBug extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    submitBugReport() {
        if (this.state.bugDescription.length < 1) {
            this.setState({ error: "Bug description cannot be empty" });
            return;
        }

        let responseStatus = 0;
        fetch(Config.API_URL + '/feedback/submit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "feedbackType": "bug",
                "feedbackDescription": this.state.bugDescription
            })
        })
            .then(response => {
                responseStatus = response.status
                return response.json()
            })
            .then(response => {
                if (responseStatus == 400) {
                    this.setState({
                        error: "Invalid user details"
                    })
                }
                else if (responseStatus == 200) {
                    // go back to Feedback Screen and show the message there
                    this.props.navigation.state.params.showFeedbackSubmitMessage(response.message);
                    const backAction = NavigationActions.back({
                        key: null
                    });
                    this.props.navigation.dispatch(backAction);
                }
                else {
                    this.setState({
                        error: "Some error occured. Please try again. If problem persists, " +
                        "please let us know at support@thumbtravel.com"
                    })
                }
            })
            .catch(error => {
                // TODO log error
                this.setState({
                    error: "Some error occured. Please try again. If problem persists, " +
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
                            Tell us about the bug you're experiencing...
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
                            YOUR EXPERIENCE
                        </Text>
                    </View>

                    <TextInput
                        maxLength={400}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="The home feed has a different time zone."
                        onChangeText={(bugDescription) => this.setState({ bugDescription })}
                        value={this.state.bugDescription}
                    />

                    <Button rounded success onPress={() => this.submitBugReport()} >
                        <Text>
                            SUBMIT
                        </Text>
                    </Button>

                    <View>
                        <Text>
                            {this.state.error}
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}