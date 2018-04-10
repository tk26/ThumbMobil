import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';

export default class Thumb extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Image
                        source={require('./../../assets/thumb-horizontal-logo.png')}
                    />
                    
                    <View>
                        <Text>
                            Thumb
                        </Text>
                    </View>

                </Content>
            </Container>
        );
    }
}