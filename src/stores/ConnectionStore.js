import { observable, action } from "mobx";

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
