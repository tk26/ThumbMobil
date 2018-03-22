import React, { Component } from 'react';
import { createRootNavigator } from './router';

export default class App extends Component {
    render() {
        const Layout = createRootNavigator();
        return <Layout/>
    }
}