import React, { Component } from 'react';
import { Image, Linking, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import { onLogOut } from './auth';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config';

const initialState = {
    firstName: '', lastName: '', school: '',
    username: '', profilePicture: '', serverError: ''
};

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.fetchUserProfile();
    }

    fetchUserProfile() {
        let responseStatus = 0;
        fetch(Config.API_URL + '/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            }
        }).then( response => {
            responseStatus = response.status;
            return response.json();
        }).then( response => {
            if (responseStatus == 403) {
                this.setState({
                    serverError: "Some error occured. Please try again. If problem persists, " +
                    "please let us know at support@thumbtravel.com"
                })
            }
            else if (responseStatus == 200) {
                this.setState({
                    firstName: response.firstName,
                    lastName: response.lastName,
                    school: response.school,
                    username: response.username,
                    profilePicture: response.profilePicture || ''
                })
            }
        }).catch(error => {
            // TODO log error
            this.setState({
                serverError: "Some error occured. Please try again. If problem persists, " +
                "please let us know at support@thumbtravel.com"
            })
        })
    }

    refreshUserProfile = (firstName, lastName) => {
        this.setState({
            firstName: firstName,
            lastName: lastName
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
                            First Name: {this.state.firstName}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            Last Name: {this.state.lastName}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            School: {this.state.school}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            Username: @{this.state.username}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            Profile Picture: {this.state.profilePicture}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            {this.state.serverError}
                        </Text>
                    </View>

                    <Button rounded info style={{ alignSelf: 'center' }}
                        onPress={() =>{
                            this.props.navigation.navigate('EditProfile', {
                                user: {
                                    firstName: this.state.firstName,
                                    lastName: this.state.lastName,
                                    username: this.state.username,
                                    school: this.state.school,
                                    profilePicture: this.state.profilePicture
                                },
                                refresh: this.refreshUserProfile
                            })
                        }}
                    >
                        <Text>
                            Edit Profile
                        </Text>
                    </Button>

                    <Button rounded info style={{ alignSelf: 'center' }}>
                        <Text>
                            Settings
                        </Text>
                    </Button>

                    <Button rounded info style={{ alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('Feedback') }
                    >
                        <Text>
                            Give us some feedback
                        </Text>
                    </Button>

                    <Button rounded info style={{ alignSelf: 'center' }}
                        onPress={() =>
                            onLogOut()
                                .then(() => {
                                    const resetAction = NavigationActions.reset({
                                        index: 0,
                                        key: null,
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