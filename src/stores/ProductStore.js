import { action, observable, flow, computed } from "mobx";

import moment from "moment";
import * as api from "../services/vegapi";

export default class ProductStore {
  @observable product = {};

  @action.bound
  clear() {
    this.product = {
      userHasCorrected: false,
      userRating: 0,
      rating: 0,
      labels: [],
      thumbPicture: "",
      coverPicture: "",
      supermarkets: []
    };
  }

  constructor(stores) {
    this.stores = stores;
    this.clear();
  }

  @computed
  get userName() {
    if (!this.product.user) {
      return "...";
    }
    return (
      this.product.user.firstname +
      " " +
      this.product.user.lastname.slice(0, 1).toUpperCase()
    );
  }

  @computed
  get displayName() {
    if (!this.product.brand) {
      return "...";
    }
    return this.product.brand.name + " " + this.product.name;
  }

  @computed
  get creationDateString() {
    if (!this.product.creationdate) {
      return "...";
    }
    return moment(this.product.creationdate, "DD/MM/YYYY")
      .locale("nl")
      .format("DD MMM YY");
  }

  fetchProduct = flow(function*(ean) {
    this.clear();
    const storedProduct = this.stores.favoritesStore.get(ean);
    if (storedProduct) {
      this.product = storedProduct;
    }
    const { product } = yield api.fetchProduct(ean);
    this.product = product;
  });
}
