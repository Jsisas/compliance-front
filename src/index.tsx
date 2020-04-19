import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from "./redux/store";
import { PageLayout } from "./components/Layout/Layout";
import './index.scss'

export const API_URL = process.env.REACT_APP_API_URL;

function App() {
  return (
    <ReduxProvider store={configureStore}>
      <Router>
        <PageLayout />
      </Router>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
