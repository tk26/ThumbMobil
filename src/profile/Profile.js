import React, { Component } from 'react';
import { Image, Linking, AsyncStorage, TouchableOpacity} from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import { onLogOut } from './../auth';
import { NavigationActions } from 'react-navigation';
import Config from 'react-native-config';

const initialState = {
    firstName: '', profilePicture: '', error: ''
};

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.setState({
            firstName: global.firstName,
            profilePicture: global.profilePicture
        });
    }

    refreshUserProfile = (profilePicture) => {
        this.setState({ profilePicture });
    }

    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Text>
                            First Name: {this.state.firstName}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() =>{
                        this.props.navigation.navigate('EditProfile', {
                            refresh: this.refreshUserProfile
                        })
                    }}>
                        <Image
                            source={ this.state.profilePicture || require('./../../assets/thumb-horizontal-logo.png') }
                        />
                    </TouchableOpacity>

                    <View>
                        <Text>
                            {this.state.error}
                        </Text>
                    </View>

                    <Button rounded info style={{ alignSelf: 'center' }}
                        onPress={() =>{
                            this.props.navigation.navigate('EditProfile', {
                                refresh: this.refreshUserProfile
                            })
                        }}
                    >
                        <Text>
                            View and Edit Profile
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