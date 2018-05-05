import { observable, flow } from "mobx";

import * as navigate from "../services/navigation";
import * as api from "../services/vegapi";
import { STATE } from "../constants";
import { getCurrentPosition } from "../services/location";

async function updateLocation() {
  let coords = { lat: 51.376944599999995, lng: 4.4555944 };
  try {
    if (process.env.NODE_ENV === "production") {
      coords = await getCurrentPosition();
    }
  } catch (e) {
    coords = await getCurrentPosition();
  }

  await api.updateLocation(coords);
}

export default class UserStore {
  @observable user;
  @observable loginState = STATE.pending;
  @observable locationState = STATE.pending;

  tryLogin = flow(function*() {
    navigate.toSplash();
    this.loginState = STATE.pending;
    this.locationState = STATE.pending;

    try {
      yield updateLocation();
      this.locationState = STATE.done;
      this.loginState = STATE.done;

      navigate.toHome();
    } catch (error) {
      this.locationState = STATE.error;

      navigate.toSignup();
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

    this.locationState = STATE.pending;
    try {
      yield updateLocation();
      this.locationState = STATE.done;

      navigate.toHome();
    } catch (error) {
      this.locationState = STATE.error;
    }
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

    this.locationState = STATE.pending;
    try {
      yield updateLocation();
      this.locationState = STATE.done;

      navigate.toHome();
    } catch (error) {
      this.locationState = STATE.error;
    }
  });
}
