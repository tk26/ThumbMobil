import React, { Component } from 'react';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import Config from 'react-native-config';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const initialState = {
    email: '', university: 'none', birthday: '', error: ''
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default class SignupStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onValueChange(university) {
        this.setState({ university, error: '' });
    }

    validate() {
        // client side validation
        if (this.state.birthday === '') {
            this.setState({ error: "Please select your birthday" });
            return;
        }
        if (this.state.university === 'none') {
            this.setState({ error: "Please select your school" });
            return;
        }
        if (!emailRegex.test(this.state.email)) {
            this.setState({ error: "Incorrect email address" });
            return;
        }
        if (this.state.email.substr(this.state.email.length - 4) !== '.edu') {
            this.setState({ error: "Email address must end in .edu" });
            return;
        }

        // server side validation
        let responseStatus = 0
        fetch(Config.API_URL + '/user/validate/email/' + this.state.email.toLowerCase(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                responseStatus = response.status
                return response.json()
            })
            .then(response => {
                if (responseStatus == 422) {
                    this.setState({
                        error: "Invalid email"
                    })
                }
                else if (responseStatus == 409) {
                    this.setState({
                        error: "Duplicate email"
                    })
                }
                else if (responseStatus == 200) {
                    // validation success
                    this.props.navigation.navigate('SignupStep4', {
                        user: {
                            firstName: this.props.navigation.state.params.user.firstName,
                            lastName: this.props.navigation.state.params.user.lastName,
                            username: this.props.navigation.state.params.user.username,
                            password: this.props.navigation.state.params.user.password,
                            email: this.state.email,
                            university: this.state.university,
                            birthday: this.state.birthday
                        }
                    });
                }
                else {
                    this.setState({
                        error: "Some error occured. Please try again. If problem persists, " +
                        "please let us know at support@thumbtravel.com"
                    })
                }
            })
            .catch(error => {
                // TODO log error
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
                        <Text>
                            And, your email? {'\n'}
                            Please use your '.edu' email address. {'\n'}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            EMAIL
                        </Text>
                    </View>
                    <Input
                        maxLength={254}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(email) => this.setState({
                            email: email.toLowerCase(),
                            error: ''
                        })}
                        value={this.state.email}
                    />
                    <View>
                        <Text>
                            Don't have a '.edu' email address to sign up with? Click here.
                        </Text>
                    </View>

                    <View>
                        <Text>
                            What school do you attend?
                        </Text>
                    </View>
                    <View>
                        <Text>
                            UNIVERSITY
                        </Text>
                    </View>
                    <Picker
                        iosHeader="University"
                        mode="dropdown"
                        selectedValue={this.state.university}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item label="Select University" value="none" />
                        <Picker.Item label="Indiana University" value="indiana-university" />
                        <Picker.Item label="Purdue University" value="purdue-university" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>

                    <View>
                        <Text>
                            What is your birthday?
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Thumb uses your birthday to organize our users so we can learn more about how
                            each person is using the application. We want to make the best product and this will help us improve.
                        </Text>
                    </View>
                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.birthday}
                        mode="date"
                        placeholder="select birthday"
                        format="MM-DD-YYYY"
                        minDate={new Date(moment().subtract(25, 'y'))}
                        maxDate={new Date(moment().subtract(16, 'y'))}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => { this.setState({ birthday: date, error: '' }) }}
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