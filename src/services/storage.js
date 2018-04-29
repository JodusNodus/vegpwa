import localforage from "localforage";

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: "VeganPWA",
  version: 1.0,
  storeName: "persistence",
  description: "All persistence data"
});

export default localforage;
