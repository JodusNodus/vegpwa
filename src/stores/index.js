import { configure } from "mobx";
import localforage from "../services/storage";
import { create } from "mobx-persist";

import UserStore from "./UserStore";
import HomeStore from "./HomeStore";
import ProductStore from "./ProductStore";
import FavoritesStore from "./FavoritesStore";

configure({ enforceActions: true });

const hydrate = create({
  storage: localforage,
  jsonify: true
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
