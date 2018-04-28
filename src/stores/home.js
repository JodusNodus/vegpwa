import { observable, flow } from "mobx";

import * as navigate from "../services/navigation";
import * as api from "../services/vegapi";

export default class HomeStore {
  @observable newProducts = [];
  @observable highestRatedProducts = [];
  @observable popularProducts = [];

  fetchNewProducts = flow(function*() {
    if (this.newProducts.length) return;
    const { products } = yield api.fetchProducts({ orderby: "creationdate" });
    this.newProducts = products;
  });

  fetchHighestRatedProducts = flow(function*() {
    if (this.highestRatedProducts.length) return;
    const { products } = yield api.fetchProducts({ orderby: "rating" });
    this.highestRatedProducts = products;
  });

  fetchPopularProducts = flow(function*() {
    if (this.popularProducts.length) return;
    const { products } = yield api.fetchProducts({ orderby: "hits" });
    this.popularProducts = products;
  });
}
