import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';

import SignupStep1 from './signup/SignupStep1';
import SignupStep2 from './signup/SignupStep2';
import SignupStep3 from './signup/SignupStep3';
import SignupStep4 from './signup/SignupStep4';
import SignupSuccess from './signup/SignupSuccess';

import Home from './home/Home';
import Thumb from './thumb/Thumb';
import Travel from './travel/Travel';

import RideStep1 from './ride/RideStep1';
import RideStep2 from './ride/RideStep2';
import RideStep3 from './ride/RideStep3';
import RideStep4 from './ride/RideStep4';

import DriveStep1 from './drive/DriveStep1';
import DriveStep2 from './drive/DriveStep2';
import DriveStep3 from './drive/DriveStep3';
import DriveStep4 from './drive/DriveStep4';

import Profile from './profile/Profile';
import EditProfile from './profile/EditProfile';

import Feedback from './feedback/Feedback';
import ReportBug from './feedback/ReportBug';
import AskQuestion from './feedback/AskQuestion';
import RequestFeature from './feedback/RequestFeature';
import OtherFeedback from './feedback/OtherFeedback';

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
    RideStep4: {
        screen: RideStep4,
        navigationOptions: {
            title: 'Ride: Step 4',
        }
    },
    DriveStep1: {
        screen: DriveStep1,
        navigationOptions: {
            title: 'Drive: Step 1',
        }
    },
    DriveStep2: {
        screen: DriveStep2,
        navigationOptions: {
            title: 'Drive: Step 2',
        }
    },
    DriveStep3: {
        screen: DriveStep3,
        navigationOptions: {
            title: 'Drive: Step 3',
        }
    },
    DriveStep4: {
        screen: DriveStep4,
        navigationOptions: {
            title: 'Drive: Step 4',
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
    Thumb: {
        screen: Thumb,
        navigationOptions: {
            tabBarLabel: 'Thumb'
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