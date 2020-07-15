import ErrorBoundary from "./components/InternalError/ErrorBoundary";
import {Provider as ReduxProvider} from "react-redux";
import configureStore from "./redux/store";
import {BrowserRouter as Router} from "react-router-dom";
import {PageLayout} from "./components/Layout/Layout";
import React from "react";

export const API_URL = process.env.REACT_APP_API_URL;

export function App() {
    return (
        <ErrorBoundary>
            <ReduxProvider store={configureStore}>
                <Router>
                    <PageLayout/>
                </Router>
            </ReduxProvider>
        </ErrorBoundary>
    );

}
