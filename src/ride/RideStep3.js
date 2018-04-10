import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';

export default class RideStep3 extends Component {
    constructor(props) {
        super(props);
        alert(JSON.stringify(this.props.navigation.state.params.ride));
    }

    render() {
        return (
            <Container>
                <Content>
                    {/*TODO: change to show user's profile picture*/}
                    <Image
                        source={require('./../../assets/thumb-horizontal-logo.png')}
                    />

                    <View>
                        <Text>
                            Ride - Step 3
                        </Text>
                    </View>

                    <Button rounded success>
                        <Text>
                            NEXT
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}