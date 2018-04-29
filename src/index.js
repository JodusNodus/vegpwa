import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import "./index.css";

import App from "./App";

import { Router } from "react-router-dom";
import { history } from "./services/navigation";
import stores, { hydrateStores } from "./stores/index";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

stores.userStore.login();

hydrateStores(stores)
  .then(() => console.log("Stores hydrated"))
  .catch(console.error);
