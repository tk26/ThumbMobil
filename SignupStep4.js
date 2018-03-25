import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Config from 'react-native-config';
import { NavigationActions } from 'react-navigation';

const initialState = {
    serverError: ''
};

export default class SignupStep4 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    submitUser() {
        let responseStatus = 0;
        fetch(Config.API_URL+'/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName" : this.props.navigation.state.params.user.firstName,
                "lastName" : this.props.navigation.state.params.user.lastName,
                "email" : this.props.navigation.state.params.user.email.toLowerCase(),
                "school" : this.props.navigation.state.params.user.university,
                "password" : this.props.navigation.state.params.user.password,
                "username": this.props.navigation.state.params.user.username.toLowerCase(),
                "birthday": this.props.navigation.state.params.user.birthday
            })
        })
        .then( response => {
            responseStatus = response.status;
            return response.json()
        })
        .then( response => {
            if(responseStatus == 400) {
                this.setState({
                    serverError: "Missing one or more user details"
                })
            }
            else if(responseStatus == 200) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'SignupSuccess' })],
                });
                this.props.navigation.dispatch(resetAction);
            }
            else {
                this.setState({
                    serverError: "Some error occured. Please try again. If problem persists, " + 
                    "please let us know at support@thumbtravel.com"
                })
            }
        })
        .catch( error => {
            // TOOD log error
            this.setState({
                serverError: "Some error occured. Please try again. If problem persists, " + 
                "please let us know at support@thumbtravel.com"
            })
        })
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
                            Before you join
                        </Text>
                    </View>

                    <View>
                        <Text>
                            Please commit to respecting everyone in the thumb community
                            <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.google.com')}>
                                Learn More
                            </Text>
                        </Text>
                    </View>

                    <View>
                        <Text>
                            By clicking "Continue", I agree to treat everyone in the thumb community - 
                            regardless of their race, religion, national origin, ethnicity, disability, gender identity,
                            sexual orientation or age - with respect, and without judgement or bias.
                        </Text>
                    </View>

                    <Button rounded success onPress={() => this.submitUser()} >
                        <Text>
                            CONTINUE
                        </Text>
                    </Button>

                    <View>
                        <Text>
                            { this.state.serverError }
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}