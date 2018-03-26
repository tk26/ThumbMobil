import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';

export default class Home extends Component {
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
                            HOME
                        </Text>
                    </View>

                </Content>
            </Container>
        );
    }
}