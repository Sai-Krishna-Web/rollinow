import React from "react";
import { Router } from 'react-router-dom'
import { browserHistory } from './utilities';
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { useAppApolloClient } from "./contexts/apolloClient";
import Layout from './layouts/layout.container';
import { LoginForm } from "./pages";
import { useAuthToken } from "./contexts/auth";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#158a82',
      light: '#28d9b8'
    },
    error: {
      main: '#f44336',
      light: '#f44336'
    },
    success: {
      main: '#4caf50',
      light: '#f44336'
    }
  }
});

function App() {
  const apolloClient = useAppApolloClient();
  const [authToken] = useAuthToken()

  return (
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider theme={theme}>
        <Router history={browserHistory}>
          {authToken ? <Layout /> : <LoginForm />}
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>
  );
}

export default App;