import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import LaunchScreen from './LaunchScreen';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import SignupStep3 from './SignupStep3';
import SignupStep4 from './SignupStep4';
import SignupSuccess from './SignupSuccess';
import LoginScreen from './LoginScreen';
import LoginSuccess from './LoginSuccess';

import Home from './Home';
import Travel from './Travel';
import Profile from './Profile';

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

const LoggedInTabs = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home'
        }
    },
    Travel: {
        screen: Travel,
        navigationOptions: {
            tabBarLabel: 'Travel'
        }
    },
    Profile: {
        screen: Profile,
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