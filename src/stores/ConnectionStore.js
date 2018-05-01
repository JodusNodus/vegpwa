import { observable, action } from "mobx";

import * as navigate from "../services/navigation";
import * as api from "../services/vegapi";
import { STATE } from "../constants";
import { getCurrentPosition } from "../services/location";

export default class ConnectionStore {
  @observable onLine = navigator.onLine;

  constructor() {
    window.addEventListener("offline", this.setOffline);
    window.addEventListener("online", this.setOnline);
  }

  @action.bound
  setOffline() {
    this.onLine = false;
  }

  @action.bound
  setOnline() {
    this.onLine = true;
  }
}
