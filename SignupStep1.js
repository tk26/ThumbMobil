import React, { Component } from 'react';
import { Container, Content, View, Text, Button, Input } from 'native-base';
import Config from 'react-native-config';

const initialState = {
    firstName: '', lastName: '', username: '', clientError: '', serverError: ''
};

export default class SignupStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    canGoNext() {
        if(this.state.firstName.length < 1 || this.state.firstName.length > 30) {
            this.state.clientError = "First Name should be between 1 to 30 characters";
            return false;
        }

        if(this.state.lastName.length < 1 || this.state.lastName.length > 30) {
            this.state.clientError = "Last Name should be between 1 to 30 characters";
            return false;
        }

        let regex = /^[a-z0-9._]{3,30}$/;
        if (!regex.test(this.state.username)) {
            this.state.clientError = "Username should be between 3 to 30 characters and can only contain numbers, letters, periods and underscores";
            return false;
        }

        this.state.clientError = "";
        return true;
    }

    checkUsername() {
        let responseStatus = 0;
        fetch(Config.API_URL+'/user/validate/username/' + this.state.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            responseStatus = response.status
            return response.json()
        })
        .then( response => {
            if(responseStatus == 422) {
                this.setState({
                    serverError: "Invalid username"
                })
            }
            else if(responseStatus == 409) {
                this.setState({
                    serverError: "Duplicate username"
                })
            }
            else if(responseStatus == 200) {
                this.props.navigation.navigate('SignupStep2', {
                    user: {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        username: this.state.username
                    }
                });
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
                    <View>
                        <Text>
                            What's your name?
                        </Text>
                        <Text>
                            FIRST NAME
                        </Text>
                    </View>
                    <Input
                        onChangeText={(firstName) => this.setState({firstName})}
                        value={this.state.firstName}
                    />
                    <View>
                        <Text>
                            LAST NAME
                        </Text>
                    </View>
                    <Input
                        onChangeText={(lastName) => this.setState({lastName})}
                        value={this.state.lastName}
                    />
                    <View>
                        <Text>
                            Choose your username.
                        </Text>
                    </View>
                    <Input
                        onChangeText={(username) => {
                            this.setState({
                                username: username.toLowerCase(),
                                serverError: ''
                            })
                        }}
                        value={this.state.username.toLowerCase()}
                    />
                    <Button rounded success
                        onPress={() => this.checkUsername()} 
                        disabled={ !this.canGoNext() }>
                        <Text>
                            NEXT
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