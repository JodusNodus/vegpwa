import { observable, flow } from "mobx";

import * as api from "../services/vegapi";

// Product fetch size
const size = 20;

export default class HomeStore {
  @observable newProducts = [];
  @observable highestRatedProducts = [];
  @observable popularProducts = [];
  @observable labelProducts = new Map();

  fetchNewProducts = flow(function*() {
    if (this.newProducts.length) return;
    const { products } = yield api.fetchProducts({
      orderby: "creationdate",
      size
    });
    this.newProducts.replace(products);
  });

  fetchHighestRatedProducts = flow(function*() {
    if (this.highestRatedProducts.length) return;
    const { products } = yield api.fetchProducts({
      orderby: "rating",
      size
    });
    this.highestRatedProducts.replace(products);
  });

  fetchPopularProducts = flow(function*() {
    if (this.popularProducts.length) return;
    const { products } = yield api.fetchProducts({ orderby: "hits", size });
    this.popularProducts.replace(products);
  });

  fetchLabelProducts = flow(function*(label) {
    if (this.getLabelProducts(label).length) return;
    const { products } = yield api.fetchProducts({ labels: label, size });
    this.labelProducts.get(label).replace(products);
  });

  getLabelProducts(label) {
    if (!this.labelProducts.get(label)) {
      this.labelProducts.set(label, []);
    }
    return this.labelProducts.get(label);
  }
}
