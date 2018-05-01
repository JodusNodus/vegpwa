import { observable, flow } from "mobx";

import * as api from "../services/vegapi";

export default class HomeStore {
  @observable newProducts = [];
  @observable highestRatedProducts = [];
  @observable popularProducts = [];

  fetchNewProducts = flow(function*() {
    if (this.newProducts.length) return;
    const { products } = yield api.fetchProducts({ orderby: "creationdate" });
    console.log(products);
    this.newProducts.replace(products);
  });

  fetchHighestRatedProducts = flow(function*() {
    if (this.highestRatedProducts.length) return;
    const { products } = yield api.fetchProducts({ orderby: "rating" });
    this.highestRatedProducts.replace(products);
  });

  fetchPopularProducts = flow(function*() {
    if (this.popularProducts.length) return;
    const { products } = yield api.fetchProducts({ orderby: "hits" });
    this.popularProducts.replace(products);
  });
}
