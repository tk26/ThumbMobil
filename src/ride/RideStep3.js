import React, { Component } from 'react';
import { Image, Linking, TextInput } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';

const initialState = {
    pickupNotes: ''
}

export default class RideStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
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
                            PICK UP NOTES
                        </Text>
                    </View>

                    <TextInput
                        maxLength={100}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="this will be shared with your driver"
                        onChangeText={(pickupNotes) => this.setState({ pickupNotes })}
                        value={this.state.pickupNotes}
                    />

                    <Button rounded success>
                        <Text>
                            SUBMIT
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}