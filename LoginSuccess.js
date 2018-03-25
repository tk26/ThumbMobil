import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';

export default class LoginSuccess extends Component {
    constructor(props) {
        super(props);
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
                            Welcome to thumb!
                        </Text>
                    </View>

                    <View>
                        <Text>
                            You are logged in successfully.
                        </Text>
                    </View>

                </Content>
            </Container>
        );
    }
}