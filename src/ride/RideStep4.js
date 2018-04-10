import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input } from 'native-base';
import { NavigationActions } from 'react-navigation';

export default class RideStep4 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ride = this.props.navigation.state.params.ride;
        return (
            <Container>
                <Content>
                    <View>
                        <Text>
                            {ride.startAddress}
                            {'\n'}
                            {ride.endAddress}
                            {'\n'}
                            {ride.travelDate}
                            {'\n'}
                            {ride.travelTime[0]}:00 to {ride.travelTime[1]}:00
                        </Text>
                    </View>
                
                    <Image
                        source={require('./../../assets/thumb-horizontal-logo.png')}
                    />
                    
                    <View>
                        <Text>
                            Trip Results
                        </Text>
                    </View>

                    <View>
                        <Text>
                            Whoa! This stinks! We didn't find any drivers traveling in your direction.
                        </Text>
                    </View>

                    <View>
                        <Text>
                            It's cool though because we've saved your trip to your thumbs tab. 
                            But another idea would be to click "Invite Driver" below to invite a partner who you know might be traveling to the same place.
                        </Text>
                    </View>

                    <Button rounded info onPress={() => {}}>
                        <Text>
                            Invite Driver
                        </Text>
                    </Button>
                
                    <Button rounded success 
                        onPress={() => {
                            // Take me to the thumb tab
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ 
                                        routeName: 'LoggedInTabs',
                                        action: NavigationActions.navigate({ 
                                            routeName: 'Thumb'
                                        })
                                    })
                                ],
                                key: null
                            });
                            this.props.navigation.dispatch(resetAction);
                        }}
                    >
                        <Text>
                            Come back later
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}