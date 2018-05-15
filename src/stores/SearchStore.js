import { observable, flow } from "mobx";
import * as api from "../services/vegapi";
import { STATE } from "../constants";

export default class SearchStore {
  @observable searchState = STATE.none;
  @observable products = [];

  fetchProducts = flow(function*(searchquery) {
    this.searchState = STATE.pending;
    const { products } = yield api.fetchProducts({
      searchquery,
      size: 30
    });
    this.products.replace(products);
    this.searchState = STATE.done;
  });
}
