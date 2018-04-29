import { observable, flow, computed } from "mobx";

import moment from "moment";
import * as navigate from "../services/navigation";
import * as api from "../services/vegapi";

export default class ProductStore {
  @observable product = null;

  constructor(stores) {
    this.stores = stores;
  }

  @computed
  get displayName() {
    return this.product.brand.name + " " + this.product.name;
  }

  @computed
  get creationDateString() {
    return moment(this.product.creationdate, "DD/MM/YYYY")
      .locale("nl")
      .format("DD MMM YY");
  }

  fetchProduct = flow(function*(ean) {
    const storedProduct = this.stores.favoritesStore.get(ean);
    if (storedProduct) {
      this.product = storedProduct;
    }
    const { product } = yield api.fetchProduct(ean);
    this.product = product;
  });
}
