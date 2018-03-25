import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import Config from 'react-native-config';

const initialState = {
    email: '', password: '', clientError: '', serverError: ''
};

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    canAuthenticateUser() {
        let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!reg.test(this.state.email)) {
            this.state.clientError = "Incorrect email address";
            return false;
        }

        if(this.state.email.substr(this.state.email.length - 4) !== '.edu') {
            this.state.clientError = "Email address must end in .edu";
            return false;
        }
        
        if(this.state.password.length < 8 || this.state.password.length > 30) {
            this.state.clientError = "Incorrect password";
            return false;
        }

        this.state.clientError = "";
        return true;
    }

    authenticateUser() {
        let responseStatus = 0;
        fetch(Config.API_URL+'/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email" : this.state.email,
                "password" : this.state.password
            })
        })
        .then( response => {
            responseStatus = response.status;
            return response.json();
        })
        .then( response => {
            if(responseStatus == 400) {
                this.setState({
                    serverError: "Invalid email or password"
                })
            }
            else if(responseStatus == 403) {
                this.setState({
                    serverError: "It seems that you haven't confirmed your email just yet. " +
                        "We have resent the email verification link to you. " +
                        "Please confirm your email by clicking on it. " +
                        "Feel free to email us at support@thumbtravel.com if you face any issues."
                })
            }
            else if(responseStatus == 200) {
                this.props.navigation.navigate('LoginSuccess');
            }
            else {
                this.setState({
                    serverError: "Some error occured. Please try again. If problem persists, " + 
                    "please let us know at support@thumbtravel.com"
                })
            }
        })
        .catch( error => {
            // TODO log error
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
                            Log in to thumb
                        </Text>
                    </View>

                    <View>
                        <Text>
                            EMAIL
                        </Text>
                    </View>
                    <Input
                        onChangeText={(email) => this.setState({
                            email: email.toLowerCase(),
                            serverError: ''
                            })}
                        value={this.state.email.toLowerCase()}
                    />

                    <View>
                        <Text>
                            PASSWORD
                        </Text>
                    </View>
                    <Input
                        secureTextEntry = { true } 
                        onChangeText={(password) => this.setState({
                            password: password,
                            serverError: ''
                            })}
                        value={this.state.password}
                    />

                    <Button rounded success onPress={() => this.authenticateUser()} disabled={ !this.canAuthenticateUser() } >
                        <Text>
                            LOG IN
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

                    <View>
                        <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://thumb-webapp.herokuapp.com/#/forgot')}>
                                Forgot your password?
                        </Text>
                    </View>

                </Content>
            </Container>
        );
    }
}