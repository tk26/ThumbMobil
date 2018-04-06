import React, { Component } from 'react';
import { Image, Linking, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.navigation.state.params.user;
        this.state.error = '';
    }

    validateAndUpdate() {
        // client side validation
        if (this.state.firstName.length < 1) {
            this.setState({ error: "First Name cannot be empty" });
            return;
        }
        if (this.state.lastName.length < 1) {
            this.setState({ error: "Last Name cannot be empty" });
            return;
        }

        // server side validation
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
                    error: "Invalid user details"
                })
            }
            else if(responseStatus == 200) {
                // profile updated successfully
                this.setState({
                    error: response.message
                })
                this.props.navigation.state.params.refresh(this.state.firstName, this.state.lastName);
            }
            else {
                this.setState({
                    error: "Some error occured. Please try again. If problem persists, " + 
                    "please let us know at support@thumbtravel.com"
                })
            }
        })
        .catch( error => {
            // TOOD log error
            this.setState({
                error: "Some error occured. Please try again. If problem persists, " + 
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
                            First Name:
                        </Text>
                    </View>

                    <Input
                        maxLength={30}
                        autoCorrect={false}
                        autoCapitalize="words"
                        onChangeText={(firstName) => this.setState({firstName, error: ''})}
                        value={this.state.firstName}
                    />

                    <View>
                        <Text>
                            Last Name:
                        </Text>
                    </View>

                    <Input
                        maxLength={30}
                        autoCorrect={false}
                        autoCapitalize="words"
                        onChangeText={(lastName) => this.setState({lastName, error: ''})}
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

                    <Button rounded success onPress={() => this.validateAndUpdate()}>
                        <Text>
                            UPDATE
                        </Text>
                    </Button>
                    
                    <View>
                        <Text>
                            { this.state.error }
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}