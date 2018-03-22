import React, { Component } from 'react';
import { Container, Content, View, Text, Button, Input } from 'native-base';

const initialState = {
    password: '', confirmPassword: '', error: ''
};

export default class SignupStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    canGoNext() {
        if(this.state.password.length < 8 || this.state.password.length > 30) {
            this.state.error = "Password should be between 8 to 30 characters";
            return false;
        }

        let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(!regex.test(this.state.password)) {
            this.state.error = "Password should be a combinaton of upper and lowercase letters, a number and a special character";
            return false;
        }

        if(this.state.password !== this.state.confirmPassword) {
            this.state.error = "Password and Confirm Password do not match";
            return false;
        }

        this.state.error = "";
        return true;
    }

    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Text>
                            Create a password. {'\n'}
                            Your password must be: {'\n'}
                            - At least 8 characters {'\n'}
                            - Use a combination of upper and lowercase letters {'\n'}
                            - Use at least one special character {'\n'}
                            - Use at least one number {'\n'}
                        </Text>
                    </View>
                    
                    <View>
                        <Text>
                            PASSWORD
                        </Text>
                    </View>
                    <Input
                        secureTextEntry = { true } 
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />

                    <View>
                        <Text>
                            CONFIRM PASSWORD
                        </Text>
                    </View>
                    <Input
                        secureTextEntry = { true } 
                        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                        value={this.state.confirmPassword}
                    />
                    
                    <Button rounded success onPress={() => this.props.navigation.navigate('SignupStep3', {
                            user: {
                                firstName: this.props.navigation.state.params.user.firstName,
                                lastName: this.props.navigation.state.params.user.lastName,
                                username: this.props.navigation.state.params.user.username,
                                password: this.state.password
                            }
                        })} disabled={ !this.canGoNext() }>
                        <Text>
                            NEXT
                        </Text>
                    </Button>

                    <View>
                        <Text>
                            { this.state.error }
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}