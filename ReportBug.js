import React, { Component } from 'react';
import { Image, Linking, TextInput } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import Config from 'react-native-config';
import { NavigationActions } from 'react-navigation';

const initialState = {
    bugDescription: '', clientError: '', serverError: ''
};

export default class ReportBug extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validateBugReport() {
        if(this.state.bugDescription.length < 1 || this.state.bugDescription.length > 400) {
            this.state.clientError = "Please describe in 1 to 400 characters";
            return false;
        }

        this.state.clientError = "";
        return true;
    }

    submitBugReport() {
        let responseStatus = 0;
        fetch(Config.API_URL+'/feedback/submit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "feedbackType" : "bug",
                "feedbackDescription": this.state.bugDescription
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
                            Tell us about the bug you're experiencing...
                        </Text>
                    </View>

                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder="The home feed has a different time zone."
                        onChangeText={(bugDescription) => this.setState({ bugDescription })}
                        value={this.state.bugDescription}
                    />

                    <Button rounded success disabled={!this.validateBugReport()}
                        onPress={() => this.submitBugReport()} >
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