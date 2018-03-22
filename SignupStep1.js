import React, { Component } from 'react';
import { Container, Content, View, Text, Button, Input } from 'native-base';
import Config from 'react-native-config';

const initialState = {
    firstName: '', lastName: '', username: '', error: '', error2: ''
};

export default class SignupStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    canGoNext() {
        if(this.state.firstName.length < 1 || this.state.firstName.length > 30) {
            this.state.error = "First Name should be between 1 to 30 characters";
            return false;
        }

        if(this.state.lastName.length < 1 || this.state.lastName.length > 30) {
            this.state.error = "Last Name should be between 1 to 30 characters";
            return false;
        }

        let regex = /^[a-z0-9._]{3,30}$/;
        if (!regex.test(this.state.username)) {
            this.state.error = "Username should be between 3 to 30 characters and can only contain numbers, letters, periods and underscores";
            return false;
        }

        this.state.error = "";
        return true;
    }

    checkUsername() {
        fetch(Config.API_URL+'/user/validate/username/' + this.state.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this.handleErrors)
        .then( response => {
            this.props.navigation.navigate('SignupStep2', {
                user: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    username: this.state.username
                }
            });
        })
        .catch( () => { this.setState({ error2: "Duplicate Username" }) })
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
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
                                error2: ''
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
                            { this.state.error }
                        </Text>
                    </View>

                    <View>
                        <Text>
                            { this.state.error2 }
                        </Text>
                    </View>

                </Content>
            </Container>
        );
    }
}