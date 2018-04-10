import React, { Component } from 'react';
import { Image, Linking, TextInput } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const initialState = {
    startAddress: '', endAddress: '', pickupNotes: '', error: '',
};

export default class RideStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validate() {
        if (this.state.startAddress.length < 1) {
            this.setState({ error: "Start address cannot be empty" });
            return;
        }

        if (this.state.endAddress.length < 1) {
            this.setState({ error: "End address cannot be empty" });
            return;
        }

        // validation success
        this.props.navigation.navigate('RideStep2', {
            ride: {
                startAddress: this.state.startAddress,
                endAddress: this.state.endAddress,
                pickupNotes: this.state.pickupNotes
            }
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    {/*TODO: change to show user's profile picture*/}
                    <Image
                        source={require('./../../assets/thumb-horizontal-logo.png')}
                    />

                    <View>
                        <Text>
                            Build your ride
                        </Text>
                    </View>

                    <Text> START ADDRESS </Text>
                    <GooglePlacesAutocomplete
                        minLength={3} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            this.setState({ startAddress: data.description, error: '' });
                        }}

                        onChangeText={(startAddress) => this.setState({ startAddress, error: '' })}
                        value={this.state.startAddress}

                        getDefaultValue={() => ''}

                        query={{
                            key: 'AIzaSyBM4s2TPgaBA9JMCMMZv_VlRGdTTkucQEU',
                            language: 'en', // language of the results
                            types: 'address', // default: 'geocode'
                            components: 'country:us'
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            }
                        }}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />

                    <Text> END ADDRESS </Text>
                    <GooglePlacesAutocomplete
                        minLength={3} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            this.setState({ endAddress: data.description, error: '' });
                        }}

                        onChangeText={(endAddress) => this.setState({ endAddress, error: '' })}
                        value={this.state.endAddress}

                        getDefaultValue={() => ''}

                        query={{
                            key: 'AIzaSyBM4s2TPgaBA9JMCMMZv_VlRGdTTkucQEU',
                            language: 'en', // language of the results
                            types: 'address', // default: 'geocode'
                            components: 'country:us'
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            }
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />

                    <View>
                        <Text>
                            PICK UP NOTES
                        </Text>
                    </View>

                    <TextInput
                        maxLength={100}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="this will be shared with your driver"
                        onChangeText={(pickupNotes) => this.setState({ pickupNotes })}
                        value={this.state.pickupNotes}
                    />

                    <Button rounded success onPress={() => this.validate()}>
                        <Text>
                            NEXT
                            </Text>
                    </Button>

                    <View>
                        <Text>
                            {this.state.error}
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}