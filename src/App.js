import React from 'react';
import { Router } from 'react-router-dom';
import { browserHistory } from './utilities';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAppApolloClient } from './contexts/apolloClient';
import Layout from './layouts/layout.container';
import { LoginForm } from './pages';
import { useAuthToken } from './contexts/auth';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

// defaultTheme
import themes from './themes';

const initialStyles = {
    borderRadius: '4'
};

function App() {
    const apolloClient = useAppApolloClient();
    const [authToken] = useAuthToken();

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={themes(initialStyles)}>
                <CssBaseline />
                <Router history={browserHistory}>{authToken ? <Layout /> : <LoginForm />}</Router>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
