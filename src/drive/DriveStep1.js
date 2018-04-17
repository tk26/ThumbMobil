import React, { Component } from 'react';
import { Image, Linking, TextInput } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const initialState = {
    startLocation: {}, endLocation: {}, availableSeats: 'none', error: '',
};

export default class DriveStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onValueChange(availableSeats) {
        this.setState({ availableSeats, error: '' });
    }

    validate() {
        if (!this.state.startLocation.address ||
            !this.state.startLocation.latitude ||
            !this.state.startLocation.longitude) {
            this.setState({ error: "Please select a start address" });
            return;
        }

        if (!this.state.endLocation.address ||
            !this.state.endLocation.latitude ||
            !this.state.endLocation.longitude) {
            this.setState({ error: "Please select an end address" });
            return;
        }

        if (this.state.availableSeats === 'none') {
            this.setState({ error: "Please select available seats" });
            return;
        }

        // validation success
        this.props.navigation.navigate('DriveStep2', {
            drive: {
                startLocation: this.state.startLocation,
                endLocation: this.state.endLocation,
                availableSeats: this.state.availableSeats
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
                            Build your drive
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
                            this.setState({ 
                                startLocation: {
                                    address: data.description,
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng
                                }, 
                                error: '' 
                            });
                        }}
                        
                        value={this.state.startLocation.address}

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
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
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
                            this.setState({ 
                                endLocation: {
                                    address: data.description,
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng
                                }, 
                                error: '' 
                            });
                        }}

                        value={this.state.endLocation.address}

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
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />

                    <View>
                        <Text>
                            And available seats ?
                        </Text>
                    </View>
                    <Picker
                        iosHeader="Seats Available"
                        mode="dropdown"
                        selectedValue={this.state.availableSeats}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item label="Select Available Seats" value="none" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                    </Picker>

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