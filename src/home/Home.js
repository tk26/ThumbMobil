import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Header, Container, Content, View, Text, Button, Input, Item, Icon, Left, Body, Title, Right } from 'native-base';
import { NavigationActions } from 'react-navigation';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon name="ios-search" />
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right>
                        <Button small badge rounded info onPress={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 1,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Travel'}),
                                        NavigationActions.navigate({ routeName: 'RideStep1'})
                                    ]
                                });
                                this.props.navigation.dispatch(resetAction);
                            }}>
                            <Text>
                                Ride
                            </Text>
                        </Button>
                        <Button small badge rounded info onPress={() => { 
                                const resetAction = NavigationActions.reset({
                                    index: 1,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Travel'}),
                                        NavigationActions.navigate({ routeName: 'DriveStep1'})
                                    ]
                                });
                                this.props.navigation.dispatch(resetAction);
                            }}>
                            <Text>
                                Drive
                            </Text>
                        </Button>
                    </Right>
                </Header>
            </Container>
        );
    }
}