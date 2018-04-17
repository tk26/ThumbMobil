import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import { NavigationActions } from 'react-navigation';

export default class DriveStep4 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const drive = this.props.navigation.state.params.drive;
        return (
            <Container>
                <Content>
                    <View>
                        <Text>
                            {drive.startLocation.address}
                            {'\n'}
                            {drive.endLocation.address}
                            {'\n'}
                            Seats available: {drive.availableSeats}
                            {'\n'}
                            {drive.travelDate}
                            {'\n'}
                            {drive.travelTime[0]}:00 to {drive.travelTime[1]}:00
                            {'\n'}
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
                            Whoa! This stinks! We didn't find any riders traveling in your direction.
                        </Text>
                    </View>

                    <View>
                        <Text>
                            It's cool though because we've saved your trip to your thumbs tab. 
                            But another idea would be to click "Invite Rider" below to invite a partner who you know might be traveling to the same place.
                        </Text>
                    </View>

                    <Button rounded info onPress={() => {}}>
                        <Text>
                            Invite Rider
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