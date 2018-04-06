import React, { Component } from 'react';
import { Image, Linking, TextInput } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';

const initialState = {
    pickupNotes: '', clientError: ''
}

export default class RideStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validate() {
        if (this.state.pickupNotes.length > 100) {
            this.state.clientError = "Pickup notes should be less than 100 characters";
            return false;
        }

        this.state.clientError = "";
        return true;
    }

    render() {
        return (
            <Container>
                <Content>
                    {/*TODO: change to show user's profile picture*/}
                    <Image
                        source={require('./assets/thumb-horizontal-logo.png')}
                    />

                    <View>
                        <Text>
                            PICK UP NOTES
                        </Text>
                    </View>

                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder="this will be shared with your driver"
                        onChangeText={(pickupNotes) => this.setState({ pickupNotes })}
                        value={this.state.pickupNotes}
                    />

                    <Button rounded success disabled={!this.validate()}>
                        <Text>
                            SUBMIT
                        </Text>
                    </Button>

                    <View>
                        <Text>
                            {this.state.clientError}
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}