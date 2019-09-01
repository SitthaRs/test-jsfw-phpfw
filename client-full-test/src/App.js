import React from 'react';
import routes from "./Routes";
import withTracker from "./WithTracker";
import './styles/App.css';
import './styles/html5.css';
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={withTracker(props => {
              return (
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout>
              );
            })}
          />
        );
      })}

    </div>
  </BrowserRouter>
  );
}

export default App;
