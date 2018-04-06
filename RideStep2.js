import React, { Component } from 'react';
import { Image, Linking, Slider, StyleSheet } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const initialState = {
    travel_date: '', travel_time: [8, 16], clientError: ''
}

export default class RideStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    travel_timesChange = (values) => {
        this.setState({
            travel_time: values,
        });
    }

    canGoNext() {
        if(this.state.travel_date === '') {
            this.state.clientError = "Please select your travel date";
            return false;
        }

        if(this.state.travel_time[1] - this.state.travel_time[0] < 4) {
            this.state.clientError = "Please select a time range of minimum 4 hours";
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
                            {this.props.navigation.state.params.ride.start_address}
                            {'\n'}
                            {this.props.navigation.state.params.ride.end_address}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            What day?
                        </Text>
                    </View>
                    <DatePicker
                            style={{width: 200}}
                            date={this.state.travel_date}
                            mode="date"
                            placeholder="select travel date"
                            format="MM-DD-YYYY"
                            minDate={moment()}
                            maxDate={moment().add(1, 'y')}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({travel_date: date})}}
                        />

                    <View>
                        <Text>
                            And preferred time?
                        </Text>
                    </View>

                    <View style={styles.sliders}>
                        <View style={styles.sliderOne}>
                            <Text style={styles.text}>{this.state.travel_time[0]}:00 </Text>
                            <Text style={styles.text}>{this.state.travel_time[1]}:00</Text>
                        </View>
                        <MultiSlider
                            values={[this.state.travel_time[0], this.state.travel_time[1]]}
                            sliderLength={280}
                            onValuesChange={this.travel_timesChange}
                            min={0}
                            max={24}
                            step={1}
                        />
                    </View>

                    <Button rounded success
                        onPress={() => {
                            this.props.navigation.navigate('RideStep3', {
                                ride: {
                                    start_address: this.props.navigation.state.params.ride.start_address,
                                    end_address: this.props.navigation.state.params.ride.end_address,
                                    travel_date: this.state.travel_date,
                                    travel_time: this.state.travel_time,
                                }
                            });
                        }}
                        disabled={ !this.canGoNext() }>
                        <Text>
                            NEXT
                        </Text>
                    </Button>

                    <View>
                        <Text>
                            { this.state.clientError }
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
  sliders: {
    margin: 20,
    width: 280,
  },
  text: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});