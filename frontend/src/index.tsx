import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
    spacing: 3,
    typography: {
        fontSize: 18,
        fontFamily: [
            'Palatino',
            'URW Palladio L',
            'serif',
        ].join(','),
        h1: {
            fontSize: 18,
            fontFamily: 'Palatino',
        },
        h2: {
            fontSize: 20,
            fontFamily: 'URW Palladio L',
            fontStyle: 'italic',
        },
    },
    palette: {
        background: {
            default: '#31A4A9'
        },
        primary: {
            main: '#153435',//indigo
        },
        error: {
            main: '#D72A2A',//red
        },
        warning: {
            main: '#FC7B09',//orange
        },
        success: {
            main: '#09FE00',//green
        },
        text: {
            primary: '#000000',//black
        },
    },
});


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
