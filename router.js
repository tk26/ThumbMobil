import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import LaunchScreen from './LaunchScreen';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import SignupStep3 from './SignupStep3';
import SignupStep4 from './SignupStep4';
import SignupSuccess from './SignupSuccess';
import LoginScreen from './LoginScreen';

import Home from './Home';
import Travel from './Travel';
import RideStep1 from './RideStep1';
import RideStep2 from './RideStep2';
import RideStep3 from './RideStep3';
import DriveStep1 from './DriveStep1';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Feedback from './Feedback';
import ReportBug from './ReportBug';
import AskQuestion from './AskQuestion';
import RequestFeature from './RequestFeature';
import OtherFeedback from './OtherFeedback';

const SignedOutStack = StackNavigator({
    LaunchScreen: {
        screen: LaunchScreen,
        navigationOptions: {
            title: 'Thumb'
        }
    },
    SignupStep1: {
        screen: SignupStep1,
        navigationOptions: {
            title: 'Sign up: Step 1 of 4'
        }
    },
    SignupStep2: {
        screen: SignupStep2,
        navigationOptions: {
            title: 'Sign up: Step 2 of 4'
        }
    },
    SignupStep3: {
        screen: SignupStep3,
        navigationOptions: {
            title: 'Sign up: Step 3 of 4'
        }
    },
    SignupStep4: {
        screen: SignupStep4,
        navigationOptions: {
            title: 'Sign up: Step 4 of 4'
        }
    },
    SignupSuccess: {
        screen: SignupSuccess,
        navigationOptions: {
            title: 'Sign up successful'
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Log in'
        }
    }
});

const ProfileStack = StackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            title: 'Edit Profile',
        }
    },
    Feedback: {
        screen: Feedback,
        navigationOptions: {
            title: 'Feedback',
        }
    },
    ReportBug: {
        screen: ReportBug,
        navigationOptions: {
            title: 'Report a bug',
        }
    },
    AskQuestion: {
        screen: AskQuestion,
        navigationOptions: {
            title: 'Ask a question',
        }
    },
    RequestFeature: {
        screen: RequestFeature,
        navigationOptions: {
            title: 'Request a feature',
        }
    },
    OtherFeedback: {
        screen: OtherFeedback,
        navigationOptions: {
            title: 'Give some other feedback',
        }
    },
});

const TravelStack = StackNavigator({
    Travel: {
        screen: Travel,
        navigationOptions: {
            title: 'Travel',
        }
    },
    RideStep1: {
        screen: RideStep1,
        navigationOptions: {
            title: 'Ride: Step 1',
        }
    },
    RideStep2: {
        screen: RideStep2,
        navigationOptions: {
            title: 'Ride: Step 2',
        }
    },
    RideStep3: {
        screen: RideStep3,
        navigationOptions: {
            title: 'Ride: Step 3',
        }
    },
    DriveStep1: {
        screen: DriveStep1,
        navigationOptions: {
            title: 'Drive: Step 1',
        }
    },
});

const LoggedInTabs = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home'
        }
    },
    Travel: {
        screen: TravelStack,
        navigationOptions: {
            tabBarLabel: 'Travel'
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Profile'
        }
    }
});

export const createRootNavigator = (loggedIn = false) => {
    return StackNavigator({
        SignedOutStack: {
            screen: SignedOutStack,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        LoggedInTabs: {
            screen: LoggedInTabs,
            navigationOptions: {
                gesturesEnabled: false
            }
        }
    },
    {
        headerMode: 'none',
        mode: 'modal',
        initialRouteName: loggedIn ? 'LoggedInTabs' : 'SignedOutStack'
    });
};