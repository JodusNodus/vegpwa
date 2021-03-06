import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import "./index.css";

import App from "./App";

import { Router } from "react-router-dom";
import * as navigate from "./services/navigation";
import stores, { hydrateStores } from "./stores/index";
import registerServiceWorker from "./registerServiceWorker";

if (stores.connectionStore.onLine) {
  stores.userStore.checkLogin(() => hydrateStores(stores));
} else {
  navigate.toFavorites();
}

ReactDOM.render(
  <Provider {...stores}>
    <Router history={navigate.history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
