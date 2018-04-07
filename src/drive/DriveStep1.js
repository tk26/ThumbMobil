import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';

export default class DriveStep1 extends Component {
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
                            Drive Step 1
                        </Text>
                    </View>

                </Content>
            </Container>
        );
    }
}