import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input } from 'native-base';

export default class RideStep3 extends Component {
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
                            Tell everyone what you're up to on your trip...
                        </Text>
                    </View>

                    <Button small rounded info>
                        <Text>
                            Invite Driver
                        </Text>
                    </Button>

                    <View>
                        <Text>
                            Sharing options
                        </Text>
                        <Text>
                            Our platform is growing and when you share your trip request to Facebook and Twitter, our data shows
                            that you are 3 times more likely to get a match. Click below to share your travel on other accounts.
                        </Text>
                        <Text>
                            Facebook
                        </Text>
                        <Text>
                            Twitter
                        </Text>
                    </View>
                
                    <Button rounded success onPress={() => {
                        // TODO call endpoint and save the ride    
                        this.props.navigation.navigate('RideStep4', {
                            ride: ride
                        });
                    }}>
                        <Text>
                            NEXT
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}