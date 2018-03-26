import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import { onLogOut } from './auth';
import { NavigationActions } from 'react-navigation';

export default class Profile extends Component {
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
                            PROFILE
                        </Text>
                    </View>

                    <Button rounded info style={{ alignSelf: 'center' }}
                        onPress={() =>
                            onLogOut()
                                .then(() => {
                                    const resetAction = NavigationActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({ routeName: 'SignedOutStack' })],
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                })
                        }
                    >
                        <Text>
                            Log out
                        </Text>
                    </Button>


                </Content>
            </Container>
        );
    }
}