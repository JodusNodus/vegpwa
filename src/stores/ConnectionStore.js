import { observable, action } from "mobx";
import * as navigate from "../services/navigation";

export default class ConnectionStore {
  @observable onLine = navigator.onLine;

  constructor(stores) {
    this.stores = stores;
    window.addEventListener("offline", this.setOffline);
    window.addEventListener("online", this.setOnline);
  }

  @action.bound
  setOffline() {
    navigate.toFavorites(true);
    this.onLine = false;
  }

  @action.bound
  setOnline() {
    this.stores.userStore.tryLogin();
    this.onLine = true;
  }
}
