import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';

export default class Travel extends Component {
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
                            What do you want to do?
                        </Text>
                    </View>

                    <Button rounded info style={{ alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('RideStep1')}>
                        <Text>
                            Ride
                        </Text>
                    </Button>

                    <Button rounded info style={{ alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('DriveStep1')}>
                        <Text>
                            Drive
                        </Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}