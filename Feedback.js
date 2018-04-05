import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, View, Text, Button, Input, Picker } from 'native-base';

const initialState = { feedbackSubmitMessage: '' }

export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    showFeedbackSubmitMessage = message => {
        this.setState({ feedbackSubmitMessage: message });
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
                            { this.state.feedbackSubmitMessage }
                            {'\n'}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            how are we doing?
                            {'\n'}
                        </Text>
                    </View>
                    
                    <View>
                        <Text>
                            We want to hear what you love and what you think we can do better.
                            We also want to integrate your suggestions to make our product better in the future.
                            At thumb, we promise to respond to every piece of feedback individually.
                            {'\n'}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            If you have a question or need help resolving an issue quickly, please email
                            info@thumbtravel.com, or visit our FAQ's page. We will get back to you as soon as possible.
                            {'\n'}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            WHAT WOULD YOU LIKE TO DO?
                            {'\n'}
                        </Text>
                    </View>

                    <Button rounded info style={{ alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('ReportBug', { 
                                showFeedbackSubmitMessage: this.showFeedbackSubmitMessage 
                            }) }
                    >
                        <Text>
                            Report a bug
                        </Text>
                    </Button>

                    <Button rounded info style={{ alignSelf: 'center' }}>
                        <Text>
                            Ask a question
                        </Text>
                    </Button>

                    <Button rounded info style={{ alignSelf: 'center' }}>
                        <Text>
                            Request a feature
                        </Text>
                    </Button>

                    <Button rounded info style={{ alignSelf: 'center' }}>
                        <Text>
                            Other
                        </Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}