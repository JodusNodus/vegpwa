import { observable, action, computed } from "mobx";
import { persist } from "mobx-persist";

import { find, findIndex } from "lodash";
import * as navigate from "../services/navigation";
import * as api from "../services/vegapi";

export default class FavoritesStore {
  @persist("list")
  @observable
  products = [];

  @action.bound
  add(product) {
    this.products.push(product);
  }

  isFavorite(ean) {
    return findIndex(this.products, ["ean", ean]) > -1;
  }

  get(ean) {
    return find(this.products, ["ean", ean]);
  }

  @action.bound
  remove(ean) {
    const index = findIndex(this.products, ["ean", ean]);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }
}
