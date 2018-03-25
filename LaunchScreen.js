import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button } from 'native-base';

export default class LaunchScreen extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Image
                        source={require('./assets/thumb-horizontal-logo.png')}
                    />
                    <View>
                        <Text>
                            Welcome to thumb
                        </Text>
                    </View>
                    <Button rounded success onPress={() => this.props.navigation.navigate('LoginScreen')}>
                        <Text>
                            LOG IN
                        </Text>
                    </Button>
                    <Button rounded success onPress={() => this.props.navigation.navigate('SignupStep1')}>
                        <Text>
                            CREATE ACCOUNT
                        </Text>
                    </Button>
                    <View>
                        <Text>
                            By tapping Log In or Create Account, I agree to thumb's&nbsp;
                            <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.google.com')}>
                                Terms of Service
                            </Text>
                            ,&nbsp;
                            <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.google.com')}>
                                 Privacy Policy
                            </Text>
                            , and&nbsp;
                            <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.google.com')}>
                                Non-discrimination Policy
                            </Text>
                            .
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}