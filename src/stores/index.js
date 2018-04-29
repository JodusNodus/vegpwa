import { configure } from "mobx";
import localforage from "../services/storage";
import { create } from "mobx-persist";

import UserStore from "./user";
import HomeStore from "./home";
import ProductStore from "./product";
import FavoritesStore from "./favorites";

configure({ enforceActions: true });

const hydrate = create({
  storage: localforage,
  jsonify: false
});

const stores = {};
stores.userStore = new UserStore(stores);
stores.homeStore = new HomeStore(stores);
stores.productStore = new ProductStore(stores);
stores.favoritesStore = new FavoritesStore(stores);

export default stores;

export async function hydrateStores(stores) {
  await hydrate("favoritesStore", stores.favoritesStore);
}
