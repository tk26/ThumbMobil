import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';

export default class SignupSuccess extends Component {
    constructor(props) {
        super(props);
    }

    takeMeToLogin() {
        
    }

    render() {
        return (
            <Container>
                <Content>
                    <Image
                        source={require('./assets/favicon.png')}
                    />
                    <View>
                        <Text>
                            Welcome to thumb!
                        </Text>
                    </View>

                    <View>
                        <Text>
                            We have just sent you a confirmation email. Please check your inbox. If you did not receive
                            our confirmation email, please let email us - 
                            <Text style={{color: 'blue'}}>
                                support@thumbtravel.com
                            </Text>
                        </Text>
                    </View>

                    <Button rounded success onPress={() => this.takeMeToLogin()} >
                        <Text>
                            LOG IN
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}