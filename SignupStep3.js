import React, { Component } from 'react';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';
import Config from 'react-native-config';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const initialState = {
    email: '', university: 'none', birthday: '', clientError: '', serverError: ''
};

export default class SignupStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onValueChange(value) {
        this.setState({
            university: value
        });
    }

    canGoNext() {
        let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!reg.test(this.state.email)) {
            this.state.clientError = "Incorrect email address";
            return false;
        }

        if(this.state.email.substr(this.state.email.length - 4) !== '.edu') {
            this.state.clientError = "Email address must end in .edu";
            return false;
        }

        if(this.state.birthday === '') {
            this.state.clientError = "Please select your birthday";
            return false;
        }

        if(this.state.university === 'none') {
            this.state.clientError = "Please select your school";
            return false;
        }

        this.state.clientError = "";
        return true;
    }

    checkEmail() {
        let responseStatus = 0
        fetch(Config.API_URL+'/user/validate/email/' + this.state.email.toLowerCase(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            responseStatus = response.status
            return response.json()
        })
        .then( response => {
            if(responseStatus == 422) {
                this.setState({
                    serverError: "Invalid email"
                })
            }
            else if(responseStatus == 409) {
                this.setState({
                    serverError: "Duplicate email"
                })
            }
            else if(responseStatus == 200) {
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
                        onChangeText={(email) => this.setState({
                            email: email.toLowerCase(),
                            serverError: ''
                            })}
                        value={this.state.email.toLowerCase()}
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
                        selectedValue = { this.state.university }
                        onValueChange = { this.onValueChange.bind(this) }
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
                            style={{width: 200}}
                            date={this.state.birthday}
                            mode="date"
                            placeholder="select birthday"
                            format="MM-DD-YYYY"
                            minDate={moment().subtract(25, 'y')}
                            maxDate={moment().subtract(16, 'y')}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({birthday: date})}}
                        />
                    
                    <Button rounded success onPress={() => this.checkEmail()} disabled={ !this.canGoNext() }>
                        <Text>
                            NEXT
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