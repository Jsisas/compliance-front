import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ReactDOM from "react-dom";
import InsightsPage from "./pages/Insights/InsightsPage";
import { ControlsPage } from "./pages/Controls/ControlsPage";
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from "./redux/store";

function App() {
  return (
    <ReduxProvider store={configureStore}>
      <Router>
        <Switch>
          <Route exact path="/" component={InsightsPage} />
          <Route exact path="/controls" component={ControlsPage} />
        </Switch>
      </Router>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
