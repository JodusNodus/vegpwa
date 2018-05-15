import { observable, flow } from "mobx";

import * as api from "../services/vegapi";

export default class HomeStore {
  @observable newProducts = [];
  @observable highestRatedProducts = [];
  @observable popularProducts = [];

  fetchNewProducts = flow(function*() {
    if (this.newProducts.length) return;
    const { products } = yield api.fetchProducts({
      orderby: "creationdate",
      size: 20
    });
    this.newProducts.replace(products);
  });

  fetchHighestRatedProducts = flow(function*() {
    if (this.highestRatedProducts.length) return;
    const { products } = yield api.fetchProducts({
      orderby: "rating",
      size: 20
    });
    this.highestRatedProducts.replace(products);
  });

  fetchPopularProducts = flow(function*() {
    if (this.popularProducts.length) return;
    const { products } = yield api.fetchProducts({ orderby: "hits", size: 20 });
    this.popularProducts.replace(products);
  });
}
