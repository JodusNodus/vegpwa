import createHistory from "history/createBrowserHistory";

export const history = createHistory();

export const toSearch = () => history.push("/search");
export const toSignup = () => history.replace("/login");
export const toLogin = () => history.replace("/login");
export const toHome = () => history.replace("/home");
export const toProduct = ean => history.push("/product/" + ean);
export const toCreateProduct = (step = 1) => history.replace("/create/" + step);
export const toFavorites = (replace = false) =>
  replace ? history.replace("/favorites") : history.push("/favorites");

export const goBack = () => history.goBack();
