import React, { Component } from 'react';
import { Image, Linking, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.navigation.state.params.user;
        this.state.clientError = '';
        this.state.serverError = '';
    }

    updateUserProfile() {
        let responseStatus = 0;
        fetch(Config.API_URL+'/user/edit/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "firstName" : this.state.firstName,
                "lastName": this.state.lastName
            })
        })
        .then( response => {
            responseStatus = response.status
            return response.json()
        })
        .then( response => {
            if(responseStatus == 400) {
                this.setState({
                    serverError: "Invalid user details"
                })
            }
            else if(responseStatus == 200) {
                // say updated!
                this.setState({
                    serverError: response.message
                })
                this.props.navigation.state.params.refresh(this.state.firstName, this.state.lastName);
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

    validateUserProfile() {
        if(this.state.firstName.length < 1 || this.state.firstName.length > 30) {
            this.state.clientError = "First Name should be between 1 to 30 characters";
            return false;
        }

        if(this.state.lastName.length < 1 || this.state.lastName.length > 30) {
            this.state.clientError = "Last Name should be between 1 to 30 characters";
            return false;
        }

        this.state.clientError = "";
        return true;
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
                            First Name:
                        </Text>
                    </View>

                    <Input
                        onChangeText={(firstName) => this.setState({firstName})}
                        value={this.state.firstName}
                    />

                    <View>
                        <Text>
                            Last Name:
                        </Text>
                    </View>

                    <Input
                        onChangeText={(lastName) => this.setState({lastName})}
                        value={this.state.lastName}
                    />

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

                    <Button rounded success disabled={!this.validateUserProfile()}
                        onPress={() => this.updateUserProfile()} >
                        <Text>
                            UPDATE
                        </Text>
                    </Button>
                    
                    <View>
                        <Text>
                            { this.state.clientError }
                        </Text>
                    </View>

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