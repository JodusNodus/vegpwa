import { observable, flow } from "mobx";
import { persist } from "mobx-persist";

import * as navigate from "../services/navigation";
import * as api from "../services/vegapi";
import { STATE } from "../constants";
import { getCurrentPosition } from "../services/location";

export default class UserStore {
  @persist("object")
  @observable
  user;
  @observable location;
  @observable loginState = STATE.none;
  @observable locationState = STATE.none;

  checkLogin = flow(function*(hydrateStores) {
    this.locationState = STATE.pending;
    navigate.toLogin();

    if (hydrateStores) {
      yield hydrateStores();
    }

    if (this.user) {
      yield this.updateLocation();
    } else {
      this.locationState = STATE.none;
      navigate.toLogin();
    }
  });

  login = flow(function*(userLoginForm) {
    this.loginState = STATE.pending;

    const user = yield api.login(userLoginForm);

    if (!user) {
      this.loginState = STATE.error;
      return;
    }

    this.user = user;
    this.loginState = STATE.done;

    yield this.updateLocation();
  });

  signup = flow(function*(userSignupForm) {
    this.loginState = STATE.pending;

    const user = yield api.signup(userSignupForm);

    if (!user) {
      this.loginState = STATE.error;
      return;
    }

    this.user = user;
    this.loginState = STATE.done;

    yield this.updateLocation();
  });

  updateLocation = flow(function*() {
    this.locationState = STATE.pending;
    let coords;

    try {
      if (process.env.NODE_ENV === "development") {
        coords = { lat: 51.376944599999995, lng: 4.4555944 };
      }
    } catch (e) {}

    if (!coords) {
      coords = yield getCurrentPosition();
    }

    this.location = coords;

    try {
      yield api.updateLocation(coords);
      navigate.toHome();
      this.locationState = STATE.done;
    } catch (error) {
      this.locationState = STATE.error;
      this.loginState = STATE.error;
    }
  });
}
