import React, { Component } from 'react';
import { Image, Linking, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config';

const headerPhotoMap = {
    // TODO point to header photo sources
    "indiana-university": ""
}

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            firstName: global.firstName,
            username: global.username,
            profilePicture: global.profilePicture,
            error: ''
        });
    }

    componentDidMount() {
        AsyncStorage.getItem("user")
            .then(user => {
                user = JSON.parse(user);
                this.setState({
                    headerPhoto: headerPhotoMap[user.school] || "",
                    school: user.school,
                    bio: user.bio
                });
            });
    }

    validateAndUpdate() {
        // server side validation
        let responseStatus = 0;
        fetch(Config.API_URL+'/user/edit/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "profilePicture" : this.state.profilePicture,
                "bio": this.state.bio
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
                this.props.navigation.state.params.refresh(this.state.profilePicture);
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
                    <View>
                        <Image
                            source={ this.state.headerPhoto || require('./../../assets/thumb-horizontal-logo.png') }
                        />
                    </View>

                    <View>
                        <Text>
                            First Name: {this.state.firstName}
                        </Text>
                    </View>

                    <TouchableOpacity>
                        <Image
                            source={ this.state.profilePicture || require('./../../assets/thumb-horizontal-logo.png') }
                        />
                    </TouchableOpacity>

                    <View>
                        <Text>
                            Username: @{this.state.username}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            School: {this.state.school}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            Bio:
                        </Text>
                    </View>

                    <Input
                        maxLength={100}
                        autoCorrect={true}
                        onChangeText={(bio) => this.setState({bio, error:''})}
                        placeholder="Yo, add a bio"
                        value={this.state.bio}
                    />

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