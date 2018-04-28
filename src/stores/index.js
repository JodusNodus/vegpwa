import { configure } from "mobx";

import UserStore from "./user";
import HomeStore from "./home";
import ProductStore from "./product";

configure({ enforceActions: true });

export default {
  userStore: new UserStore(),
  homeStore: new HomeStore(),
  productStore: new ProductStore()
};
